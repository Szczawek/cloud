import {useContext, useEffect, useState, useRef} from "react";
import {Navigate,Link} from "react-router";
import "./login.css";

const defaultData = {
    login:"",
    password:"",
}

const defaultLogs = {
    loading:false,
    logged:false,
    incorrectPass:false,
}

export default function Login() {
    const [data, setData] = useState(defaultData);
    const [logs, setLogs] = useState(defaultLogs);
    const password = useRef(null);

    useEffect(()=> {
        if(logs.incorrectPass) { 
            const timmer = setTimeout(()=> {
            updateLogs("incorrectPass",false);
        },1000)
        return ()=> clearTimeout(timmer);
    }
    },[logs])

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
            updateLogs("logged", true);
        } catch(err) {
            console.log(err);
            updateLogs("incorrectPass",true)
            console.log(err);
         } finally {
            updateLogs("loading",false);
         }
        
    }
    if(logs.logged) return <Navigate to="/auth-code"/>

    return <div className="login-container">
        {logs.incorrectPass && <div className="info-window">
            <p>Incorrect data</p></div>}   
        <form className="login-box" onSubmit={login}>
                <header className="title-box">
                    <h2 className="title">Login</h2>
                </header>
                <div className="fields">
                    <label className="subtitle-box" htmlFor="login-inp">Login</label>
                    <input id="login-inp" placeholder="Login" value={data.login} onChange={updateData} minLength="3" maxLength="60" name="login" type="email" required/>
                    <label className="subtitle-box" htmlFor="pass-inp">Password</label>
                    <input ref={password} placeholder="Password" value={data.password} onChange={updateData} type="password" minLength="8" maxLength="32" name="password" id="pass-inp" required/>
                    <button onClick={showPassword} className="show-pass-btn" type="button">X</button>
                </div>
                <button className="submit-btn" disabled={logs.loading} type="submit">{logs.loading? "Loading": "Login"}</button>
            </form>
            <div className="panel">
                <p className="desc">If you don't have account yet</p>
                <Link className="link" to="/create-account">Register</Link>
            </div>
        </div>
}
