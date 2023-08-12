import {Select} from "antd";

export default function UseMultipleInput(param,setParam){

    const handleChange = (value) => {
        setParam(value)
    };
    return (
        <Select
            mode="tags"
            style={{
                width: '100%',
            }}
            onChange={handleChange}
            tokenSeparators={[',']}
        />
    )
}