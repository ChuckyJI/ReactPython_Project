import {Anchor, Button, Col, Pagination, Popconfirm, Row, Select, Space, Table, Tag} from "antd";
import React, {useState} from "react";
import axios from "axios";
export default function SheetDisplay(props,resList){

    const onSelectUUID= (data)=>{
        const { getUUIDNumber,_ } = props
        getUUIDNumber(data)
    }

    const prepareData = []
    const [status,setStatus] = useState(true)
    const showTestData= (data)=>{
        prepareData.push(resList.find((p)=>p.sampleID===data.sampleID))
        let finalData = {}
        finalData=prepareData[prepareData.length-1].jsonString
        finalData=finalData.slice(0,-1)+" ,'dataType':"+prepareData[prepareData.length-1].numberOfDataset.substring(8)+"}"
        // finalData=finalData.replace(/'/g, '"')
        // const finalDataVersion = JSON.stringify(finalData)

        console.log(finalData)
        setStatus(false)

        const { _,getWholeData } = props
        getWholeData({data:finalData,process:0.5})
    }

    const handleScrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const deleteRecord = async (data) => {
        const url = 'http://13.250.206.7:3010/deleteRecord';
        const sampleIdDelete = data.sampleID
        try {
            await axios.post(url, sampleIdDelete, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
        }

        window.location.href = "/home/result"
    };

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
                <Row>
                    <Col span={8}>
                        <Button block>
                            <Anchor
                                onClick={()=>{onSelectUUID(record.sampleID);handleScrollToSection('details')}}
                                affix={false}
                                items={[
                                    {
                                        key: '1',
                                        href: '#Details',
                                        title: 'Details',
                                    },
                                ]}
                            />
                        </Button>
                    </Col>

                    <Col span={8}>
                        <Button type="primary" style={{width:"100%"}} onClick={()=>showTestData(record)} loading={!status}>Redo</Button>
                    </Col>

                    <Col span={8}>
                        <Popconfirm
                            title="Delete the record"
                            description="Are you sure to delete this record? This operation is permanent."
                            okText="Yes"
                            cancelText="No"
                            onConfirm={()=>deleteRecord(record)}
                        >
                            <Button danger >Delete</Button>
                        </Popconfirm>

                    </Col>
                </Row>
            )
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
        <Table columns={columns} dataSource={data} pagination={{defaultPageSize:"25"}}/>,
        newObjectList,
        prepareData
    ]
}