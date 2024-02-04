import { ReactNode } from "react";
import style from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      type="button"
      className={`${style.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
