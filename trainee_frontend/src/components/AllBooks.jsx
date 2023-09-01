import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, styled, Button } from '@mui/material';

import { getBooks, deleteBook } from '../service/api.js';
import { Link } from 'react-router-dom';

const StyledTable = styled(Table)`
  width: 90%;
  margin: 50px auto 0 auto;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const THead = styled(TableRow)`
  background: #37729e;
  & > th {
    color: #fff;
    font-size: 20px;
  }
`;

const TBody = styled(TableRow)`
  & > td {
    font-size: 20px;
  }
`;

const AllBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getAllBooks();
  }, []);

  const getAllBooks = async () => {
    try {
      const response = await getBooks();
      console.log(response); // Check the response in the browser console
      setBooks(response.data);
    } catch (error) {
      console.log(error); // Log any errors that occur
    }
  };

  const deleteBookDetails = async (id) => {
    await deleteBook(id);
    getAllBooks();
  };

  return (
    <StyledTable>
      <TableHead>
        <THead>
          <TableCell>Book Name</TableCell>
          <TableCell>Author</TableCell>
          <TableCell>Price</TableCell>
          <TableCell></TableCell>
        </THead>
      </TableHead>
      <TableBody>
        {books.map((book) => (
          <TBody key={book._id}>
            <TableCell>{book.bookname}</TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell>{book.price}</TableCell>
            <TableCell>
              <Button
                variant="contained"
                style={{ marginRight: 10, backgroundColor: "#78a193"}}
                component={Link}
                to={`/edit/${book.id}`}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                style={{backgroundColor: "#8f1007"}}
                onClick={() => deleteBookDetails(book.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TBody>
        ))}
      </TableBody>
    </StyledTable>
  );
};

export default AllBooks;
