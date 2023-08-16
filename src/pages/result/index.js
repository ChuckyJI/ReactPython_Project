import React, {useEffect, useState} from 'react';
import {Anchor, BackTop, Button, Divider,} from 'antd';
import SheetDisplay from "../../component/resultComponent/sheetDisplay";
import GetInformation from "../../component/resultComponent/getInformation";
import axios from "axios";
import ElementFilter from "../../component/resultComponent/elementFilter";

export default function Result (props) {
    const [getUuid, setGetUuid] = useState("");

    const { getWholeData } = props

    const { Link } = Anchor;

    const [getUuidlist,] = useState([])
    const getUUIDNumber = (data) =>{
        setGetUuid(data)
        getUuidlist.push(data)
    }

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://13.250.206.7:3005/api/data')
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    const lastUuid = getUuidlist[getUuidlist.length-1]
    const dataAfter = SheetDisplay({getUUIDNumber},data)[1]
    const passRes = dataAfter.find(p=>p.sampleID===lastUuid)

    const handleScrollToStart = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return(
        <div>
            <div id="backToFront">
                <span className="titleStyle">Result Sheet</span>
                <Divider/>
                {/*<span className="lineHeight">*/}
                {/*    Model Filter:{ElementFilter(data)}<br/>*/}
                {/*    Patient Filter:<br/>*/}
                {/*    Dataset Filter:<br/>*/}
                {/*</span>*/}
                {/*<Divider/>*/}
                {SheetDisplay({getUUIDNumber,getWholeData},data)[0]}
            </div>
            <Divider/>

            <div id="Details">
                <span className="titleStyle">Detail</span>
                {GetInformation(passRes)}
                <br/>
                <Button block>
                    <Anchor
                        onClick={()=>handleScrollToStart('backToFront')}
                        affix={false}
                    >
                        <Link href="#backToFront" title="Back to Top"></Link>
                    </Anchor>
                </Button>
            </div>

        </div>
    )
}