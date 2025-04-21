import {Outlet,NavLink} from "react-router";
import "./navigation.css";

export default function Navigation() {
    return <>
            <header>
                <nav className="navigation">
                    <ul className="tab-list">
                        <li className="tab-item">
                            <NavLink className="link" to="/">Wall</NavLink>
                        </li>
                        <li className="tab-item">
                            <NavLink className="link" to="/info">info</NavLink>
                            </li>                        
                        <li className="tab-item">
                            <NavLink className="link" to="/home">Home</NavLink>
                        </li>
                        <li className="tab-item">
                            <NavLink className="link" to="/notification">Notification</NavLink>
                               </li>                        
                        <li className="tab-item">
                            <NavLink className="link" to="/profile">Profile</NavLink>
                        </li>
                    </ul>
                 </nav>
            </header>
            <Outlet/>
        </>
}
