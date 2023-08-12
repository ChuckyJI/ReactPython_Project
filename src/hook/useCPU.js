import {Radio} from "antd";

function useCPU(setN_jobs){
    return(
        <>
            n_jobs (CPU Efficiency):
            <Radio.Group onChange={(e) => setN_jobs(e.target.value)}>
                <Radio value={-1}>All CPU Core</Radio>
                <Radio value={1}>Single Core</Radio>
            </Radio.Group>
            <br/>
        </>
    )
}

export default useCPU
