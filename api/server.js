import express from "express"
import cors from "cors"
import helmet from "helmet";
import {createServer} from "https";
import multer from "multer";
import fs from "fs"
import sharp from "sharp";
import path from "path"
import {fileURLToPath} from "url"
import loadVideo from "./components/roots/loadVideo.js";
import {db} from "./components/config/dbConnection.js"

const corsOptions = {
	origin: "https://127.0.0.1:5173",
	credentials:"include"
}
db.connect(() =>{
    console.log("Connected with MySQL!");
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.memoryStorage();
const uploads = multer({storage,size: 10485760})

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet());

const server = createServer({
	key: fs.readFileSync("./ssl/server.key"),
	cert: fs.readFileSync("./ssl/server.cert"),
}, app)

app.get("/",(req,res) => {
	res.json("Hello there! You are currently on the server");
})

async function storageImg(req,res) {
  try {
   if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const { buffer } = req.file;
    const compressedImg = await sharp(buffer)
      .jpeg({ quality: 50 })
      .toBuffer();

    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}.jpg`;
    fs.writeFileSync(`images/${uniqueName}`, compressedImg);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: "Image processing failed" });
  }
}
app.post("/upload-images",uploads.single("img"), storageImg);
app.get("/load-video",loadVideo);

server.listen(PORT,()=>{
	console.log(`https://127.0.0.1:${PORT}`)
})
