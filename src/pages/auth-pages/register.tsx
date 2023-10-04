import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { createUserProfile } from "../../services/reducers/auth";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useValidateForm } from "../../hooks/useValidateForm";

import styles from "./auth-pages.module.css";

function Register() {
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

  const submitForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (isValidCheck())
      dispatch(
        createUserProfile({
          email: values.email!,
          password: values.password!,
          name: values.name!,
        })
      );
  };

  const input = (loading: boolean, error?: string) => {
    return (
      <>
        <form className={styles["form-container"]} onSubmit={submitForm}>
          <h1 className={`text text_type_main-medium mb-6`}>Регистрация</h1>
          <div className={`${styles["input-wrapper"]} mb-6`}>
            <Input
              name="name"
              type="text"
              placeholder={"Имя"}
              disabled={loading}
              error={showErrors.name}
              errorText={errors.name}
              value={values.name ?? ""}
              onChange={handleChange}
              onFocus={handleFocus}
            />
          </div>
          <div className={`${styles["input-wrapper"]} mb-6`}>
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

          <div className={`${styles["button"]} ${error ? "mb-5" : ""}`}>
            <Button
              disabled={loading}
              type="primary"
              htmlType="submit"
              size="medium"
            >
              {loading ? <>Идет регистрация</> : <>Зарегистрироваться</>}
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
              Уже зарегистрированы?&nbsp;
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

  if (status === "registerUser/loading") {
    content = input(true);
  } else if (
    status === "getUserData/loading" ||
    status === "getToken/loading"
  ) {
    content = null;
  } else if (status === "registerUser/failed") {
    content = input(false, error);
  } else {
    content = input(false);
  }

  return <div className={styles["container"]}>{content}</div>;
}

export { Register };
