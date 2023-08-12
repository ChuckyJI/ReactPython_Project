import useParamStyle from "../../hook/useParamStyle";
import {Divider} from "antd";
import {useState} from "react";
import useSlide from "../../hook/useSlide";
import useCPU from "../../hook/useCPU";
import UseMultipleInput from "../../hook/useMultipleInput";

function CatBoostIndustry(props){
    const [Paramselection,value] = useParamStyle("CatBoost")

    const [n_estimators,setN_estimators] = useState(500)
    const n_estimatorsSelect = UseMultipleInput(n_estimators,setN_estimators)

    const [depth,setDepth] = useState(6)
    const depthSelect = UseMultipleInput(depth,setDepth)

    const [learning_rate,setLearning_rate] = useState(0.3)
    const learning_rateSelect = UseMultipleInput(learning_rate,setLearning_rate)

    const [max_leaves,setMax_leaves] = useState(31)
    const max_leavesSelect = UseMultipleInput(max_leaves,setMax_leaves)

    const [subsample,setSubsample] = useState(1)
    const subsampleSelect = UseMultipleInput(subsample,setSubsample)


    const {getParamList} = props
    getParamList({name:"CatBoost",n_estimators:n_estimators,depth:depth,learning_rate:learning_rate,subsample:subsample,max_leaves:max_leaves})

    function customized(){
        return(
            <>
                n_estimators (The number of trees in the forest):
                {n_estimatorsSelect}
                max_depth (The maximum depth of the tree, for GPU≤8, for CPU≤16):
                {depthSelect}
                learning_rate (Step size shrinkage used in update to prevents overfitting):
                {learning_rateSelect}
                max_leaves (max number of leaves in one tree):
                {max_leavesSelect}
                subsample (Subsample ratio of the training instances):
                {subsampleSelect}
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

export default CatBoostIndustry