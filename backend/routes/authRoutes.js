import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// --- 1. REGISTER USER ROUTE ---
// @route   POST /api/auth/register
// @desc    Handles the creation of a new user account.
// @access  Public (During development, you'll use this to create your *first* admin.)
//          In a production app, you'd typically disable or protect this route after initial setup.
router.post('/register', async (req, res) => {
  const { username, password } = req.body; // Extract username and password sent from the frontend

  try {
    // 1. Check if a user with this username already exists in the database.
    let user = await User.findOne({ username });
    if (user) {
      // If a user with that username already exists, send an error.
      return res.status(400).json({ msg: 'User already exists' });
    }

    // 2. If the username is unique, create a new User instance based on your User model.
    user = new User({
      username,
      password // At this point, 'password' is still the plain-text password from the request.
    });

    // 3. Hash the password before saving it to the database. This is vital for security.
    //    `bcrypt.genSalt(10)` generates a 'salt' (random data) which is mixed with the password.
    //    The '10' refers to the number of hashing rounds (higher is slower but more secure).
    const salt = await bcrypt.genSalt(10);
    //    `bcrypt.hash()` combines the plain password and salt to create an irreversible hash.
    user.password = await bcrypt.hash(password, salt); // Now, user.password holds the hashed version.

    // 4. Save the new user (with the hashed password) to your MongoDB database.
    await user.save();

    // 5. Create a JSON Web Token (JWT) for the newly registered user.
    //    The 'payload' is the data you want to embed in the token. We usually put the user's ID.
    const payload = {
      user: {
        id: user.id // Mongoose models automatically create an '_id' field, accessible as 'id'.
      }
    };

    // 6. Sign the JWT with your secret key and set an expiration time.
    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Your secret key loaded from the .env file.
      { expiresIn: '1h' },    // The token will be valid for 1 hour.
      (err, token) => {
        if (err) throw err;   // If there's an error during token signing, throw it.
        res.json({ token });  // Send the generated token back to the client. This token means the user is now "logged in".
      }
    );

  } catch (err) {
    // Catch any other server-side errors (e.g., database connection issues).
    console.error(err.message);
    res.status(500).send('Server Error'); // Send a generic server error message to the client.
  }
});


// --- 2. LOGIN USER ROUTE ---
// @route   POST /api/auth/login
// @desc    Authenticates a user and returns a token upon successful login.
// @access  Public
router.post('/login', async (req, res) => {
  const { username, password } = req.body; // Get username and password from the request body.

  try {
    // 1. Find the user by their username in the database.
    let user = await User.findOne({ username });
    if (!user) {
      // If no user is found, send an "Invalid Credentials" message.
      // It's important for security to be generic here; don't tell if the username itself was wrong.
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // 2. Compare the provided plain-text password with the stored hashed password.
    //    `bcrypt.compare()` takes the plain password and the hash from the DB, and checks if they match.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // 3. If credentials are valid, generate a new JWT for the logged-in user.
    const payload = {
      user: {
        id: user.id // Store the user's ID in the token.
      }
    };

    // 4. Sign the JWT, just like in the register route.
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token }); // Send the token back to the client.
      }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// --- 3. GET AUTHENTICATED USER DETAILS ROUTE ---
// @route   GET /api/auth/me
// @desc    Retrieves details of the user who is currently logged in.
// @access  Private (This route requires a valid JWT token to be accessed.)
router.get('/me', auth, async (req, res) => { // The 'auth' middleware runs first here.
  try {
    // If the 'auth' middleware successfully verified the token, it would have attached
    // the user's ID to `req.user.id`. We use this ID to fetch the user's details.
    // `.select('-password')` ensures that the user's password hash is NOT sent back to the client.
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Export the router to be used in your main server.js file
export default router;