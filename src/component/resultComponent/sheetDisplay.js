import {Space, Table, Tag} from "antd";
import React, {useState} from "react";

export default function SheetDisplay(props,resList){

    const onSelectUUID= (data)=>{
        const { getUUIDNumber } = props
        getUUIDNumber(data)
    }

    const columns = [
        {
            title: 'Create time',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: 'Sample ID',
            dataIndex: 'sampleID',
            key: 'sampleID',
        },
        {
            title: 'Dataset',
            dataIndex: 'dataset',
            key: 'dataset',
        },
        {
            title: 'Model',
            key: 'model',
            dataIndex: 'model',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = "";
                        if (tag === 'Logistic') {
                            color = '#ffa39e';
                        }
                        if (tag === 'SVC') {
                            color = '#ffbb96';
                        }
                        if (tag === 'Random Forest') {
                            color = '#ffd591';
                        }
                        if (tag === 'XGBoost') {
                            color = '#69b1ff';
                        }
                        if (tag === 'LightGBM') {
                            color = '#f759ab';
                        }
                        if (tag === 'CatBoost') {
                            color = '#73d13d';
                        }
                        if (tag === 'Neural Network') {
                            color = '#9254de';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Result',
            dataIndex: 'result',
            key: 'result',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={()=>onSelectUUID(record.sampleID)}>Details</a>
                </Space>
            ),
        },
    ];

    function transformDateFormat(inputDate) {
        const parsedDate = new Date(inputDate);
        return parsedDate.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }).replace(',', '');
    }

    const newObjectList = []
    for(let i = 0;i<resList.length;i++){
        const newObject={}
        const oldObject = resList[i]
        newObject['dateTime'] = transformDateFormat(oldObject['dateTime'])
        newObject['name'] = JSON.parse(oldObject['name'].replace(/'/g, '"'))
        newObject['numberOfDataset'] = oldObject['numberOfDataset']
        newObject['paramsList'] = JSON.parse(oldObject['paramsList'].replace(/'/g, '"'))
        newObject['result'] = parseInt(oldObject['result'],10)
        newObject['resultList'] = JSON.parse(oldObject['resultList'].replace(/'/g, '"'))
        newObject['sampleID'] = oldObject['sampleID']
        newObject['jsonString'] = JSON.parse(oldObject['jsonString'].replace(/'/g, '"'))
        newObjectList.push(newObject)
    }

    const data = [];
    for (let i = 0; i < newObjectList.length; i++) {
        const res = newObjectList[i];
        const resultText = (res["result"] === 1) ? <span style={{ color: "red" }}>Dangerous</span> : "Normal";

        const newData = {
            createTime: res["dateTime"],
            sampleID: res["sampleID"],
            dataset: res["numberOfDataset"],
            tags: res["name"],
            result: resultText
        };

        data.push(newData);
    }

    return[
        <Table columns={columns} dataSource={data}/>,
        newObjectList
    ]
}