import styles from "./loading.module.css";
import { ReactComponent as Spinner } from "../../assets/images/spinner.svg";

function Loading({ text = "Загрузка данных" }: { text?: string }) {
  return (
    <div className={styles["container"]}>
      <p className={`${styles["loading-text"]} text text_type_main-large mb-5`}>
        {text}
      </p>
      <div className={styles["loading-icon"]}>
        <Spinner />
      </div>
    </div>
  );
}

export { Loading };
