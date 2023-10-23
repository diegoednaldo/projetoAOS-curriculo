const Curriculo = require('../models/curriculo');

const getAllCurriculos = async (req, res) => {
  try {
    const curriculos = await Curriculo.getAll();
    res.json(curriculos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar currículos' });
  }
};

const createCurriculo = async (req, res) => {
  const curriculoData = req.body; 
  const curriculo = new Curriculo(curriculoData);
  try {
    const curriculoId = await curriculo.save();
    res.status(201).json({ message: 'Currículo criado com sucesso', id: curriculoId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar currículo' });
  }
};

module.exports = {
  getAllCurriculos,
  createCurriculo,
};
