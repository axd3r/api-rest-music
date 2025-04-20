import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const {
          MONGO_USER,
          MONGO_PASSWORD,
          MONGO_HOST,
          MONGO_PORT,
          MONGO_DB_NAME,
        } = process.env;
    
        let MONGO_URI = "";
    
        if (MONGO_USER && MONGO_PASSWORD) {
          MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}?authSource=admin`;
        } else {
          MONGO_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`;
        }
    
        await mongoose.connect(MONGO_URI)

        console.log("Conectado a MongoDB");
        
    } catch (error) {
        console.error("Error al conectar a MongoDB: ", error);
        process.exit(1);      
    }
};

export default connectDB;