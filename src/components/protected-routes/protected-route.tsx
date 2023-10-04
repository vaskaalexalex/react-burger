import { Navigate } from "react-router-dom";
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
  const { user } = useAppSelector((state) => state.authUser);
  const isLoggedIn = userAuthorized(user);

  if (anonymous && isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export { ProtectedRoute };
