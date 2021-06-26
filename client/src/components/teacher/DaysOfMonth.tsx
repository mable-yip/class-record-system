import { useState } from 'react';
import './calendar.css'

interface Props {
    days: number, 
    month: number,
    year: number,
    selectedDay: number|null,
    handleSelectDay: (day: number) => void
}

const DaysOfMonth = (props : Props) => {

    const firstDayOfMonth = (month: number) => {
      const year = new Date().getFullYear();
      const d = new Date(year, month, 1);
      return d.getDay();
    }

    const days = Array.from({ length: props.days }, (k, v) => v + 1);
    const dayToBeginTheMonthFrom = firstDayOfMonth(props.month)
    const style = { gridColumnStart: dayToBeginTheMonthFrom + 1 }

    const isCurrentDay = (day: number) => {
      const current = new Date()
      return current.getFullYear() === props.year && current.getMonth() === props.month && current.getDate() === day
    }

    const selectDay = (day: number) => {
      props.handleSelectDay(day)
    }

    return(
      <>
        {
          days.map((day, i) => {
              return (
                <span key={i}
                  className={`day
                    ${ day === props.selectedDay ? "selectedDay" : ""}                    
                    ${ isCurrentDay(day) ? "today" : ""}
                    ${
                      (i + dayToBeginTheMonthFrom) % 7 === 0 ||
                      (i + dayToBeginTheMonthFrom) % 7 === 6
                        ? "weekend" : ""
                    }`
                  }
                  style={i === 0 ? style : {}}
                  onClick={()=>selectDay(day)}
                > {day} </span>
              );
            }
          )
        }
      </>
    )
}

export default DaysOfMonth