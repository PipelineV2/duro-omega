import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { DatabaseConnectionError } from "../common/Error";

dotenv.config();
beforeAll(async () => {
    try {
        if (!process.env.JWT_KEY) {
          throw new Error("JWT_KEY must be defined");
        }
       if (!process.env.MONGO_URI) {
         throw new Error("MONGO_URI must be defined in the env");
       }
   
       await mongoose.connect(process.env.MONGO_URI, {
         autoIndex: true,
       });
       console.log("Mongo is connected 😅");
     } catch (err) {
       console.log(err);
       throw new DatabaseConnectionError();
     }
  });
  
  // Disconnect from MongoDB
  afterAll(async () => {
    await mongoose.connection.close();
  });