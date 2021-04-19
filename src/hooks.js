import React, { useState , useEffect} from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

const Hooks = () => {
    const [books, setBooks] = useState([]);
    const [book, setBook] = useState('');
    const handleSubmitCourse = event => {
        alert("your's course title " + book);
        event.preventDefault();
    };
    const handleChangeCourse = event => {
        setBook(event.target.value);
    };
    const getUnique = (arr, comp) => {
        const unique = arr.map(e => e[comp]) //store the comparison values in array
            .map((e, i, final) => final.indexOf(e) === i && i) //store the key of the unique object
            .filter(e => arr[e])//filter the unique object
            .map(e => arr[e]);
        return unique;
      
    };
    useEffect(() => {
        axios.get('http://localhost:5000/book').then(response => response.data)
            .then((data) => {
                setBooks(data);

            })
    }, []);
    const uniqueCouse = getUnique(books,"available");
    console.log(uniqueCouse);
    console.log(book)
    const getBookDetails = books.filter(function(result){
        return result.available === book;
     
    });

    return(
        <di>
            <form onSubmit={handleSubmitCourse}>
                <br/>
                <br/>
                <select value={book} onChange={handleChangeCourse}>
                    {uniqueCouse.map(course =>(
                        <option key={course.id} value={course.available}>
                            {`${course.available}`}
                        </option>
                    ))}
                </select>
                <input type="submit" value="Submit"/>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Book Title</th>
                            <th>Rating</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            getBookDetails.map((data)=>(

                           <tr>
                               <td>{data.id}</td>
                               <td>{data.title}</td>
                               <td>{data.rating}</td>
                               <td>{data.available}</td>
                           </tr>

                            
                             )) }
                    </tbody>
                </Table>
            </form>
        </di>
    )
}

export default Hooks;