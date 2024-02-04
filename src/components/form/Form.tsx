import { useState } from "react";
import style from "./Form.module.css";
import FormItem from "./FormItem";

import formData from "../../data/formData.json";

interface FormData {
  target: number | string;
  wagons: number | string;
  inserter: string;
  stackSize: string;
  inserterNumber: string; 
  capacityBonus: string; 
}

export type formDataTypes =
  | "target"
  | "wagons"
  | "inserter"
  | "stackSize"
  | "inserterNumber"
  | "capacityBonus"

export default function Form() {
  const [formInputData, setFormInputData] = useState<FormData>({
    target: 1,
    wagons: 1,
    inserter: "1",
    stackSize: "100",
    inserterNumber: "6", 
    capacityBonus: "1"
  });

  function handleFromDataChange(type: formDataTypes, value: number | string) {
    setFormInputData((previous) => {
      if (type === "wagons" || type === "target") {
        if (value !== "") value = +value;
      }

      return {
        ...previous,
        [type]: value,
      };
    });
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
    </div>
  );
}
