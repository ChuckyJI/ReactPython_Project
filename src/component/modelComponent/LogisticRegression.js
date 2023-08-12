import {Divider, Radio,} from "antd";
import {createContext, useState} from "react";
import useSlide from "../../hook/useSlide";
import useParamStyle from "../../hook/useParamStyle";
import useCPU from "../../hook/useCPU";


function LogisticRegression(props){
    const [Paramselection,value] = useParamStyle("Logistic Regression")

    const [n_jobs, setN_jobs] = useState(1);
    const n_jobsSelect = useCPU(setN_jobs)

    const [max_iter, setMax_iter] = useState(100);

    const Max_iterDOM = useSlide(max_iter,setMax_iter,20,200,100,1)

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