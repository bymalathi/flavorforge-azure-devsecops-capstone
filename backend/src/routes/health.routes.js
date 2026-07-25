const express = require("express");
const router = express.Router();

const healthController = require("../controllers/health.controller");

router.get("/", (req, res) => {
    console.log("➡️ Route reached");
    healthController.getHealth(req, res);
});

module.exports = router;