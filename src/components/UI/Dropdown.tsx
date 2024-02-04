import { useEffect, useRef, useState } from "react";
import style from "./Dropdown.module.css";
import Icon from "./Icon";

export interface DropdownOption {
  id: string;
  name: string;
  iconUrl?: string;
}

interface DropdownProps {
  optionsType: "string" | "icon";
  options: DropdownOption[];
  value: string | number;
  onSelect: (id: string)=>void;
}

export default function Dropdown(props: DropdownProps) {
  const [expanded, setExpanded] = useState<boolean>(false);

  interface CurrentOption {
    src: string;
    alt: string;
    title: string;
  }
  const [currentOption, setCurrentOption] = useState<string | CurrentOption>(
    ""
  );

  useEffect(() => {
    const optionItem = props.options.find((item) => ""+props.value === item.id);
    if (props.optionsType === "string") {
      setCurrentOption(optionItem?.name || "Invalid value");
    } else if (props.optionsType === "icon") {
      setCurrentOption({
        src: optionItem?.iconUrl || "",
        alt: optionItem?.name || "",
        title: optionItem?.name || "",
      });
    }
  }, [props.value]);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  document.addEventListener("click", (event) => {
    if (expanded && !buttonRef.current?.contains(event.target as Node)) {
      setExpanded(false);
    }
  });

  function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (dropdownRef.current?.contains(event.target as Node)) {
      setExpanded(false);
    } else {
      setExpanded((prev) => !prev);
    }
  }

  function handleEscapeKeyPress(event: React.KeyboardEvent<HTMLDivElement>) {
    if (expanded && event.key === "Escape") setExpanded(false);
  }

  function handleDropdownSelect(selected: DropdownOption) {
    // console.log("selected: ", selected);
    props.onSelect(selected.id);
  }

  return (
    <div className={style.wrapper} onKeyDown={handleEscapeKeyPress}>
      <button
        type="button"
        className={style.button}
        onClick={handleClick}
        ref={buttonRef}
        aria-haspopup="listbox"
        aria-expanded={expanded}
        aria-controls="dropdown-menu"
      >
        <div className={style["dropdown-value"]}>
          {props.optionsType === "string" &&
            typeof currentOption === "string" && <p>{currentOption}</p>}
          {props.optionsType === "icon" &&
            typeof currentOption === "object" && (
              <Icon
                src={currentOption.src}
                alt={currentOption.alt}
                title={currentOption.title}
              />
            )}
        </div>
        <i
          className={`fa-solid fa-angle-down ${style["dropdown-arrow"]} ${
            expanded && style["dropdown-arrow-down"]
          }`}
        ></i>
      </button>

      {expanded && (
        <div
          id="dropdown-menu"
          className={style.dropdown}
          ref={dropdownRef}
          role="listbox"
        >
          {props.options.map((item) => {
            return (
              <button
                className={style["dropdown-button"]}
                type="button"
                key={item.id}
                onClick={(event) => {
                  handleDropdownSelect(item);
                }}
                role="option"
                aria-selected={item.id === props.value}
              >
                {props.optionsType === "string" ? (
                  item.name
                ) : (
                  <Icon src={item.iconUrl!} alt={item.name} title={item.name} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
