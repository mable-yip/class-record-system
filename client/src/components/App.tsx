import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import AdminHomePage from './admin/AdminHomePage';
import AdminManageStudent from './admin/AdminManageStudent';
import AdminManageTeacher from './admin/AdminManageTeacher';
import LoginPage from './login/LoginPage'
import StudentHomePage from './student/StudentHomePage';
import TeacherHomePage from './teacher/TeacherHomePage';

const App = () =>{
  return (
    <div>
      <Switch>
        <Route exact path="/login"> <LoginPage /></Route>
        <Route exact path="/admin"> < AdminHomePage/></Route>
        <Route exact path="/teacher"> <TeacherHomePage /></Route>
        <Route exact path="/student"> <StudentHomePage /></Route>
        <Route exact path="/admin/manageTeacher"> <AdminManageTeacher /></Route>
        <Route exact path="/admin/manageStudent"> <AdminManageStudent/></Route>
        <Redirect to="/login" />
      </Switch> 
    </div>
  );
}

export default App;
