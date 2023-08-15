import {useEffect, useRef} from "react";
import * as echarts from "echarts";
import {Col, Divider, Row, Space, Table, Tag} from "antd";
import {compileString} from "sass";

export default function CalculateEachFunction(data){
    const newObjectList = []
    for(let i = 0;i<data.length;i++) {
        const newObject = {}
        const oldObject = data[i]
        newObject['name'] = JSON.parse(oldObject['name'].replace(/'/g, '"'))
        newObject['paramsList'] = JSON.parse(oldObject['paramsList'].replace(/'/g, '"'))
        newObject['result'] = parseInt(oldObject['result'], 10)
        newObject['resultList'] = JSON.parse(oldObject['resultList'].replace(/'/g, '"'))
        newObjectList.push(newObject)
    }

    const nameStat = [];
    const accuracyStat = [];
    const timeStat = [];

    function calculateEachModel(location,modelName){
        for(let i = 0;i<newObjectList.length;i++){
            for(let j = 0;j<newObjectList[i]['name'].length;j++){
                if(newObjectList[i]['name'][j]===modelName){
                    if(nameStat.includes(modelName)){
                        accuracyStat[location] += newObjectList[i]['resultList'][j]
                        timeStat[location] += 1
                    }
                    else{
                        nameStat[location] = (modelName)
                        accuracyStat[location] = (newObjectList[i]['resultList'][j])
                        timeStat[location] = 1
                    }
                }
            }
        }
        accuracyStat[location] = Math.exp(accuracyStat[location]/timeStat[location]*10)
    }

    calculateEachModel(0,"Logistic")
    calculateEachModel(1,"SVC")
    calculateEachModel(2,"Random Forest")
    calculateEachModel(3,"XGBoost")
    calculateEachModel(4,"LightGBM")
    calculateEachModel(5,"CatBoost")
    calculateEachModel(6,"Neural Network")

    const outputData = [
        {value:0,name:"Logistic"},
        {value:0,name:"SVC"},
        {value:0,name:"Random Forest"},
        {value:0,name:"XGBoost"},
        {value:0,name:"LightGBM"},
        {value:0,name:"CatBoost"},
        {value:0,name:"Neural Network"},
    ]
    for(let i =0;i<nameStat.length;i++){
        if(nameStat[i]!==undefined){
            outputData[i]['value']=accuracyStat[i].toFixed(4)
        }
    }

    const outputDataTime = [
        {value:0,name:"Logistic"},
        {value:0,name:"SVC"},
        {value:0,name:"Random Forest"},
        {value:0,name:"XGBoost"},
        {value:0,name:"LightGBM"},
        {value:0,name:"CatBoost"},
        {value:0,name:"Neural Network"},
    ]

    let sum = 0
    for(let i =0;i<nameStat.length;i++){
        if(nameStat[i]!==undefined){
            outputDataTime[i]['value']=timeStat[i]
            sum += timeStat[i]
        }
    }
    outputDataTime[nameStat.length] = {
        value: sum,
        itemStyle: {
            color: 'none',
            decal: {
                symbol: 'none'
            }
        },
        label: {
            show: false
        }
    }



    const domref = useRef()
    const domreftime = useRef()
    const charIIInt = ()=>{
        const myChart = echarts.init(domref.current);
        myChart.setOption(
            {
                legend: {
                    top: 'bottom'
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: false, readOnly: false },
                        restore: { show: false },
                        saveAsImage: { show: true }
                    }
                },
                series: [
                    {
                        name: 'Model Result',
                        type: 'pie',
                        radius: [50, 250],
                        center: ['50%', '50%'],
                        roseType: 'area',
                        itemStyle: {
                            borderRadius: 8
                        },
                        data: outputData
                    }
                ]
            }
        );
    }

    function BasicInformation(){
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Aggregated Accuracy',
                dataIndex: 'accuracy',
                key: 'accuracy',
            }
        ];
        const data = []
        for(let i = 0;i<accuracyStat.length;i++){
            const tempObject = {}
            tempObject['name']=outputDataTime[i]['name']
            tempObject['accuracy']=(Math.log(accuracyStat[i])/10).toFixed(4)
            data[i] = tempObject
        }

        return(
            <Table columns={columns} dataSource={data} pagination={false} />
        )
    }

    function BasicInformationTime(){
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Aggregated Frequency',
                dataIndex: 'frequency',
                key: 'frequency',
            }
        ];
        const data = []
        for(let i = 0;i<accuracyStat.length;i++){
            const tempObject = {}
            tempObject['name']=outputDataTime[i]['name']
            if(!timeStat[i]){
                tempObject['frequency']=0
            }
            else{
                tempObject['frequency']=timeStat[i]
            }

            data[i] = tempObject
        }

        console.log(timeStat)

        return(
            <Table columns={columns} dataSource={data} pagination={false} />
        )
    }

    const charIInt=()=>{
        const myChart = echarts.init(domreftime.current);
        myChart.setOption(
            {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: 'bottom',
                    left: 'center',
                    selectedMode: true
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: false, readOnly: false },
                        restore: { show: false },
                        saveAsImage: { show: true }
                    }
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        center: ['50%', '70%'],
                        startAngle: 180,
                        label: {
                            show: true,
                            formatter(param) {
                                return param.name + ' (' + param.percent * 2 + '%)';
                            }
                        },
                        data: outputDataTime
                    }
                ]
            }
        )
    }


    useEffect(() => {
        charIIInt()
        charIInt()
    });
    return (
        <>
            <span className="titleStyle">
                Accuracy View
            </span>
            <Divider/>
            <Row style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Col span={6}>
                    <BasicInformation/>
                </Col>
                <Col span={18}>
                    <div ref={domref} style={{height:"600px",width:"100%"}}></div>
                </Col>

            </Row>
            <Divider/>
            <span className="titleStyle">
                Frequency View
            </span>
            <Divider/>
            <Row style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Col span={6}>
                    <BasicInformationTime/>
                </Col>
                <Col span={18}>
                    <div ref={domreftime} style={{height:"600px",width:"100%"}}></div>
                </Col>
            </Row>
        </>

    )
}

