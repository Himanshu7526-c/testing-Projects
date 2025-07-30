
import mongoose from "mongoose";
const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to database');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process with failure
    }
}
export default connectToMongo;