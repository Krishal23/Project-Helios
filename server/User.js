import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    displayPicture: {
        type: String, // URL or base64 string
        default: 'https://via.placeholder.com/150' // Default placeholder image
    },
    bio: {
        type: String,
        default: 'This is a short bio.' // Default bio
    },
    phone: {
        type: String,
        default: '' // Empty by default, can be updated by the user
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
export default User;
