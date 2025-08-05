import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ManageResults() {
  const [newResult, setNewResult] = useState({
    course_code: '',
    course_title: '',
    grade: '',
    credit_units: ''
  });
  const [year, setYear] = useState('year1');
  const [semester, setSemester] = useState('semester1');
  const [error, setError] = useState('');
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(`/api/results/${year}/${semester}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newResult),
      credentials: 'include'
    });
    if (response.status === 401) {
      navigate('/login');
      return;
    }
    const data = await response.json();
    if (data.success) {
      setNewResult({ course_code: '', course_title: '', grade: '', credit_units: '' });
    } else {
      setError('Error adding result');
    }
  } catch (err) {
    setError('Error connecting to server');
  }
};

  return (
    <div className="manage-results">
      <h2>Add New Result</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Year:</label>
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="year1">Year 1</option>
            <option value="year2">Year 2</option>
            <option value="year3">Year 3</option>
          </select>
        </div>

        <div className="form-group">
          <label>Semester:</label>
          <select value={semester} onChange={(e) => setSemester(e.target.value)}>
            <option value="semester1">Semester 1</option>
            <option value="semester2">Semester 2</option>
          </select>
        </div>

        <div className="form-group">
          <label>Course Code:</label>
          <input
            type="text"
            value={newResult.course_code}
            onChange={(e) => setNewResult({ ...newResult, course_code: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Course Title:</label>
          <input
            type="text"
            value={newResult.course_title}
            onChange={(e) => setNewResult({ ...newResult, course_title: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Grade:</label>
          <input
            type="text"
            value={newResult.grade}
            onChange={(e) => setNewResult({ ...newResult, grade: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Credit Units:</label>
          <input
            type="number"
            value={newResult.credit_units}
            onChange={(e) => setNewResult({ ...newResult, credit_units: e.target.value })}
            required
          />
        </div>

        <button type="submit">Add Result</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    <button onClick={async () => {
     await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include'
  });
  navigate('/login');
}}>Logout</button>
    </div>
  );
}

export default ManageResults;