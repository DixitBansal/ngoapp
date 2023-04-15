const { Pool } = require("pg");
const pool =
  process.env.NODE_ENV !== "development"
    ? new Pool()
    : new Pool({
        user: "postgres",
        host: "rds-postgres-ngo.crpxp5jafuq2.ap-south-1.rds.amazonaws.com",
        database: "ngo_dev",
        password: "Ngo-Postgres-15042023",
        port: 5432,
      });
module.exports = {
  async query(text, params) {
    // invocation timestamp for the query method
    const start = Date.now();
    try {
      const res = await pool.query(text, params);
      // time elapsed since invocation to execution
      const duration = Date.now() - start;
      console.log("executed query", { text, duration, rows: res.rowCount });
      return res;
    } catch (error) {
      console.log("error in query", { text });
      throw error;
    }
  },
};
