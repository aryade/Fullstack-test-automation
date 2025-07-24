const { users } = require('../data/db');

exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ token: 'dummy-token', username });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};
