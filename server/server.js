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
const charactersCollection = process.env.MONGO_CHARACTER_COLLECTION;
const filmsCharactersCollection = process.env.MONGO_FILM_CHARACTER_COLLECTION;
// add collections 

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());


// route to get planet info
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

// route to get a specific planet's info
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

// route to get films associated with a specific planet
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

// route to get characters who live on a specific planet
app.get("/api/planets/:planetId/characters", async (req, res) => {
    const {planetId} = req.params;
    try {
        // get characters collection
        const client = await MongoClient.connect(url);
        const characterCollection = client.db(dbName).collection(charactersCollection);

        // get characters associated with the given planet, using planetId for homeworld
        const characters = await characterCollection.find({"homeworld": Number(planetId)}).toArray();
        console.log("What's happening", characters);
        res.status(201).send(characters);
    } catch (error) {
        console.error("Error connecting to database, couldn't get planets data");
        res.status(500).send("Internal server error while trying to fetch planets");
    }
});

// route for getting all film info
app.get("/api/films", async (req, res) => {
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
});

// route to get a specific film's info
app.get("/api/films/:id", async (req, res) => {
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
});

// route to get all characters associated with a specific film
app.get("/api/films/:filmId/characters", async (req, res) => {
    const {filmId} = req.params;
    try {
        const client = await MongoClient.connect(url);
        const collection = client.db(dbName).collection(filmsCharactersCollection);
        const characterCollection = client.db(dbName).collection(charactersCollection);

        const filmsAndCharacters = await collection.find({film_id:Number(filmId)}).toArray();
        const charIds = filmsAndCharacters.map(el => el.character_id);
        const characters = await characterCollection.find({id: {$in: charIds}}).toArray();

        console.log("Our films and characters:", characters);
        res.status(200).send(characters);
    } catch (error) {
        console.error("Error connecting to db, couldn't get film info");
        res.status(500).send("Internal server error while trying to fetch films");
    }
});

// route for getting all planets associated with a specific film
app.get ('/api/films/:filmId/planets', async (req, res) => {
    const {filmId} = req.params;
    try {
        const client = await MongoClient.connect(url);
        const collection = client.db(dbName).collection(planetsAndFilmsCollection);
        const allPlanets = client.db(dbName).collection(planetsCollection);

        const planetsAndFilms = await collection.find({film_id: Number(filmId)}).toArray()
        const planetIds = planetsAndFilms.map(el => el.planet_id);
        const ourPlanets = await allPlanets.find({id: {$in: planetIds}}).toArray();

        res.status(200).send(ourPlanets);
    } catch (error) { 
        console.error("Error connecting to db, couldn't get film info");
        res.status(500).send("Internal server error while trying to fetch films");
    }
});

// route for getting all character info
app.get("/api/characters", async (req, res) => {
    try {
        const client = await new MongoClient(url);
        const db = client.db(dbName);
        const collection = db.collection(charactersCollection);
        const showCharacters = await collection.find({}).toArray();
        res.status(200).send(showCharacters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Oops!");
    }
});

// route for getting a specific character's info
app.get("/api/characters/:characterId", async (req, res) => {
    const {characterId} = req.params;
    try {
        const client = new MongoClient(url);
        const db = client.db(dbName);
        const collection = db.collection(charactersCollection);
        const ourCharacter = await collection.find({id: Number(characterId)}).toArray();
        res.status(200).send(ourCharacter);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Oops!");
    }
});

// route for querying all films with a specific character
app.get("/api/characters/:characterId/films", async (req, res) => {
    const {characterId} = req.params;
    try {
        const client = await MongoClient.connect();
        const collection = client.db(dbName).collection(filmsCharactersCollection);
        const allFilms = client.db(dbName).collection(filmCollection);

        const charsAndFilms = await collection.find({character_id: Number(characterId)}).toArray();
        const filmIds = charsAndFilms.map(el => el.film_id);
        const ourFilms = await allFilms.find({id: {$in: filmIds}}).toArray();

        res.status(200).send(ourFilms);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Oops!");
    }
}); 

app.listen(PORT, () => {
    console.log('Star Wars is running')
});