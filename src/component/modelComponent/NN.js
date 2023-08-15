import useParamStyle from "../../hook/useParamStyle";
import {Divider, notification, Select} from "antd";
import {useEffect, useMemo, useState} from "react";
import useSlide from "../../hook/useSlide";
import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';

const Context = React.createContext({
    name: 'Default',
});

function NN(props){
    const [Paramselection,value] = useParamStyle("Neural Network")

    const [layer,setLayer] = useState({"users":[{"layers":"128","function":"relu"},{"layers":"64","function":"relu"}]},{"layers":"32","function":"relu"})
    const onFinish = (values: any) => {
        setLayer(values)
    };

    const [optimizer,setOptimizer] = useState("Adam")
    const optimizerSelect = (data) => {
        setOptimizer(data)
    }

    const [lossFunciton,setLossFunciton] = useState("categorical_crossentropy")
    const lossFunctionSelect = (data) => {
        setLossFunciton(data)
    }

    const [epochs,seteEpochs] = useState(50)
    const seteEpochsSelect = useSlide(epochs,seteEpochs,10,500,50,1)

    const [earlyStopingStep,setEarlyStopingStep] = useState(10)
    const earlyStopingStepSelect = useSlide(earlyStopingStep,setEarlyStopingStep,5,50,10,1)


    const {getParamList} = props
    getParamList({name:"NN",epochs:epochs,earlyStopingStep:earlyStopingStep,layer:layer,optimizer:optimizer,lossFunciton:lossFunciton})

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement) => {
        api.info({
            message: `${placement}`,
            description: <Context.Consumer>{({ name,layerSelect }) => `The ${name} are generated successfully.`}</Context.Consumer>,
            placement,
        });
    };
    const contextValue = useMemo(
        () => ({
            name: 'customized layers',
        }),
        [],
    );

    const [statusButtonLayer, setStatusButtonLayer] = useState(false)
    function confirmSelectLayers(){
        setStatusButtonLayer(true)
    }

    function Customized(){
        return(
            <>
                <Context.Provider value={contextValue}>
                    {contextHolder}
                Step 1: Confirm the layer of Neural Network <br/>
                <span style={{fontSize:"12px"}}>
                    Hint:<br/>
                    1. Unit number must be greater than 2.<br/>
                    2. Last step will automatically generate, no need to use softmax in the last layer.<br/>
                    3. Unit number should decrease as the layer number increase.<br/>
                </span>
                <Form
                    name="dynamic_form_nest_item"
                    onFinish={onFinish}
                    style={{ maxWidth: 600 }}
                    autoComplete="off"
                >
                    <Form.List name="users">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'layers']}
                                            rules={[{ required: true, message: 'Missing the number of unit' }]}
                                        >
                                            <Input placeholder="Number of unit" />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'function']}
                                            rules={[{ required: true, message: 'Missing activation function' }]}
                                            style={{width:"400px"}}
                                        >
                                            <Input placeholder="Activiation function: relu/sigmoid/tanh"/>
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => {add();confirmSelectLayers()}} block icon={<PlusOutlined />}>
                                        Add layer
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{width:"auto"}}
                            onClick={()=>openNotification('Neural Network Notification')}
                            disabled={!statusButtonLayer}
                        >
                            Submit the Layer
                        </Button>
                    </Form.Item>
                </Form>
                Step 2: Choose the optimizer <br/>
                <Space wrap>
                    <Select
                        defaultValue="Adam"
                        style={{
                            width: "auto",
                        }}
                        onChange={optimizerSelect}
                        options={[
                            {
                                value: 'Adam',
                                label: 'Adam: SGD based on adaptive estimation of first-order and second-order moments.',
                            },
                            {
                                value: 'SGD',
                                label: 'SGD: A basic optimizer that updates the models weights using the gradient of the loss function.',
                            },
                            {
                                value: 'rmsprop',
                                label: 'RMSprop: adapts the learning rate for each parameter based on the historical gradient information.'
                            },
                            {
                                value: 'adadelta',
                                label: 'Adadelta: An extension of Adagrad that aims to improve its limitations. '
                            },
                        ]}
                    />
                </Space><br/>
                Step 3: Choose the loss function <br/>
                <Space wrap>
                    <Select
                        defaultValue="categorical_crossentropy"
                        style={{
                            width: "auto",
                        }}
                        onChange={lossFunctionSelect}
                        options={[
                            {
                                value: 'categorical_crossentropy',
                                label: 'categorical_crossentropy: Computes the categorical crossentropy loss.',
                            },
                            {
                                value: 'mean_squared_error',
                                label: 'MSE: Computes the mean squared error between labels and predictions.',
                            },
                            {
                                value: 'binary_crossentropy',
                                label: 'binary_crossentropy: Computes the binary crossentropy loss.'
                            },
                        ]}
                    />
                </Space><br/>
                Step 4: Set the early stopping<br/>
                {earlyStopingStepSelect}
                Step 5: Choose the number of epochs<br/>
                {seteEpochsSelect}
                </Context.Provider>
            </>
        )
    }

    return(
        <div className="lineHeight">
            {Paramselection}
            {value === 2?Customized():null}
            <Divider/>
        </div>
    )
}

export default NN