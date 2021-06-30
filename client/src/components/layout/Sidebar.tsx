import { Link, useLocation } from "react-router-dom"
import { SidebarData } from "./SidebarData";
import './sidebar.css'

const Sidebar = () => {
    const location = useLocation();
    return (
        <div className="Sidebar">
            <ul className="SidebarList">
                {SidebarData.map((val,key)=> {
                    return(
                    <Link to={val.link} >
                        <li 
                            key={key}
                            className="row"
                            id={location.pathname === val.link ? "active" : ""}
                        >
                        {/* Sets sidebar navigation to active (blue) if the current page is the same in sidebar*/}

                            <div id="icon">
                                {val.icon}
                            </div>
                            <div id="title">
                                {val.title}
                            </div>
                            </li>
                    </Link>
                    )
                })}
            </ul>
        </div>
    )
}

export default Sidebar