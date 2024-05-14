import express from 'express';
import {MongoClient, ObjectId} from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

// routes
// import { films } from './routes/films';

dotenv.config();

const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const filmCollection =process.env.MONGO_FILM_COLLECTION
const planetsCollection = process.env.MONGO_PLANETS_COLLECTION;
const planetsAndFilmsCollection = process.env.MONGO_PLANETS_FILMS;
// add collections 

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

app.get('/api/planets', async (req, res) => {
    console.log("Planets env", planetsCollection);
    try {
        const client = await MongoClient.connect(url);
        const collection = client.db(dbName).collection(planetsCollection);
        const planets = await collection.find().toArray();

        res.status(201).send(planets);
    } catch (error) {
        console.error("Coulnd't get planets data from database");
        res.status(500).send("Internal server error while trying to fetch planets");
    }
});

app.get("/api/planets/:planetId", async (req, res) => {
    const {planetId} = req.params;
    try {
        const client = await MongoClient.connect(url);
        const collection = client.db(dbName).collection(planetsCollection);
        // const planets = await collection.find({_id: new Object(planetId)}).toArray();
        const planets = await collection.find({id: Number(planetId)}).toArray();

        res.status(201).send(planets);
    } catch (error) {
        console.error("Error connecting to database, couldn't get planets data");
        res.status(500).send("Internal server error while trying to fetch planets");
    }
});

app.get("/api/planets/:planetId/films", async (req, res) => {
    const {planetId} = req.params;
    try {
        // get film and planet collections
        const client = await MongoClient.connect(url);
        const collection = client.db(dbName).collection(planetsAndFilmsCollection);
        const filmsCollection = client.db(dbName).collection(filmCollection);

        // get planet information with associated film ID's, then use films ID's to get film info.
        const filmsAndPlanets = await collection.find({planet_id: Number(planetId)}).toArray();
        const filmIds = filmsAndPlanets.map(film => film.film_id)
        const films = await filmsCollection.find({id: {$in: filmIds}}).toArray();

        res.status(201).send(films);
    } catch (error) {
        console.error("Error connecting to database, couldn't get planets data");
        res.status(500).send("Internal server error while trying to fetch planets");
    }
});

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