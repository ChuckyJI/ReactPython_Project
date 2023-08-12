import React, {useState} from "react";
import {Avatar, Card, Descriptions, Divider, List} from "antd";
import InputDataExplanation from "../datasetComponent/inputDataExplanation";

export default function GetInformation(getuuidList){
    const eachModel = []

    for(let i = 0;i<(getuuidList && getuuidList['name'].length);i++){
        if(getuuidList && getuuidList.paramsList[i].hasOwnProperty('name')){
            delete getuuidList.paramsList[i].name
        }

        const data={
            ModelName:getuuidList && getuuidList['name'][i],
            AccuracyScore:getuuidList && getuuidList['resultList'][i],
            ParamsList: JSON.stringify(getuuidList && getuuidList.paramsList[i]),
        }
        eachModel.push(data)
    }

    console.log(getuuidList && getuuidList['jsonString'])

    return (
        <Descriptions title="User Info" layout="vertical" bordered items={
            [
                {
                    key: '1',
                    label: 'Create time',
                    children: getuuidList&&getuuidList['dateTime'],
                },
                {
                    key: '2',
                    label: 'Sample ID',
                    children: getuuidList&&getuuidList['sampleID'],
                },
                {
                    key: '3',
                    label: 'Dataset',
                    children: getuuidList&&getuuidList['numberOfDataset'],
                },
                {
                    key: '4',
                    label: 'Model',
                    children:(
                        <>
                            <Card
                                bordered={false}
                                  style={{
                                      width: "100%",
                                  }}>
                                {InputDataExplanation(getuuidList && getuuidList['jsonString'])}
                            </Card>
                            <List
                                itemLayout="horizontal"
                                dataSource={[]&&eachModel}
                                renderItem={(item, index) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                                            title={<span style={{fontWeight:"bold"}}>{item.ModelName}</span>}
                                            description={
                                                <div>
                                                    Accuracy Score<br/>{item.AccuracyScore}<br/>
                                                    Param:<br/>{item.ParamsList}
                                                </div>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        </>
                    ),
                },
            ]
        } />
    )
}