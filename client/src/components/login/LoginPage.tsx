import React, { useEffect, useState } from 'react'
import { Button, Form, FormGroup } from 'react-bootstrap';
import './LoginPage.css'
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { UserType } from '../../interface/models';
import { RootState } from '../..';
import { loginRequest } from '../../reducers/actionCreators';
import ErrorMessage from '../common/ErrorMessage';
import DataTable from '../common/DataTable';

const LoginPage = () => {
    const [signinInfo, setSigninInfo] = useState({ email:"", password:""})
    const { signIn, userType, loading, error } = useSelector((state: RootState) => state.auth)
    const history = useHistory()
    const dispatch = useDispatch()

    const handleOnChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) =>{
        const newValue = event.target.value
        setSigninInfo({...signinInfo, [key]: newValue})
    }

    useEffect(()=>{
        if(signIn){
            if(userType === UserType.ADMIN){
                history.push('/admin')
            } 
            if (userType === UserType.STUDENT){
                history.push('/student')
            } 
            if (userType === UserType.TEACHER){
                history.push('/teacher')
            }
        }
    }, [signIn])

    const handleLogin = async() => {
        dispatch(loginRequest({
            body: signinInfo
        }))
    }

    return (
        <div>
            <Form className="login-form">
                <h1 className="text-center"> Class Record System </h1>
                {
                    loading ? 
                    <h2> Loading... </h2> :
                    <div>
                        <FormGroup>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Email" 
                                value={signinInfo.email}
                                onChange={handleOnChange("email")}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Form.Label>Password </Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                value={signinInfo.password}
                                onChange={handleOnChange("password")}
                            />
                        </FormGroup>
                    </div>
                }
                <ErrorMessage errorMessage={error}/>
                <Button className="btn-lg btn-dark btn-block" onClick={handleLogin}>
                    Log in
                </Button>
            </Form>
            <DataTable headers={["Name", "email", "action"]}/>
        </div>
    )
}

export default LoginPage