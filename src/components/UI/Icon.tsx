import style from "./Icon.module.css";

interface IconProps {
  src: string;
  alt: string;
  title: string;
}

export default function Icon(props: IconProps) {
  return <img className={style.icon} src={props.src} alt={props.alt} title={props.title} />;
}
