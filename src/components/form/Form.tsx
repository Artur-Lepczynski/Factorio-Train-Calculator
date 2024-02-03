import { useState } from "react";
import style from "./Form.module.css";
import FormItem from "./FormItem";
import Dropdown from "../UI/Dropdown";

interface FormData {
  target: number | string;
  wagons: number | string;
  inserter: string;
  stackSize: string;
}

export type formDataTypes = "target" | "wagons" | "inserter" | "stackSize";

export default function Form() {
  const [formData, setFormData] = useState<FormData>({
    target: 1,
    wagons: 1,
    inserter: "1",
    stackSize: "100",
  });

  function handleFromDataChange(type: formDataTypes, value: number | string) {
    setFormData((previous) => {
      if (type === "wagons" || type === "target") {
        if (value !== "") value = +value;
      }

      console.log(type, value); 

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
        value={formData.target}
      />
      <FormItem
        type="number"
        label="Number of wagons"
        max={12}
        onChange={(value) => handleFromDataChange("wagons", value)}
        value={formData.wagons}
      />
      <FormItem
        type="dropdown"
        label="Inserter type"
        onChange={(value) => handleFromDataChange("inserter", value)}
        value={formData.inserter}
        dropdownType="icon"
        options={[
          {
            id: "1",
            name: "Burner Inserter",
            iconUrl:
              "https://wiki.factorio.com/images/thumb/Burner_inserter.png/32px-Burner_inserter.png",
          },
          {
            id: "2",
            name: "Inserter",
            iconUrl:
              "https://wiki.factorio.com/images/thumb/Inserter.png/32px-Inserter.png",
          },
        ]}
      />
      <FormItem
        type="dropdown"
        label="Item stack size"
        onChange={(value) => handleFromDataChange("stackSize", value)}
        value={formData.stackSize}
        dropdownType="string"
        options={[
          { id: "10", name: "10" },
          { id: "50", name: "50" },
          { id: "100", name: "100" },
          { id: "200", name: "200" },
        ]}
      />
      <button>Calc</button>
    </div>
  );
}
