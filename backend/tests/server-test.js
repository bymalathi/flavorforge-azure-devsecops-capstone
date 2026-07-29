const express = require("express");

const app = express();
app.disable("x-powered-by");

app.get("/", (req, res) => {
    res.send("Hello");
});

app.listen(3000);

console.log("Listening...");