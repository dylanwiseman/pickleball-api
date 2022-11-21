import mongoose, { model, Schema } from 'mongoose';

const UserSchema = new Schema(
    {
        authId: { type: String, require: true },
        email: { type: String, require: true },
        firstName: String,
        lastName: String,
    },
    { timestamps: true }
);

export const UserModel =
    mongoose.models.User || model('User', UserSchema, 'users');
