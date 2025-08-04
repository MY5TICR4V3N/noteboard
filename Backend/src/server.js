import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';
import path from 'path';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const PORT=process.env.PORT || 5000;
const app = express();
const __dirname = path.resolve();

if(process.env.NODE_ENV !== 'production') {

  app.use(cors({origin: 'http://localhost:5173'})); // Allow requests from the frontend

}
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(rateLimiter);


app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
  next();
});

app.use("/api/user", userRoutes);

app.use("/api/notes",notesRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../Frontend/dist')));
  app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
});

}


connectDB().then(() => {
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
});
