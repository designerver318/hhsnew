// models/Admin.js
import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { collection: 'admindata' }); // Explicitly set collection name

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema);