const AbstractManager = require("./AbstractManager");

class CarManager extends AbstractManager {
  constructor() {
    super({ table: "cars" });
  }

  async readAll() {
    const [result] = await this.database.query(
      `SELECT cars.id, cars.brand, cars.model, cars.drive, cars.fuel, cars.category, cars.power, FROM ${this.table}`
    );
    return result;
  }

  async read(id) {
    const [result] = await this.database.query(
      `SELECT cars.brand, cars.model, cars.drive, cars.fuel, cars.category, cars.power, car.id FROM ${this.table}`,
      [id]
    );
    return result;
  }

  async update(brand, model, drive, fuel, category, power, id) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET brand = ?, model = ?, drive = ?, fuel = ?, category = ?, power = ? WHERE id = ?`,
      [brand, model, drive, fuel, category, power, id]
    );
    return result;
  }

  async create(brand, model, drive, fuel, category, power) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (brand, model, drive, fuel, category, power) VALUES (?,?,?,?,?,?)`,
      [brand, model, drive, fuel, category, power]
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

  // SPECIAL FILTER OF THE DEATH //

  async readAllFilters(
    brand,
    model,
    drive,
    fuel,
    category,
    power,
    orderBy,
    limit
  ) {
    // Toute la logique pour pouvoir accumuler les filtres de recherche via un tableau d'objets.
    const initialSql = `SELECT * FROM ${this.table}`;
    const where = [];
    // S'il y a un filtre de présent via les query, j'ajoute un nouvel objet dans le tableau ci-dessus.

    if (brand != null) {
      where.push({
        column: "brand",
        value: `%${brand}%`,
        operator: "LIKE",
      });
    }
    if (model != null) {
      where.push({
        column: "model",
        value: `%${model}%`,
        operator: "LIKE",
      });
    }
    if (drive != null) {
      where.push({
        column: "drive",
        value: `%${drive}%`,
        operator: "LIKE",
      });
    }
    if (fuel != null) {
      where.push({
        column: "fuel",
        value: `%${fuel}%`,
        operator: "LIKE",
      });
    }
    if (category != null) {
      where.push({
        column: "category",
        value: `%${category}%`,
        operator: "LIKE",
      });
    }
    if (power != null) {
      where.push({
        column: "power",
        value: power,
        operator: "=",
      });
    }

    // Je place ma logique dans des constantes pour faciliter le rendu de la requête plus bas.
    const query = where.reduce(
      (sql, { column, operator }, index) =>
        `${sql} ${index === 0 ? "where" : "and"} ${column} ${operator} ? `,
      initialSql
    );

    const orderBySql = ` ORDER BY ${orderBy} ASC `;

    const limitSql = `LIMIT ${limit}`;

    const values = where.map(({ value }) => value);

    if (where.length !== 0) {
      // Je fais ma requête SQL préparée avec mon tableau d'objets.
      const [rows] = await this.database.query(
        query + (orderBy != null ? orderBySql : "") + limitSql,
        values
      );

      return rows;
    }
    return null;
  }
}

module.exports = CarManager;
