import mongoose from "mongoose";
import colors from 'colors';
import {} from "dotenv";

export const dbConnection = () => {
    mongoose
        .connect(process.env.MONGO_URI,{
            dbName : "Name",
        })
        .then(() => {
            console.log(colors.green("Connected to Database!"));
        })
        .catch(err => {
            console.log(colors.red("Error connecting to database", err));
        })
}