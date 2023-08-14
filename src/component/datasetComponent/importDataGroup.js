import {Button} from "antd";
import React, {useEffect, useState} from "react";
import axios from "axios";

export default function ImportDataGroup(){
    const [number , setNumber] = useState()
    function importData(e,number){
        setNumber(number)
    }

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://13.212.119.178:3005/api/data2')
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const buttons = [];
    for (let i = 0; i < data.length; i++) {
        buttons.push(
            <Button
                key={i}
                className="sideBarButtonImportButton"
                type="primary"
                onClick={(e) => importData(e,i+1)}
            >
                Test Data {i + 1}
            </Button>
        );
    }



    const newObject = data.find(p=>p.id===number)
    const outputresult = newObject && newObject.jsonData

    return [
        <div>
            {buttons}
        </div>,
        outputresult
    ]
}