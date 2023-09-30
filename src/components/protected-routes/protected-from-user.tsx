import { useLocation, Navigate, RouteProps } from "react-router-dom";

import { useAppSelector } from "../../services/hooks";

import { userAuthorized } from "../../utils";

export function ProtectedRouteFromUser({ children }: RouteProps) {
  const { user } = useAppSelector((state) => state.authUser);
  const location = useLocation();

  if (userAuthorized(user)) {
    return <Navigate to={"/"} state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
