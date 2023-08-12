import {Divider, Radio,} from "antd";
import {createContext, useState} from "react";
import useSlide from "../../hook/useSlide";
import useParamStyle from "../../hook/useParamStyle";
import useCPU from "../../hook/useCPU";
import UseMultipleInput from "../../hook/useMultipleInput";


function LogisticRegression(props){
    const [Paramselection,value] = useParamStyle("Logistic Regression")

    const [n_jobs, setN_jobs] = useState(1);
    const n_jobsSelect = useCPU(setN_jobs)

    const [max_iter, setMax_iter] = useState([]);

    const Max_iterDOM = UseMultipleInput(max_iter,setMax_iter)

    const {getParamList} = props
    getParamList({name:"logistic",n_jobs:n_jobs,max_iter:max_iter})

    function customized(){
        return(
            <>
                {n_jobsSelect}
                Max_iter (Maximum number of iterations taken for the solvers to converge.):
                {Max_iterDOM}
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

export default LogisticRegression;