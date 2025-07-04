import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ResultComponent({ results }) {
  const [selectedYear, setSelectedYear] = useState('year1');
  const [selectedSemester, setSelectedSemester] = useState('semester1');
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure selected semester is valid for the selected year
    if (results && results[selectedYear] && !results[selectedYear][selectedSemester]) {
      setSelectedSemester(Object.keys(results[selectedYear])[0] || 'semester1');
    }
  }, [selectedYear, results]);

  const renderResultsTable = (results) => {
    if (!results || results.length === 0) {
      return <p>No results available for this semester.</p>;
    }

    return (
      <table border="1">
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Title</th>
            <th>Grade</th>
            <th>Credit Units</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id}>
              <td>{result.course_code}</td>
              <td>{result.course_title}</td>
              <td>{result.grade}</td>
              <td>{result.credit_units}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="results-container">
      <div className="results-controls">
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          {Object.keys(results).map((year) => (
            <option key={year} value={year}>
              {year.replace('year', 'Year ')}
            </option>
          ))}
        </select>
        {results[selectedYear] && (
          <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
            {Object.keys(results[selectedYear]).map((semester) => (
              <option key={semester} value={semester}>
                {semester.replace('semester', 'Semester ')}
              </option>
            ))}
          </select>
        )}
      </div>

      <h2>{selectedYear.toUpperCase()} {selectedSemester.toUpperCase()} RESULTS</h2>
      {results[selectedYear] && results[selectedYear][selectedSemester]
        ? renderResultsTable(results[selectedYear][selectedSemester])
        : <p>No results available for this semester.</p>}
    </div>
  );
}

export default ResultComponent;