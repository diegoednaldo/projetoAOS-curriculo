const db = require('../config/db');

class Curriculo {
  constructor(data) {
    this.data = data;
  }

  async save() {
    try {
      const result = await db.one(
        'INSERT INTO curriculo (nome, email, experiencia, educacao) VALUES ($1, $2, $3, $4) RETURNING id',
        [this.data.nome, this.data.email, this.data.experiencia, this.data.educacao]
      );
      const curriculoId = result.id;
      return result.id;
    } catch (error) {
      throw error;
    }
  }

  static async getAll() {
    try {
      return await db.any('SELECT * FROM curriculo');
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Curriculo;
