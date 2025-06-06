import {useState,useEffect} from "react";
import {Link} from "react-router";
import "./wall.css";
import VideoPreview from "./VideoPreview.jsx";

export default function Wall() {
    const [list,setList] = useState([])
    return <div className="wall">
        {list.length == 0? <Empty/> : null}
            {list.map((e,index) => {
                return <VideoPreview key={index}/>
            })}
        </div>
}

function Empty() {
    return <div className="empty-fields">
            <p className="empty-msg">For know there is no video on platfor.</p>
            <p className="empty-msg">Do you what to be the first one?</p>
            <div className="link-field">
                <Link to="/upload-video">Click here!</Link>
            </div>
        </div>
}
