import React, { useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../services/hooks";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useValidateForm } from "../../hooks/useValidateForm";
import { resetPasswordUser } from "../../services/reducers/auth/auth";

import styles from "./auth-pages.module.css";

function ResetPassword() {
  let content;
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { status, error } = useAppSelector((state) => state.authUser);

  const [revealPassword, setRevealPassword] = useState(false);

  const {
    values,
    handleChange,
    handleFocus,
    errors,
    showErrors,
    isValidCheck,
  } = useValidateForm();

  const submitForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (isValidCheck())
      dispatch(
        resetPasswordUser({
          password: values.password!,
          confirmationCode: values.confirmationCode!,
        })
      );
  };

  const input = (loading: boolean, error?: string) => {
    return (
      <>
        <form className={styles["form-container"]} onSubmit={submitForm}>
          <h1 className={`text text_type_main-medium mb-6`}>
            Восстановление пароля
          </h1>

          <div className={`${styles["input-wrapper"]} mb-6`}>
            <Input
              name="password"
              icon={revealPassword ? "HideIcon" : "ShowIcon"}
              type={revealPassword ? "text" : "password"}
              placeholder={"Пароль"}
              disabled={loading}
              error={showErrors.password}
              errorText={errors.password}
              value={values.password ?? ""}
              onChange={handleChange}
              onFocus={handleFocus}
              onIconClick={() => setRevealPassword(!revealPassword)}
            />
          </div>
          <div className={`${styles["input-wrapper"]} mb-6`}>
            <Input
              name="confirmationCode"
              placeholder={"Введите код из письма"}
              disabled={loading}
              error={showErrors.confirmationCode}
              errorText={errors.confirmationCode}
              value={values.confirmationCode ?? ""}
              onChange={handleChange}
              onFocus={handleFocus}
            />
          </div>

          <div className={`${styles["button"]} ${error ? "mb-5" : ""}`}>
            <Button
              disabled={loading ? true : false}
              type="primary"
              size="medium"
              htmlType="submit"
            >
              Сохранить
            </Button>
          </div>

          {error ? (
            <p
              className={`${styles["text-error"]} text text_type_main-default mb-20`}
            >
              {error}
            </p>
          ) : null}
        </form>
        {!loading ? (
          <div className={`${styles["text"]} mb-4`}>
            <p className="text text_type_main-default text_color_inactive">
              Вспомнили пароль?&nbsp;
            </p>
            <Link to={"/login"}>
              <p
                className={`${styles["text-link"]} text text_type_main-default`}
              >
                Войти
              </p>
            </Link>
          </div>
        ) : null}
      </>
    );
  };

  if (status === "resetPassword/loading") {
    content = input(true);
  } else if (status === "resetPassword/failed") {
    content = input(false, error);
  } else {
    content = input(false);
  }

  if (location.state?.from === undefined) {
    return <Navigate to={"/forgot-password"} replace={true} />;
  }

  if (status === "resetPassword/success") {
    return <Navigate to={"login"} replace={true} />;
  }

  return <div className={styles["container"]}>{content}</div>;
}

export { ResetPassword };
