import {Table} from "antd";

export default function LogRecording(dataOrigin){
    const columns = [
        {
            title: 'SampleID',
            dataIndex: 'sampleID',
            key: 'sampleID',
        },
        {
            title: 'Situation',
            dataIndex: 'situation',
            key: 'situation',
        }
    ];
    const data = []
    for(let i = 0;i<dataOrigin.length;i++){
        const tempObject = {}
        tempObject['sampleID'] = dataOrigin[i]['sampleID']
        tempObject['situation'] = dataOrigin[i]['logRecord']
        data.push(tempObject)
    }

    return(
        <Table columns={columns} dataSource={data} pagination={false}/>
    )
}