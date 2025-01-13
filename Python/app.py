# from flask import Flask, request, jsonify
# import joblib
# import pandas as pd
# from flask_cors import CORS
# import google.generativeai as genai


# genai.configure(api_key="AIzaSyCq5GJP192-6q0wWI6TirQmkknQUVWyEMs")  


# model = genai.GenerativeModel(model_name="gemini-2.0-flash-exp")

# app = Flask(__name__)
# CORS(app) 


# # emission_model = joblib.load("emission_predictor.pkl")  

# # def prepare_data(data):
   
# #     input_data = pd.DataFrame([data])
    
    
# #     input_data = pd.get_dummies(input_data, columns=["vehicle_type", "meals"], drop_first=True)
    
   
# #     model_features = emission_model.feature_names_in_
# #     for col in model_features:
# #         if col not in input_data.columns:
# #             input_data[col] = 0

    
# #     return input_data[model_features]

# # def generate_suggestions(co2_emissions):
    
# #     prompt = f"Your CO₂ emissions are {co2_emissions} kg. Suggest ways to reduce this and encourage actions like tree planting."

    
# #     response = model.generate_content(prompt)

    
# #     return response.text

# # @app.route("/predict", methods=["POST"])
# # def predict_emission():
# #     try:
       
# #         user_input = request.json

        
# #         required_fields = ["vehicle_type", "distance", "electricity_usage", "meals", "waste"]
# #         for field in required_fields:
# #             if field not in user_input:
# #                 return jsonify({"error": f"Missing field: {field}"}), 400

        
# #         prepared_data = prepare_data(user_input)

       
# #         prediction = emission_model.predict(prepared_data)

# #         print(prediction)
# #         co2_emission = prediction[0]
# #         print(co2_emission)
      
# #         suggestions = generate_suggestions(co2_emission)
        
        
# #         return jsonify({
# #             "predicted_emission": co2_emission,
# #             "suggestions": suggestions
# #         })

# #     except Exception as e:
# #         return jsonify({"error": str(e)}), 500

# # if __name__ == "__main__":
# #     app.run(debug=True)
# models = joblib.load("emission_predictor.pkl")
# encoder = joblib.load("encoder.pkl")

# # Define Flask app
# app = Flask(__name__)

# # List of categorical columns (should match those used in training)
# categorical_columns = [
#     'Body Type', 'Sex', 'Diet', 'How Often Shower', 'Heating Energy Source',
#     'Transport', 'Vehicle Type', 'Social Activity', 'Frequency of Traveling by Air',
#     'Waste Bag Size', 'Energy efficiency', 'Recycling', 'Cooking_With'
# ]

# # List of numerical columns (should match those used in training)
# numerical_columns = [
#     'Monthly Grocery Bill', 'Vehicle Monthly Distance Km', 'Waste Bag Weekly Count',
#     'How Long TV PC Daily Hour', 'How Many New Clothes Monthly', 'How Long Internet Daily Hour'
# ]

# # Prediction endpoint


# def generate_suggestions(co2_emissions):
    
#     prompt = f"Your CO₂ emissions are {co2_emissions} kg. Suggest ways to reduce this and encourage actions like tree planting."
#     response = model.generate_content(prompt)
#     return response.text

# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         # Parse input JSON data
#         input_data = request.json
        
#         # Convert input data to DataFrame
#         input_df = pd.DataFrame([input_data])
        
#         # Encode categorical features
#         input_encoded = encoder.transform(input_df[categorical_columns])
#         input_encoded_df = pd.DataFrame(input_encoded, columns=encoder.get_feature_names_out(categorical_columns))
        
#         # Combine encoded and numerical data
#         input_processed = pd.concat([input_df[numerical_columns].reset_index(drop=True), 
#                                       input_encoded_df.reset_index(drop=True)], axis=1)
        
       
#         prediction = models.predict(input_processed)
#         suggestions = generate_suggestions(prediction)
#         print(prediction)
#         return jsonify({"predicted_carbon_emission": prediction[0],
#                         "suggestions": suggestions
#                         })
    
#     except Exception as e:
#         return jsonify({"error": str(e)}), 400

# # Run the app
# if __name__ == "__main__":
#     app.run(debug=True)

from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS
import google.generativeai as genai

# Set up API key for Google Generative AI
genai.configure(api_key="AIzaSyCq5GJP192-6q0wWI6TirQmkknQUVWyEMs")  # Replace with your actual API key

# Load models and encoder
emission_model = joblib.load("emission_predictor.pkl")
encoder = joblib.load("encoder.pkl")

# Categorical and numerical columns
categorical_columns = [
    'Body Type', 'Sex', 'Diet', 'How Often Shower', 'Heating Energy Source',
    'Transport', 'Vehicle Type', 'Social Activity', 'Frequency of Traveling by Air',
    'Waste Bag Size', 'Energy efficiency', 'Recycling', 'Cooking_With'
]

numerical_columns = [
    'Monthly Grocery Bill', 'Vehicle Monthly Distance Km', 'Waste Bag Weekly Count',
    'How Long TV PC Daily Hour', 'How Many New Clothes Monthly', 'How Long Internet Daily Hour'
]

# Generate suggestions based on CO2 emissions
def generate_suggestions(co2_emissions):
    prompt = f"Your CO₂ emissions are {co2_emissions} kg month/year. Suggest ways to reduce this and encourage actions like tree planting."
    response = genai.GenerativeModel(model_name="gemini-2.0-flash-exp").generate_content(prompt)
    return response.text if response else "No suggestions available."

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all origins

# Prediction route
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Parse input JSON data
        input_data = request.json
        
        # Validate required fields in the input
        required_fields = categorical_columns + numerical_columns
        missing_fields = [field for field in required_fields if field not in input_data]
        if missing_fields:
            return jsonify({"error": f"Missing fields: {', '.join(missing_fields)}"}), 400
        
        # Convert input data to DataFrame
        input_df = pd.DataFrame([input_data])
        
        # Encode categorical features
        input_encoded = encoder.transform(input_df[categorical_columns])
        input_encoded_df = pd.DataFrame(input_encoded, columns=encoder.get_feature_names_out(categorical_columns))
        
        # Combine encoded categorical and numerical features
        input_processed = pd.concat([input_df[numerical_columns].reset_index(drop=True), 
                                      input_encoded_df.reset_index(drop=True)], axis=1)
        
        # Make prediction using emission model
        prediction = emission_model.predict(input_processed)
        
        # Generate suggestions based on prediction
        suggestions = generate_suggestions(prediction[0])
        print(suggestions)
        return jsonify({
            "predicted_carbon_emission": prediction[0],
            "suggestions": suggestions
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the app
if __name__ == "__main__":
    app.run(debug=True)
