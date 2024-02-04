import { useState } from "react";
import style from "./App.module.css";

import Icon from "./components/UI/Icon";
import Form from "./components/form/Form";
import Result from "./components/result/Result";

export interface ResultData{
  target: number; 
  itemQuantity: number; 
  itemsPerSecond: number; 
  loadTime: number; 
  supportTime: number; 
  travelTime: number; 
}

function App() {

  const [result, setResult] = useState<ResultData | null>(null)

  function handleResultCalc(result: ResultData){
    setResult(result); 
  }

  return (
    <div className={style.app}>
      <div className={style.wrapper}>
        <div className={style.header}>
          <Icon
            src="https://wiki.factorio.com/images/Cargo_wagon.png"
            alt="Cargo wagon"
            title="Cargo wagon"
          />
          <h1>Factorio Train Calculator</h1>
        </div>
        <Form onCalc={handleResultCalc}/>
        <Result result={result} />
      </div>
    </div>
  );
}

export default App;
