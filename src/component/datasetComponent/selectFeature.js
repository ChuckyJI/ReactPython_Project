import React, { useEffect, useState} from "react";
import {Transfer} from "antd";
import {TransferDirection} from "antd/es/transfer";
import {jsontest2} from "../../testDataset";

function SelectFeature(standardtest , jsontesttest){
    const [mockData, setMockData] = useState([]);
    const [targetKeys, setTargetKeys] = useState([]);
    const [afterFeature,setAfterFeature] = useState([])

    const jsontestlist = []
    if(jsontesttest===undefined){
        jsontestlist.push(standardtest)
    }
    else{
        jsontestlist.push(jsontesttest)
    }
    const jsontest = jsontestlist[0]


    const getMock = () => {
        const tempTargetKeys = [];
        const tempMockData = [];
        for (let i = 0; i < (jsontest && Object.keys(jsontest).length); i++) {
            const data = {
                key: i.toString(),
                title: jsontest && Object.keys(jsontest)[i],
                value: jsontest[jsontest && Object.keys(jsontest)[i]],
            };
            tempMockData.push(data);
        }
        setMockData(tempMockData);
        setTargetKeys(tempTargetKeys);
    };

    useEffect(() => {
        getMock()
    },[jsontesttest]);

    const filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;

    const handleChange = (newTargetKeys) => {
        setTargetKeys(newTargetKeys)
        createAfterFeature(newTargetKeys)
    };

    const handleSearch = (dir: TransferDirection, value: string) => {
        console.log('search:', dir, value);
    };

    const createAfterFeature =(targetKeysList)=>{
        const tempAfterFeature = []
        for(let i=0;i<targetKeysList.length;i++){
            const data = {
                title: Object.keys(jsontest)[parseInt(targetKeysList[i],10)],
                value: jsontest[Object.keys(jsontest)[parseInt(targetKeysList[i],10)]],
            }
            tempAfterFeature.push(data)
        }
        setAfterFeature(tempAfterFeature)
    }



    return[
        <Transfer
            dataSource={mockData}
            showSearch
            filterOption={filterOption}
            targetKeys={targetKeys}
            listStyle={{
                width: 1000,
                height: 500,
            }}
            onChange={handleChange}
            onSearch={handleSearch}
            render={(item) => item.title}
        />,
        afterFeature,
    ]
}

export default SelectFeature