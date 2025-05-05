import {useState} from "react";
import {Navigate} from "react-router";
import {uploadReq} from "./uploadReq.js";

export default function UploadVideo({logged}) {
    const [file, setFile] = useState();

    async function submit(e) {
        try {
            e.preventDefault();
            const res = await uploadReq(file);
            console.log(res);
        } catch(err) {
            console.log(err);
        }

    }

    function selectFile(e) {
        setFile(e.target.files[0]);
    }

   // if(!logged) return <Navigate to="/login"/>
    
    return <div className="uplaod-video">
            <form onSubmit={submit}>
                <header><h2>Select video</h2></header>
                <label htmlFor="uloader"><input onChange={selectFile} required type="file" id="uploader" /></label>
                <button type="submit">Submit</button>
            </form>
        </div>
}
