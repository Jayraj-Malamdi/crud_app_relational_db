import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const connection = async () => {
  const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };

  try {
    const conn = await mysql.createConnection(dbConfig);
    console.log('Database connected successfully');
    
    // to perform database operations, we will use the 'conn' object
    
    conn.end(); // Close the database connection when finished
  } catch (error) {
    console.log('Error while connecting with the database', error);
  }
};

export default connection;
