import {Divider, Radio} from "antd";
import {useState} from "react";
import useParamStyle from "../../hook/useParamStyle";
import useSlide from "../../hook/useSlide";

function SVC(props){
    const [Paramselection,value] = useParamStyle("SVC")
    const [kernel,setKernel] = useState("rbf")

    const [degree,setDegree] = useState(kernel==='poly'?3:null)
    const degreeSlide = useSlide(degree,setDegree,3,10,3)

    const {getParamList} = props
    getParamList({name:"svc",kernel:kernel,degree:degree})

    function customized(){
        return(
            <>
                Kernel type:
                <Radio.Group onChange={(e) => setKernel(e.target.value)}>
                    <Radio value={'linear'}>Linear</Radio>
                    <Radio value={'poly'}>Poly</Radio>
                    <Radio value={'rbf'}>RBF</Radio>
                    <Radio value={'sigmoid'}>Sigmoid</Radio>
                </Radio.Group>
                <br/>
                {kernel==='poly'?(<>Degree(Degree of the polynomial kernel function):<br/> {degreeSlide}</>):null}
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