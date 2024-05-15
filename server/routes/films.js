import express from "express";
const router = express.Router();


router.get("/", async (req, res) => {
    console.log("In our films router");
    res.send("Nowhere are films to be found, sorry yo");
});

router.get("/moreFilms", async (req, res) => {
    res.send("Now we're at the more films route");
})


export default router;