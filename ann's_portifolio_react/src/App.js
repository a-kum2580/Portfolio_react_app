import React, { useState, useEffect } from 'react'
import GeneralComponent from './components/generalComponent';
import HobbyVideo from './components/hobbyVideo';
import ContactInformation from './components/contactInformation';
import CareerGoal from './components/careerGoals';
import PersonalDetails from './components/personalDetails';
import Profile from './components/profile';
import LinkNavigation from './components/linkNavigation';
import ResultComponent from './components/ResultComponent';
import ManageResults from './components/ManageResults';
import { RESULTS } from './util/ResultsData';
import Login from './components/Login';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [results, setResults] = useState(RESULTS);

  useEffect(() => {
    // Check for saved preference on mount
    if (localStorage.getItem('darkMode') === 'enabled') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    // Load saved results from localStorage if they exist
    const savedResults = localStorage.getItem('results');
    if (savedResults) {
      setResults(JSON.parse(savedResults));
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    
    if (newMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'disabled');
    }
  };

  const handleUpdateResults = (updatedResults) => {
    setResults(updatedResults);
    localStorage.setItem('results', JSON.stringify(updatedResults));
  };

  if (!isLoggedIn) {
    return <Login onLogin={setIsLoggedIn} />;
  }

  return (
    <div className="container">
      {/* Dark Mode Toggle */}
      <div className="mode-toggle">
        <label className="switch">
          <input 
            type="checkbox" 
            checked={darkMode}
            onChange={toggleDarkMode}
          />
          <span className="slider"></span>
        </label>
      </div>
      
      <GeneralComponent
        heading="Anna's Portfolio😎"
        paragraph={`Hei! Welcome to my portfolio
        
        I'm a second-year Computer Science student with an interest in Embedded Systems and Robotics Engineering. I like trying out complex problems and as i enrich my knowledge on Arduino and microcontrollers. There's something satisfying about writing code and seeing it control hardware in the real world.
        
        "If it works don't touch it."(If it doesnot make sense definetely touch it.)😜`}
      />
      <hr />
      <PersonalDetails />
      <hr />
      <Profile />
      <hr />
      <HobbyVideo />
      <hr />
      <ResultComponent results={results} />
      <hr />
      <ManageResults results={results} onUpdateResults={handleUpdateResults} />
      <hr />
      <LinkNavigation />
      <hr />
      <ContactInformation />
      <hr />
      <CareerGoal />
    </div>
  );
}

export default App;
