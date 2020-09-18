let dotenv = require("dotenv");
dotenv.config();
const { PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT, PGTYPE } = process.env;

module.exports = {
  type: PGTYPE,
  host: PGHOST,
  port: Number(PGPORT),
  username: PGUSER,
  password: PGPASSWORD,
  database: PGDATABASE,
  synchronize: true,
  //   logging: true,
  entities: ["src/entity/*.ts"],
  migrations: ["src/migration/*.ts"],
  subscribers: ["src/subscriber/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};
