// Student.js
import React, { useState } from 'react';

const Student = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  const addStudent = () => {
    const newStudent = { name, className, photo, video };
    if (editingIndex !== null) {
      const updatedStudents = [...students];
      updatedStudents[editingIndex] = newStudent;
      setStudents(updatedStudents);
      setEditingIndex(null);
    } else {
      setStudents([...students, newStudent]);
    }
    setName('');
    setClassName('');
    setPhoto(null);
    setVideo(null);
  };

  const editStudent = (index) => {
    const student = students[index];
    setName(student.name);
    setClassName(student.className);
    setPhoto(student.photo);
    setVideo(student.video);
    setEditingIndex(index);
  };

  const deleteStudent = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
  };

  return (
    <div>
      <h2><label>Student</label></h2><br></br>
      <label>Name</label>
      <input 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      /><br></br>
      <label>Class</label>
      <input 
        type="text" 
        placeholder="Class" 
        value={className} 
        onChange={(e) => setClassName(e.target.value)} 
      /><br></br>
      <label>Photo</label>
      <input 
        type="file" 
        accept="image/*" 
        onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))} 
      /><br></br>
      <label>Video</label>
      <input 
        type="file" 
        accept="video/*" 
        onChange={(e) => setVideo(URL.createObjectURL(e.target.files[0]))} 
      /><br></br><br></br>
      <button onClick={addStudent}>{editingIndex !== null ? 'Update' : 'Save'}</button>
      <button onClick={() => { setName(''); setClassName(''); setPhoto(null); setVideo(null); setEditingIndex(null); }}>Cancel</button>
      <style>
table, th, td 
  border=1 solid black;

</style>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Photo</th>
            <th>Video</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.className}</td>
              <td><img src={student.photo} alt={student.name} width="50" /></td>
              <td><video src={student.video} controls width="50" /></td>
              <td>
                <button onClick={() => editStudent(index)}>Edit</button>
                <button onClick={() => deleteStudent(index)}>Delete</button>
              </td>
            </tr>
          ))}
          </tbody>
          </table>
      
    </div>
  );
};

export default Student;
