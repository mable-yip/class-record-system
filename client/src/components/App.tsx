import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom'
import { RootState } from '..';
import { loginSuccess } from '../reducers/actionCreators';
import ManagerUser from './admin/ManageUser';
import NavBarComponent from './common/NavBarComponent';
import LoginPage from './login/LoginPage'
import StudentHomePage from './student/StudentHomePage';
import ManageClass from './teacher/ManageClass';
import ClassForm from "./teacher/ClassForm";
import PrivateRoute from './route/PrivateRoute';

const App = () =>{
  const dispatch = useDispatch()
  const accessToken = localStorage.getItem('profile')
  const auth = useSelector((state: RootState) => state.auth) 
  
  useEffect(() => {
    if (accessToken){
        dispatch(loginSuccess(accessToken))
    }
}, [accessToken, dispatch])

  return (
    <div>
      { auth.signIn && <NavBarComponent/> }
      <Switch>
        <Route exact path="/login"> <LoginPage /></Route>
        <PrivateRoute path="/admin" component={ManagerUser} authenticationPath='./login' exact />
        <PrivateRoute path="/teacher" component={ManageClass} authenticationPath='./login' exact />
        <PrivateRoute path="/student" component={StudentHomePage} authenticationPath='./login' exact />
        <PrivateRoute path="/teacher/class" component={ClassForm} authenticationPath='./login' exact />
        <PrivateRoute path="/teacher/class/:classId" component={ClassForm} authenticationPath='./login' exact />
        <Redirect to="/login"/>
      </Switch> 
    </div>
  );
}

export default App;
