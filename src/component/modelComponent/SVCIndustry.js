import {Checkbox, Divider, Radio} from "antd";
import {useState} from "react";
import useParamStyle from "../../hook/useParamStyle";
import useSlide from "../../hook/useSlide";
import UseMultipleInput from "../../hook/useMultipleInput";

function SVC(props){
    const [Paramselection,value] = useParamStyle("SVC")
    const [kernel,setKernel] = useState([])

    const [degree,setDegree] = useState([])

    const degreeSlide = UseMultipleInput(degree,setDegree)

    const {getParamList} = props
    getParamList({name:"svc",kernel:kernel,degree:degree})

    function selectMultipleKernel(data){
        setKernel(data)
    }

    function customized(){
        return(
            <>
                Kernel type:
                <Checkbox.Group onChange={selectMultipleKernel} value={kernel}>
                    <Checkbox value={'linear'}>Linear</Checkbox>
                    <Checkbox value={'poly'}>Poly</Checkbox>
                    <Checkbox value={'rbf'}>RBF</Checkbox>
                    <Checkbox value={'sigmoid'}>Sigmoid</Checkbox>
                </Checkbox.Group>
                <br/>
                {kernel.includes('poly')?(<>Degree(Degree of the polynomial kernel function, Degree >=3 ):<br/> {degreeSlide}</>):null}
            </>
        )
    }

    return(
        <div className="lineHeight">
            {Paramselection}
            {value === 2?customized():null}
            <Divider/>
        </div>
    )
}

export default SVC;