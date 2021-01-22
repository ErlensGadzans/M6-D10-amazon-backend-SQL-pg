const { model } = require("mongoose");
const db = require("../db");

class Model {
  constructor(name) {
    this.name = name;
  }

  async run(query) {
    try {
      const response = await db.query(query);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async save(fields) {
    if (!fields || Object.values(fields).length === 0) {
      throw new Error("Please add values.");
    } else {
      const columns = Object.keys(fields);
      const values = Object.values(fields);
      const query = `INSERT INTO  ${this.name} (${columns.join(
        ","
      )}) VALUES (${values.map((v) => `'${v}'`).join(",")});`;
      const response = await this.run(query);
      return response;
    }
  }

  async findOne(fields) {
    if (!fields || Object.values(fields).lenghth === 0) {
      const query = `SELECT * FROM ${this.name}`;
      const response = await this.run(query);
      return response;
    } else {
      const entries = Object.entries(fields);
      const whereClause = `${entries
        .map(([key, value]) => `${key}='${value}'`)
        .join(" AND ")}`;
      const query = `SELECT * FROM ${this.name} WHERE  ${whereClause};`;
      const response = await this.run(query);
      return response;
    }
  }

  async findByIdAndDelete(id) {
    if (!id) {
      throw new Error("There is no product like this.");
    } else {
      const query = `DELETE FROM ${this.name} WHERE id=${parseInt(id)}`;
      const response = await this.run(query);
      return response;
    }
  }
}

module.exports = Model;
