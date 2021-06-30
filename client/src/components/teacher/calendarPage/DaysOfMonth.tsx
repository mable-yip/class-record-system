import { useEffect, useState } from 'react';
import './calendar.css'
import { BsDot } from 'react-icons/bs'
import { ClassModel } from '../../../interface/models';
import { IconContext } from 'react-icons/lib';

interface Props {
    days: number, 
    month: number,
    year: number,
    selectedDay: number|null,
    handleSelectDay: (day: number) => void,
    classListInMonth: ClassModel[]
}

const DaysOfMonth = (props : Props) => {

    const [daysHaveClasses, setDaysHaveClasses] = useState<number[]>([])

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

    const isWeekend = (day: number) => {
      return (day + dayToBeginTheMonthFrom) % 7 === 1 || (day + dayToBeginTheMonthFrom) % 7 === 0
    }

    useEffect(() => {
      const dayArray : number[] = []
      for(let eachClass of props.classListInMonth){
        const classDate = new Date(eachClass.startDate)
        dayArray.push(classDate.getDate())
      }
      setDaysHaveClasses(dayArray)
    }, [props.classListInMonth])

    return(
      <>
        {
          days.map((day, i) => {
              return (
                <span key={i}
                  className={
                    `day
                    ${ day === props.selectedDay ? "selectedDay" : ""}                    
                    ${ isCurrentDay(day) ? "today" : ""}
                    ${ isWeekend(day)? "weekend" : ""}`
                  }
                  style={i === 0 ? style : {}}
                  onClick={() => props.handleSelectDay(day)}
                > 
                  {day/10 >= 1 ? day : `0${day}`} 
                  <div className="row">
                    {
                      daysHaveClasses.includes(day) &&
                      <>
                      <IconContext.Provider
                        value={{ color: day === props.selectedDay ? "white" :'#4682B4'}}
                      ><BsDot />
                      </IconContext.Provider>

                      {/* <IconContext.Provider
                      value={{ color: '#4682B4'}}
                      ><BsDot />
                      </IconContext.Provider> */}

                      </>
                    }

                  </div>
                  
                </span>
              );
            }
          )
        }
      </>
    )
}

export default DaysOfMonth