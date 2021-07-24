import React from 'react'
import { BsServer, BsCalendarFill } from 'react-icons/bs'



export const SidebarData : {title: string, icon: JSX.Element, link: string} [] = [
    {
        title : "Manage Class",
        icon: <BsServer />,
        link: "/teacher/classes"
    },
    {
        title: "Calendar",
        icon: <BsCalendarFill />,
        link: "/teacher/calendar"
    }
]