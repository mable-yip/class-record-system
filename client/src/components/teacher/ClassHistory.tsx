import NavbarComponent from "../common/NavBarComponent"
import { Button, Table } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useEffect } from "react"

const ClassHistory = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    // useEffect(() => {
    //     dispatch(getClassHistory())
    // }, [dispatch])

    return (
        <div>
            <NavbarComponent />
            <h1 className="text-center"> Class History </h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Date</th>
                    <th>Class Name</th>
                    <th>Students</th>
                    </tr>
                </thead>
                <tbody>
                    {

                    }
                </tbody>
                </Table>
            <Button variant="outline-dark" size="lg" onClick={()=>history.push('/teacher')}>
                Back
            </Button>
        </div>
    )
}

export default ClassHistory