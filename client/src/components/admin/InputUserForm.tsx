import React, {useState} from 'react'
import { Button, Form, FormGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createUser } from '../../actions/admin';
import { Teacher, Student, UserType} from '../../interface/models'

const InputForm = (props: {userType: UserType.TEACHER | UserType.STUDENT, closeModal: () => void} ) => {
    const dispatch = useDispatch()
    const [form, setForm] = useState<Teacher|Student>({ firstName:"", lastName: "", email:"", password:"", userType: props.userType})
    const [confirmedPassword, setConfirmedPassword] = useState("")

    const handleOnChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        setForm({...form, [key]: newValue})
    }

    const handleSubmit = () => {
        if (form.password !== confirmedPassword){
            alert("Passwords does not match!")
        } else{
            dispatch(createUser(form))
            setForm({ firstName:"", lastName: "", email:"", password:"", userType: props.userType})
            setConfirmedPassword("")
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
                        value={confirmedPassword}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setConfirmedPassword(event.target.value)}
                    />
                </FormGroup>

                <Button
                    className="btn-lg btn-dark btn-block"
                    onClick={() => {
                        handleSubmit()
                        props.closeModal()
                    }}
                >
                    Create {props.userType.charAt(0).toUpperCase() + props.userType.slice(1)}
                </Button>

            </Form>
        </div>
    )
}

export default InputForm 