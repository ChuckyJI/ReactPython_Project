import useParamStyle from "../../hook/useParamStyle";
import {Divider} from "antd";
import {useState} from "react";
import useSlide from "../../hook/useSlide";
import useCPU from "../../hook/useCPU";
import UseMultipleInput from "../../hook/useMultipleInput";

function XGBoost(props){
    const [Paramselection,value] = useParamStyle("XGBoost")

    const [n_estimators,setN_estimators] = useState(100)
    const n_estimatorsSelect = UseMultipleInput(n_estimators,setN_estimators)

    const [max_depth,setMax_depth] = useState(6)
    const max_depthSelect = UseMultipleInput(max_depth,setMax_depth)

    const [learning_rate,setLearning_rate] = useState(0.3)
    const learning_rateSelect = UseMultipleInput(learning_rate,setLearning_rate)

    const [min_child_weight,setMin_child_weight] = useState(1)
    const min_child_weightSelect = UseMultipleInput(min_child_weight,setMin_child_weight)

    const [subsample,setSubsample] = useState(1)
    const subsampleSelect = UseMultipleInput(subsample,setSubsample)

    const [colsample_bytree,setColsample_bytree] = useState(1)
    const colsample_bytreeSelect = UseMultipleInput(colsample_bytree,setColsample_bytree)

    const {getParamList} = props
    getParamList({name:"XGBoost",n_estimators:n_estimators,max_depth:max_depth,learning_rate:learning_rate,min_child_weight:min_child_weight,subsample:subsample,colsample_bytree:colsample_bytree})

    console.log(getParamList)

    function customized(){
        return(
            <>
                n_estimators (The number of trees in the forest):
                {n_estimatorsSelect}
                max_depth (The maximum depth of the tree):
                {max_depthSelect}
                learning_rate (Step size shrinkage used in update to prevents overfitting, 0 ~ 1 ):
                {learning_rateSelect}
                min_child_weight (Minimum sum of instance weight (hessian) needed in a child):
                {min_child_weightSelect}
                subsample (Subsample ratio of the training instances, 0 ~ 1):
                {subsampleSelect}
                colsample_bytree (is the subsample ratio of columns when constructing each tree, 0 ~ 1):
                {colsample_bytreeSelect}
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

export default XGBoost