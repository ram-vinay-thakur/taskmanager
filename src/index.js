import app from "./app.js";
import ApiError from "./utils/ApiError.utils.js";
import connectDB from "./db/db.connection.js";
import { default as dotenv } from 'dotenv';
dotenv.config();

(async () => {
    try{
        await connectDB();
        app.listen(process.env.PORT, () => {
            console.log(`⚙️ Server is running on port ${process.env.PORT}`)
        })
    }catch(error){
        console.error('Mongodb Connection Error', error);
    }
})();