import mongoose from 'mongoose';

// type - required - default - min - max
// type: Number - String - Boolean - Date
// [ Number ]

// target: { // forigne key
//   type: mongoose.OjbectId,
//   ref: 'planet',
// },

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model('User', userSchema);
