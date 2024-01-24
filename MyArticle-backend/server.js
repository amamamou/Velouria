const express = require('express');
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

app.post('/articles', upload.single('image'), (req, res) => {
  console.log('Received file:', req.file);
  console.log('Received body:', req.body);
  const { title, content, author } = req.body;
  const image = req.file ? 'uploads/' + req.file.filename : null;
  const query = 'INSERT INTO articles (title, content, image, author) VALUES (?, ?, ?, ?)';
  connection.query(query, [title, content, image, author], (error, results) => {
    if (error) {
      console.error('Database error:', error);
      return res.status(500).send(error);
    }
    res.status(201).json({ id: results.insertId });
  });
});

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
app.put('/articles/:id', upload.single('image'), (req, res) => {
    const { title, content, author } = req.body;
    let query;
    let values;

    if (req.file) {
        // If an image is uploaded, include it in the update
        query = 'UPDATE articles SET title = ?, content = ?, author = ?, image = ? WHERE id = ?';
        values = [title, content, author, 'uploads/' + req.file.filename, req.params.id];
    } else {
        // If no image is uploaded, don't include it in the update
        query = 'UPDATE articles SET title = ?, content = ?, author = ?, WHERE id = ?';
        values = [title, content, author, req.params.id];
    }

    // Log the query and values for debugging
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


app.delete('/articles/:id', (req, res) => {
  connection.query('DELETE FROM articles WHERE id = ?', [req.params.id], (error) => {
    if (error) return res.status(500).send(error);
    res.json({ message: 'Article deleted' });
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});



//user
app.post('/register/user', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const query = 'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)';
    connection.query(query, [username, email, hashedPassword], (error, results) => {
      if (error) return res.status(500).send(error);
      res.status(201).json({ message: 'User registered successfully', userId: results.insertId });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
//login 
app.post('/login/user', (req, res) => {
  const { email, password } = req.body;
  connection.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
    if (error || results.length === 0) return res.status(401).send('Authentication failed');
    
    const user = results[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (match) {
      res.json({ message: 'User logged in successfully', userId: user.user_id });
    } else {
      res.status(401).send('Authentication failed');
    }
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



