const mongoose = require("mongoose");
const url = "mongodb+srv://Nachosam:SDQPRpDCDFrcuFTg@cluster0.p0rzsho.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {


    try {
        const db = await mongoose.connect(process.env.DB_URL); // esta es la conexion con la base de datos
        const { name, host } = db.connection;
        console.log(`Nombre de la bd ${name} y servidor ${host}`)
    } catch (error) {
        console.log(error)
    }
}
module.exports = { connectDB }