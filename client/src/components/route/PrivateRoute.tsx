import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { RootState } from "../..";
import { loginSuccess } from "../../reducers/actionCreators";

interface props {
    authenticationPath: string;
}
  
const PrivateRoute = ({ authenticationPath, ...routeProps}: props & RouteProps) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState<Boolean>(true)
    const accessToken = localStorage.getItem('profile')
    const { signIn } = useSelector((state: RootState) => state.auth)
    
    useEffect(() => {
      if (accessToken){
          dispatch(loginSuccess(accessToken))
          setLoading(false)
      }
    }, [accessToken, dispatch, signIn])
    
    if(!signIn && !loading) {
      return <Redirect to={{ pathname: authenticationPath }} />;
    } else {
      return <Route {...routeProps} />;
    }
  };
export default PrivateRoute;