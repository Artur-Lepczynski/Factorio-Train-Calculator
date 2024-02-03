import { useState } from "react";
import style from "./FormItem.module.css";

interface FormItemProps {
  type: "number" | "dropdown";
  label: string; 
  value: number | string;
  onChange: (value: number | string)=>void; 
  max?: number; 
}

export default function FormItem(props: FormItemProps) {
 
  function handleNumberChange(event: React.ChangeEvent<HTMLInputElement>){
    props.onChange(event.target.value);
  }

  return (
    <div className={style["form-item"]}>
      <label htmlFor="targetInput">{props.label}</label>
      {props.type === "number" && <input
        id="targetInput"
        type="number"
        min="1"
        max={props.max || 1000}
        value={props.value}
        onChange={handleNumberChange}
      ></input>}
      
    </div>
  );
}
