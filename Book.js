// Book.js
import React, { useState } from 'react';

const Book = () => {
  const [books, setBooks] = useState([]);
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [publication, setPublication] = useState('');
  const [year, setYear] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const addBook = () => {
    const newBook = { name, author, publication, year };
    if (editingIndex !== null) {
      const updatedBooks = [...books];
      updatedBooks[editingIndex] = newBook;
      setBooks(updatedBooks);
      setEditingIndex(null);
    } else {
      setBooks([...books, newBook]);
    }
    setName('');
    setAuthor('');
    setPublication('');
    setYear('');
  };

  const editBook = (index) => {
    const book = books[index];
    setName(book.name);
    setAuthor(book.author);
    setPublication(book.publication);
    setYear(book.year);
    setEditingIndex(index);
  };

  const deleteBook = (index) => {
    const updatedBooks = books.filter((_, i) => i !== index);
    setBooks(updatedBooks);
  };

  return (
    <div>
      <h2>Book</h2>
      <label>Name</label>
      <input 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      /><br></br>
      <label>Author</label>
      <input 
        type="text" 
        placeholder="Author" 
        value={author} 
        onChange={(e) => setAuthor(e.target.value)} 
      /><br></br>
      <label>Publication</label>
      <input 
        type="text" 
        placeholder="Publication" 
        value={publication} 
        onChange={(e) => setPublication(e.target.value)} 
      /><br></br>
      <label>Year</label>
      <input 
        type="text" 
        placeholder="Year" 
        value={year} 
        onChange={(e) => setYear(e.target.value)} 
      /><br></br><br></br>
      <button onClick={addBook}>{editingIndex !== null ? 'Update' : 'Save'}</button>
      <button onClick={() => { setName(''); setAuthor(''); setPublication(''); setYear(''); setEditingIndex(null); }}>Cancel</button>
      
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Publication</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
      
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.name}</td>
              <td>{book.author}</td>
              <td>{book.publication}</td>
              <td>{book.year}</td>
              <td>
                <button onClick={() => editBook(index)}>Edit</button>
                <button onClick={() => deleteBook(index)}>Delete</button>
              </td>
            </tr>
          ))}
        
        </tbody>
        </table>
      
    </div>
  );
};

export default Book;
