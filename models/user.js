const db = require('../config/db');
const bcrypt = require('bcrypt');

class User {
  static async findById(id) {
    try {
      return await db.oneOrNone('SELECT * FROM users WHERE id = $1', [id]);
    } catch (error) {
      throw error;
    }
  }

  static async findByUsername(username) {
    try {
      return await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);
    } catch (error) {
      throw error;
    }
  }

  static async comparePasswords(candidatePassword, hashedPassword) {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }

  static async isAdmin(userId) {
    try {
      const user = await this.findById(userId);
      return user && user.isAdmin;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;