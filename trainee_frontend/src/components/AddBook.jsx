import { useState } from "react";
import { FormControl, FormGroup, InputLabel, Input, Typography, styled, Button } from "@mui/material";
import { addBook } from '../service/api.js';
import { useNavigate } from 'react-router-dom';

const Container = styled(FormGroup)`
    width: 40%;
    margin: 5% auto 0 auto;
    & > div {
        margin: 20px;
    }

    @media (max-width: 600px) {
        width: 80%;
    }
`;

const defaultValue = {
    bookname: '',
    author: '',
    price: ''
};

const AddBook = () => {
    const [book, setBook] = useState(defaultValue);
    const navigate = useNavigate();

    const onValueChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const addBookDetails = async () => {
        await addBook(book);
        navigate('/all');
    };

    return (
        <Container>
            <Typography variant="h4">Add Book</Typography>
            
            <FormControl>
                <InputLabel>Book Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="bookname" />
            </FormControl>
            <FormControl>
                <InputLabel>Author</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="author" />
            </FormControl>
            <FormControl>
                <InputLabel>Price</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="price" />
            </FormControl>
           
            <FormControl>
                <Button variant="contained" onClick={() => addBookDetails()}>Add Book</Button>
            </FormControl>
        </Container>
    );
};

export default AddBook;
