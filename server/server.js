import express from 'express';
import {MongoClient, ObjectId} from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

// routes
// import { films } from './routes/films';

dotenv.config();

const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
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
        const client = await MongoClient.connect(url);
        const collection = client.db(dbName).collection(planetsAndFilmsCollection);
        const filmsAndPlanets = await collection.find({planet_id: Number(planetId)}).toArray();

        // Need to query the planets and films collections to get their respective information
        res.status(201).send(filmsAndPlanets);
    } catch (error) {
        console.error("Error connecting to database, couldn't get planets data");
        res.status(500).send("Internal server error while trying to fetch planets");
    }
});

app.listen(PORT, () => {
    console.log('Star Wars is running')
})