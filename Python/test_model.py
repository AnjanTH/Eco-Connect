import pandas as pd
import numpy as np
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
import joblib

# Load the trained model and encoder
model = joblib.load("emission_predictor.pkl")
encoder = joblib.load("encoder.pkl")

# Load dataset for testing (ensure it's the same as used in training)
file_path = "Carbon Emission.csv"  # Replace with the dataset file path
data = pd.read_csv(file_path)

# Handle missing values
data['Vehicle Type'] = data['Vehicle Type'].fillna('unknown')

# Separate features and target
target_column = 'CarbonEmission'  # Replace with the actual column name for carbon emission
features = data.drop(columns=[target_column])
target = data[target_column]

# Identify categorical and numerical columns
categorical_columns = features.select_dtypes(include=['object']).columns
numerical_columns = features.select_dtypes(include=['int64', 'float64']).columns

# Encode categorical variables
encoded_features = encoder.transform(features[categorical_columns])
encoded_df = pd.DataFrame(encoded_features, columns=encoder.get_feature_names_out(categorical_columns))

# Combine encoded features with numerical data
numerical_data = features[numerical_columns]
processed_data = pd.concat([numerical_data.reset_index(drop=True), encoded_df.reset_index(drop=True)], axis=1)

# Split data into training and test sets (ensure same split as during training)
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(processed_data, target, test_size=0.2, random_state=42)

# Make predictions on the test set
y_pred = model.predict(X_test)

# Evaluate the model
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
r2 = r2_score(y_test, y_pred)
mae = mean_absolute_error(y_test, y_pred)

print("Model Evaluation on Test Dataset")
print(f"Mean Absolute Error (MAE): {mae:.2f}")
print(f"Mean Squared Error (MSE): {mse:.2f}")
print(f"Root Mean Squared Error (RMSE): {rmse:.2f}")
print(f"R² Score: {r2:.2f}")
