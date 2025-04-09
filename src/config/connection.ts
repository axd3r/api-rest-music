import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const MONGO_URI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}?authSource=admin`;
    
        await mongoose.connect(MONGO_URI)

        console.log("Conectado a MongoDB");
        
    } catch (error) {
        console.error("Error al conectar a MongoDB: ", error);
        process.exit(1);      
    }
};

export default connectDB;