import React, { useState } from 'react'
import { Button, Form, FormGroup } from 'react-bootstrap';
import './LoginPage.css'
import { login } from '../../actions/auth'
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { UserType } from '../../interface/models';

const LoginPage = () => {
    const [signinInfo, setSigninInfo] = useState({ email:"", password:""})
    const history = useHistory()
    const dispatch = useDispatch()

    const handleOnChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) =>{
        const newValue = event.target.value
        setSigninInfo({...signinInfo, [key]: newValue})
    }

    const handleLogin = async() => {
        let action = await login(signinInfo)
        dispatch(action)

        if (action){    
            if(action.payload.userType === UserType.ADMIN){
                history.push('/admin')
            } else if (action.payload.userType === UserType.STUDENT){
                history.push('/student')
            } else if (action.payload.userType === UserType.TEACHER){
                history.push('/teacher')
            }
        }
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