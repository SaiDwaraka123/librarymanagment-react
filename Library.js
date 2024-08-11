import React, { useState, useEffect } from 'react';

const Library = ({ students, books }) => {
  const [libraryRecords, setLibraryRecords] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [bookName, setBookName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  // Fetch existing library records when the component mounts
  useEffect(() => {
    fetch('/api/library')
      .then(response => response.json())
      .then(data => setLibraryRecords(data))
      .catch(error => console.error('Error fetching library records:', error));
  }, []);

  const addRecord = () => {
    const newRecord = { studentName, bookName, startDate, endDate };
    if (editingIndex !== null) {
      const updatedRecords = [...libraryRecords];
      updatedRecords[editingIndex] = newRecord;
      setLibraryRecords(updatedRecords);
      setEditingIndex(null);

      // Send update request to the backend
      fetch(`/api/library/${editingIndex}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecord),
      }).catch(error => console.error('Error updating library record:', error));

    } else {
      setLibraryRecords([...libraryRecords, newRecord]);

      // Send save request to the backend
      fetch('/api/library', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecord),
      }).catch(error => console.error('Error saving library record:', error));
    }

    setStudentName('');
    setBookName('');
    setStartDate('');
    setEndDate('');
  };

  const editRecord = (index) => {
    const record = libraryRecords[index];
    setStudentName(record.studentName);
    setBookName(record.bookName);
    setStartDate(record.startDate);
    setEndDate(record.endDate);
    setEditingIndex(index);
  };

  const deleteRecord = (index) => {
    const updatedRecords = libraryRecords.filter((_, i) => i !== index);
    setLibraryRecords(updatedRecords);

    // Send delete request to the backend
    fetch(`/api/library/${index}`, {
      method: 'DELETE',
    }).catch(error => console.error('Error deleting library record:', error));
  };

  return (
    <div>
      <h2>Library</h2>
      <label>Student Name</label>
      <select value={studentName} onChange={(e) => setStudentName(e.target.value)}>
        <option value="">Select Student</option>
        {students.map((student, index) => (
          <option key={student.id} value={student.name}>{student.name}</option>
        ))}
      </select><br />
      <label>Book Name</label>
      <select value={bookName} onChange={(e) => setBookName(e.target.value)}>
        <option value="">Select Book</option>
        {books.map((book, index) => (
          <option key={book.id} value={book.name}>{book.name}</option>
        ))}
      </select><br />
      <label>Start Date</label>
      <input 
        type="date" 
        value={startDate} 
        onChange={(e) => setStartDate(e.target.value)} 
      /><br />
      <label>End Date</label>
      <input 
        type="date" 
        value={endDate} 
        onChange={(e) => setEndDate(e.target.value)} 
      /><br /><br />
      <button onClick={addRecord}>{editingIndex !== null ? 'Update' : 'Save'}</button>
      <button onClick={() => { setStudentName(''); setBookName(''); setStartDate(''); setEndDate(''); setEditingIndex(null); }}>Cancel</button>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black' }}>Student Name</th>
            <th style={{ border: '1px solid black' }}>Book Name</th>
            <th style={{ border: '1px solid black' }}>Start Date</th>
            <th style={{ border: '1px solid black' }}>End Date</th>
            <th style={{ border: '1px solid black' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {libraryRecords.map((record, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid black' }}>{record.studentName}</td>
              <td style={{ border: '1px solid black' }}>{record.bookName}</td>
              <td style={{ border: '1px solid black' }}>{record.startDate}</td>
              <td style={{ border: '1px solid black' }}>{record.endDate}</td>
              <td>
                <button onClick={() => editRecord(index)}>Edit</button>
                <button onClick={() => deleteRecord(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Library;
