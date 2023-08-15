import {useEffect, useRef, useState} from "react";
import axios from "axios";
import * as echarts from 'echarts';
import CalculateEachFunction from "../../component/resultComponent/calculateEachFunction";

export default function Analysis(){
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3005/api/data')
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return(
        <div>
            {CalculateEachFunction(data)}
        </div>
    )
}