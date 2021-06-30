import DaysOfMonth from "./DaysOfMonth"
import './calendar.css'
import { useCallback, useEffect, useState } from "react"
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';
import ClassesInMonth from "./ClassesInMonth";
import { ClassModel, CycleType } from "../../../interface/models";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../..";
import { fetchClassesRequest } from "../../../reducers/actionCreators";


export const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

export const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const daysInMonth = (month: number) => {
    const year = new Date().getFullYear();
    const d = new Date(year, month + 1, 0);
    return d.getDate(); // how many days in a month 
  }


const Calendar = () => {
    const dispatch = useDispatch()
    const [selectedMonth, setSelectedMonth] = useState<number>(0)
    const [selectedYear, setSelectedYear] = useState<number>(0)
    const [selectedDay, setSelectedDay] = useState<number|null>(new Date().getDate())
    const [ selectedClass, setSelectedClass] = useState<ClassModel|undefined>()
    const { classList } = useSelector((state: RootState) => state.teacher)
    const [ classListInMonth, setClassListInMonth ] = useState<ClassModel[]>([])

    const allClassesInMonth = useCallback(() => {
        const allClasses: ClassModel[] = []

        for(let eachClass of Object.values(classList)) {
            const dateOfClass = new Date(eachClass.startDate)

            if(eachClass.repeat.cycle === CycleType.DAILY){
                Array.from({ length: daysInMonth(selectedMonth) }, (k, v) => v + 1).forEach(date => {
                    const eachDate = new Date(selectedYear, selectedMonth, date, 23, 59, 59) // refractor the below code using this line
                    if (dateOfClass <= eachDate){
                        allClasses.push({...eachClass, startDate: eachDate.toDateString()})
                    }
                })
            }

            if(eachClass.repeat.cycle === CycleType.FORNIGHTLY){
                // if the class start in the current month of the same year
                if (dateOfClass.getFullYear() === selectedYear && dateOfClass.getMonth() === selectedMonth){
                    for (let date = new Date(eachClass.startDate).getDate(), len = daysInMonth(selectedMonth); date < len ; date += 14){
                        let eachDate = new Date(selectedYear, selectedMonth, date, 23, 59, 59)
                        allClasses.push({...eachClass, startDate: eachDate.toDateString()})
                    }
                }
                // if the class start in past month of the same year or previous year
                if ((dateOfClass.getFullYear() === selectedYear && dateOfClass.getMonth() < selectedMonth) || (dateOfClass.getFullYear() < selectedYear)){
                    const day = new Date(selectedYear, selectedMonth, 1)

                    while (Math.round(Math.abs((day.getTime() - dateOfClass.getTime())/(1000*3600*24))) % 14 !== 0){
                        day.setDate(day.getDate() + 1)
                    }

                    for (let date = day.getDate(), len = daysInMonth(selectedMonth); date < len ; date += 14){
                        const eachDate = new Date(selectedYear, selectedMonth, date, 23, 59, 59)
                        allClasses.push({...eachClass, startDate: eachDate.toDateString()})
                    }
                }
            }

            if(eachClass.repeat.cycle === CycleType.WEEKLY){
                // if the class start in the current month of the same year
                if (dateOfClass.getFullYear() === selectedYear && dateOfClass.getMonth() === selectedMonth){
                    for (let date = new Date(eachClass.startDate).getDate(), len = daysInMonth(selectedMonth); date < len ; date += 7){
                        const eachDate = new Date(selectedYear, selectedMonth, date, 23, 59, 59)
                        allClasses.push({...eachClass, startDate: eachDate.toDateString()})
                    }
                }
                // if the class start in past month of the same year or previous year
                if ((dateOfClass.getFullYear() === selectedYear && dateOfClass.getMonth() < selectedMonth) || (dateOfClass.getFullYear() < selectedYear)){
                    const day = new Date(selectedYear, selectedMonth, 1)
                    while (day.getDay() !== dateOfClass.getDay()){
                        day.setDate(day.getDate() + 1)
                    }
                    for (let date = day.getDate(), len = daysInMonth(selectedMonth); date < len ; date += 7){
                        const eachDate = new Date(selectedYear, selectedMonth, date, 23, 59, 59)
                        allClasses.push({...eachClass, startDate: eachDate.toDateString()})
                    }
                }
            }

            if(eachClass.repeat.cycle === CycleType.MONTHLY){
                // if the class start in past month of the same year or previous year 
                if ((dateOfClass.getFullYear() === selectedYear && dateOfClass.getMonth() <= selectedMonth) || dateOfClass.getFullYear() < selectedYear){
                    allClasses.push({...eachClass, startDate: new Date(selectedYear, selectedMonth, dateOfClass.getDate()).toDateString()})
                }
            }
        }
        setClassListInMonth(allClasses)
    }, [selectedYear, selectedMonth, JSON.stringify(classList)])

    useEffect(() => {
        const now = new Date()
        setSelectedMonth(now.getMonth())
        setSelectedYear(now.getFullYear())
    }, [])


    useEffect(() => {
        console.log("called useEffect", classList)
        dispatch(fetchClassesRequest({}))
        allClassesInMonth()
        setSelectedClass(undefined)
    }, [dispatch, allClassesInMonth])

    const decreaseMonth = () => {
        console.log(selectedMonth)
        if (selectedMonth === 0){
            setSelectedYear(selectedYear - 1)
        }
        setSelectedMonth(Math.abs((selectedMonth + 12 - 1) % 12))
        setSelectedDay(null)
    }

    const increaseMonth = () => {
        console.log(selectedMonth)
        if (selectedMonth === 11){
            setSelectedYear(selectedYear + 1)
        }
        setSelectedMonth(Math.abs((selectedMonth + 1) % 12))
        setSelectedDay(null)
    }
    
    const handleSelectDay = (day: number) => {
        setSelectedDay(day)
    }

    const classesOnDate = (date: number) => {
        const classesArray = []
        for(let eachClass of classListInMonth){
            const classDate = new Date(eachClass.startDate).getDate()
            if (classDate === date){
                classesArray.push(eachClass)
            }
        }
        return classesArray
    }

    const handleClickClass = (classId : string, startDate: string) => {
        const clickedClass = classListInMonth.find(classModel => classModel._id === classId && classModel.startDate === startDate)
        setSelectedClass(clickedClass)
    }

    const displayClassesOndate = () => {
        if (selectedDay){
            const classes = classesOnDate(selectedDay)
            return (
                classes.length > 0 ?
                classesOnDate(selectedDay).map((eachClass, idx) => 
                    <div className="row ml-3 mt-3 classDetailRow" key={idx}>
                        <p> {eachClass.repeat.startTime} - {eachClass.repeat.endTime} </p> 
                        <span 
                            className="ml-3" 
                            onClick={()=>handleClickClass(eachClass._id, eachClass.startDate)}
                        > {eachClass.className}</span>
                    </div> 
                    ): 
                <div>
                    No events
                </div>
            )
        }
    }

    return (
        <>
            <div className="calendarContainer">
                <div className="calendar  mt-5">
                    <div className="header">
                        <div className="headeInfo">
                            <span className="mr-2"> {months[selectedMonth]} </span>
                            <span>{selectedYear}</span>
                        </div>
                        <div className="headerIcons">
                            <span onClick={decreaseMonth}> <BsFillCaretLeftFill /> </span>
                            <span onClick={increaseMonth}> <BsFillCaretRightFill /> </span>
                        </div>
                    </div>

                    <div className="weekrow">
                    {
                        weekdays.map(weekday => {
                            return (
                                <span key={weekday} className="weekday">
                                    {weekday}
                                </span>
                            );
                        })
                    }
                    </div>
                    
                    <DaysOfMonth
                        days={daysInMonth(selectedMonth)}
                        month={selectedMonth}
                        year={selectedYear}
                        selectedDay = {selectedDay}
                        handleSelectDay = {handleSelectDay}
                        classListInMonth={classListInMonth}
                    />
                    
                    {
                        selectedDay &&
                        <div className="footer">
                            <span className="footerInfo">
                                <b>{selectedDay} {months[selectedMonth]} {selectedYear}</b>
                                {displayClassesOndate()}
                            </span>
                        </div>
                    }

                </div>

                <div className="classInMonthTable">
                    <ClassesInMonth 
                        handleClickClass={handleClickClass} 
                        classListInMonth={classListInMonth}
                        year={selectedYear}
                        month={selectedMonth}
                    />

                    {
                        selectedClass && 
                        <div className="card">
                            <div className="classDetailContainer">
                                <h4><b>{selectedClass.className}</b></h4> 
                                <p>{selectedClass.startDate}</p> 
                                <p>{selectedClass.repeat.startTime}</p> 
                                <p>{selectedClass.repeat.endTime}</p> 
                                <p>{selectedClass.repeat.cycle}</p> 
                            </div>
                        </div>
                    }

                </div>

            </div>
        </>
    )
}

export default Calendar
