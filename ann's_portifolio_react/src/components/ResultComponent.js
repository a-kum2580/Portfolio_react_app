import React, { useState } from 'react';
import { RESULTS } from "../util/ResultsData";

function ResultComponent() {
  const [selectedYear, setSelectedYear] = useState('year1');
  const [selectedSemester, setSelectedSemester] = useState('semester1');

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
          <option value="year1">Year 1</option>
          <option value="year2">Year 2</option>
        </select>
        {selectedYear === 'year1' && (
          <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
            <option value="semester1">Semester 1</option>
            <option value="semester2">Semester 2</option>
          </select>
        )}
      </div>

      <h2>{selectedYear.toUpperCase()} {selectedSemester.toUpperCase()} RESULTS</h2>
      {renderResultsTable(RESULTS[selectedYear][selectedSemester])}
    </div>
  );
}

export default ResultComponent;
