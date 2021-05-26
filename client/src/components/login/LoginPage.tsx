import React, { useEffect, useState } from 'react'
import { Button, Form, FormGroup } from 'react-bootstrap';
import './LoginPage.css'
import { login } from '../../actions/auth'
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { UserType } from '../../interface/models';
import { RootState } from '../..';

const LoginPage = () => {
    const [signinInfo, setSigninInfo] = useState({ email:"", password:""})
    const { authData } = useSelector((state: RootState) => state.auth)
    const history = useHistory()
    const dispatch = useDispatch()

    const handleOnChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) =>{
        const newValue = event.target.value
        setSigninInfo({...signinInfo, [key]: newValue})
    }

    useEffect(()=>{
        if(authData){
            if(authData.userType === UserType.ADMIN){
                history.push('/admin')
            } else if (authData.userType === UserType.STUDENT){
                history.push('/student')
            } else if (authData.userType === UserType.TEACHER){
                history.push('/teacher')
            }
        }
    }, [authData])

    const handleLogin = async() => {
        dispatch({
            type: "LOGIN_REQUEST",
            payload: {
                method: "POST",
                path: "login",
                body: signinInfo
            }
        })
        console.log(authData)
    }

    return (
        <div>
            <Form className="login-form">
                <h1 className="text-center"> Class Record System </h1>

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
                <Button
                    className="btn-lg btn-dark btn-block"
                    onClick={() => handleLogin()}
                >
                    Log in
                </Button>
            </Form>
        </div>
    )
}

export default LoginPage