import express /*{ response }*/ from 'express';
import {PORT, mongoDBURL} from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js'
import booksRoute from './routes/booksRoute.js'
import cors from 'cors';

const app = express();
app.use(express.json());

//middleware for handling cors policy
// app.use(cors());

//option 2
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods : ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('welcome to mern stack tutorial');
});

app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(()=> {
        console.log('connected to mongoDB');
        app.listen(PORT, ()=>{
            console.log(`app is listening to port : ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    })