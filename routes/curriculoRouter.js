const express = require('express');
const router = express.Router();
const curriculoController = require('../controllers/CurriculoController');
const { authenticateUser, checkAdmin } = require('../middlewares/authMiddleware');

router.get('/curriculos', authenticateUser, curriculoController.getAllCurriculos);

router.get('/curriculos/:id', authenticateUser, curriculoController.getCurriculoById);

router.post('/curriculos', authenticateUser, checkAdmin, curriculoController.createCurriculo);

router.put('/curriculos/:id', authenticateUser, checkAdmin, curriculoController.updateCurriculo);

router.delete('/curriculos/:id', authenticateUser, checkAdmin, curriculoController.deleteCurriculo);

module.exports = router;