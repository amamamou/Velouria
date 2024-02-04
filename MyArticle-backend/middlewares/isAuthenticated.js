// middlewares/isAuthenticated.js

const isAuthenticated = (req, res, next) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    // Assuming you have a User model, and assuming you have a function to get the user by ID
    // Replace this with your actual implementation
    User.findById(req.session.userId, (err, user) => {
      if (err || !user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      // Attach the user object to the request for later use in the route
      req.user = user;
      next();
    });
  };
  
  module.exports = isAuthenticated;
  