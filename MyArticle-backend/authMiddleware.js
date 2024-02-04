
const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  // Get the token from the request headers or cookies
  const token = req.headers.authorization || req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  try {
    // Verify the token and attach user data to the request
    const decoded = jwt.verify(token, 'your-secret-key');
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = authenticateUser;
 
