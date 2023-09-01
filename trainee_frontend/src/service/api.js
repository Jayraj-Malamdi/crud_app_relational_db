import axios from 'axios';

const URL = 'http://localhost:8000';
//const URL = 'http://bookfolio-prod-ALB-298243638.us-west-2.elb.amazonaws.com';
//post api
export const addBook = async (data) => {
    try{
        return await axios.post(`${URL}/add`, data);
    }catch(error){
        console.log('Error while calling addBook api', error);
    }
}


//get api
export const getBooks = async (data) => {
    try {
        return await axios.get(`${URL}/all`);
    }catch(error) {
        console.log('Error while calling getBooks api', error);
    }
}


//get api
export const getBook = async (id) => {
    try{
        return await axios.get(`${URL}/${id}`);
    }catch(error) {
        console.log('Error while calling getBook api', error);
    }
}


//put api
export const editBook = async (user, id) => {
    try{
        return await axios.put(`${URL}/${id}`, user);
    }catch(error) {
        console.log('Error while calling editBook api', error);
    }
}


//delete api
export const deleteBook = async (id) => {
    try {
        return await axios.delete(`${URL}/${id}`);
    }catch(error) {
        console.log('Error while calling deleteBook api', error);
    }
}