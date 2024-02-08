const express = require('express');
const mysql = require('mysql');
const util = require('util');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Added JWT


const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));
app.use(express.json());


const secretKey = process.env.JWT_SECRET || 'your-secret-key'; // Secret key for JWT

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


const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized', authenticated: false });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized', authenticated: false });
    }

    req.user = decoded; 
    next();
  });
};

// Endpoint to check session status
app.get('/session-check', isAuthenticated, (req, res) => {
  res.json({ loggedIn: true, user: req.user });
});






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

// search
app.get('/articles/search/:term', (req, res) => {
  const searchTerm = '%' + req.params.term + '%'; // Using % for SQL LIKE
  connection.query('SELECT * FROM articles WHERE title LIKE ?', [searchTerm], (error, results) => {
    if (error) {
      console.error("Error fetching articles:", error);
      return res.status(500).send(error);
    }
    res.json(results);
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
//likes w comments 
app.get('/api/article-comments', (req, res) => {
  const query = `
    SELECT article_id, COUNT(*) AS comment_count
    FROM comments
    GROUP BY article_id;
  `;
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error counting comments:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json(results);
    }
  });
});
app.get('/api/article-likes', (req, res) => {
  const query = `
    SELECT article_id, COUNT(*) AS like_count
    FROM likes
    GROUP BY article_id;
  `;
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error counting likes:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json(results);
    }
  });
});


app.get('/api/articles/:articleId/comments', async (req, res) => {
  const articleId = req.params.articleId;
  if (!articleId) {
    return res.status(400).json({ error: 'Article ID is required' });
  }
  
  try {
    const query = `
      SELECT c.*, u.username 
      FROM comments c 
      INNER JOIN users u ON c.user_id = u.user_id
      WHERE c.article_id = ? 
      ORDER BY c.created_at DESC
    `;
    const comments = await connection.query(query, [articleId]);
    res.json(comments);
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



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
// Login endpoint
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

      const userForToken = {
        userId: user_id,
        username,
        email,
        profilePic: profile_pic,
        firstName: first_name,
        lastName: last_name,
      };

      const token = jwt.sign(userForToken, secretKey, {
        expiresIn: '24h', // Token expires in 24 hours
      });

      res.status(200).json({
        message: 'Logged in successfully',
        authenticated: true,
        token, // Send the token to the client
        user: userForToken,
      });
    } else {
      return res.status(401).json({ error: 'Invalid email or password', authenticated: false });
    }
  } catch (error) {
    console.error('Database error during login:', error);
    return res.status(500).json({ error: 'Internal Server Error during login', authenticated: false });
  }
});
// Logout endpoint
app.post('/logout', isAuthenticated, (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});


// Comment article endpoint
app.post('/add-comment/:articleId', isAuthenticated, async (req, res) => {
  const userId = req.user.userId; // Use req.user instead of req.session.user
  const articleId = req.params.articleId;
  const { commentText } = req.body;

  try {
    // Record the comment
    const commentRecorded = await recordComment(userId, articleId, commentText);
    if (!commentRecorded) {
      return res.status(500).json({ error: 'Failed to record comment' });
    }

    res.status(201).json({ success: true, message: 'Comment added successfully' });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Function to record a comment in the database
async function recordComment(userId, articleId, commentText) {
  try {
    const sql = 'INSERT INTO comments (article_id, user_id, comment_text, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())';
    const result = await connection.query(sql, [articleId, userId, commentText]);
    if (result.affectedRows > 0) {
      return true; // Comment successfully recorded
    } else {
      return false; // No rows affected, comment recording failed
    }
  } catch (error) {
    console.error('Error recording comment:', error);
    return false;
  }
}




// Like article endpoint
app.post('/like-article/:articleId', isAuthenticated, async (req, res) => {
  const userId = req.user.userId; // Use req.user instead of req.session.user
  const articleId = req.params.articleId;

  try {
    // Check if the user has already liked the article
    const hasLiked = await checkUserLike(userId, articleId);

    if (hasLiked) {
      return res.status(400).json({ error: 'You have already liked this article' });
    }

    // Record the like
    const likeRecorded = await recordLike(userId, articleId);
    if (!likeRecorded) {
      return res.status(500).json({ error: 'Failed to record like' });
    }



    res.status(200).json({ message: 'Article liked successfully' });
  } catch (error) {
    console.error('Error liking article:', error);
    res.status(500).json({ error: 'Internal Server Error' });
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

app.get('/check-like/:userId/:articleId', isAuthenticated, async (req, res) => {
  const { userId, articleId } = req.params;
  console.log(`Checking like status for user ${userId} on article ${articleId}`);

  try {
    const hasLiked = await checkUserLike(userId, articleId);
    console.log(`Like status for user ${userId} on article ${articleId}: ${hasLiked}`);
    res.json({ liked: hasLiked });
  } catch (error) {
    console.error('Error checking if user has liked article:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//profilou (connecté)
app.get('/profile', isAuthenticated, async (req, res) => {
  try {
    const userId = req.user.userId; // Get the authenticated user's ID from the decoded token
    const user = await getUserInfo(userId);
    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Function to get user information from the database
async function getUserInfo(userId) {
  try {
    const sql = 'SELECT * FROM users WHERE user_id = ?';
    const [user] = await connection.query(sql, [userId]);
    return user;
  } catch (error) {
    console.error('Error fetching user information from the database:', error);
    throw error;
  }
}
// Endpoint to fetch articles liked by the authenticated user
app.get('/liked-articles', isAuthenticated, async (req, res) => {
  try {
    const userId = req.user.userId; // Extract user ID from the authenticated user's token

    // Query the database to retrieve articles liked by the user
    const likedArticles = await connection.query(`
      SELECT articles.*
      FROM likes
      INNER JOIN articles ON likes.article_id = articles.id
      WHERE likes.user_id = ?
    `, [userId]);

    res.json({ likedArticles });
  } catch (error) {
    console.error('Error fetching liked articles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
