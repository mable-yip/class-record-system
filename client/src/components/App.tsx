import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import AdminHomePage from './admin/AdminHomePage';
import LoginPage from './login/LoginPage'
import StudentHomePage from './student/StudentHomePage';
import ClassDetail from './teacher/ClassDetail';
import TeacherHomePage from './teacher/TeacherHomePage';
import TeacherManagerClass from './teacher/ManageClass';

const App = () =>{
  return (
    <div>
      <Switch>
        <Route exact path="/login"> <LoginPage /></Route>
        <Route exact path="/admin"> < AdminHomePage/></Route>
        <Route exact path="/teacher"> <TeacherHomePage /></Route>
        <Route exact path="/student"> <StudentHomePage /></Route>
        <Route exact path="/teacher/class"> <TeacherManagerClass /></Route>
        <Route exact path="/teacher/class/:class_id"> <ClassDetail /></Route>
        <Redirect to="/login" />
      </Switch> 
    </div>
  );
}

export default App;
