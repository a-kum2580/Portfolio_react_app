const express = require('express');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const PORT = 3001;
const PASSWORD = 'anna';

console.log('Starting server.js...');

app.use(express.static(path.join(__dirname, '..', "ann's_portifolio_react", 'build')));

// CORS configuration - synced with your original
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Cookie', 'Authorization']
}));

app.options('*', cors());

app.use(bodyParser.json());
app.use(cookieParser());

// Session configuration with MemoryStore - improved from your original
app.use(session({
  secret: 'your-secret-key-make-this-more-secure',
  resave: false,
  saveUninitialized: false,
  rolling: true, // This was missing in your original - helps with session refresh
  name: 'connect.sid',
  cookie: {
    secure: false,
    maxAge: 24 * 60 * 60 * 1000, // Extended from your original 10 minutes
    httpOnly: true,
    sameSite: 'lax',
    path: '/'
    // Removed domain: 'localhost' from your original (this was causing issues)
  },
  store: new MemoryStore({ 
    checkPeriod: 86400000, // 24 hours - prune expired entries
    max: 1000, // Maximum number of sessions (prevents memory leaks)
    ttl: 86400000 // 24 hours TTL
  })
}));

// Enhanced logging middleware - matches your original style but with more details
app.use(function(req, res, next) {
  console.log('Request: ' + req.method + ' ' + req.url + ', Session ID: ' + req.sessionID + ', Authenticated: ' + req.session.isAuthenticated + ', Cookies: ' + (req.headers.cookie || 'none') + ', Parsed Cookies: ' + JSON.stringify(req.cookies || {}));
  next();
});

const resultsFilePath = path.join(__dirname, 'data', 'results.json');

app.get('/api/auth-status', function(req, res) {
  console.log('GET /api/auth-status - Session ID:', req.sessionID, 'Authenticated:', req.session.isAuthenticated);
  res.json({ 
    isAuthenticated: !!req.session.isAuthenticated,
    sessionId: req.sessionID // Added for debugging
  });
});

// Debug endpoint - you can remove this later
app.get('/api/debug-session', function(req, res) {
  console.log('=== DEBUG SESSION ===');
  console.log('Session ID:', req.sessionID);
  console.log('Session data:', req.session);
  console.log('Cookies received:', req.headers.cookie);
  console.log('Parsed cookies:', req.cookies);
  console.log('===================');
  
  res.json({
    sessionId: req.sessionID,
    sessionData: req.session,
    cookies: req.cookies,
    rawCookies: req.headers.cookie
  });
});

app.post('/api/login', function(req, res) {
  var password = req.body.password;
  console.log('POST /api/login - Password:', password, 'Session ID:', req.sessionID);
  
  if (password === PASSWORD) {
    req.session.isAuthenticated = true;
    req.session.save(function(err) {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).json({ success: false, message: 'Session save failed' });
      }
      console.log('Session after login:', req.session);
      res.json({ success: true });
    });
  } else {
    res.status(401).json({ success: false, message: 'Incorrect password' });
  }
});

app.post('/api/logout', function(req, res) {
  console.log('POST /api/logout - Session ID:', req.sessionID);
  req.session.destroy(function(err) {
    if (err) {
      console.error('Session destroy error:', err);
      return res.status(500).json({ success: false });
    }
    res.clearCookie('connect.sid'); // Added this from improved version
    res.json({ success: true });
  });
});

app.get('/api/results', async function(req, res) {
  console.log('GET /api/results - Session ID:', req.sessionID);
  try {
    const data = await fs.readFile(resultsFilePath, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    console.error('Error reading results.json:', err);
    res.status(500).json({ error: 'Failed to read results' });
  }
});

app.post('/api/results/:year/:semester', async function(req, res) {
  console.log('POST /api/results/:year/:semester - Session ID:', req.sessionID, 'Authenticated:', req.session.isAuthenticated);
  
  if (!req.session.isAuthenticated) {
    console.log('Unauthorized access to /api/results');
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  try {
    const data = await fs.readFile(resultsFilePath, 'utf8');
    const results = JSON.parse(data);
    var year = req.params.year;
    var semester = req.params.semester;
    var newResult = req.body;
    
    // This matches your original logic exactly
    newResult.id = results[year][semester].length + 1;
    results[year][semester].push(newResult);
    
    await fs.writeFile(resultsFilePath, JSON.stringify(results, null, 2));
    res.json({ success: true });
  } catch (err) {
    console.error('Error saving result:', err);
    res.status(500).json({ error: 'Failed to save result' });
  }
});

// This matches your original catch-all route exactly
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '..', "ann's_portifolio_react", 'build', 'index.html'));
});

app.listen(PORT, function() {
  console.log('Server running on http://localhost:' + PORT);
});