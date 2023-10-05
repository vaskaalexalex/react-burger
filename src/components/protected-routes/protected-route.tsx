import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../services/hooks";
import { userAuthorized } from "../../utils";
import { ReactElement } from "react";

function ProtectedRoute({
  children,
  anonymous = false,
}: {
  children: ReactElement;
  anonymous?: boolean;
}) {
  const location = useLocation();
  const from = location.state?.from || "/";
  const { user } = useAppSelector((state) => state.authUser);
  const isLoggedIn = userAuthorized(user);

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export { ProtectedRoute };
