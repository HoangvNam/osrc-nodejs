const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


function validateUser(username, password) {
  const data = fs.readFileSync('user.txt', 'utf8');
  const users = data.split('\n').map(line => line.trim());
  
  return users.some(user => {
    const [storedUsername, storedPassword] = user.split(':');
    return storedUsername === username && storedPassword === password;
  });
}


app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (validateUser(username, password)) {
    res.json({ message: 'Login successful!' });
  } else {
    res.json({ message: 'Invalid username or password!' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
