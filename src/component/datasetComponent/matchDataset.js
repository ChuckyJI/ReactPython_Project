export default function MatchDataset(jsontest2){
    const columns = [
        {
            title: 'Number',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Dataset1',
            dataIndex: 'dataset1',
            key: 'dataset1',
        },
        {
            title: 'Dataset2',
            dataIndex: 'dataset2',
            key: 'dataset2',
        },
        {
            title: 'Dataset3',
            dataIndex: 'dataset3',
            key: 'dataset3',
        },
        {
            title: 'Dataset4',
            dataIndex: 'dataset4',
            key: 'dataset4',
        },
        {
            title: 'Dataset5',
            dataIndex: 'dataset5',
            key: 'dataset5',
        },
    ];

    const dataSet1Ori = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach','exang', 'oldpeak', 'slope', 'ca', 'thal','','','','','']
    const dataSet1Current = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach','exang', 'oldpeak', 'slope', 'ca', 'thal','','','','','']
    const dataSet2Ori = ['male','age','education','currentSmoker','cigsPerDay','BPMeds','prevalentStroke','prevalentHyp','diabetes','totChol','sysBP','diaBP','BMI','heartRate','glucose','','','']
    const dataSet2Current = ['sex','age','education','currentSmoker','cigsPerDay','BPMeds','prevalentStroke','prevalentHyp','diabetes','chol','trestbps','diaBP','BMI','thalach','glucose','','','']
    const dataSet3Ori = ['age', 'gender', 'height', 'weight', 'ap_hi', 'ap_lo','cholesterol', 'gluc', 'smoke', 'alco', 'active','','','','','','']
    const dataSet3Current = ['age', 'sex', 'height', 'weight', 'trestbps', 'diaBP','cholesterol', 'fbs', 'currentSmoker', 'alco', 'active','','','','','','']
    const dataSet4Ori = ['BMI', 'Smoking', 'AlcoholDrinking', 'Stroke','PhysicalHealth', 'MentalHealth', 'DiffWalking', 'Sex', 'AgeCategory','Race', 'Diabetic', 'PhysicalActivity', 'GenHealth', 'SleepTime','Asthma', 'KidneyDisease', 'SkinCancer','']
    const dataSet4Current = ['BMI', 'currentSmoker', 'alco', 'prevalentStroke','PhysicalHealth', 'MentalHealth', 'DiffWalking', 'sex', 'age','Race', 'diabetes', 'active', 'GenHealth', 'SleepTime','Asthma', 'KidneyDisease', 'SkinCancer','']
    const dataSet5Ori = ['General_Health', 'Checkup', 'Exercise', 'Skin_Cancer','Other_Cancer', 'Depression', 'Diabetes', 'Arthritis', 'Sex','Age_Category', 'Height_(cm)', 'Weight_(kg)', 'BMI', 'Smoking_History','Alcohol_Consumption', 'Fruit_Consumption','Green_Vegetables_Consumption', 'FriedPotato_Consumption']
    const dataSet5Current = ['General_Health', 'Checkup', 'active', 'SkinCancer','Other_Cancer', 'Depression', 'diabetes', 'Arthritis', 'sex','age', 'height', 'weight', 'BMI', 'currentSmoker','Alcohol_Consumption', 'Fruit_Consumption','Green_Vegetables_Consumption', 'FriedPotato_Consumption']

    function dataDetails(number){
        return(
            {
                key: number.toString(),
                number:number,
                dataset1:Object.keys(jsontest2).includes(dataSet1Current[number-1])?<span style={{color:"red"}}>{dataSet1Ori[number-1]}</span>:<span>{dataSet1Ori[number-1]}</span>,
                dataset2:Object.keys(jsontest2).includes(dataSet2Current[number-1])?<span style={{color:"red"}}>{dataSet2Ori[number-1]}</span>:<span>{dataSet2Ori[number-1]}</span>,
                dataset3:Object.keys(jsontest2).includes(dataSet3Current[number-1])?<span style={{color:"red"}}>{dataSet3Ori[number-1]}</span>:<span>{dataSet3Ori[number-1]}</span>,
                dataset4:Object.keys(jsontest2).includes(dataSet4Current[number-1])?<span style={{color:"red"}}>{dataSet4Ori[number-1]}</span>:<span>{dataSet4Ori[number-1]}</span>,
                dataset5:Object.keys(jsontest2).includes(dataSet5Current[number-1])?<span style={{color:"red"}}>{dataSet5Ori[number-1]}</span>:<span>{dataSet5Ori[number-1]}</span>,
            }
        )
    }

    function calculateSum(datasetList){
        let count = 0
        for(let i=0;i<datasetList.length;i++){
            if(Object.keys(jsontest2).includes(datasetList[i])){
                count ++;
            }
        }
        return count
    }

    const data = Array.from({ length: 18 }, (_, i) => dataDetails(i+1));
    data.push({
            key:'19',
            number:<span style={{color:"red",fontSize:"18px"}}>Match</span>,
            dataset1:<span style={{color:"red",fontSize:"18px"}}>{calculateSum(dataSet1Current)}</span>,
            dataset2:<span style={{color:"red",fontSize:"18px"}}>{calculateSum(dataSet2Current)}</span>,
            dataset3:<span style={{color:"red",fontSize:"18px"}}>{calculateSum(dataSet3Current)}</span>,
            dataset4:<span style={{color:"red",fontSize:"18px"}}>{calculateSum(dataSet4Current)}</span>,
            dataset5:<span style={{color:"red",fontSize:"18px"}}>{calculateSum(dataSet5Current)}</span>,
        }
    )

    function findMaxIndexArray(array) {
        const maxValue = Math.max(...array);
        const maxValueIndices = [];

        for (let i = 0; i < array.length; i++) {
            if (array[i] === maxValue) {
                maxValueIndices.push(i + 1);
            }
        }

        return maxValueIndices;
    }

    const datasetNumber= findMaxIndexArray([
        calculateSum(dataSet1Current),
        calculateSum(dataSet2Current),
        calculateSum(dataSet3Current),
        calculateSum(dataSet4Current),
        calculateSum(dataSet5Current)
    ]);

    const firstNumber = calculateSum(dataSet1Current)

    return [data,columns,datasetNumber,firstNumber]
}