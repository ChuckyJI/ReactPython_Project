import useParamStyle from "../../hook/useParamStyle";
import {Divider} from "antd";
import {useState} from "react";
import useSlide from "../../hook/useSlide";
import useCPU from "../../hook/useCPU";

function CatBoost(props){
    const [Paramselection,value] = useParamStyle("CatBoost")

    const [n_estimators,setN_estimators] = useState(500)
    const n_estimatorsSelect = useSlide(n_estimators,setN_estimators,50,1000,500,1)

    const [depth,setDepth] = useState(6)
    const depthSelect = useSlide(depth,setDepth,2,16,6,1)

    const [learning_rate,setLearning_rate] = useState(0.3)
    const learning_rateSelect = useSlide(learning_rate,setLearning_rate,0,1,0.3,0.01)

    const [max_leaves,setMax_leaves] = useState(31)
    const max_leavesSelect = useSlide(max_leaves,setMax_leaves,0,64,31,1)

    const [subsample,setSubsample] = useState(1)
    const subsampleSelect = useSlide(subsample,setSubsample,0,1,1,0.1)


    const {getParamList} = props
    getParamList({name:"CatBoost",n_estimators:n_estimators,depth:depth,learning_rate:learning_rate,subsample:subsample,max_leaves:max_leaves})

    function customized(){
        return(
            <>
                n_estimators (The number of trees in the forest):
                {n_estimatorsSelect}
                max_depth (The maximum depth of the tree):
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

export default CatBoost