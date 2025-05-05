import {Outlet,NavLink} from "react-router";
import "./navigation.css";
import SearchEngine from "./SearchEngine.jsx";

export default function Navigation() {
    return <>
            <header>
                <nav className="navigation">
                    <h1>
                        <NavLink className="link" to="/">
                            <img src="/images/logo.png" width="64" height="64" alt="logo" />
                        </NavLink>
                    </h1> 
                    <SearchEngine/>
                    <button className="mobile-menu">X</button>
                    <ul className="tab-list">
                        <li className="tab-item">
                            <NavLink className="link" to="/info">info</NavLink>
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
