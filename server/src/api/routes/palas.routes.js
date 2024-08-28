const express = require("express");
const router = express.Router();
const Pala = require('../models/palas.model');
const { protect } = require('./auth');

// CRUD

// Create (Creamos una pala)
router.post('/', async (req, res) => {
    try {
        const pala = new Pala({ ...req.body, usuario_id: req.user._id });
        await pala.save();
        res.status(201).send(pala);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Read (lee todos las palas)
router.get('/', async (req, res) => {
    try {
        const palas = await Pala.find().populate('user_id');
        res.status(200).send(palas);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Read (lee solo una pala especifica)
router.get('/:id', async (req, res) => {
    try {
        const pala = await Pala.findById(req.params.id).populate('user_id');
        if (!pala) return res.status(404).send();
        res.status(200).send(pala);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Updte (actualiza una pala)
router.put('/:id', async (req, res) => {
    try {
        const pala = await Pala.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!pala) return res.status(404).send();
        res.status(200).send(pala);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete (Elimina una pala)
router.delete('/:id', protect, async (req, res) => {
    try {
        const pala = await Pala.findByIdAndDelete(req.params.id);
        if (!pala) return res.status(404).send();
        res.status(200).send(pala);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;