import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connextDB from './configs/db.js';
import ownerRouter from './Routes/ownerRoutes.js';
import bookingRouter from './Routes/bookingRoutes.js';
import userRouter from './Routes/userRoutes.js'


const app = express();

// Always import from db.js, not db
await connextDB();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send("Server is running"));

// Routes
app.use('/api/user', userRouter);
app.use('/api/owner', ownerRouter);
app.use('/api/bookings', bookingRouter);

// Use Render's dynamic port
const PORT = process.env.PORT || 5000;

// Bind to 0.0.0.0 instead of localhost
app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server started on port ${PORT}`);
});
