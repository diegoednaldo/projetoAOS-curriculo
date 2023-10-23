const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const curriculoRoutes = require('./routes/curriculo');

app.use(express.json()); 
app.use('/api', curriculoRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
