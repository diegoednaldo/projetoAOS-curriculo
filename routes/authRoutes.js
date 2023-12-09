const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const User = require('../models/user');
const { authenticateUser, checkAdmin } = require('../middlewares/authMiddleware');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findByUsername(username);

    if (!user || !(await User.comparePasswords(password, user.password))) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const token = authController.generateToken(user);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao processar a solicitação.' });
  }
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findByUsername(username);

    if (existingUser) {
      return res.status(400).json({ error: 'Nome de usuário já em uso.' });
    }

    const newUser = await User.create({ username, password });

    res.status(201).json({ message: 'Usuário registrado com sucesso.', userId: newUser.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao processar a solicitação.' });
  }
});

router.get('/status', authenticateUser, (req, res) => {
  res.json({ authenticated: true, user: req.user });
});

router.post('/logout', authenticateUser, (req, res) => {
  res.json({ message: 'Logout bem-sucedido.' });
});

router.get('/admin-only', authenticateUser, checkAdmin, (req, res) => {
  res.json({ message: 'Esta é uma rota protegida para administradores.' });
});

module.exports = router;
