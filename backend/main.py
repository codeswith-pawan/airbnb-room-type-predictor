from fastapi import FastAPI
from pydantic import BaseModel, Field
from typing import Annotated
import pandas as pd
import joblib
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Airbnb Room Type Prediction API",
    description="Predict Airbnb room type using Machine Learning",
    version="1.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://airbnb-room-type-predictor-phi.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




# Load trained model
model = joblib.load("random_forest_model.pkl")


class AirbnbInput(BaseModel):

    neighbourhood_group: Annotated[
        str,
        Field(..., examples=["Brooklyn"])
    ]

    neighbourhood: Annotated[
        str,
        Field(..., examples=["Williamsburg"])
    ]

    latitude: Annotated[
        float,
        Field(..., examples=[40.71602])
    ]

    longitude: Annotated[
        float,
        Field(..., examples=[-73.96248])
    ]

    price: Annotated[
        float,
        Field(..., examples=[130])
    ]

    minimum_nights: Annotated[
        int,
        Field(..., examples=[2])
    ]

    number_of_reviews: Annotated[
        int,
        Field(..., examples=[67])
    ]

    reviews_per_month: Annotated[
        float,
        Field(..., examples=[1.57])
    ]

    calculated_host_listings_count: Annotated[
        int,
        Field(..., examples=[3])
    ]

    availability_365: Annotated[
        int,
        Field(..., examples=[252])
    ]


@app.get("/")
def home():
    return {
        "message": "Airbnb Room Type Prediction API is running"
    }


@app.post("/predict")
def predict(data: AirbnbInput):

    input_data = pd.DataFrame([{
        "neighbourhood_group": data.neighbourhood_group,
        "neighbourhood": data.neighbourhood,
        "latitude": data.latitude,
        "longitude": data.longitude,
        "price": data.price,
        "minimum_nights": data.minimum_nights,
        "number_of_reviews": data.number_of_reviews,
        "reviews_per_month": data.reviews_per_month,
        "calculated_host_listings_count": data.calculated_host_listings_count,
        "availability_365": data.availability_365
    }])

    prediction = model.predict(input_data)

    return {
        "prediction": prediction[0]
    }