import {useState} from "react";
import {Navigate} from "react-router";

export default function Login() {
    const [data,setData] = useState({
        pass:"",
        login:"",
    })
    const [operationStatus, setOperationStatus] = useState({
        err:false,
        loading:false,
        incorrect:false,
        empty:false,
        dataConfirmed:false,
    }) 

    function setStatus(status,value) {
       setOperationStatus((prev) => {return {...prev,[status]:value}})
    }

    function passData(e) {
        const {name,value} = e.target;
        setData((prev) => ({...prev,[name]:value}))
    }
    async function compareData(e) {
        try {
            e.preventDefault();
            setStatus("loading",true);
            console.log("Seneded!");
        } catch(err) {
            console.log(err);
            setStatus("error",true);
         } finally {
            setStatus("loading",false);
         }
        
    }
    if(operationStatus.dataConfirmed) return <Navigate to="/auth-two"/>

    return <div className="login-container">
            <form onSubmit={compareData}>
                <label htmlFor="login-inp">
                    <p className="sub-title">Login</p>
                    <input value={data.login} onChange={passData} minLength="3" maxLength="60" name="login" type="email" required/>
                </label>
                <label htmlFor="pass-inp">
                    <p className="sub-title">Password</p>
                    <input value={data.pass} onChange={passData} type="password" minLength="8" maxLength="32" name="pass" id="pass-inp" required/>
                 </label>
                <button className="submit-btn" disabled={operationStatus.loading} type="submit">{operationStatus.loading? "Loading . . .": "Login"}</button>
            </form>
        </div>
}
