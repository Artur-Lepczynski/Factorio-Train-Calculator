import style from "./Result.module.css";
import { ResultData } from "../../App";

interface ResultProps {
  result: ResultData | null;
}

export default function Result(props: ResultProps) {
  function getTimeString(totalSeconds: number) {
    if (totalSeconds < 0) return "00:00.000";
    const pad = (s: string) => (s.split(".")[0].length === 1 ? "0" + s : s);
    const seconds = pad((totalSeconds % 60).toFixed(3));
    const minutes = pad(Math.floor((totalSeconds / 60) % 60) + "");
    const hours = pad(Math.floor(totalSeconds / 3600) + "");
    return (
      (hours === "00" ? "" : hours + ":") +
      (minutes === "00" ? "" : minutes + ":") +
      seconds
    );
  }

  return (
    <div className={style.wrapper}>
      {!props.result && (
        <p className={style["no-result-text"]}>
          There are no results just yet!
        </p>
      )}
      {props.result && (
        <div className={style["result-wrapper"]}>
          <div className={style["result-item"]}>
            <p className={style["result-description"]}>Total items</p>
            <p className={style["result-quantity"]}>
              {props.result.itemQuantity}
            </p>
          </div>

          <div className={style["result-item"]}>
            <p className={style["result-description"]}>
              Items unloaded per second
            </p>
            {props.result.itemsPerSecond < props.result.target && (
              <p className={style["result-disclaimer"]}>Below target</p>
            )}
            <p className={style["result-quantity"]}>
              {props.result.itemsPerSecond.toFixed(2)}
            </p>
          </div>

          <div className={style["result-item"]}>
            <p className={style["result-description"]}>Time needed to unload</p>
            <p className={style["result-quantity"]}>
              {getTimeString(props.result.loadTime)}
            </p>
          </div>

          <div className={style["result-item"]}>
            <p className={style["result-description"]}>
              Resources available for
            </p>
            {props.result.itemsPerSecond < props.result.target && (
              <p className={style["result-disclaimer"]}>
                Time shown for target speed. Real speed is lower. Resource
                availability time at that rate is equal to the unload time
              </p>
            )}
            <p className={style["result-quantity"]}>
              {getTimeString(props.result.supportTime)}
            </p>
          </div>

          <div className={style["result-item"]}>
            <p className={style["result-description"]}>Two way travel time</p>
            {props.result.travelTime < 0 && (
              <p className={style["result-disclaimer"]}>
                No time for train travel. Unload speed must be increased
              </p>
            )}
            <p className={style["result-quantity"]}>
              {getTimeString(props.result.travelTime)}
            </p>
          </div>

          <div className={style["result-item"]}>
            <p className={style["result-description"]}>One way travel time</p>
            <p className={style["result-quantity"]}>
              {getTimeString(props.result.travelTime / 2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
