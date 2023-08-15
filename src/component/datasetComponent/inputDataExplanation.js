import {Table} from "antd";

const explanation = {
    age: 'the patient current age',
    sex: 'gender (1: male, 0: female)',
    cp: 'chest pain type (1: serious -> 4: asymptomatic)',
    trestbps: 'resting blood pressure',
    chol: 'serum cholestoral in mg/dl',
    fbs: 'fasting blood sugar (1: high blood sugar or real number)',
    restecg: 'resting electrocardiographic results (0: normal)',
    thalach: 'maximum heart rate achieved',
    exang: 'maximum heart rate achieved (0: normal)',
    oldpeak: 'maximum heart rate achieved',
    slope: 'maximum heart rate achieved (1: upsloping, 2: flat, 3: downsloping)',
    ca: 'number of major vessels (0-3) colored by fluoroscopy',
    thal: '0 = normal; 1 = fixed defect; 2 = reversible defect',
    education: '1: Less than High School and High School degrees. 2: College Degree .3: Master Degree. 4: PhD',
    currentSmoker: '“1”, means “Yes”, “0” means “No”',
    cigsPerDay: 'number of cigs',
    BPMeds: 'whether or not the patient was on blood pressure medication (0: no)',
    prevalentStroke: 'whether or not the patient had previously had a stroke (0: no)',
    prevalentHyp: 'whether or not the patient had previously had a stroke (0: no)',
    diabetes: 'whether or not the patient had previously had a stroke (0: no)',
    diaBP: 'diastolic blood pressure (Continuous)',
    BMI: 'Body Mass Index (Continuous)',
    glucose: 'glucose level (Continuous)',
    height: 'the patient height (cm)',
    weight: 'the patient weight (kg)',
    cholesterol: '"1: normal 2: above normal 3: well above normal"',
    alco: 'whether drink Alcohol',
    active: 'exercise-induced angina',
    PhysicalHealth: 'how many days during the past 30 days was your physical health not good? (0-30 days)',
    MentalHealth: 'how many days during the past 30 days was your physical health not good? (0-30 days)',
    DiffWalking: 'Do you have serious difficulty walking or climbing stairs?',
    Race: '1: white 2: African 3: Asian 4: American Indian/Alaskan Native 5: Other 6: Hispanic',
    SleepTime: 'total time in sleeping',
    Asthma: '1: yes, 0: no',
    KidneyDisease: '1: yes, 0: no',
    SkinCancer: '1: yes, 0: no',
    GenHealth: '1: Poor 2: Fair 3: Good 4: Very good 5: Excellent',
    General_Health: '1: Poor 2: Fair 3: Good 4: Very good 5: Excellent',
    Checkup: '0: Never 1: Within the past year 2: Within the past 2 years 3: Within the past 5 years 4: 5 or more years ago',
    Other_Cancer: '1: yes, 0: no',
    Depression: '1: yes, 0: no',
    Arthritis: '1: yes, 0: no',
    Alcohol_Consumption: 'How much do you spend per day?',
    Fruit_Consumption: 'How much do you spend per day?',
    Green_Vegetables_Consumption: 'How much do you spend per day?',
    FriedPotato_Consumption: 'How much do you spend per day?',
};

export default function InputDataExplanation(jsontest2){
    const jsontest= jsontest2

    const columns = [
        {
            title: 'Number',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Parameter',
            dataIndex: 'parameter',
            key: 'parameter',
        },
        {
            title: 'Explanation',
            dataIndex: 'explanation',
            key: 'explanation',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
        },
    ];

    const inputList = []
    for(let i =0;i<(jsontest && Object.keys(jsontest).length);i++){
        const data = {
            key: `${i}`,
            number:i+1,
            parameter: jsontest && Object.keys(jsontest)[i],
            explanation: explanation[jsontest && Object.keys(jsontest)[i]],
            value: jsontest && Object.values(jsontest)[i],
        }
        inputList.push(data)
    }


    return(
        <Table columns={columns} dataSource={inputList} pagination={false}/>
    )
}

