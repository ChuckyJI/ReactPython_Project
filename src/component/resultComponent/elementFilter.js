import {Col, Row, Switch} from "antd";
import {useState} from "react";

export default function ElementFilter(data){

    const [modelPortfolio,setModelPortfolio] = useState([])
    const onChangeLogistic = (checked) => {
        if(checked){
            setModelPortfolio([...modelPortfolio,"Logistic"])
        }
        else{

        }
    };
    return(
        <div>
            {modelPortfolio}
            <Row>
                <Col span={3}>
                    Logistic <Switch defaultChecked onChange={onChangeLogistic}/>
                </Col>
                <Col span={3}>
                    SVC <Switch defaultChecked onChange={onChangeLogistic} />
                </Col>
                <Col span={3}>
                    Random Forest <Switch defaultChecked onChange={onChangeLogistic} />
                </Col>
                <Col span={3}>
                    XGBoost <Switch defaultChecked onChange={onChangeLogistic} />
                </Col>
            </Row>
        </div>
    )
}