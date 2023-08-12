const getJson = {
    "id": "sampleIDString",
    "patientId": "string",
    "date": "2023-08-09T09:46:39.676Z",
    "recordFeatures": {
        "sex": 0,
        "age": 43,
        "education": 2,
        "currentSmoker": 0,
        "cigsPerDay": 0,
        "BPMeds": 0,
        "prevalentStroke": 0,
        "prevalentHyp": 0,
        "diabetes": 0,
        "chol": 247,
        "trestbps": 131,
        "diaBP": 88,
        "BMI": 27.64,
        "thalach": 72,
        "glucose": 61,
        "KidneyDisease":1
    }
}
const jsontest1 = JSON.stringify(getJson["recordFeatures"])
const jsontest2 = JSON.parse(jsontest1)

export  {jsontest2,getJson}

