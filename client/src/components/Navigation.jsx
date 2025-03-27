import {Outlet,NavLink} from "react-router";
export default function Navigation() {
    return <>
            <header>
                <nav className="navigation">
                    <NavLink to="/">Wall</NavLink>
                 </nav>
            </header>
            <Outlet/>
        </>
}
