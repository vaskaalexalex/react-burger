import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { AppHeader } from "../header/app-header";
import {
  HomePage,
  Login,
  Register,
  Profile,
  ForgotPassword,
  ResetPassword,
  IngredientInfo,
  NotFound,
} from "../../pages";
import { Modal } from "../modal/modal-template";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { ProtectedRouteFromGuest } from "../protected-routes/protected-from-guest";
import { ProtectedRouteFromUser } from "../protected-routes/protected-from-user";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { fetchIngredients } from "../../services/reducers/burger-ingredients";
import { tokenExists, isTokenExpired } from "../../utils";
import { getUserData, getNewAccessToken } from "../../services/reducers/auth";

import styles from "./app.module.css";
import { Loading } from "../loading/loading";
import { Error } from "../error/error";
import { Logout } from "../../pages/auth-pages/logout";

function App() {
  let content;
  const dispatch = useAppDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;
  const navigate = useNavigate();

  const { status, error } = useAppSelector((state) => state.burgerIngredients);
  const { tokens } = useAppSelector((state) => state.authUser);
  const accessToken = tokens.accessToken;
  const refreshToken = tokens.refreshToken;

  useEffect(() => {
    if (tokenExists(accessToken)) {
      if (!isTokenExpired(accessToken)) {
        dispatch(
          getUserData({
            accessToken: accessToken,
          })
        );
      } else {
        dispatch(getNewAccessToken(refreshToken));
      }
    } else {
      if (tokenExists(refreshToken)) {
        dispatch(getNewAccessToken(refreshToken));
      }
    }
  }, [accessToken, dispatch, refreshToken]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchIngredients());
    }
  }, [status, dispatch]);

  function onDismiss() {
    navigate(-1);
  }

  if (status === "loading" || status === "idle") {
    content = <Loading text="Данные загружаются" />;
  }
  if (status === "failed") {
    content = <Error text={`Произошла ошибка: ${error}`} />;
  } else if (status === "succeeded") {
    content = (
      <>
        <AppHeader />
        <Routes location={background || location}>
          <Route path="/" element={<HomePage />} key={location.pathname} />
          <Route
            path="/login"
            element={
              <ProtectedRouteFromUser>
                <Login />
              </ProtectedRouteFromUser>
            }
            key={location.pathname}
          />
          <Route
            path="/register"
            element={
              <ProtectedRouteFromUser>
                <Register />
              </ProtectedRouteFromUser>
            }
            key={location.pathname}
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRouteFromUser>
                <ForgotPassword />
              </ProtectedRouteFromUser>
            }
            key={location.pathname}
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedRouteFromUser>
                <ResetPassword />
              </ProtectedRouteFromUser>
            }
            key={location.pathname}
          />
          <Route path="/ingredients/:id" element={<IngredientInfo />} />
          <Route
            path="/profile"
            element={
              <ProtectedRouteFromGuest>
                <Profile />
              </ProtectedRouteFromGuest>
            }
            key={location.pathname}
          />

          <Route path="/logout" element={<Logout />} key={location.pathname} />
          <Route path="*" element={<NotFound />} key={location.pathname} />
        </Routes>
        <>
          {background && (
            <Routes>
              {/* This route fixes end animation of modal window */}
              <Route
                path="/"
                element={
                  <Modal title="Детали ингредиента" onClose={onDismiss}>
                    <IngredientDetails />
                  </Modal>
                }
              />
              <Route
                path="/ingredients/:id"
                element={
                  <Modal title="Детали ингредиента" onClose={onDismiss}>
                    <IngredientDetails />
                  </Modal>
                }
              />
            </Routes>
          )}
        </>
      </>
    );
  }

  return (
    <>
      <div className={styles.app}>{content}</div>
    </>
  );
}

export default App;
