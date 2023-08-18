import {Button, Checkbox, Col, Row, Switch} from "antd";
import {useEffect, useState} from "react";

export default function ElementFilter(data){

    const checkedValueList = []
    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
        checkedValueList.push(checkedValues)
    };

    const finalOutputData = []
    const selectFilter=()=>{
        for(let i = 0;i<data.length;i++){
            let nameList = data[i]['name']
            for(let j = 0;j<checkedValueList.length;j++){
                if(nameList.includes(checkedValueList[checkedValueList.length-1][j])){
                    finalOutputData.push(data[i])
                    break;
                }
            }
        }
        console.log(finalOutputData)
    }

    return[
        <div>
            <Checkbox.Group
                style={{
                    width: '100%',
                }}
                onChange={onChange}
                defaultValue={["Logistic","SVC","Random Forest"]}
            >
                <Row>
                    <Col span={1}></Col>
                    <Col span={3}>
                        <Checkbox value="Logistic">Logistic</Checkbox>
                    </Col>
                    <Col span={3}>
                        <Checkbox value="SVC">SVM</Checkbox>
                    </Col>
                    <Col span={3}>
                        <Checkbox value="Random Forest">Random Forest</Checkbox>
                    </Col>
                    <Col span={3}>
                        <Checkbox value="XGBoost">XGBoost</Checkbox>
                    </Col>
                    <Col span={3}>
                        <Checkbox value="LightGBM">LightGBM</Checkbox>
                    </Col>
                    <Col span={3}>
                        <Checkbox value="CatBoost">CatBoost</Checkbox>
                    </Col>
                    <Col span={3}>
                        <Checkbox value="Neural Network">Neural Network</Checkbox>
                    </Col>

                </Row>
            </Checkbox.Group>
            <Row style={{display:"flex",justifyContent:"end",alignItems:"end"}}>
                <Button onClick={selectFilter} type="primary">Filter Models</Button>
            </Row>
        </div>,
        finalOutputData
    ]
}