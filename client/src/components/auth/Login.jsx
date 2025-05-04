import {useContext, useState, useRef} from "react";
import {Navigate,Link} from "react-router";
import "./login.css";
import Inherit from "../../App.jsx"

const defaultData = {
    login:"",
    password:"",
}

const defaultLogs = {
    loading:false,
    logged:false,
}

export default function Login() {
    const [data, setData] = useState(defaultData);
    const [logs, setLogs] = useState(defaultLogs);
    const password = useRef(null);
    const parentContext = useContext(Inherit);

    function updateLogs(status,value) {
        setLogs(prev => ({...prev,[status]:value}));
    }

    function updateData(e) {
        const {name,value} = e.target;
        setData((prev) => ({...prev,[name]:value}))
    }
    
    function showPassword() {
        const {type} = password.current;
        function set(type) {
            password.current.type = type;
        }
        if(type == "text") return set("password"); 
        set("text");
    }
    async function login(e) {
        try {
            e.preventDefault();
            updateLogs("loading",true);

            const options = {
                method:"POST",
                headers: {
                    "Content-Type":"application/json",
                },
                credentials:"include",
                body:JSON.stringify(data),
            }
            
            const res = await fetch(`${process.env.VITE_API_URL}/login`,options);
            if(!res.ok) throw res.status;
            parentContext.refreshUser();
            updateLogs("logged", true);
        } catch(err) {
            console.log(err);
         } finally {
            updateLogs("loading",false);
         }
        
    }
    if(logs.logged) return <Navigate to="/auth-two"/>

    return <div className="login-container">
            <form className="login-box" onSubmit={login}>
                <header className="title-box">
                    <h2 className="title">Login</h2>
                </header>
                <label htmlFor="login-inp">Login</label>
                <input id="login-inp" placeholder="Login" value={data.login} onChange={updateData} minLength="3" maxLength="60" name="login" type="email" required/>
                <label htmlFor="pass-inp">Password</label>
                <input ref={password} placeholder="Password" value={data.password} onChange={updateData} type="password" minLength="8" maxLength="32" name="password" id="pass-inp" required/>
        
                <button onClick={showPassword} className="show-pass-btn" type="button">Show Password</button>
                <button className="submit-btn" disabled={logs.loading} type="submit">{logs.loading? "Loading": "Login"}</button>
            </form>
            <Link to="/create-account">Register</Link>
        </div>
}
