import express from "express"
import connection from "./config/db.js"
import authRoutes from './routes/authRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import interactionRoutes from './routes/interactionRoutes.js';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/interactions', interactionRoutes);


app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
  });

app.get("/", (req,res) => {
    res.send("server is running fine")
});

app.listen(PORT, async()=>{
    try {
        await connection
        console.log(`server is running on port ${PORT} and db is connected`);
    } catch (error) {
        console.log("error in the server", error)
    }
})




