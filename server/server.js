import express from 'express';
import {MongoClient, ObjectId} from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const filmCollection =process.env.MONGO_FILM_COLLECTION
// add collections 

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

app.get('/api/planets', async (req, res) => {
    res.send("Hello, no planets are here please");
})

app.get("api/films", async (req, res) => {
    try {
        const client = await new MongoClient(url);
        const db = client.db(dbName)
        const collection = db.collection(filmCollection);
        const showFilms = await collection.find({}).toArray()
        res.json(showFilms)
    } catch (err) {
        console.error("Error:", err)
        res.status(500).send("Oops!")
    }
})
app.get("api/films:id", async (req, res) => {
    try {
        const {filmId} = req.params.id
        const client = new MongoClient(url);
        const db = client.db(dbName)
        const collection = db.collection(filmCollection);
        const showFilms = await collection.find({_id: new ObjectId}).toArray()
        res.json(showFilms)
    } catch (err) {
        console.error("Error:", err)
        res.status(500).send("Oops!")
    }
})

app.listen(PORT, () => {
    console.log('Star Wars is running')
})