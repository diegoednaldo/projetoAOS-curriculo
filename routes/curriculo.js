const express = require('express');
const router = express.Router();
const curriculoController = require('../controllers/CurriculoController');

router.get('/curriculo', curriculoController.getAllCurriculos);

router.post('/curriculo', curriculoController.createCurriculo);

module.exports = router;
