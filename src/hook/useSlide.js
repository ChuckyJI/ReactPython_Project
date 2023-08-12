import {Col, InputNumber, Row, Slider} from "antd";

function useSlide (param,serParam,minNumber,maxNumber,defaultNumber,stepNumber) {
    const changeMaxIter = (newValue) => {
        serParam(newValue);
    };

    return (
        <Row>
            <Col span={12}>
                <Slider
                    min={minNumber}
                    max={maxNumber}
                    defaultValue={defaultNumber}
                    onChange={changeMaxIter}
                    step={stepNumber}
                    value={typeof param === 'number' ? param : 0}
                />
            </Col>
            <Col span={4}>
                <InputNumber
                    min={minNumber}
                    max={maxNumber}
                    defaultValue={defaultNumber}
                    style={{
                        margin: '0 16px',
                    }}
                    value={param}
                    step={stepNumber}
                    onChange={changeMaxIter}
                />
            </Col>
        </Row>
    )
}

export default useSlide