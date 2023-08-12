import {Divider, Radio} from "antd";
import {useState} from "react";

function useParamStyle(modelname){
    const [value, setValue] = useState(1);
    return[
        <>
            <span className="titleStyle">{modelname} Parameters Selection:</span>
            <br/>
            <Radio.Group onChange={(e)=>setValue(e.target.value)}>
                <Radio value={1}>Default</Radio>
                <Radio value={2}>Customized</Radio>
            </Radio.Group>
            <br/>
        </>
        ,value
    ]
}
export default useParamStyle