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
}

module.exports = Model;
