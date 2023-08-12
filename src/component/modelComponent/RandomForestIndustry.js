import useParamStyle from "../../hook/useParamStyle";
import {Divider} from "antd";
import {useState} from "react";
import useSlide from "../../hook/useSlide";
import useCPU from "../../hook/useCPU";
import UseMultipleInput from "../../hook/useMultipleInput";

function RandomForest(props){
    const [Paramselection,value] = useParamStyle("Random Forest")

    const [n_estimators,setN_estimators] = useState([])
    const n_estimatorsSelect = UseMultipleInput(n_estimators,setN_estimators)

    const [max_depth,setMax_depth] = useState([])
    const max_depthSelect = UseMultipleInput(max_depth,setMax_depth)

    const [n_jobs, setN_jobs] = useState(1);
    const n_jobsSelect = useCPU(setN_jobs)

    const {getParamList} = props
    getParamList({name:"randomForest",n_estimators:n_estimators,max_depth:max_depth,n_jobs:n_jobs})

    function customized(){
        return(
            <>
                n_estimators (The number of trees in the forest):
                {n_estimatorsSelect}
                max_depth (The maximum depth of the tree):
                {max_depthSelect}
                {n_jobsSelect}
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

export default RandomForest