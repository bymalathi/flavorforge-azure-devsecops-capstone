const express = require("express");

const recipeController = require("../controllers/recipe.controller");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("➡️ Recipe Route reached");

  recipeController.getRecipes(req, res);
});

module.exports = router;