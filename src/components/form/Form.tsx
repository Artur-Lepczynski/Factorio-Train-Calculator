import { useEffect, useState } from "react";
import style from "./Form.module.css";
import FormItem from "./FormItem";

import formData from "../../data/formData.json";
import Button from "../UI/Button";
import { ResultData } from "../../App";

interface FormData {
  target: number | string;
  wagons: number | string;
  inserter: number;
  stackSize: number;
  inserterNumber: number;
  capacityBonus: number;
}

export type formDataTypes =
  | "target"
  | "wagons"
  | "inserter"
  | "stackSize"
  | "inserterNumber"
  | "capacityBonus";

  interface FormProps{
    onCalc: (result: ResultData)=>void; 
  }

export default function Form(props: FormProps) {
  const [formInputData, setFormInputData] = useState<FormData>({
    target: 15,
    wagons: 1,
    inserter: 1,
    stackSize: 100,
    inserterNumber: 6,
    capacityBonus: 1,
  });

  const [formIsValid, setFormIsValid] = useState<boolean>(true);

  function handleFromDataChange(type: formDataTypes, value: number | string) {
    setFormInputData((previous) => {
      if (type === "wagons" || type === "target") {
        if (value !== "") value = +value;
      }

      return {
        ...previous,
        [type]: +value,
      };
    });
  }

  useEffect(()=>{
    if(typeof formInputData.target === "string" || typeof formInputData.wagons === "string"){
      setFormIsValid(false);
    }else{
      if(formInputData.target < 0 || formInputData.target > 1000 || formInputData.wagons < 0 || formInputData.wagons > 12){
        setFormIsValid(false);
      }else{
        setFormIsValid(true); 
      }
    }
  }, [formInputData])

  function handleCalculate() {
    if(formIsValid){
      const itemQuantity = 40 * +formInputData.wagons * formInputData.stackSize; 
      const inserterSpeed = formData.inserterBaselineSpeed[formInputData.inserter - 1].speed;

      let handStackSize: number;
      if(formInputData.inserter <= 3){
        if(formInputData.capacityBonus === 1) handStackSize = 1; 
        else if(formInputData.capacityBonus < 7) handStackSize = 2; 
        else handStackSize = 3; 
      }else{
        if(formInputData.capacityBonus < 5) handStackSize = 2 + formInputData.capacityBonus; 
        else handStackSize = 6 + (formInputData.capacityBonus - 4) * 2;
      }
      if(handStackSize > formInputData.stackSize) handStackSize = formInputData.stackSize;  

      const itemsPerSecond = inserterSpeed * handStackSize * formInputData.inserterNumber;
      const loadTime = itemQuantity / itemsPerSecond; 

      const supportTime = itemQuantity / +formInputData.target; 
      const travelTime = supportTime - loadTime * 2; 
      
      props.onCalc({
        target: +formInputData.target, 
        itemQuantity, 
        itemsPerSecond, 
        loadTime, 
        supportTime, 
        travelTime
      });
    }
  }

  return (
    <div className={style.wrapper}>
      <FormItem
        for="target"
        type="number"
        label="Target items per second"
        onChange={(value) => handleFromDataChange("target", value)}
        value={formInputData.target}
      />
      <FormItem
        type="number"
        label="Number of wagons"
        max={12}
        onChange={(value) => handleFromDataChange("wagons", value)}
        value={formInputData.wagons}
      />
      <FormItem
        type="dropdown"
        label="Inserter type"
        onChange={(value) => handleFromDataChange("inserter", value)}
        value={formInputData.inserter}
        dropdownType="icon"
        options={formData.inserterType}
      />
      <FormItem
        type="dropdown"
        label="Item stack size"
        onChange={(value) => handleFromDataChange("stackSize", value)}
        value={formInputData.stackSize}
        dropdownType="string"
        options={formData.itemStackSize}
      />
      <FormItem
        type="dropdown"
        label="Inserters per wagon"
        onChange={(value) => handleFromDataChange("inserterNumber", value)}
        value={formInputData.inserterNumber}
        dropdownType="string"
        options={formData.inserterNumber}
      />
      <FormItem
        type="dropdown"
        label="Inserter capacity bonus level"
        onChange={(value) => handleFromDataChange("capacityBonus", value)}
        value={formInputData.capacityBonus}
        dropdownType="string"
        options={formData.inserterCapacityBonusLevel}
      />
      <Button className={style.button} onClick={handleCalculate} disabled={!formIsValid}>
        Calculate
      </Button>
    </div>
  );
}
