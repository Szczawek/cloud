import {createCode, passCode} from "./authCode.js";
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

    useEffect(()=>{
            if(!authCodeAlive) refreshCode() 
    },[])

    function updateStat(tag,bool) {
        setStat(prev => ({...prev, [tag]:bool}));
    }
    async function refreshCode() {
        try {
            authCodeAlive.current = true;
            const  recipient = "szczawik.rozwoju@wp.pl";
            await createCode(recipient);
      } catch(err) {
            updateStat("error",true);
            console.log(err)
      } finally {
          updateStat("loading", false);
      }
    }
    
    function updateCode(e) {
        const {value,name} = e.target;
        setCode(prev => ({...prev, [name]:value}));
        
    }

    function typeNumber(e) {
        const char = e.key;
        const allowed = ["Backspace"];
        if(!isNaN(char)){
            if(fill < 5) setFill(prev =>prev + 1);
            return;
        }
        
        switch(char) {
            case "Backspace": 
            if(fill > 0 ) setFill(prev => prev -1);
            break;
        }
    }
    if(stat.accepted) return <Navigate to="/"/>

    if(stat.loading) return <div className="load-box"><p className="msg">Connecting with server . . .</p></div>

    return <form className="auth-code">
        {[... new Array(6)].map((_,index) => {
            return <label className="box" onKeyDown={typeNumber} key={index}><input value={code.index} onChange={updateCode}  maxLength="1" minLength="1" required/></label>
        })}
            <button type="submit" disabled={fill == 5? false: true}  className="sb-btn">Submit</button>
        </form>
}
