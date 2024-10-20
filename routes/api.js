const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

let personas = [];

// GET: Obtener todas las personas
router.get('/personas', (req, res) => {
    res.json(personas);
});

// POST: Agregar una nueva persona
router.post('/personas', upload.single('imagen'), (req, res) => {
    const newPersona = {
        nombre: req.body.nombre,
        edad: req.body.edad,
        imagen: req.file.path
    };
    personas.push(newPersona);
    res.status(201).json(newPersona);
});

// DELETE: Eliminar una persona
router.delete('/personas/:id', (req, res) => {
    const { id } = req.params;
    personas.splice(id, 1);
    res.status(204).send();
});

module.exports = router;
