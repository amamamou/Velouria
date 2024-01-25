const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken');

const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'myarticle'
});

connection.connect(error => {
  if (error) throw error;
  console.log("Connected to the database.");
});
// Configure express-session
app.use(session({
    secret: 'karam',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using https
}));
// POST /articles - Create a new article
app.post('/articles', upload.single('image'), (req, res) => {
    console.log('Received file:', req.file);
    console.log('Received body:', req.body);
    const { title, content, author, category_id } = req.body; // Added category_id
    const image = req.file ? 'uploads/' + req.file.filename : null;
    const query = 'INSERT INTO articles (title, content, image, author, category_id) VALUES (?, ?, ?, ?, ?)'; // Updated query
    connection.query(query, [title, content, image, author, category_id], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).send(error);
        }
        res.status(201).json({ id: results.insertId });
    });
});
//lkol
app.get('/articles', (req, res) => {
  connection.query('SELECT * FROM articles', (error, results) => {
    if (error) {
        console.error("Error fetching articles:", error);
        return res.status(500).send(error);
    }
    res.json(results);
  });
});

app.get('/articles/:id', (req, res) => {
  connection.query('SELECT * FROM articles WHERE id = ?', [req.params.id], (error, results) => {
    if (error) return res.status(500).send(error);
    res.json(results[0]);
  });
});
// PUT /articles/:id - Update an existing article
app.put('/articles/:id', upload.single('image'), (req, res) => {
    const { title, content, author, category_id } = req.body; // Added category_id
    let query;
    let values;

    if (req.file) {
        query = 'UPDATE articles SET title = ?, content = ?, author = ?, image = ?, category_id = ? WHERE id = ?'; // Updated query
        values = [title, content, author, 'uploads/' + req.file.filename, category_id, req.params.id]; // Added category_id
    } else {
        query = 'UPDATE articles SET title = ?, content = ?, author = ?, category_id = ? WHERE id = ?'; // Updated query
        values = [title, content, author, category_id, req.params.id]; // Added category_id
    }

    console.log('Executing query:', query);
    console.log('With values:', values);

    connection.query(query, values, error => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).send(error);
        }
        res.json({ message: 'Article updated successfully' });
    });
});
//delete

app.delete('/articles/:id', (req, res) => {
  connection.query('DELETE FROM articles WHERE id = ?', [req.params.id], (error) => {
    if (error) return res.status(500).send(error);
    res.json({ message: 'Article deleted' });
  });
});




//admin
app.post('/login/admin', (req, res) => {
  const { email, password } = req.body;
  connection.query('SELECT * FROM admins WHERE email = ?', [email], async (error, results) => {
    if (error || results.length === 0) return res.status(401).send('Authentication failed');
    
    const admin = results[0];
    const match = await bcrypt.compare(password, admin.password_hash);
    if (match) {
      res.json({ message: 'Admin logged in successfully', adminId: admin.admin_id });
    } else {
      res.status(401).send('Authentication failed');
    }
  });
});


/* Admin Registration
app.post('/register/admin', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const query = 'INSERT INTO admins (username, email, password_hash) VALUES (?, ?, ?)';
    connection.query(query, [username, email, hashedPassword], (error, results) => {
      if (error) return res.status(500).send(error);
      res.status(201).json({ message: 'Admin registered successfully', adminId: results.insertId });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});*/



//categories 
app.post('/categories', (req, res) => {
    const { name, image } = req.body;
    const query = 'INSERT INTO categories (name, image) VALUES (?, ?)';
    connection.query(query, [name, image], (error, results) => {
        if (error) {
            console.error("Error adding category:", error);
            return res.status(500).send(error);
        }
        res.status(201).json({ message: 'Category added successfully', categoryId: results.insertId });
    });
});

app.get('/categories/:id', (req, res) => {
    connection.query('SELECT * FROM categories WHERE id = ?', [req.params.id], (error, results) => {
        if (error) return res.status(500).send(error);
        res.json(results[0] || {});
    });
});
app.get('/categories', (req, res) => {
    connection.query('SELECT * FROM categories', (error, results) => {
        if (error) {
            console.error("Error fetching categories:", error);
            return res.status(500).send(error);
        }
        res.json(results);
    });
});

app.put('/categories/:id', (req, res) => {
    const { name, image } = req.body;
    connection.query('UPDATE categories SET name = ?, image = ? WHERE id = ?', [name, image, req.params.id], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).send(error);
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Category not found');
        }
        res.json({ message: 'Category updated successfully' });
    });
});

app.delete('/categories/:id', (req, res) => {
    connection.query('DELETE FROM categories WHERE id = ?', [req.params.id], (error) => {
        if (error) return res.status(500).send(error);
        res.json({ message: 'Category deleted' });
    });
});
app.get('/articles/category/:categoryId', (req, res) => {
    const categoryId = req.params.categoryId;

    const query = 'SELECT * FROM articles WHERE category_id = ?';
    connection.query(query, [categoryId], (error, results) => {
        if (error) {
            console.error("Error fetching articles:", error);
            return res.status(500).send(error);
        }
        res.json(results);
    });
});
//userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr

// Middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
    if (req.session.userId) {
        return next();
    }
    res.status(401).send('Not logged in');
}

// Register User
app.post('/register/user', async (req, res) => {
    const { username, email, password, first_name, last_name } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    connection.query('INSERT INTO users (username, email, password_hash, first_name, last_name) VALUES (?, ?, ?, ?, ?)', 
    [username, email, passwordHash, first_name, last_name], (error, results) => {
        if (error) return res.status(500).send(error);
        res.status(201).send('User registered successfully');
    });
});

// User Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    connection.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) return res.status(500).send(error);
        if (results.length === 0) return res.status(404).send('User not found');

        const user = results[0];
        const passwordIsValid = await bcrypt.compare(password, user.password_hash);

        if (passwordIsValid) {
            req.session.userId = user.user_id; // Set user ID in session
            res.send('Login successful');
        } else {
            res.status(401).send('Invalid password');
        }
    });
});

// Get User Profile
app.get('/users/profile', isLoggedIn, (req, res) => {
    connection.query('SELECT username, email, first_name, last_name, profile_pic FROM users WHERE user_id = ?', [req.session.userId], (error, results) => {
        if (error) return res.status(500).send(error);
        if (results.length === 0) return res.status(404).send('User not found');
        res.json(results[0]);
    });
});

// Update User Profile
app.put('/users/profile', isLoggedIn, (req, res) => {
    const { username, email, first_name, last_name, profile_pic } = req.body;
    let query = 'UPDATE users SET ';
    let values = [];

    if (username) { query += 'username = ?, '; values.push(username); }
    if (email) { query += 'email = ?, '; values.push(email); }
    if (first_name) { query += 'first_name = ?, '; values.push(first_name); }
    if (last_name) { query += 'last_name = ?, '; values.push(last_name); }
    if (profile_pic) { query += 'profile_pic = ?, '; values.push(profile_pic); }

    query = query.slice(0, -2);
    query += ' WHERE user_id = ?';
    values.push(req.session.userId);

    connection.query(query, values, (error) => {
        if (error) return res.status(500).send(error);
        res.json({ message: 'Profile updated successfully' });
    });
});

// Logout User
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.send('Logged out successfully');
});

// Delete User
app.delete('/users/profile', isLoggedIn, (req, res) => {
    connection.query('DELETE FROM users WHERE user_id = ?', [req.session.userId], (error, results) => {
        if (error) return res.status(500).send(error);
        if (results.affectedRows === 0) return res.status(404).send('User not found');
        req.session.destroy();
        res.send('User deleted successfully');
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});