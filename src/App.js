import './App.css';
import Login from './pages/login/index'
import Home from './pages/home/index'
import Model from './pages/model/index'
import Result from './pages/result/index'
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import Data from "./pages/data";
import {useState} from "react";
import ModelMore from "./pages/model/indexIndustry";
import {getJson} from "./testDataset";
import axios from "axios";
import Analysis from "./pages/result/analysis";

function App() {
    const [dataGet,] = useState([])

    const [finalProcess,setFinalProcess] = useState(0)
    function getWholeData(data){
        dataGet.push(data)
        setFinalProcess(finalProcess+dataGet[dataGet.length-1].process)
    }

    const [modelGet,] = useState([])

    function getWholeModel(data){
        modelGet.push(data)
        setFinalProcess(finalProcess+modelGet[modelGet.length-1].process)
    }

    const sendData = async (jsonData) => {
        const url = 'http://13.250.206.7:3010/gettestdata';
        try {
            await axios.post(url, jsonData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
        }
    };

    const [finalJson,setFinalJson] = useState([])
    function getFianlCommand(boolean){
        if(boolean){
            const lastData = dataGet[dataGet.length - 1].data;
            const lastModel = modelGet[modelGet.length - 1].model;
            setFinalJson({
                id:getJson["id"],
                data: lastData,
                model: lastModel
            });
            sendData(JSON.stringify(finalJson))
        }
    }

    console.log(finalJson)

    return (
      <BrowserRouter>
          <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route path="/" element={<Home finalProcess={finalProcess} getFianlCommand={getFianlCommand}/>}>
                  <Route path="/home/dataset" element={<Data getWholeData={getWholeData}/>}/>
                  <Route path="/home/model" element={<Model getWholeModel={getWholeModel}/>}/>
                  <Route path="/home/result" element={<Result/>}/>
                  <Route path="/home/analysis" element={<Analysis/>}/>
                  <Route path="/home/modelmore" element={<ModelMore getWholeModel={getWholeModel}/>}/>
              </Route>
          </Routes>
      </BrowserRouter>
    );
    }

export default App;
