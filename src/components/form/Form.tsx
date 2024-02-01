import { useState } from "react";
import style from "./Form.module.css";

export default function Form() {
  const [target, setTarget] = useState<number>(1);

  function handleTargetChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTarget(+event.target.value); 
  }

  return (
    <div className={style.wrapper}>
      <div className={style["form-item"]}>
        <label htmlFor="targetInput">Target</label>
        <input
          id="targetInput"
          type="number"
          min="1"
          max="1000"
          value={target}
          onChange={handleTargetChange}
        ></input>
      </div>
    </div>
  );
}
