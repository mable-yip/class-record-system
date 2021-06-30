import { ClassModel } from "../../../interface/models"
import DataTable from "../../common/DataTable"
import { months } from "./Calendar"
import './classesInMonth.css'

interface Props {
    handleClickClass: (classId: string, startDate: string) => void, 
    classListInMonth: ClassModel[],
    year: number,
    month: number
}

const ClassesInMonth = (props: Props) => {
    const headers = ["#", "Class Name", "Date", "Start Time", "# of students"]
    
    return(
        <div>
            <h2> Classes on {months[props.month]}, {props.year} </h2>
            <DataTable 
                headers={() => headers.map(header => 
                    <th key={header}> {header} </th>)
                }
                body={() => props.classListInMonth.map((eachClass, idx) => 
                    <>
                    <tr key={idx} onClick={() => props.handleClickClass(eachClass._id, eachClass.startDate)}>
                        <td> {idx + 1}</td>
                        <td> {eachClass.className}</td>
                        <td> {eachClass.startDate} </td>
                        <td> {eachClass.repeat.startTime} </td>
                        <td> {eachClass.studentsEmail.length} </td>
                    </tr>
                    </>)
                }
            />
        </div>
    )
}

export default ClassesInMonth