import {Space, Table, Tag} from "antd";
import MatchDataset from "./matchDataset";

export default function DatasetMatch(jsontest){
    const [data,columns,numberList,firstNumber]= MatchDataset(jsontest)

    return[
        <Table
            columns={columns}
            dataSource={data}
            pagination={false}
        />,
        numberList,
        firstNumber
    ]
}