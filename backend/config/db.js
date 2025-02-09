import mongoose, { connect } from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://aryansky333:HQervhALxVgHFSTU@cluster0.kgakyx9.mongodb.net/swiggato').then(() => console.log('Database Connected.'));
}