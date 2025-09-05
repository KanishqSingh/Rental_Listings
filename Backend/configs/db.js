import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("✅ Database connected successfully");
        });

        mongoose.connection.on("error", (err) => {
            console.error("❌ Database connection error:", err);
        });

        await mongoose.connect(`${process.env.MONGODB_URI}/rentalServices`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000 // wait max 10 sec
        });
    } catch (error) {
        console.error("❌ Error connecting to DB:", error.message);
        process.exit(1);
    }
};

export default connectDB;
