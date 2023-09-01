import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10, // Adjust the connection limit as per your requirement
});

const tableName = 'book_details';
const columns = ['id', 'bookname', 'author', 'price'];

export const addBook = async (request, response) => {
  const book = request.body;

  try {
    const conn = await pool.promise().getConnection();

    const query = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (?, ?, ?, ?)`;
    const values = [book.id, book.bookname, book.author, book.price];

    const [result] = await conn.query(query, values);

    const insertedId = result.insertId;

    conn.release();

    console.log('Request method:', request.method); // Print request method

    response.status(201).json({ _id: insertedId, ...book });
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

export const getBooks = async (request, response) => {
  try {
    const conn = await pool.promise().getConnection();

    const query = `SELECT * FROM ${tableName}`;

    const [rows] = await conn.query(query);

    conn.release();

    console.log('Request method:', request.method); // Print request method

    if (rows.length > 0) {
      response.status(200).json(rows);
    } else {
      response.status(200).json([]);
    }
  } catch (error) {
    response.status(500).json({ message: 'Failed to fetch book data' });
  }
};

export const getBook = async (request, response) => {
  const { id } = request.params;

  try {
    const conn = await pool.promise().getConnection();

    const query = `SELECT * FROM ${tableName} WHERE id = ?`;
    const values = [id];

    const [rows] = await conn.query(query, values);

    conn.release();

    console.log('Request method:', request.method); // Print request method

    if (rows.length > 0) {
      response.status(200).json(rows[0]);
    } else {
      response.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    response.status(500).json({ message: 'Failed to fetch book data' });
  }
};

export const editBook = async (request, response) => {
  const { id } = request.params;
  const book = request.body;

  try {
    const conn = await pool.promise().getConnection();

    const query = `UPDATE ${tableName} SET bookname = ?, author = ?, price = ? WHERE id = ?`;
    const values = [book.bookname, book.author, book.price, id];

    await conn.query(query, values);

    conn.release();

    console.log('Request method:', request.method); // Print request method

    response.status(200).json({ message: 'Book updated successfully' });
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

export const deleteBook = async (request, response) => {
  const { id } = request.params;

  try {
    const conn = await pool.promise().getConnection();

    const query = `DELETE FROM ${tableName} WHERE id = ?`;
    const values = [id];

    await conn.query(query, values);

    conn.release();

    console.log('Request method:', request.method); // Print request method

    response.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};
