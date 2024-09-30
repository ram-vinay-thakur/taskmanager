import mongoose from "mongoose";

const connectDB = async (req, res) => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (err) {
        console.log('Mongodb Connection Error: ', err);
        process.exit(1);
    }
}

export default connectDB;