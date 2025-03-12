import {useState} from "react"
export default function UploadImgForm() {
	const [file,setFile] = useState();
	const [loading,setLoading] = useState(false);
	const [error,setError] = useState(false);
	const [successMsg,setSuccessMsg] = useState(false);

	async function submit(e) {
		e.preventDefault();
		setLoading(true);
		try {
			const fileForm = new FormData();
			fileForm.append("img",file);
			const options = {
				method:"POST",
				body: fileForm,
			}
			const res = await fetch(`${process.env.VITE_API_URL}/upload-images`,options)
			if(!res.ok) throw res.status;
			console.log("ok")
			setSuccessMsg(true);
			setTimeout(()=>{
				setSuccessMsg(false);
			}, 2000)
		} catch(err) {
			console.log(err);
			setError(true);
		} finally {
			setLoading(false);
		}
	}

	function typeImg(e) {
		const file = e.target.files[0];
		setFile(file);
	}

	return <div className="contener">
			
			<form onSubmit={submit}>
				<input accpet="images/*" onChange={typeImg} type="file" required id="imp-img"/>
		
				<button type="subbmit" disabled={loading || error? true: false} >Submit</button>
			</form>
			{loading && <p className="loading">Loading...</p>}
			{error && <p className="error-msg">Error with server</p>}
			{successMsg && <p className="successMsg">Sended! </p>}
		</div>
}
