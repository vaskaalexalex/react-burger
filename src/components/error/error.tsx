import styles from "./error.module.css";

function Error({ text }: { text: string }) {
  return (
    <div className={styles["container"]}>
      <p className={`${styles["loading-text"]} text text_type_main-large mb-5`}>
        {text}
      </p>
    </div>
  );
}

export { Error };
