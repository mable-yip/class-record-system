import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom'
import { RootState } from '..';
import { loginSuccess } from '../reducers/actionCreators';
import ManagerUser from './admin/ManageUser';
import NavBarComponent from './common/NavBarComponent';
import LoginPage from './login/LoginPage'
import StudentHomePage from './student/StudentHomePage';
import ClassDetail from './teacher/ClassDetail';
import ManageClass from './teacher/ManageClass';

const App = () =>{
  const dispatch = useDispatch()
  const accessToken = localStorage.getItem('profile')
  const auth = useSelector((state: RootState) => state.auth) 
  
  useEffect(() => {
    if (accessToken){
        dispatch(loginSuccess(accessToken))
    }
}, [dispatch])

  return (
    <div>
      { auth.signIn && <NavBarComponent/> }
      <Switch>
        <Route exact path="/login"> <LoginPage /></Route>
        <Route exact path="/admin"> < ManagerUser/></Route>
        <Route exact path="/teacher"> <ManageClass /></Route>
        <Route exact path="/student"> <StudentHomePage /></Route>
        <Route exact path="/teacher/:class_id"> <ClassDetail /></Route>
        <Redirect to="/login"/>
      </Switch> 
    </div>
  );
}

export default App;
