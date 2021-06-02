import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { RootState } from "../..";
import NavbarComponent from "../common/NavBarComponent";
import SearchStudent from "./SearchStudent";
import { ButtonLabel, Button } from "../common/styledComponents"
import "./classDetail.css"

interface ParamTypes {
    class_id: string
}

const ClassDetail = () => {
    let history = useHistory();
    const { class_id } = useParams<ParamTypes>()
    const { classList } = useSelector((state: RootState) => state.teacher)

    console.log(classList)

    const handleClick = () => {
        history.push("/teacher");
    }
    
    return(
        <div>
            <NavbarComponent />
            <div className="container mt-4">
                <div className="classDetail">
                    <h3>ClassName: {classList[class_id].className}</h3>
                    <h3>Start Date: {classList[class_id].startDate}</h3>
                    <h3>Start Time: {classList[class_id].repeat.startTime} </h3>
                    <h3>End Time: {classList[class_id].repeat.endTime} </h3>
                    <h3>Repeat: {classList[class_id].repeat.cycle} </h3>

                </div>
                <div className="searchStudent">
                    <SearchStudent />
                </div>
            </div>

            <Button 
                bgColor="white" 
                hoveredBgColor="black"
                borderColor= "black"
                onClick={handleClick}
            > 
                <ButtonLabel
                    color="black"
                    hoveredColor="white"
                > 
                    Back 
                </ButtonLabel>
            </Button>

        </div>
    )
}

export default ClassDetail