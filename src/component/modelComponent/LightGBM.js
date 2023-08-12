import useParamStyle from "../../hook/useParamStyle";
import {Divider} from "antd";
import {useState} from "react";
import useSlide from "../../hook/useSlide";
import useCPU from "../../hook/useCPU";

function LightGBM(props){
    const [Paramselection,value] = useParamStyle("LightGBM")

    const [n_estimators,setN_estimators] = useState(100)
    const n_estimatorsSelect = useSlide(n_estimators,setN_estimators,50,500,100,1)

    const [max_depth,setMax_depth] = useState(-1)
    const max_depthSelect = useSlide(max_depth,setMax_depth,-1,15,-1,1)

    const [learning_rate,setLearning_rate] = useState(0.1)
    const learning_rateSelect = useSlide(learning_rate,setLearning_rate,0,1,0.1,0.01)

    const [num_leaves,setNum_leaves] = useState(31)
    const num_leavesSelect = useSlide(num_leaves,setNum_leaves,0,100,31,1)

    const [min_child_weight,setMin_child_weight] = useState(0.001)
    const min_child_weightSelect = useSlide(min_child_weight,setMin_child_weight,0,20,0.001,0.001)

    const [subsample,setSubsample] = useState(1)
    const subsampleSelect = useSlide(subsample,setSubsample,0,1,1,0.1)

    const [colsample_bytree,setColsample_bytree] = useState(1)
    const colsample_bytreeSelect = useSlide(colsample_bytree,setColsample_bytree,0,1,1,0.1)



    const {getParamList} = props
    getParamList({name:"LightGBM",n_estimators:n_estimators,max_depth:max_depth,learning_rate:learning_rate,min_child_weight:min_child_weight,subsample:subsample,colsample_bytree:colsample_bytree,num_leaves:num_leaves})

    function customized(){
        return(
            <>
                n_estimators (The number of trees in the forest):
                {n_estimatorsSelect}
                max_depth (The maximum depth of the tree):
                {max_depthSelect}
                learning_rate (Step size shrinkage used in update to prevents overfitting):
                {learning_rateSelect}
                num_leaves (max number of leaves in one tree):
                {num_leavesSelect}
                min_child_weight (Minimum sum of instance weight (hessian) needed in a child):
                {min_child_weightSelect}
                subsample (Subsample ratio of the training instances):
                {subsampleSelect}
                colsample_bytree (is the subsample ratio of columns when constructing each tree):
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

export default LightGBM