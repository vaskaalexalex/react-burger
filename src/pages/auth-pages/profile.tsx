import React, { useState, useEffect, useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { resetState } from "../../services/reducers/auth";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { updateUserData } from "../../services/reducers/auth";
import { useValidateForm } from "../../hooks/useValidateForm";
import { tokenExists } from "../../utils";

import styles from "./auth-pages.module.css";

const setActive = (
  { isActive }: { isActive: boolean },
  additionalClass: String
) =>
  "text text_type_main-default " +
  (isActive ? "" : "text_color_inactive ") +
  additionalClass;

function Profile() {
  let content = null;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, tokens, status, error } = useAppSelector(
    (state) => state.authUser
  );

  const [nameInputDisabled, setNameInputDisabled] = useState(true);
  const [emailInputDisabled, setEmailInputDisabled] = useState(true);
  const [passwordInputDisabled, setPasswordInputDisabled] = useState(true);
  const [inputFieldsChanged, setInputFieldsChanged] = useState(false);
  const {
    values,
    handleChange,
    handleFocus,
    errors,
    showErrors,
    resetForm,
    resetValue,
    isValidCheck,
  } = useValidateForm();

  useEffect(() => {
    resetForm({ name: user.name, email: user.email });
  }, [resetForm, user.email, user.name]);

  function resetFields() {
    resetForm({ name: user.name, email: user.email });

    setNameInputDisabled(true);
    setEmailInputDisabled(true);
    setPasswordInputDisabled(true);
    setInputFieldsChanged(false);
  }

  useEffect(() => {
    if (
      values.name === user.name &&
      values.email === user.email &&
      values.password === user.password
    ) {
      setInputFieldsChanged(false);
    }
  }, [user, values]);

  useEffect(() => {
    if (
      (!nameInputDisabled || !emailInputDisabled) &&
      (values.name !== user.name ||
        values.email !== user.email ||
        values.password)
    ) {
      setInputFieldsChanged(true);
    }
  }, [emailInputDisabled, nameInputDisabled, user.email, user.name, values]);

  const changeUserData = async () => {
    if (!values.name || !values.email || !values.password) return;

    await dispatch(
      updateUserData({
        accessToken: tokens.accessToken,
        name: values.name,
        email: values.email,
        password: values.password,
      })
    );
    resetFields();
  };

  function submitForm(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!tokenExists(tokens.refreshToken)) {
      dispatch(resetState());
      navigate("/login", { replace: true });
    } else {
      if (inputFieldsChanged) {
        if (isValidCheck()) changeUserData();
      } else {
        resetFields();
      }
    }
  }

  const cancelEdit = () => {
    if (user && user.name && user.email) {
      resetFields();
    }
  };

  const showErrorOrSuccess = useMemo(() => {
    if (error) {
      return (
        <p className={`${styles["text-error"]} text text_type_main-default`}>
          {error}
        </p>
      );
    } else if (status === "success") {
      return (
        <p className={`${styles["text-error"]} text text_type_main-default`}>
          Данные успешно изменены
        </p>
      );
    } else {
      return null;
    }
  }, [error, status]);

  const input = (loading: boolean, error?: string) => {
    return (
      <form className={styles["form"]} onSubmit={submitForm}>
        <div className={`${styles["input-wrapper"]} mb-6`}>
          <Input
            icon={"EditIcon"}
            name="name"
            type="text"
            placeholder={"Имя"}
            disabled={loading ? true : nameInputDisabled}
            error={showErrors.name}
            errorText={errors.name}
            value={values.name ?? ""}
            onChange={handleChange}
            onFocus={handleFocus}
            onIconClick={() => {
              if (inputFieldsChanged) resetValue("name", user.name);
              setNameInputDisabled(!nameInputDisabled);
            }}
          />
        </div>
        <div className={`${styles["input-wrapper"]} mb-6`}>
          <Input
            icon={"EditIcon"}
            name="email"
            type="email"
            placeholder={"E-mail"}
            disabled={loading ? true : emailInputDisabled}
            error={showErrors.email}
            errorText={errors.email}
            value={values.email ?? ""}
            onChange={handleChange}
            onFocus={handleFocus}
            onIconClick={() => {
              if (inputFieldsChanged) resetValue("email", user.email);
              setEmailInputDisabled(!emailInputDisabled);
            }}
          />
        </div>
        <div className={`${styles["input-wrapper"]} mb-6`}>
          <Input
            icon={"EditIcon"}
            name="password"
            type="password"
            placeholder={"Пароль"}
            disabled={loading ? true : emailInputDisabled}
            error={showErrors.password}
            errorText={errors.password}
            value={values.password ?? ""}
            onChange={handleChange}
            onFocus={handleFocus}
            onIconClick={() => {
              if (inputFieldsChanged) {
                // @ts-ignore
                resetValue("password", user?.password);
              }
              setEmailInputDisabled(!passwordInputDisabled);
            }}
          />
        </div>
        {inputFieldsChanged && (
          <div className={styles["profile-buttons"]}>
            {!loading ? (
              <Button type="secondary" htmlType="button" onClick={cancelEdit}>
                Отменить
              </Button>
            ) : null}
            <Button disabled={loading} type="primary" htmlType="submit">
              {loading ? <>Данные обновляются</> : <>Сохранить</>}
            </Button>
          </div>
        )}
        {showErrorOrSuccess}
      </form>
    );
  };

  if (status === "getUserData/loading") {
    content = input(true);
  } else if (status === "getUserData/failed") {
    content = input(false, error);
  } else {
    content = input(false);
  }

  return (
    <div key="profile-page" className="mt-30">
      <div className={styles["profile-container"]}>
        <div className={`${styles["profile-items-container"]} mr-15`}>
          <NavLink
            to={"/profile"}
            className={(isActive) => setActive(isActive, "mb-6")}
            end
          >
            Профиль
          </NavLink>
          <NavLink
            to={"/profile/orders"}
            className={(isActive) => setActive(isActive, "mb-6")}
          >
            История заказов
          </NavLink>
          <NavLink
            to={"/logout"}
            className={(isActive) => setActive(isActive, "mb-20")}
          >
            Выход
          </NavLink>
          <p className="text text_type_main-default text_color_inactive">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        {content}
      </div>
    </div>
  );
}

export { Profile };
