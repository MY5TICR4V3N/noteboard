import moongoose from 'mongoose';

export const connectDB = async () => {
    try{
        await moongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully");
    } catch(error){
        console.error("Database connection failed:", error);
        process.exit(1); // Exit the process with failure
    }
};