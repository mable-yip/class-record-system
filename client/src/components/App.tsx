import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom'
import { RootState } from '../index';
import { loginSuccess } from '../reducers/actionCreators';
import ManagerUser from './admin/ManageUser';
import NavBarComponent from './layout/NavBarComponent';
import LoginPage from './login/LoginPage'
import StudentHomePage from './student/StudentHomePage';
import ManageClass from './teacher/ManageClass';
import ClassForm from "./teacher/ClassForm";
import PrivateRoute from './route/PrivateRoute';
import Calendar from './teacher/calendarPage/Calendar';
import Breadcrumbs from './layout/Breadcrumbs';
import Sidebar from './layout/Sidebar';
import './app.css'

const App = () => {
  const dispatch = useDispatch()
  const accessToken = localStorage.getItem('profile')
  const auth = useSelector((state: RootState) => state.auth) 
  console.log("re-render: App")
  console.log("auth: ", auth.signIn)
  
  useEffect(() => {
    console.log("App", accessToken)
    if (accessToken){
        dispatch(loginSuccess(accessToken))
    }
}, [accessToken, dispatch])

  return (
        <Switch>
          <Route exact path="/login"> <LoginPage /></Route>
          <div>
            { auth.signIn &&<Sidebar />}
            <div className="appBody">
              { auth.signIn && <NavBarComponent/> }
              { auth.signIn && <Breadcrumbs/>}
              <PrivateRoute path="/admin" component={ManagerUser} authenticationPath='/login' exact />
              <PrivateRoute path="/student" component={StudentHomePage} authenticationPath='/login' exact />
              <PrivateRoute path="/teacher/classes" component={ManageClass} authenticationPath='/login' exact />
              <PrivateRoute path="/teacher/classes/new-class" component={ClassForm} authenticationPath='/login' exact />
              <PrivateRoute path="/teacher/classes/:classId" component={ClassForm} authenticationPath='/login' exact />
              <PrivateRoute path="/teacher/calendar" component={Calendar} authenticationPath='/login' exact />
              
            </div>
          </div>
          <Redirect to="/login"/>
        </Switch> 
  );
}

export default App;
