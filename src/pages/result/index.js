import React, {useEffect, useState} from 'react';
import {Divider,} from 'antd';
import SheetDisplay from "../../component/resultComponent/sheetDisplay";
import GetInformation from "../../component/resultComponent/getInformation";
import axios from "axios";

export default function Result () {
    const [getUuid, setGetUuid] = useState("");

    const [getUuidlist,] = useState([])
    const getUUIDNumber = (data) =>{
        setGetUuid(data)
        getUuidlist.push(data)
    }

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://13.250.206.7:3306/api/data')
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    const lastUuid = getUuidlist[getUuidlist.length-1]
    const dataAfter = SheetDisplay({getUUIDNumber},data)[1]
    const passRes = dataAfter.find(p=>p.sampleID===lastUuid)


    return(
        <div>
            <span className="titleStyle">Result Sheet</span>
            {SheetDisplay({getUUIDNumber},data)[0]}
            <Divider/>
            <span className="titleStyle">Detail</span>
            {GetInformation(passRes)}
        </div>
    )
}