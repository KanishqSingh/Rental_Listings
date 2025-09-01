import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connextDB from './configs/db.js';
import ownerRouter from './Routes/ownerRoutes.js';
import bookingRouter from './Routes/bookingRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();

//always import from db.js not db
await connextDB();

//middleware
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>res.send("Server is running"))

//routes
app.use('/api/user',userRouter)
app.use('/api/owner',ownerRouter)
app.use('/api/bookings',bookingRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log("Server started on port 5000"));
