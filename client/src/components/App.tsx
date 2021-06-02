import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import ManagerUser from './admin/ManageUser';
import LoginPage from './login/LoginPage'
import StudentHomePage from './student/StudentHomePage';
import ClassDetail from './teacher/ClassDetail';
import ManageClass from './teacher/ManageClass';

const App = () =>{
  return (
    <div>
      <Switch>
        <Route exact path="/login"> <LoginPage /></Route>
        <Route exact path="/admin"> < ManagerUser/></Route>
        <Route exact path="/teacher"> <ManageClass /></Route>
        <Route exact path="/student"> <StudentHomePage /></Route>
        <Route exact path="/teacher/:class_id"> <ClassDetail /></Route>
        <Redirect to="/login" />
      </Switch> 
    </div>
  );
}

export default App;
