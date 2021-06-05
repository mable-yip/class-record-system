import React, {useState} from 'react'
import { Button, Form, FormGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { ClassModel, ClassModelPreview, CycleType, InputFormType } from '../../interface/models'
import { createClassRequest, updateClassRequest } from '../../reducers/actionCreators';

interface Props {
    teacherEmail: string, 
    closeModal: () => void, 
    formType: InputFormType.CREATE | InputFormType.EDIT,
    class?: ClassModel
}

const InputClassForm = (props: Props ) => {
    const dispatch = useDispatch()
    const [form, setForm] = useState<ClassModelPreview>(props.class? 
        { 
            className: props.class.className, 
            teacherEmail: props.teacherEmail, 
            studentsEmail:props.class.studentsEmail, 
            startDate:props.class.startDate, 
            repeat: {
                cycle: props.class.repeat.cycle,
                startTime: props.class.repeat.startTime,
                endTime: props.class.repeat.endTime
            }
        } :
        { 
            className:"", 
            teacherEmail: props.teacherEmail, 
            studentsEmail:[], 
            startDate:"", 
            repeat: {
                cycle: "",
                startTime: "",
                endTime: ""
            }
        }
    )

    const handleOnChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        setForm({...form, [key]: newValue})
    }

    const handleSubmit = () => {
        if (props.formType === InputFormType.CREATE){
            dispatch(createClassRequest({
                body: form
            }))
        }
        if (props.formType === InputFormType.EDIT){
            dispatch(updateClassRequest({
                body: form,
                params: props.class?._id
            }))
        }

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
                    Confirm
                </Button>

            </Form>
        </div>
    )
}

export default InputClassForm 