import React, { useState } from 'react'
import { Button, Form, FormGroup } from 'react-bootstrap';
import './LoginPage.css'
import { login } from '../../actions/login'
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

const LoginPage = () => {
    const [signinInfo, setSigninInfo] = useState({ email:"", password:""})
    const history = useHistory()
    const dispatch = useDispatch()

    const handleOnChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) =>{
        const newValue = event.target.value
        setSigninInfo({...signinInfo, [key]: newValue})
    }

    const handleClick = () => {
        dispatch(login(signinInfo, history))
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
                    onClick={handleClick}
                >
                    Log in
                </Button>
            </Form>
        </div>
    )
}

export default LoginPage