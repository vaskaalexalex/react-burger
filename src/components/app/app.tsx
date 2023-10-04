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
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { fetchIngredients } from "../../services/reducers/burger-ingredients";
import { tokenExists, isTokenExpired } from "../../utils";
import { getUserData, getNewAccessToken } from "../../services/reducers/auth";

import styles from "./app.module.css";
import { Loading } from "../loading/loading";
import { Error } from "../error/error";
import { Logout } from "../../pages/auth-pages/logout";
import { ProtectedRoute } from "../protected-routes/protected-route";

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
    if (tokenExists(accessToken) && !isTokenExpired(accessToken)) {
      dispatch(getUserData({ accessToken }));
    } else if (tokenExists(refreshToken)) {
      dispatch(getNewAccessToken(refreshToken));
    }
  }, [accessToken, refreshToken, dispatch]);

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
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
            key={location.pathname}
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute>
                <Register />
              </ProtectedRoute>
            }
            key={location.pathname}
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRoute>
                <ForgotPassword />
              </ProtectedRoute>
            }
            key={location.pathname}
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedRoute>
                <ResetPassword />
              </ProtectedRoute>
            }
            key={location.pathname}
          />
          <Route path="/ingredients/:id" element={<IngredientInfo />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute anonymous={true}>
                <Profile />
              </ProtectedRoute>
            }
            key={location.pathname}
          />

          <Route path="/logout" element={<Logout />} key={location.pathname} />
          <Route path="*" element={<NotFound />} key={location.pathname} />
        </Routes>
        <>
          {background && (
            <Routes>
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

  return <div className={styles.app}>{content}</div>;
}

export default App;
