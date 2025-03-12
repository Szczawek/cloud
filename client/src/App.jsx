import {useEffect} from "react";
import UploadImgForm from "./components/UploadImgForm.jsx";
import LoadVideo from "./components/LoadVideo.jsx";
export default function App() {
	useEffect(() => {
	async function attpCon() {
		try {
			const res = await fetch(`${process.env.VITE_API_URL}`);
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
			<h1>Hello in form app!</h1>
			<UploadImgForm/>
			<LoadVideo/>
		</div>
}
