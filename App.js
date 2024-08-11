import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Student from './Student';
import Book from './Book';
import Library from './Library';

const App = () => {
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);

  // Fetch students and books from the backend when the component mounts
  useEffect(() => {
    axios.get('/api/students')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });

    axios.get('/api/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }, []);

  // Function to add a new student
  const handleAddStudent = (newStudent) => {
    axios.post('/api/students', newStudent)
      .then(response => {
        setStudents([...students, response.data]);
      })
      .catch(error => {
        console.error('Error adding student:', error);
      });
  };

  // Function to add a new book
  const handleAddBook = (newBook) => {
    axios.post('/api/books', newBook)
      .then(response => {
        setBooks([...books, response.data]);
      })
      .catch(error => {
        console.error('Error adding book:', error);
      });
  };

  return (
    <div>
      <h1>Library Management System</h1>
      <Student students={students} onAddStudent={handleAddStudent} />
      <Book books={books} onAddBook={handleAddBook} />
      <Library students={students} books={books} />
    </div>
  );
};

export default App;
