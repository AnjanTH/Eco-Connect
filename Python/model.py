# import pandas as pd
# import random
# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestRegressor
# from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
# import joblib

# # Step 1: Generate Synthetic Daily Data
# def generate_dataset(filename="custom_daily_emissions.csv"):
#     data = {
#         "user_id": [random.randint(1, 100) for _ in range(1000)],
#         "vehicle_type": random.choices(["car", "bus", "train", "bike"], k=1000),
#         "distance": [random.uniform(1, 50) for _ in range(1000)],  # in km
#         "electricity_usage": [random.uniform(5, 30) for _ in range(1000)],  # in kWh
#         "meals": random.choices(["meat-based", "vegetarian", "vegan"], k=1000),
#         "waste": [random.uniform(0.5, 5) for _ in range(1000)],  # in kg
#     }

#     df = pd.DataFrame(data)

#     # Emission factors
#     emission_factors = {
#         "car": 0.21,
#         "bus": 0.08,
#         "train": 0.05,
#         "bike": 0.0,
#         "meat-based": 2.5,
#         "vegetarian": 1.5,
#         "vegan": 0.5,
#     }

#     # Calculate emissions
#     df["transport_emission"] = df["vehicle_type"].map(emission_factors) * df["distance"]
#     df["electricity_emission"] = df["electricity_usage"] * 0.233
#     df["food_emission"] = df["meals"].map(emission_factors)
#     df["waste_emission"] = df["waste"] * 1.15

#     df["total_emission"] = (
#         df["transport_emission"] +
#         df["electricity_emission"] +
#         df["food_emission"] +
#         df["waste_emission"]
#     )

#     df.to_csv(filename, index=False)
#     print(f"Dataset saved to {filename}")


# # Step 2: Train the ML Model
# def train_model(filename="custom_daily_emissions.csv", model_name="emission_predictor.pkl"):
#     # Load dataset
#     data = pd.read_csv(filename)

#     # One-hot encoding for categorical variables
#     data = pd.get_dummies(data, columns=["vehicle_type", "meals"], drop_first=True)

#     # Features and target
#     X = data.drop(columns=["total_emission", "user_id"])
#     y = data["total_emission"]

#     # Split data
#     X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

#     # Train Random Forest model
#     model = RandomForestRegressor(n_estimators=100, random_state=42)
#     model.fit(X_train, y_train)

#     # Model evaluation
#     y_pred = model.predict(X_test)
#     mse = mean_squared_error(y_test, y_pred)
#     mae = mean_absolute_error(y_test, y_pred)
#     r2 = r2_score(y_test, y_pred)

#     # Print metrics
#     print(f"Mean Squared Error (MSE): {mse:.4f}")
#     print(f"Mean Absolute Error (MAE): {mae:.4f}")
#     print(f"R² Score: {r2:.4f}")

#     # Save the model
#     joblib.dump(model, model_name)
#     print(f"Model trained and saved as {model_name}")

#     return model, X_test, y_test  # Return for testing


# # Step 3: Test the Model
# def test_model(X_test, y_test, model):
#     # Make predictions
#     y_pred = model.predict(X_test)

#     # Evaluate the model
#     mse = mean_squared_error(y_test, y_pred)
#     mae = mean_absolute_error(y_test, y_pred)
#     r2 = r2_score(y_test, y_pred)

#     print("\nModel Testing Metrics:")
#     print(f"Mean Squared Error (MSE): {mse:.4f}")
#     print(f"Mean Absolute Error (MAE): {mae:.4f}")
#     print(f"R² Score: {r2:.4f}")


# if __name__ == "__main__":
#     # Generate dataset
#     generate_dataset()

#     # Train model and get test data
#     model, X_test, y_test = train_model()

#     # Test model performance
#     test_model(X_test, y_test, model)
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import OneHotEncoder
from sklearn.metrics import mean_squared_error, r2_score
import joblib

# Load dataset
file_path = "Carbon Emission.csv"
data = pd.read_csv(file_path)

# Handle missing values
data['Vehicle Type'] = data['Vehicle Type'].fillna('unknown')

# Encode categorical variables
categorical_columns = data.select_dtypes(include=['object']).columns
encoder = OneHotEncoder(sparse_output=False, handle_unknown='ignore')
encoded_features = encoder.fit_transform(data[categorical_columns])
encoded_df = pd.DataFrame(encoded_features, columns=encoder.get_feature_names_out(categorical_columns))

# Combine encoded features with numerical data
numerical_columns = data.select_dtypes(include=['int64']).columns.drop('CarbonEmission')
numerical_data = data[numerical_columns]
processed_data = pd.concat([numerical_data.reset_index(drop=True), encoded_df.reset_index(drop=True)], axis=1)

# Split data into training and test sets
X = processed_data
y = data['CarbonEmission']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a Random Forest model
model = RandomForestRegressor(random_state=42, n_estimators=100)
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
r2 = r2_score(y_test, y_pred)

print(f"Model RMSE: {rmse}")
print(f"Model R² Score: {r2}")

# Save the model and encoder for future use
joblib.dump(model, "emission_predictor.pkl")
joblib.dump(encoder, "encoder.pkl")

# Function to predict carbon footprint
def predict_carbon_footprint(input_data):
    # Convert input data to DataFrame
    input_df = pd.DataFrame([input_data])

    # Encode input data
    input_encoded = encoder.transform(input_df[categorical_columns])
    input_encoded_df = pd.DataFrame(input_encoded, columns=encoder.get_feature_names_out(categorical_columns))

    # Combine encoded and numerical data
    input_processed = pd.concat([input_df[numerical_columns].reset_index(drop=True), input_encoded_df.reset_index(drop=True)], axis=1)

    # Predict carbon emission
    prediction = model.predict(input_processed)
    return prediction[0]

# Example usage
example_input = {
    'Body Type': 'overweight',
    'Sex': 'female',
    'Diet': 'vegetarian',
    'How Often Shower': 'daily',
    'Heating Energy Source': 'natural gas',
    'Transport': 'public',
    'Vehicle Type': 'unknown',
    'Social Activity': 'often',
    'Monthly Grocery Bill': 200,
    'Frequency of Traveling by Air': 'rarely',
    'Vehicle Monthly Distance Km': 150,
    'Waste Bag Size': 'medium',
    'Waste Bag Weekly Count': 3,
    'How Long TV PC Daily Hour': 5,
    'How Many New Clothes Monthly': 2,
    'How Long Internet Daily Hour': 3,
    'Energy efficiency': 'Yes',
    'Recycling': "['Paper', 'Metal']",
    'Cooking_With': "['Stove', 'Oven']"
}

predicted_emission = predict_carbon_footprint(example_input)
print(f"Predicted Carbon Emission: {predicted_emission}")
