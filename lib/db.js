const { Client } = require("pg");

export default async function excuteQuery({ query, values }) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  return new Promise((resolve, reject) => {
    try {
      client.connect();
      client.query(query, (error, response) => {
        if (error) {
          if (error.code == "42703") {
            console.log(error);
            resolve([]);
          } else {
            console.log(error);
            throw new Error(error);
          }
        } else resolve(response.rows);
        console.log(response);
        client.end();
      });
    } catch (error) {
      console.log(error);

      reject({
        message: `Something went wrong with the database connection`,
        error: error,
      });
    }
  });
}
