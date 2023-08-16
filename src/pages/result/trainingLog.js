import {useEffect, useState} from "react";
import axios from "axios";
import {Divider} from "antd";
import LogRecording from "../../component/resultComponent/logRecording";

export default function TrainingLog(){

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://13.250.206.7:3005/api/data3')
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    console.log(data)

    return(
        <div>
            <span className="titleStyle">
                Training Log View
            </span>
            <Divider/>
            {LogRecording(data)}
        </div>
    )
}