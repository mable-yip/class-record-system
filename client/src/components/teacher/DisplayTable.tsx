import { Table } from "react-bootstrap"
import { useDispatch } from "react-redux";
import { ClassModel } from "../../interface/models";
import { deleteClassRequest } from "../../reducers/actionCreators";
import { Link } from 'react-router-dom'
import { ButtonLabel, Button } from "../common/styledComponents"


interface Props { 
    list: { 
        [_id: string]: ClassModel 
    }
}

//params
const DisplayTable = (props: Props) => {
    const dispatch = useDispatch()
    const listArray  = Object.values(props.list)

    const handleDelete = (classId: string) => {
        dispatch(deleteClassRequest({
            body: null,
            params: classId
        }))
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Class Name</th>
                    <th>Start</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    listArray.map(classObj => 
                        <tr key={classObj._id}>
                            <td> 
                                <Link to={`/teacher/${classObj._id}`}>
                                    {classObj.className}
                                </Link> 
                            </td>
                            <td> {classObj.startDate} </td>
                            <td> 
                                <Button 
                                    bgColor="#1E90FF" 
                                    hoveredBgColor="#4169E1"
                                    borderColor= "#1E90FF"
                                    onClick={() => handleDelete(classObj._id)}>
                                    <ButtonLabel
                                        color="white"
                                        hoveredColor="white"
                                    >
                                        Delete
                                    </ButtonLabel>
                                </Button>                             
                            </td>
                        </tr>                        
                    )
                }
            </tbody>
        </Table>
    )
}

export default DisplayTable