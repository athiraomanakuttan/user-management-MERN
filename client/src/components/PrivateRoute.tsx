import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const currentUser = useSelector((state: { user: { currentUser: any } }) => state.user.currentUser);

  return currentUser ? <>{children}</> : <Navigate to='/signup' />;
};

export default PrivateRoute;
