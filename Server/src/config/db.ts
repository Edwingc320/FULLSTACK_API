


import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(process.env.DB_URL!, {
  dialect: "postgres",                      // explícito para evitar ambigüedades
  models: [__dirname + "/../models/**/*.ts"],
  dialectOptions: {
    ssl: {
      require: true,                        // fuerza SSL
      rejectUnauthorized: false             // o true si tienes CA válida
    }
  }
});

export default db;

