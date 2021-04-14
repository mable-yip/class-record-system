import React, {useState} from 'react'
import { Button, Form, FormGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createUser } from '../../actions/user';

const InputForm = (props: {userType: string} ) => {
    const dispatch = useDispatch()
    const [form, setForm] = useState({ firstName:"", lastName: "", email:"", password:"", userType: props.userType, confirmedPassword: ""})
    const handleOnChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const newValue = event.target.value
        setForm({...form, [key]: newValue})
    }

    const handleSubmit = () => {
        if (form.password !== form.confirmedPassword){
            alert("Passwords does not match!")
        } else{
            dispatch(createUser(form))
            setForm({ firstName:"", lastName: "", email:"", password:"", userType: props.userType, confirmedPassword: ""})
        }

    }

    return (
        <div>
            <Form>
                <FormGroup>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="First Name" 
                        value={form.firstName}
                        onChange={handleOnChange("firstName")}
                    />
                </FormGroup>

                <FormGroup>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Last Name" 
                        value={form.lastName}
                        onChange={handleOnChange("lastName")}
                    />
                </FormGroup>

                <FormGroup>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Email" 
                        value={form.email}
                        onChange={handleOnChange("email")}
                    />
                </FormGroup>

                <FormGroup>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={form.password}
                        onChange={handleOnChange("password")}
                    />
                </FormGroup>

                <FormGroup>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Confirm Password" 
                        value={form.confirmedPassword}
                        onChange={handleOnChange("confirmedPassword")}
                    />
                </FormGroup>

                <Button
                    className="btn-lg btn-dark btn-block"
                    onClick={handleSubmit}
                >
                    Create {props.userType.charAt(0).toUpperCase() + props.userType.slice(1)}
                </Button>

            </Form>
        </div>
    )
}

export default InputForm 