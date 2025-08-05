import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GeneralComponent from './components/generalComponent';
import HobbyVideo from './components/hobbyVideo';
import ContactInformation from './components/contactInformation';
import CareerGoal from './components/careerGoals';
import PersonalDetails from './components/personalDetails';
import Profile from './components/profile';
import LinkNavigation from './components/linkNavigation';
import ResultComponent from './components/ResultComponent';
import ManageResults from './components/ManageResults';
import Login from './components/Login';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [results, setResults] = useState({ year1: { semester1: [], semester2: [] }, year2: { semester1: [] } });

  useEffect(() => {
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    // Check authentication status and fetch results
    const checkAuth = async () => {
      try {
        console.log('🔍 Checking authentication status...');
        
        // Add a small delay to ensure session is established
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const authResponse = await fetch('/api/auth-status', {
          credentials: 'include',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });
        
        if (!authResponse.ok) {
          throw new Error(`Auth check failed: ${authResponse.status}`);
        }
        
        const authData = await authResponse.json();
        console.log('📊 Auth response:', authData);
        
        setIsLoggedIn(authData.isAuthenticated);

        // Only fetch results if authenticated
        if (authData.isAuthenticated) {
          console.log('✅ User is authenticated, fetching results...');
          const resultsResponse = await fetch('/api/results', {
            credentials: 'include',
            headers: {
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache'
            }
          });
          
          if (resultsResponse.ok) {
            const resultsData = await resultsResponse.json();
            console.log('📈 Results data:', resultsData);
            setResults(resultsData);
          } else {
            console.error('❌ Failed to fetch results:', resultsResponse.status);
          }
        } else {
          console.log('🔒 User not authenticated, skipping results fetch');
        }
      } catch (err) {
        console.error('💥 Error during auth check:', err);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Handle successful login
  const handleLogin = async (success) => {
    if (success) {
      console.log('🎉 Login successful, rechecking auth...');
      setIsLoggedIn(true);
      
      // Fetch results after successful login
      try {
        const resultsResponse = await fetch('/api/results', {
          credentials: 'include'
        });
        if (resultsResponse.ok) {
          const resultsData = await resultsResponse.json();
          setResults(resultsData);
        }
      } catch (err) {
        console.error('Error fetching results after login:', err);
      }
    }
  };

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

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        🔄 Loading...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <div className="container">
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
                <ManageResults />
                <hr />
                <LinkNavigation />
                <hr />
                <ContactInformation />
                <hr />
                <CareerGoal />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/manage-results" element={isLoggedIn ? <ManageResults /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;