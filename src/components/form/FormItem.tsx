import style from "./FormItem.module.css";
import { formDataTypes } from "./Form";
import Dropdown from "../UI/Dropdown";
import { DropdownOption } from "../UI/Dropdown";

interface FormItemProps {
  type: "number" | "dropdown";
  dropdownType?: "string" | "icon";
  label: string;
  value: number | string;
  onChange: (value: number | string) => void;
  max?: number;
  for?: formDataTypes;
  options?: DropdownOption[];
}

export default function FormItem(props: FormItemProps) {

  function handleNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
    props.onChange(event.target.value);
  }

  function handleOptionSelect(id: string){
    props.onChange(id); 
  }

  return (
    <div className={style["form-item"]}>
      <label htmlFor={`${props.for}Input`}>{props.label}</label>
      {props.type === "number" && (
        <input
          id={`${props.for}Input`}
          type="number"
          min="1"
          max={props.max || 1000}
          value={props.value}
          onChange={handleNumberChange}
        ></input>
      )}
      {props.type === "dropdown" && (
        <Dropdown
          optionsType={props.dropdownType!}
          options={props.options!}
          value={props.value}
          onSelect={handleOptionSelect}
        />
      )}
    </div>
  );
}
