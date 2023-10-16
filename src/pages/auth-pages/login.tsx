import { ReactElement, SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { loginUserProfile } from "../../services/reducers/auth";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import loginStyles from "./auth-pages.module.css";
import { useValidateForm } from "../../hooks/useValidateForm";

function Login(): ReactElement {
  let content;
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

  const submitForm = (e: SyntheticEvent) => {
    e.preventDefault();
    if (isValidCheck() && values.email && values.password)
      dispatch(
        loginUserProfile({ email: values.email, password: values.password })
      );
  };

  const input = (loading: boolean, error?: string, success?: string) => {
    return (
      <>
        <form className={loginStyles["form-container"]} onSubmit={submitForm}>
          <h1 className={`text text_type_main-medium mb-6`}>Вход</h1>
          <div className={`${loginStyles["input-wrapper"]} mb-6`}>
            <Input
              name="email"
              type="email"
              placeholder={"E-mail"}
              disabled={loading}
              error={showErrors.email}
              errorText={errors.email}
              value={values.email ?? ""}
              onChange={handleChange}
              onFocus={handleFocus}
            />
          </div>

          <div className={`${loginStyles["input-wrapper"]} mb-6`}>
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

          <div className={`${loginStyles["button"]} ${error ? "mb-5" : ""}`}>
            <Button
              disabled={loading}
              type="primary"
              htmlType="submit"
              size="medium"
            >
              Войти
            </Button>
          </div>

          {error ? (
            <p
              className={`${loginStyles["text-error"]} text text_type_main-default mb-20`}
            >
              {error}
            </p>
          ) : null}
          {success ? (
            <p
              className={`${loginStyles["text-success"]} text text_type_main-default mb-20`}
            >
              {success}
            </p>
          ) : null}
        </form>

        {!loading ? (
          <>
            <div className={`${loginStyles["text"]} mb-4`}>
              <p className="text text_type_main-default text_color_inactive">
                Вы новый пользователь?&nbsp;
              </p>

              <Link to={"/register"}>
                <p
                  className={`${loginStyles["text-link"]} text text_type_main-default`}
                >
                  Зарегистрироваться
                </p>
              </Link>
            </div>

            <div className={loginStyles["text"]}>
              <p className="text text_type_main-default text_color_inactive">
                Забыли пароль?&nbsp;
              </p>

              <Link to={"/forgot-password"}>
                <p
                  className={`${loginStyles["text-link"]} text text_type_main-default`}
                >
                  Восстановить пароль
                </p>
              </Link>
            </div>
          </>
        ) : null}
      </>
    );
  };

  if (status === "loginUser/loading") {
    content = input(true);
  } else if (
    status === "getUserData/loading" ||
    status === "getToken/loading"
  ) {
    content = <></>;
  } else if (status === "loginUser/failed") {
    content = input(false, error);
  } else if (status === "resetPassword/success") {
    content = input(false, error, "Пароль успешно восстановлен");
  } else {
    content = input(false);
  }

  return (
    <div key="login-page" className={loginStyles["container"]}>
      {content}
    </div>
  );
}

export { Login };
