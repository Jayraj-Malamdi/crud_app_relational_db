import { useState, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getBook, editBook } from '../service/api.js';

const initialValue = {
  bookname: '',
  author: '',
  price: ''
};

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% 0 0 25%;

  @media (max-width: 600px) {
    width: 90%;
    margin: 5% auto;
  }
`;

const EditBook = () => {
  const [book, setBook] = useState(initialValue);
  const { bookname, author, price } = book;
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadBookDetails();
  }, []);

  const loadBookDetails = async () => {
    try {
      const response = await getBook(id); // Pass the `id` parameter here
      setBook(response.data);
    } catch (error) {
      console.log(error); // Log any errors that occur
    }
  };

  const editBookDetails = async () => {
    await editBook(book, id);
    navigate('/all');
  };

  const onValueChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  return (
    <Container injectFirst>
      <Typography variant="h4">Edit Book Information</Typography>

      <FormControl>
        <InputLabel htmlFor="bookname-input">Book Name</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="bookname" value={bookname} id="bookname-input" aria-describedby="bookname-helper-text" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="author-input">Author</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="author" value={author} id="author-input" aria-describedby="author-helper-text" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="price-input">Price</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="price" value={price} id="price-input" aria-describedby="price-helper-text" />
      </FormControl>
      <FormControl>
        <Button variant="contained" color="primary" onClick={() => editBookDetails()}>Edit Book</Button>
      </FormControl>
    </Container>
  );
};

export default EditBook;
