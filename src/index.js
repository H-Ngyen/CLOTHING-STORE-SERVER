import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import {v2 as cloudinary} from 'cloudinary';
import productRoute from './routers/ProductsRoute.js';
import myProductRoute from './routers/MyProductRoute.js';
import myUserRoute from './routers/MyUserRoute.js';

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log('connected to db'))
    .catch((e) => console.log('error from connection of app to db: ' + e));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.use('/api/product', productRoute);
app.use('/api/my/product', myProductRoute);
app.use('/api/my/user', myUserRoute)

app.get('/', (req, res) => res.send('server ok'));

app.listen(port, () =>
    console.log(`Server listening on port http://localhost:${port}`)
);