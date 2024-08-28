const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const opinionSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    texto: { type: String, required: true },
    calificacion: { type: Number, required: true, min: 1, max: 5 },
}, { timestamps: true });

const palasSchema = new mongoose.Schema({
    imagen_url: { type: String },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    categoria: { type: String, required: true },
    descripcion: { type: String, required: true },
    imagen_url: { type: String },
    usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    opiniones: [opinionSchema],
}, { timestamps: true },);

module.exports = mongoose.model('Pala', palaSchema);
