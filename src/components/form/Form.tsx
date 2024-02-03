import { useState } from "react";
import style from "./Form.module.css";
import FormItem from "./FormItem";

interface FormData {
  target: number | string;
  wagons: number | string;
}

export default function Form() {
  const [formData, setFormData] = useState<FormData>({
    target: 1,
    wagons: 1,
  });

  type formDataTypes = "target" | "wagons";

  function handleFromDataChange(type: formDataTypes, value: number | string) {
    setFormData((previous) => {
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
      <button>Calc</button>
    </div>
  );
}
