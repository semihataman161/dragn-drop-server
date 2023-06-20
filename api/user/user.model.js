import mongoose from 'mongoose';

const User  = new mongoose.Schema({
    userName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
})

export default mongoose.model('Users', User);