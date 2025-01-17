import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import {sequelize, connectToDatabase} from './config/sequelize.js'
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';

import Product from './models/product.js';
import cartRouter from './routes/cartRoute.js';
import wishlistRouter from './routes/wishlistRoute.js';
import orderRouter from './routes/orderRoute.js';
import userListRouter from './routes/userListRoute.js';


// APP CONFIG
const app = express()
const port = process.env.PORT || 4001
connectCloudinary()

// MIDDLEWARES
app.use(express.json());
app.use(cors());

// API ENDPOINTS
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/order', orderRouter)
app.use('/api/list-user', userListRouter)

app.get('/',(req, res) => {
    res.send("API Working")
})

const startServer = async () => {
    try {
        await connectToDatabase();
        app.listen(port, () => {
            console.log("Server Start on PORT: " + port);
        })
    } catch (error) {
        console.log("Error connecting to the database: " + error);
    }
}

startServer();

