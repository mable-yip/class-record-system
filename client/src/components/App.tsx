import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import AdminHomePage from './admin/AdminHomePage';
import LoginPage from './login/LoginPage'
import StudentHomePage from './student/StudentHomePage';
import ClassHistory from './teacher/ClassHistory';
import TeacherHomePage from './teacher/TeacherHomePage';
import TeacherManagerClass from './teacher/TeacherManageClass';

const App = () =>{
  return (
    <div>
      <Switch>
        <Route exact path="/login"> <LoginPage /></Route>
        <Route exact path="/admin"> < AdminHomePage/></Route>
        <Route exact path="/teacher"> <TeacherHomePage /></Route>
        <Route exact path="/student"> <StudentHomePage /></Route>
        <Route exact path="/teacher/manageClass"> <TeacherManagerClass /></Route>
        <Route exact path="/teacher/classHistory"> <ClassHistory /></Route>
        <Redirect to="/login" />
      </Switch> 
    </div>
  );
}

export default App;
