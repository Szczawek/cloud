import {confirmCode} from "./confirmCode.js";
import {useEffect, useRef, useState} from "react";
import {Navigate, Link} from "react-router";
import "./auth.css";

const stdStat = {
    error:false,
    loadding:true,
    accepted:false,
    incorrect:false,
};

const stdCode = {
    0:"",
    1:"",
    2:"",
    3:"",
    4:"",
    5:"",
}
export default function AuthTwo() {
    const [stat, setStat] = useState(stdStat);
    const [code, setCode] = useState(stdCode);
    const authCodeAlive = useRef(false);
    const [fill,setFill] = useState(0);
    const currentInp = useRef(null);
    const [position,setPosition] = useState(0);

    useEffect(()=> {
        const ele = currentInp.current;
        if(ele) ele.focus();
    },[position])

    function updateStat(tag,bool) {
        setStat(prev => ({...prev, [tag]:bool}));
    }

    function updateCode(e) {
        const {value,name} = e.target;
        if(isNaN(value)) return;
        if(fill < 5) setFill(prev =>prev + 1);
        changePosition("up");
        setCode(prev => ({...prev, [name]:value}));
    }

    function typeSign(e) {
        const char = e.key;
        if(!isNaN(char)) return;
        const {value,name} = e.target;
        switch(char) {
            case "Backspace": 
            if(fill > 0 ) setFill(prev => prev -1);
            setCode(prev =>({...prev,[name]:""}));
            changePosition("down");
            break;
        }
        e.preventDefault();

    }
    async function submit(e) {
        try {
            e.preventDefault();
            let authCode = "";
            for(const [_,value] of Object.entries(code)) {
                authCode += value;
            }
            const options = {
                method:"POST",
                credentials:"include",
                body:JSON.stringify(authCode),
            }
            const res = await fetch(`${process.env.VITE_API_URL}/confirm-code`, options);
            if(!res.ok) throw res.status;
            updateStat("accepted",true);
            console.log("ok")
        } catch(err) {
            console.error(err)
        } finally{
            updateStat("loading", false)
        }
    }
    
    function changePosition(action) {
        switch(action) {
            case "up":
                if(position < 5) setPosition(prev => prev + 1);
            break;
            case "down": 
                if(position > 0) setPosition(prev => prev -1);
            break;
        }
    }

    console.log(position)
    if(stat.accepted) return <Navigate to="/"/>

    if(stat.loading) return <div className="load-box"><p className="msg">Connecting with server . . .</p></div>

    return <form onSubmit={submit} className="auth-code">
            <div className="code-box">
                {[... new Array(6)].map((_,index) => {
                  return <label ref={index == position? currentInp: null} className="box" key={index}>
                            <input onKeyDown={typeSign} onClick={(e)=> setPosition(Number(e.target.name))} value={code[index]} name={index} onChange={updateCode} maxLength="1" minLength="1" required/>
                        </label>
                })}
            </div>
            <button type="submit" disabled={fill == 5? false: true}  className="sb-btn">Submit</button>
        </form>
}
