
export const films = (app) => {

    app.get("/api/films", async (req, res) => {
        res.send("Nowhere are films to be found, sorry yo");
    });
}