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
  OrderInfoPage,
  Orders,
  ProfileOrders,
} from "../../pages";
import { Modal } from "../modal/modal-template";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { fetchIngredients } from "../../services/reducers/burger-ingredients/burger-ingredients";
import { tokenExists, isTokenExpired } from "../../utils";
import {
  getUserData,
  getNewAccessToken,
} from "../../services/reducers/auth/auth";

import styles from "./app.module.css";
import { Loading } from "../loading/loading";
import { Error } from "../error/error";
import { Logout } from "../../pages";
import { ProtectedRoute } from "../protected-routes/protected-route";
import { OrderInfoModal } from "../order-info-modal/order-info-modal";

function App() {
  let content;
  const dispatch = useAppDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;
  const navigate = useNavigate();

  const { status, error } = useAppSelector((state) => state.burgerIngredients);
  const tokens = useAppSelector((state) => state.authUser.tokens);
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
              <ProtectedRoute anonymous>
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

          <Route path="/feed" element={<Orders />} key={location.pathname} />
          <Route path="/feed/:id" element={<OrderInfoPage />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
            key={location.pathname}
          />

          <Route
            path="/profile/orders"
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
            key={location.pathname}
          />
          <Route
            path="/profile/orders/:id"
            element={
              <ProtectedRoute>
                <OrderInfoPage />
              </ProtectedRoute>
            }
          />
          <Route path="/logout" element={<Logout />} key={location.pathname} />
          <Route path="*" element={<NotFound />} key={location.pathname} />
        </Routes>
        <>
          {background && (
            <Routes>
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

              <Route
                path="/feed"
                element={
                  <Modal titleIsNumber={true} onClose={onDismiss}>
                    <OrderInfoModal />
                  </Modal>
                }
              />
              <Route
                path="/feed/:id"
                element={
                  <Modal titleIsNumber={true} onClose={onDismiss}>
                    <OrderInfoModal />
                  </Modal>
                }
              />

              <Route
                path="/profile/orders"
                element={
                  <ProtectedRoute>
                    <Modal titleIsNumber={true} onClose={onDismiss}>
                      <OrderInfoModal />
                    </Modal>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile/orders/:id"
                element={
                  <ProtectedRoute>
                    <Modal titleIsNumber={true} onClose={onDismiss}>
                      <OrderInfoModal />
                    </Modal>
                  </ProtectedRoute>
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
