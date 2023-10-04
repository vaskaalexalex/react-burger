import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../services/hooks";
import { ReactElement } from "react";
import { userAuthorized } from "../../utils";

function ProtectedRoute({
  children,
  anonymous = false,
}: {
  children: ReactElement;
  anonymous?: boolean;
}) {
  const { user } = useAppSelector((state) => state.authUser);
  const isLoggedIn = userAuthorized(user);

  const location = useLocation();
  const from = location.state?.from || "/";
  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && isLoggedIn) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={from} />;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !isLoggedIn) {
    // ...то отправляем его на страницу логин
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return children;
}

export { ProtectedRoute };
