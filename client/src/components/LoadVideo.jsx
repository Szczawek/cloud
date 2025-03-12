import "./watch-window/watchVideo.css"

export default function LoadVideo() {
	return <div className="video-box">
			<video className="video-frame" controls>
				<source src="https://127.0.0.1:4000/load-video" type="video/mp4"/>
			</video>
            <header><h2>Title</h2></header>
		</div>
}
