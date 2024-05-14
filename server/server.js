import express from 'express';
import {MongoClient, ObjectId} from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

// routes
// import { films } from './routes/films';

dotenv.config();

const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
// add collections 

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());


app.get('/api/planets', async (req, res) => {
    const client = await MongoClient.connect(url);
    const collection = client.db(dbName).collection("planets");
    const planets = await collection.find().toArray();

    res.status(201).send(planets);
})

app.listen(PORT, () => {
    console.log('Star Wars is running')
})