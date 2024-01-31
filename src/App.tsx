import style from "./App.module.css";

import Icon from "./components/UI/Icon";
import Form from "./components/form/Form";

function App() {
  return (
    <div className={style.app}>
      <div className={style.wrapper}>
        <div className={style.header}>
          <Icon
            src="https://wiki.factorio.com/images/Cargo_wagon.png"
            alt="Cargo wagon"
            title="Cargo wagon"
          />
          <h1>Factorio Train Calculator</h1>
        </div>
        <Form/>
      </div>
    </div>
  );
}

export default App;
