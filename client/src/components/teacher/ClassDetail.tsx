import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { RootState } from "../..";
import SearchStudent from "./SearchStudent";
import { ButtonLabel, Button } from "../common/styledComponents"
import "./classDetail.css"
import { useEffect } from "react";
import { getClassRequest, updateClassRequest } from "../../reducers/actionCreators";
import { ClassModelPreview } from "../../interface/models";

interface ParamTypes {
    class_id: string
}

const ClassDetail = () => {
    let history = useHistory();
    const dispatch = useDispatch()
    const { class_id } = useParams<ParamTypes>()

    useEffect(() => {
        dispatch(getClassRequest({
            params: class_id
        }))
    }, [class_id])
    
    const { currentClass } = useSelector((state: RootState) => state.teacher)

    const deleteStudentFromClass = (deletedEmail: string) => {
        if(currentClass){
            const classModelPreview: ClassModelPreview = {
                className: currentClass.className,
                repeat: currentClass.repeat,
                startDate : currentClass.startDate,
                teacherEmail : currentClass.teacherEmail,
                studentsEmail : currentClass.studentsEmail.filter(email => email !== deletedEmail)
            }
    
            dispatch(updateClassRequest({
                body: classModelPreview,
                params: class_id
            }))
        }
    }

    const handleClick = () => {
        history.push("/teacher");
    }
    
    return(
        <div>
            <div className="container mt-4">
                <div className="classDetail">
                    <h3>ClassName: {currentClass?.className}</h3>
                    <h3>Start Date: {currentClass?.startDate}</h3>
                    <h3>Start Time: {currentClass?.repeat.startTime} </h3>
                    <h3>End Time: {currentClass?.repeat.endTime} </h3>
                    <h3>Repeat: {currentClass?.repeat.cycle} </h3>
                    <h3>
                        Student List:{
                        currentClass?.studentsEmail.map(email => (
                            <div key={email}>
                                {email} 
                                <button onClick={() => deleteStudentFromClass(email)}> Remove </button>
                            </div>
                        ))}
                    </h3>

                </div>
                <div className="searchStudent">
                    <SearchStudent />
                </div>
            </div>

            <Button 
                bgColor="white" 
                hoveredBgColor="black"
                borderColor= "black"
                hoveredLabelColor="white"
                onClick={handleClick}
            > 
                <ButtonLabel
                    color="black"
                > 
                    Back 
                </ButtonLabel>
            </Button>

        </div>
    )
}

export default ClassDetail
