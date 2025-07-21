import jwt from 'jsonwebtoken';

// This middleware function will be executed for routes that require a logged-in user.
const auth = function (req, res, next) {
  // 1. Get the token from the request header.
  //   Your frontend will send the login token in an HTTP header usually named 'x-auth-token'.
  const token = req.header('x-auth-token');

  // 2. Check if a token was actually provided in the request.
  if (!token) {
    // If no token is found, it means the user is not authenticated. Send a 401 Unauthorized response.
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // 3. Verify the token's authenticity and validity.
  try {
    // jwt.verify() checks two main things:
    // a) Is the token's signature valid (was it signed with our secret key and not tampered with)?
    // b) Has the token expired?
    // It uses your secret key (from .env) to perform this verification.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If verification is successful, 'decoded' will contain the original payload that was signed into the token.
    // In our case, this payload includes `user: { id: user._id }`.
    // We attach this user information to the 'req' (request) object.
    // This allows subsequent functions in the request pipeline (your route handlers) to know who the user is.
    req.user = decoded.user;
    next(); // Call 'next()' to pass control to the next middleware or the actual route handler function.
  } catch (err) {
    // If the token is not valid (e.g., tampered with, expired, incorrect secret), send a 401 Unauthorized response.
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default auth;