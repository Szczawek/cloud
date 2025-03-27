import {useEffect,Suspense,lazy, useState} from "react";
import {BrowserRouter,Routes,Route, Outlet} from "react-router";
import  "./styles.css"
import Navigation from "./components/Navigation.jsx"
import LoadingScreen from "./components/LoadingScreen.jsx";
const Home = lazy(()=>import("./components/Home.jsx"));
const Wall = lazy(()=>import("./components/Wall.jsx"));
const Login = lazy(()=>import("./components/auth/Login.jsx"));
const AuthTwo = lazy(()=>import("./components/auth/AuthTwo.jsx"));
const CreateAccount = lazy(()=>import("./components/auth/CreateAccount.jsx"));

export default function App() {
    const [session,setSession] = useState(false);
	useEffect(() => {
	async function attpCon() {
		try {
			const res = await fetch(`${process.env.VITE_API_URL}/api`);
			if(!res.ok) throw res.status;
			const obj = await res.json();
           console.log(obj);
		} catch(err) {
			console.error(err);
		}
	}
	attpCon();	
	},[])

    return <div className="app">
                <Suspense fallback={<LoadingScreen/>}>
                    <BrowserRouter>
                        <Navigation/>
                        <Routes>
                            <Route path="/home" element={<Home/>} />
                            {!session?
                                <>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/create-account" element={<CreateAccount/>}/>
                                <Route path="/auth-two" element={<AuthTwo/>}/>
                                </>
                                :
                                <Route path="/" element={<Wall/>}/>}
                        </Routes>
                    </BrowserRouter>
                </Suspense>
           </div> 
}
