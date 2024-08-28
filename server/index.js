const express = require("express");
const { connectDB } = require("./src/utils/db")
const routerUser = require("./src/api/routes/user.routes")
const env = require("dotenv")
env.config()

const cors = require('cors');

const cloudinary = require("cloudinary").v2
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

connectDB();
const server = express();
const PORT = process.env.PORT;

index.use(cors());

server.use(express.json())
server.use("/user", routerUser)


server.listen(PORT, () => {
    console.log(`listen port http://localhost:${PORT} `)
})

