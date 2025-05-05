import {useState} from "react";
import {Navigate} from "react-router";
import {uploadReq} from "./uploadReq.js";
import "./upload.css";

export default function UploadVideo({logged}) {
    const [file, setFile] = useState();

    async function submit(e) {
        try {
            e.preventDefault();
            const res = await uploadReq(file)
            const size = res.length;
            for(let i =0; i < size; i++) {
                if(!res[i].ok) throw res[i].status;
            }
        } catch(err) {
            console.log(err);
        }

    }

    function selectFile(e) {
        setFile(e.target.files[0]);
    }

   // if(!logged) return <Navigate to="/login"/>
    
    return <div className="uplaod-video">
            <form className="upload-form" onSubmit={submit}>
                <header className="title-bar"><h2>Select video</h2></header>
                <label htmlFor="uloader"><input onChange={selectFile} required type="file" id="uploader" /></label>
                <button className="up-btn" type="submit">Submit</button>
            </form>
        </div>
}
