const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const util = require('util');
const cors = require('cors');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');


const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));
app.use(express.json());

const secretKey = process.env.JWT_SECRET || 'your-secret-key';

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'myarticle'
});

connection.connect(error => {
  if (error) throw error;
  console.log("Connected to the database.");
});
connection.query = util.promisify(connection.query).bind(connection);

app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });



// POST /articles - 

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



//userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr


// registration
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).send('Username, email, and password are required');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
    res.status(201).send('User created');
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send(error.message);
  }
});

/*
app.get('/users/profile', isLoggedIn, async (req, res) => {
  try {
    // Fetch user data from the database based on the userId stored in the session
    const userData = await connection.query('SELECT username, email, profile_pic, first_name, last_name FROM users WHERE user_id = ?', [req.session.userId]);

    // Check if a user with the provided userId was found
    if (userData.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = userData[0];

    // Respond with user data
    res.status(200).json({
      message: "User is logged in",
      authenticated: true,
      userId: req.session.userId,
      username: user.username,
      email: user.email,
      profile_pic: user.profile_pic,
      first_name: user.first_name,
      last_name: user.last_name
    });
  } catch (error) {
    // Handle database errors
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
*/
//login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const users = await connection.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password', authenticated: false });
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (isPasswordValid) {
      const { user_id, username, email, profile_pic, first_name, last_name } = user;

      const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60;
      const token = jwt.sign({ userId: user_id, exp: expirationTime }, secretKey);

      res.status(200).json({
        message: 'Logged in successfully',
        authenticated: true,
        user: {
          userId: user_id,
          username,
          email,
          profilePic: profile_pic,
          firstName: first_name,
          lastName: last_name,
          token,
        },
      });
    } else {
      return res.status(401).json({ error: 'Invalid email or password', authenticated: false, token: null });
    }
  } catch (error) {
    console.error('Database error during login:', error);
    return res.status(500).json({ error: 'Internal Server Error during login', authenticated: false, token: null });
  }
});

/*
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const users = await connection.query('SELECT * FROM users WHERE email = ?', [email]);

    if (users.length === 0) {
      return res.status(401).json({ error: 'Incorrect email or password', authenticated: false });
    }

    const user = users[0];

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (isPasswordValid) {
      req.session.authenticated = true;
      req.session.userId = user.user_id;
      req.session.save();  // Save the session immediately

      const token = jwt.sign({ userId: user.user_id }, 'karam', { expiresIn: '1h' });


      res.status(200).json({
        message: 'Logged in successfully',
        authenticated: true,
        userId: user.user_id,
        username: user.username,
        email: user.email,
        profile_pic: user.profile_pic,
        first_name: user.first_name,
        last_name: user.last_name,
        token: token  
      });
    } else {
      res.status(401).json({ error: 'Incorrect email or password', authenticated: false, token: null });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error', authenticated: false, token: null });
  }
});
*/

/*
// Update User Profile
app.put('/users/profile', isLoggedIn, async (req, res) => {
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

  try {
    await connection.query(query, values);
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
*/
// logout
app.get('/logout', function (req, res) {
  // You don't need to destroy the session in JWT-based authentication
  res.json({ message: 'Logged out' });
});


/*app.get('/logout', function (req, res) {
  req.session.destroy(); 
  res.json({ message: 'Logged out' });
});*/



// middleware function 
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Token not provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }

    req.userData = decoded;
    next(); 
  });
};

app.post('/like/:articleId', verifyToken, async (req, res) => {
  const userId = req.userData.userId;
  const articleId = req.params.articleId;

  try {
    const isLiked = await checkUserLike(userId, articleId);

    if (isLiked) {
      return res.status(400).json({ error: 'User has already liked the article.' });
    }

    const likeResult = await recordLike(userId, articleId);

    if (likeResult) {
      await updateArticleLikes(articleId);
      await updateUserLikes(userId);

      res.json({ message: `Article ${articleId} liked by user ${userId}.` });
    } else {
      res.status(500).json({ error: 'Failed to like the article.' });
    }
  } catch (error) {
    console.error('Error during like:', error);
    res.status(500).json({ error: 'Internal Server Error during like.' });
  }
});


async function checkUserLike(userId, articleId) {
  const result = await connection.query('SELECT * FROM likes WHERE user_id = ? AND article_id = ?', [userId, articleId]);
  return result.length > 0;
}

async function recordLike(userId, articleId) {
  const result = await connection.query('INSERT INTO likes (user_id, article_id) VALUES (?, ?)', [userId, articleId]);
  return result.affectedRows > 0;
}

async function updateArticleLikes(articleId) {
  await connection.query('UPDATE articles SET number_of_likes = number_of_likes + 1 WHERE id = ?', [articleId]);
}

async function updateUserLikes(userId) {
  await connection.query('UPDATE users SET like_id = like_id + 1 WHERE user_id = ?', [userId]);
}


//like
// POST /like/:articleId - Like an article


/*app.post('/like/:articleId', isLoggedIn, async (req, res) => {
  const userId = req.user.user_id;
  const articleId = req.params.articleId;

  try {
    const [existingLike] = await connection.query('SELECT * FROM likes WHERE user_id = ? AND article_id = ?', [userId, articleId]);

    if (existingLike.length === 0) {
      await connection.query('INSERT INTO likes (user_id, article_id) VALUES (?, ?)', [userId, articleId]);
      res.json({ message: 'Like added successfully', success: true });
    } else {
=      res.status(400).json({ message: 'Article already liked by the user', success: false });
    }
  } catch (error) {
    console.error('Error processing like:', error);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
});
*/


const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
