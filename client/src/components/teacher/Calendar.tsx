import DaysOfMonth from "./DaysOfMonth"
import './calendar.css'
import { useEffect, useState } from "react"
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';
import { Button, ButtonLabel } from "../common/styledComponents";
import { useHistory } from "react-router-dom";

const Calendar = () => {
    const [month, setMonth] = useState<number>(0)
    const [year, setYear] = useState<number>(0)
    const [selectedDay, setSelectedDay] = useState<number|null>(new Date().getDate())
    const history = useHistory()
    
    useEffect(() => {
        const now = new Date()
        setMonth(now.getMonth())
        setYear(now.getFullYear())
    }, [])

    const decreaseMonth = () => {
        console.log(month)
        if (month === 0){
            setYear(year - 1)
        }
        setMonth(Math.abs((month + 12 - 1) % 12))
        setSelectedDay(null)
    }

    const increaseMonth = () => {
        console.log(month)
        if (month === 11){
            setYear(year + 1)
        }
        setMonth(Math.abs((month + 1) % 12))
        setSelectedDay(null)
    }
    const daysInMonth = (month: number) => {
        const year = new Date().getFullYear();
        const d = new Date(year, month + 1, 0);
        return d.getDate();
      }
    
    const handleSelectDay = (day: number) => {
        setSelectedDay(day)
    }
      
    const months = [
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

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <>
            <div className="calendarContainer">
                <div className="calendar  mt-5">
                    <div className="header">
                        <div className="headeInfo">
                            <span className="mr-2">
                                {months[month]}
                            </span>
                            <span>{year}</span>
                        </div>
                        <div className="headerIcons">
                            <span onClick={decreaseMonth}>
                                <BsFillCaretLeftFill />
                            </span>
                            <span onClick={increaseMonth}>
                                <BsFillCaretRightFill />
                            </span>
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
                        days={daysInMonth(month)}
                        month={month}
                        year={year}
                        selectedDay = {selectedDay}
                        handleSelectDay = {handleSelectDay}
                    />
                </div>

                <div>
                    <h2> Classes on {selectedDay} {months[month]}, {year}</h2>
                </div>
            </div>

            <div className="buttons mt-5">
                <div>
                    <Button
                        bgColor="#1E90FF"
                        hoveredBgColor="#4169E1"
                        borderColor= "#1E90FF"
                        hoveredLabelColor="white"
                        onClick={() => history.push('/teacher/classes') }
                    >
                        <ButtonLabel color="white"> Back </ButtonLabel>
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Calendar
