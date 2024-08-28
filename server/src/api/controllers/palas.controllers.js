const Palas = require("../models/palas.model")

const getpalas = async (req, res) => {
    //aqui es donde se usara el modelo de datos, llamado Palas
    try {
        const listPalas = await Palas.find();
        res.json(listPalas)
    } catch (error) {
        console.log(error)
    }
}
// Buscar una pala por nombre, teniendo en cuenta, que quiere que se envie en la url de la petición /getByName/: name
const getPalasName = async (req, res) => {
    const { name } = req.params
    const palasByName = await Palas.find({ name: name })
    res.json(palasByName)
}
// añadir una nueva pala
const add = async (req, res) => {
    try {
        const newPalas = req.body;
        const findPalas = await Palas.find({ name: newPalas.name }) //filtro de busqueda

        if (findPalas.length === 0) {
            //si el producto no esta en la BD(bases de datos)
            const palas = new Palas(newPalas)
            const createdPalas = await palas.save()
            res.status(201).json(createdPalas)
        } else { //si el producto esta repetido
            res.status(200).json({ message: "La pala está repetido" })
        }
    } catch (error) {

    }
}

const deletePalas = async (req, res) => {
    try {
        const { id } = req.params;
        const deletePala = await Palas.findByIdAndDelete(id);
        if (deletePala) {
            res.status(201).json({ success: true, message: deletePala })
        } else {
            res.status(200).json({ success: false, message: "No existe el id" })
        }

    } catch (error) {
        res.status(500).json(error)
    }
}

const updatePalas = async (req, res) => {
    try {
        const { id } = req.query;
        const palasBody = req.body;

        const updatePalas = await Palas.findByIdAndUpdate(id, palasBody, { new: true })
        //valor falsy
        if (!updatePalas) {
            res.json({ success: false, message: "el id no existe" })
        } else {
            res.json(updatePalas)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}
module.exports = { getpalas, getPalasName, add, deletePalas, updatePalas }