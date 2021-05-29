import React, {useState} from 'react'
import { Button, Form, FormGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { APIMethod, ClassModelPreview, CycleType } from '../../interface/models'
import { createClassRequest } from '../../reducers/actionCreators';

const InputClassForm = (props: {teacherEmail: string, closeModal: () => void} ) => {
    const dispatch = useDispatch()
    const [form, setForm] = useState<ClassModelPreview>({ className:"", teacherEmail: props.teacherEmail, studentsEmail:[], startDate:"", repeat: {
        cycle: "",
        startTime: "",
        endTime: ""
    }})

    const handleOnChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        setForm({...form, [key]: newValue})
    }

    const handleSubmit = () => {
        console.log("```", form)
        dispatch(createClassRequest({
            method: APIMethod.POST,
            path: "teacher/class",
            body: form
        }))
        setForm({ className:"", teacherEmail: props.teacherEmail, studentsEmail:[], startDate:"", repeat: {
            cycle: "",
            startTime: "",
            endTime: ""
        }})
    }

    return (
        <div>
            <Form>
                <FormGroup>
                    <Form.Label>Class Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Class Name" 
                        value={form.className}
                        onChange={handleOnChange("className")}
                    />
                </FormGroup>

                <FormGroup>
                    <Form.Label>Start date</Form.Label>
                    <Form.Control 
                        type="date" 
                        placeholder="Start date" 
                        value={form.startDate}
                        onChange={handleOnChange("startDate")}
                    />
                </FormGroup>

                <FormGroup>
                    <Form.Label>Start time</Form.Label>
                    <Form.Control 
                        type="time" 
                        placeholder="Start time" 
                        value={form.repeat.startTime}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>)=> setForm({...form, repeat: {...form.repeat, startTime: event.target.value}})}
                    />
                </FormGroup>

                <FormGroup>
                    <Form.Label>End time</Form.Label>
                    <Form.Control 
                        type="time" 
                        placeholder="End time" 
                        value={form.repeat.endTime}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>)=> setForm({...form, repeat: {...form.repeat, endTime: event.target.value}})}
                    />
                </FormGroup>

                <FormGroup>
                    <Form.Label>Cycle</Form.Label>
                    <Form.Control 
                        as="select" 
                        value={form.repeat.cycle}
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>)=> setForm({...form, repeat: {...form.repeat, cycle: event.target.value}})}
                    >
                        <option> {CycleType.DAILY} </option>
                        <option> {CycleType.WEEKLY} </option>
                        <option> {CycleType.FORNIGHTLY} </option>
                        <option> {CycleType.MONTHLY} </option>
                    </Form.Control>
                </FormGroup>

                <Button
                    className="btn-lg btn-dark btn-block"
                    onClick={() => {
                        handleSubmit()
                        props.closeModal()
                    }}
                >
                    Create Class
                </Button>

            </Form>
        </div>
    )
}

export default InputClassForm 