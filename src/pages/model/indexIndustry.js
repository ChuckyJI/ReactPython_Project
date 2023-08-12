import {Button, Checkbox, Col, Divider, Row} from "antd";
import {useState} from "react";
import LogisticRegressionIndustry from "../../component/modelComponent/LogisticRegressionIndustry";
import SVCIndustry from "../../component/modelComponent/SVCIndustry";
import RandomForestIndustry from "../../component/modelComponent/RandomForestIndustry";
import XGBoostIndustry from "../../component/modelComponent/XGBoostIndustry";
import LightGBMIndustry from "../../component/modelComponent/LightGBMIndustry";
import Catboost from "../../component/modelComponent/Catboost";
import CatboostIndustry from "../../component/modelComponent/CatboostIndustry";

function ModelMore(props){
    const [modelArray,setModelArray] = useState([])
    function selectModelNumber (checkedValues){
        setModelArray(checkedValues)
    }

    const [paramListtemp,] = useState([])
    const [paramList,] = useState([])
    const [status,setStatus] = useState(false)

    function getParamList(data){
        paramListtemp.push(data)
    }

    const ConfirmParamList = ()=>{
        if(modelArray.includes("A")){
            paramList.push(paramListtemp.filter(p=>p.name==='logistic')[paramListtemp.filter(p=>p.name==='logistic').length-1])
        }
        if(modelArray.includes("B")){
            paramList.push(paramListtemp.filter(p=>p.name==='svc')[paramListtemp.filter(p=>p.name==='svc').length-1])
        }
        if(modelArray.includes("C")){
            paramList.push(paramListtemp.filter(p=>p.name==='randomForest')[paramListtemp.filter(p=>p.name==='randomForest').length-1])
        }
        if(modelArray.includes("D")){
            paramList.push(paramListtemp.filter(p=>p.name==='XGBoost')[paramListtemp.filter(p=>p.name==='XGBoost').length-1])
        }
        if(modelArray.includes("E")){
            paramList.push(paramListtemp.filter(p=>p.name==='LightGBM')[paramListtemp.filter(p=>p.name==='LightGBM').length-1])
        }
        if(modelArray.includes("F")){
            paramList.push(paramListtemp.filter(p=>p.name==='CatBoost')[paramListtemp.filter(p=>p.name==='CatBoost').length-1])
        }
        setStatus(true)
        const paramListJson = JSON.stringify(paramList)

        const {getWholeModel} = props
        getWholeModel({model:paramListJson,process:0.5})
    }

    return(
        <div>
            <h2>Please select the models (Industry):</h2>
            {/* model selection*/}
            <Checkbox.Group
                style={{
                    width: '100%',
                    lineHeight:3,
                }}
                onChange={selectModelNumber}
            >
                <Row>
                    <Col span={8}>
                        <Checkbox value="A">Logistic Regression</Checkbox>
                    </Col>
                    <Col span={8}>
                        <Checkbox value="B">SVC</Checkbox>
                    </Col>
                    <Col span={8}>
                        <Checkbox value="C">Random Forest</Checkbox>
                    </Col>
                    <Col span={8}>
                        <Checkbox value="D">XGBoost</Checkbox>
                    </Col>
                    <Col span={8}>
                        <Checkbox value="E">LightGBM</Checkbox>
                    </Col>
                    <Col span={8}>
                        <Checkbox value="F">CatBoost</Checkbox>
                    </Col>
                </Row>
            </Checkbox.Group>
            <Row style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Col>
                    <Button
                        onClick={ConfirmParamList}
                        type="primary"
                        disabled={modelArray.length === 0}
                        loading={status?true:null}>
                        {status?"Model Selection is Complete":"Confirm the models"}
                    </Button>
                </Col>
            </Row>
            <Divider />
            {modelArray.includes('A')?<LogisticRegressionIndustry getParamList={getParamList}/>:null}
            {modelArray.includes('B')?<SVCIndustry getParamList={getParamList}/>:null}
            {modelArray.includes('C')?<RandomForestIndustry getParamList={getParamList}/>:null}
            {modelArray.includes('D')?<XGBoostIndustry getParamList={getParamList}/>:null}
            {modelArray.includes('E')?<LightGBMIndustry getParamList={getParamList}/>:null}
            {modelArray.includes('F')?<CatboostIndustry getParamList={getParamList}/>:null}
        </div>
    )
}

export default ModelMore