import { Student, Teacher } from "../../interface/models"
import "./dataTable.css"
import { Button, ButtonLabel } from "./styledComponents"


const DataTable = (props: {headers: string[], body?: Student[] | Teacher[]}) => {
    return(
        <table>
            <thead>
                {
                   props.headers.map(header => 
                    <th key={header}>{header}</th>
                    )
                }
            </thead>
            <tbody>
                <tr>
                    <td> 123 </td>
                    <td> 234 </td>
                    <td> 345 </td>
                    <td> 
                        <Button 
                            bgColor="white" 
                            hoveredBgColor="red"
                            borderColor= "red"
                            hoveredLabelColor="white"
                        > 
                            <ButtonLabel color="red"> Delete </ButtonLabel>
                        </Button>                         
                    </td>
                </tr>   
                <tr>
                    <td> 123 </td>
                    <td> 234 </td>
                    <td> 345 </td>
                    <td> 
                        <Button 
                            bgColor="white" 
                            hoveredBgColor="red"
                            borderColor= "red"
                            hoveredLabelColor="white"
                        > 
                            <ButtonLabel color="red"> Delete </ButtonLabel>
                        </Button>                         
                    </td>
                </tr>                       
            </tbody>
        </table>
    )
}

export default DataTable 