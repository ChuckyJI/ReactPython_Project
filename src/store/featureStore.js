import { makeAutoObservable} from 'mobx'
class FeatureStore{
    constructor() {
        makeAutoObservable(this)
    }

    createAfterFeature =(jsonList,targetKeysList)=>{
        let tempAfterFeature=[]
        for(let i=0;i<targetKeysList.length;i++){
            let data = {
                title: Object.keys(jsonList)[i],
                value: jsonList[Object.keys(jsonList)[i]],
            }
            tempAfterFeature.push(data)
        }
        return tempAfterFeature
    }
}

const featureStore = new FeatureStore()
export default featureStore;
