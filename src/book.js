import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import Table from 'react-bootstrap/Table';

const Books =()=>{
    const[books , setBook]=useState([]);
    // const book_data=books.map(books=>books)
    
    const[newBookData,setnewBookData]=useState({
        title: '',
        rating: ''
    });
    const[editBookData,seteditBookData]=useState({
        id: '',
        title: '',
        rating: ''
    });
    const[newBookModal,setnewBookModal]=useState(false);
    const[editBookModal,seteditBookModal]=useState(false);

    // toggleNewBookModal=()=> {
    //     setnewBookModal({
    //       newBookModal: ! newBookModal
    //     });
    //   }

    //   toggleEditBookModal=()=> {
    //     seteditBookModal({
    //       editBookModal: ! editBookModal
    //     });
    //   }

     const addBook=()=> {
        axios.post('http://localhost:5000/book', newBookData).then((response) => {
          let { books } = setBook;
    
          books.push(response.data);

        //   setBook('');
        //   setnewBookModal(false);
        //   setnewBookData({ newBookData: {
        //     title: '',
        //     rating: ''
        //   }});
        });
        
      }

    useEffect(()=>{
        
            axios.get('http://localhost:5000/book').then(response => response.data)
            .then((data) => {
                setBook(data);
         
             })
    },[]);
    console.log(books);
    return(
        <div>
              <ModalFooter>
          <Button color="primary" onClick={addBook()}>Add Book</Button>{' '}
        </ModalFooter>
         <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
              {books.map((book)=>(
               <tr key={book.id}>
                   <td>{book.id}</td>
               <td>{book.title}</td>
               <td>{book.rating}</td>
             </tr>
              ))}
         
        </tbody>
        </Table>
        </div>
       
    )
}

export default Books;