import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from '../..'
import { deleteClassRequest, fetchClassesRequest } from "../../reducers/actionCreators"
import { ButtonLabel, Button } from "../common/styledComponents"
import "./manageClass.css"
import { useHistory } from "react-router-dom"
import DataTable from "../common/DataTable"

const ManagerClass = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { classList } = useSelector((state: RootState) => state.teacher)

    useEffect(() => {
        dispatch(fetchClassesRequest({}))
    }, [dispatch])

    const headers = ["Class Name", "Start Date", "Start Time", "End Time", "Frequency", "# of students", "Actions"]

    const handleDelete = (classId: string) => {
        dispatch(deleteClassRequest({
            body: null,
            params: classId
        }))
    }
    
    return(
        <div className="classList">
            <div className="row">
                <h1 className="ml-3">Manage Class</h1>
                <Button 
                    className="mt-2 ml-3"
                    bgColor="#1E90FF" 
                    hoveredBgColor="#4169E1"
                    borderColor= "#1E90FF"
                    hoveredLabelColor="white"
                    onClick={() => history.push('/teacher/class')}
                >
                    <ButtonLabel color="white"> Add Class </ButtonLabel>
                </Button>
            </div>

            <div className="mt-4">
                <DataTable 
                    headers={() => headers.map(header => 
                        <th key={header}> {header} </th>)
                    }
                    body={() => Object.values(classList).map(eachClass => 
                        <tr key={eachClass._id}>
                            <td> {eachClass.className} </td>
                            <td> {eachClass.startDate} </td>
                            <td> {eachClass.repeat.startTime} </td>
                            <td> {eachClass.repeat.endTime} </td>
                            <td> {eachClass.repeat.cycle} </td>
                            <td> {eachClass.studentsEmail.length} </td>
                            <td> 
                                <Button 
                                    bgColor="#1E90FF" 
                                    hoveredBgColor="#4169E1"
                                    borderColor= "#1E90FF"
                                    hoveredLabelColor="white"
                                    onClick={() => history.push(`/teacher/class/${eachClass._id}`)}>
                                    <ButtonLabel color="white"> Edit </ButtonLabel>
                                </Button>         
                                <Button 
                                    className="ml-3"
                                    bgColor="white" 
                                    hoveredBgColor="red"
                                    borderColor= "red"
                                    hoveredLabelColor="white"
                                    onClick={() => handleDelete(eachClass._id)}>
                                    <ButtonLabel color="red"> Delete </ButtonLabel>
                                </Button>   
                            </td>
                        </tr>)
                    }
                />
            </div>
        </div>
    )
}

export default ManagerClass