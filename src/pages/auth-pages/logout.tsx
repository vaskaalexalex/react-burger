import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { Loading } from "../../components/loading/loading";
import { logoutUserProfile } from "../../services/reducers/auth";
import { userAuthorized } from "../../utils";

import styles from "./auth-pages.module.css";

function Logout() {
  let content = null;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, status, error } = useAppSelector((state) => state.authUser);

  useEffect(() => {
    if (!userAuthorized(user)) {
      navigate("/login", { replace: true });
    } else {
      dispatch(logoutUserProfile());
    }
  }, [dispatch, navigate, user]);

  useEffect(() => {
    if (status === "logout/success") {
      navigate("/login", { state: { from: "/profile" }, replace: true });
    }
  }, [navigate, status]);

  if (status === "logout/loading") {
    content = (
      <div className={styles["container"]}>
        <Loading text={"Выполняется выход из профиля"} />
      </div>
    );
  } else if (status === "logout/failed") {
    content = (
      <div className={styles["container"]}>
        <p
          className={`${styles["text-error"]} text text_type_main-large mb-20`}
        >
          {error}
        </p>
      </div>
    );
  }

  return <div key="constructor-page-cf">{content}</div>;
}

export { Logout };
