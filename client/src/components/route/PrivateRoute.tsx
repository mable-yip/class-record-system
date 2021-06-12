import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { RootState } from "../..";

interface props {
    authenticationPath: string;
}
  
const PrivateRoute = ({ authenticationPath, ...routeProps}: props & RouteProps) => {
    const { signIn } = useSelector((state: RootState) => state.auth)
    if(signIn) {
      return <Route {...routeProps} />;
    } else {
      return <Redirect to={{ pathname: authenticationPath }} />;
    }
  };
export default PrivateRoute;