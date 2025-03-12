import fs from "fs";

export default function loadVideo(req,res) {
	const filePath = "./videos/testTwo.mp4";
	const file = fs.statSync(filePath);
	const size = file.size;
	const range = req.headers.range;

	if(!range) {
		console.log(1)
		const headers = {"Content-Type":"video/mp4","Content-Length":size};
		res.status(200).set(headers);
		const stream = fs.createReadStream(filePath);
		stream.pipe(res);
		return;
	}

	const parts = range.replace(/bytes=/,'').split('-');
	const start = parseInt(parts[0],10);
	const end = parts[1] ? parseInt(parts[1], 10) : size - 1;
	const chunkSize = end - start + 1;
	console.log(parts);
	console.log(parts[1])
	const stream = fs.createReadStream(filePath,{start,end});
	const headers = {
		"Content-type":"video.mp4",
		"Content-Length": chunkSize,
		"Content-Range": `bytes ${start}-${end}/${size}`,
		"Accept-Ranges":"bytes",
		"Cross-Origin-Resource-Policy": "cross-origin",
				}
	
	res.status(206).set(headers);
	stream.pipe(res);
}
