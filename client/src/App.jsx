import {useEffect,Suspense,lazy, useRef, useState, createContext} from "react";
import {BrowserRouter,Routes,Route, Outlet} from "react-router";
import {catchUserData} from "./components/auth/catchUserData.js";
import  "./styles.css"
import Navigation from "./components/nav/Navigation.jsx"
import LoadingScreen from "./components/LoadingScreen.jsx";
const Home = lazy(()=>import("./components/Home.jsx"));
const Wall = lazy(()=>import("./components/main/Wall.jsx"));
const Login = lazy(()=>import("./components/auth/Login.jsx"));
const AuthTwo = lazy(()=>import("./components/auth/AuthTwo.jsx"));
const CreateAccount = lazy(()=>import("./components/auth/CreateAccount.jsx"));
const NotFound = lazy(()=>import("./components/NotFound.jsx"));
const UploadVideo = lazy(()=>import("./components/upload-video/UploadVideo.jsx"));
const Profile = lazy(()=>import("./components/profile/Profile.jsx"));

const stdStatus = {
    loadding: false,
    error: false,
    logged: false,
}

const stdUser = {
    tag:"",
    avatar:"",
}

export const Inherit = createContext(null);

export default function App() {
    const [status,setStatus] = useState(stdStatus);
    const [user, setUser] = useState(stdUser)
    const conServer = useRef(null);
    const refresh = useRef(null);
    function updateStatus(name,boolen) {
        setStatus(prev => ({...prev, [name]:boolen}));
    }

	function refreshUser() {
        conServer.current = false;
        refresh.current = !refresh.current;
    }

    useEffect(() => {
        async function autoLogin() {
            try {
                conServer.current = true;
                updateStatus("loading", true);
                const data = await catchUserData();
                console.log(data)
                if(!data.Tag) return;
                updateStatus("logged",true);
                setUser(data);
            } catch(err) {
                updateStatus("error",true);
            } finally {
                updateStatus("loading",false);
            }
        }
        if(!conServer.current) autoLogin();
	},[refresh])

    return <div className="app">
                <Suspense fallback={<LoadingScreen/>}>
                    <BrowserRouter>
                        <Navigation data={user.tag,user.avatar} logged={status.logged}/>
                        <Inherit.Provider value={{refreshUser,user}} >
                        <Routes>
                            <Route path="/home" element={<Home/>} />
                            {!status.logged &&
                                <>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/create-account" element={<CreateAccount/>}/>
                                <Route path="/auth-two" element={<AuthTwo/>}/>
                                </>
                            }
                            <Route path="/" element={<Wall/>}/>
                            <Route path="*" element={<Profile data={user} logged={status.logged} />}/>
                            <Route path="/upload-video" element={<UploadVideo logged={status.logged}/>} />
                        </Routes>
                        </Inherit.Provider>
                    </BrowserRouter>
                </Suspense>
           </div> 
}
