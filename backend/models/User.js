import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,       // The username will be a text string
    required: true,     // This field is mandatory (cannot be empty)
    unique: true,       // Each username must be unique (no two users can have the same username)
    trim: true          // Automatically remove any leading/trailing whitespace from the username
  },
  password: {
    type: String,       // The password (which will be hashed) will also be a text string
    required: true      // This field is mandatory
  },
  date: {
    type: Date,         // Stores the date when the user account was created
    default: Date.now   // Automatically sets the current date and time when a new user is added
  }
});

const User = mongoose.model('User', UserSchema);

export default User;