import {useState, useRef} from "react";

const defData = {
        nick:"",
        tag:"",
        login:"",
        password:"",
        confirm:"", 
}

const defLogs = {
    error:false,
    email:false,
    password:false,
    loading:false,
}

export default function CreateAccount() {
    const [data,setData] = useState(defData);
    const [logs,setLogs] = useState(defLogs);
    const password = useRef(null);
    const confirm = useRef(null);

    function rewriteData(e) {
        const {name,value} = e.target;
        if(name == "password" || name == "confirm") comparePass();
        setData(prev =>({...prev,[name]:value}));
    }
    
    function rewriteLogs(name,boolen) {
        setLogs(prev =>({...prev,[name]:boolen}));
    }

    function showPassword() {
        const {type} = password.current;;
        function swap(type){
            password.current.type = type;
            confirm.current.type = type;
        }

        if(type === "text") return swap("password");
        swap("text");
        
    }

    function comparePass() {
        const {password,confirm} = data;
        if(password.length < 8 || confirm.length < 8 ) {
            if(logs.password) rewriteLogs("password", false);
            return; 
        };
        console.log(2);
        if(password == confirm && logs.password) return rewriteLogs("password", false);
        if(!logs.password) rewriteLogs("password", true);
    }

    async function submit(e) {
        try {
            e.preventDefault();
            if(logs.password) return;
            rewriteLogs("loading",true);
            const copy = {...data};
            delete copy.confirm;
            const options = {
                method:"POST",
                headers: {
                    "Content-Type":"application/json",
                },
                credentails:"include",
                body:JSON.stringify(copy),
            }
            const res = await fetch(`${process.env.VITE_API_URL}/create-account`,options);
            if(!res.ok) throw res.status;
            console.log("ok");
        } catch(err) {
            console.log(err);
        } finally {
            rewriteLogs("loading",false);
        }
    }

    return <div className="create-acc-box">
            <form className="form-box" onSubmit={submit}>
                <header className="title-box"><h2>Create Account</h2></header>
                <label htmlFor="nick">Nick</label>
                <input value={data.nick} onChange={rewriteData} placeholder="Nick" required id="nick" name="nick"/>
                <label htmlFor="unique">Tag Name</label>
                <input value={data.tag} onChange={rewriteData} placeholder="Unique Name" required id="unique" name="tag"/>
                <label htmlFor="login">Email</label>
                <input value={data.email} onChange={rewriteData} placeholder="Email" required id="login" type="email" name="login" />
                {logs.password && <p>Password are not the same</p>}
                <label htmlFor="password">Password</label>
                <input ref={password} minLength="8" maxLength="32" value={data.password} onChange={rewriteData} placeholder="Password" required id="password" type="password" name="password" />
                <button onClick={showPassword} type="button">Show</button>
                <label htmlFor="confirm">Confirm Password</label>
                <input ref={confirm} minLength="8" maxLength="32" value={data.confirm} onChange={rewriteData} placeholder="Confirm Password" required id="confirm" type="password" name="confirm" />
                <button className="sb-btn" disabled={data.loading} type="submit">{data.loading? "Loading": "Submit"}</button>
            </form>
        </div>
}
