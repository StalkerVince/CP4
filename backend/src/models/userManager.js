const AbstractManager = require("./AbstractManager");

class CarManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  async readAll() {
    const [result] = await this.database.query(
      `SELECT users.id, users.email, users.password FROM ${this.table}`
    );
    return result;
  }

  async read(id) {
    const [result] = await this.database.query(
      `SELECT users.id, users.email, users.password, car.id FROM ${this.table}`,
      [id]
    );
    return result;
  }

  async update(email, password, id) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET email = ?, password = ? WHERE id = ?`,
      [email, password, id]
    );
    return result;
  }

  async create(email, password) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (email, password) VALUES (?,?)`,
      [email, password]
    );
    return result;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id=?`,
      [id]
    );
    return result;
  }
}

module.exports = CarManager;
