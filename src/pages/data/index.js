import {Button, Card, Col, Divider, Radio, Row} from "antd";
import React, {useEffect, useState} from "react";
import SelectFeature from '../../component/datasetComponent/selectFeature'
import DatasetMatch from "../../component/datasetComponent/datasetMatch";
import {jsontest2} from "../../testDataset";
import InputDataExplanation from "../../component/datasetComponent/inputDataExplanation";
import ImportDataGroup from "../../component/datasetComponent/importDataGroup";

export default function Data(props){
    const [jsontest,setJsontest] = useState([])
    const [ImportDataGroupView,jsontest1] = ImportDataGroup()
    const [targetFeatureSample , setTargetFeatureSample] = useState([])

    function importData(){
        setJsontest(JSON.parse(jsontest1).recordFeatures)
        setTargetFeatureSample(JSON.parse(jsontest1).recordFeatures)
    }

    const [SelectFeatureInterface , targetFeature] = SelectFeature(jsontest2,targetFeatureSample)
    const transformedData = {};
    targetFeature && targetFeature.forEach(item => {transformedData[item.title] = item.value;});

    const dataType = []
    const confirmDataset = (e) => {
        dataType.push(e.target.value)
    };

    const [status, setStatus] = useState(false)

    const passValue =()=>{
        const resultDataset = dataType[dataType.length-1]
        const resultData = transformedData
        resultData["dataType"]=resultDataset
        const finalResult = JSON.stringify(resultData)
        setStatus(true)

        const {getWholeData} = props
        getWholeData({data:finalResult,process:0.5})
    }

    return(
        <div style={{lineHeight:3}}>
            <span className='titleStyle'>Step 1: Import data</span>
            <Button
                className="sideBarButtonImportButton"
                type="primary"
                onClick={importData}
                disabled={!jsontest1}
            >Import Data</Button>
            {ImportDataGroupView}
             <div>
                 <span style={{fontSize:"16px"}}>The original Data (Preview):</span>
                 <br/>
                 {jsontest1}
             </div>
            <Divider/>
            <span className='titleStyle'>Step 2: Display data</span>
            <Card
                title="Current data"
                bordered={false}
                style={{
                    width: "100%",
                }}>
                {InputDataExplanation(jsontest)}
            </Card>
            <span className='titleStyle'>Step 3: Match dataset
                <span style={{color:"black",fontSize:"12px"}}>(eg: <span style={{color:"red"}}>Feature Matching</span>, Feature Not matching)</span>
            </span>
            {DatasetMatch(jsontest)[0]}
            <span className='titleStyle'>Step 4: Select data</span>
            {SelectFeatureInterface}
            <span className='titleStyle'>Step 5: Adjusted dataset</span>
            {DatasetMatch(transformedData)[0]}
            <span className='titleStyle'>Step 6: Confirm training dataset</span>
            <br/>
            {(DatasetMatch(transformedData)[1].length===5 && DatasetMatch(transformedData)[2]===0)? null:(
                <div>
                    {DatasetMatch(transformedData)[1].length===1?(
                        <div>
                            <span style={{color:"red",fontSize:"20px"}}>{DatasetMatch(transformedData)[1].length}</span> model is suitable for training.
                            <br/>
                        </div>
                    ):(
                        <div>
                            <span style={{color:"red",fontSize:"20px"}}>{DatasetMatch(transformedData)[1].length}</span> models are suitable for training.
                            <br/>
                        </div>
                    )}
                    <Radio.Group
                        onChange={confirmDataset}
                        style={{
                            marginTop: 16,
                        }}
                    >
                        <Radio.Button value="1" disabled={!DatasetMatch(transformedData)[1].includes(1)}>Dataset 1</Radio.Button>
                        <Radio.Button value="2" disabled={!DatasetMatch(transformedData)[1].includes(2)}>Dataset 2</Radio.Button>
                        <Radio.Button value="3" disabled={!DatasetMatch(transformedData)[1].includes(3)}>Dataset 3</Radio.Button>
                        <Radio.Button value="4" disabled={!DatasetMatch(transformedData)[1].includes(4)}>Dataset 4</Radio.Button>
                        <Radio.Button value="5" disabled={!DatasetMatch(transformedData)[1].includes(5)}>Dataset 5</Radio.Button>
                    </Radio.Group>
                </div>
                )
            }
            <Row style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Col>
                    <Button
                        type="primary"
                        disabled={(DatasetMatch(transformedData)[1].length===5 && DatasetMatch(transformedData)[2]===0)?true:null}
                        onClick={()=>passValue()}
                        loading={status}
                    >{!status?"Confirm the dataset":"Dataset Selection is Complete"}</Button>
                </Col>
            </Row>
        </div>
    )
}