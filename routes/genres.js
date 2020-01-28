const { Genre, validateGenre } = require("../models/genreModel");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const authorization = require("../middleware/authorization");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");

mongoose.set("useFindAndModify", false);

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.post("/", authorization, async (req, res) => {
  //   const newsGenre = req.params.
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({ name: req.body.name });
  await genre.save();

  res.send(genre);
});

router.put("/:id", authorization, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
}); 

router.delete("/:id", [authorization, admin], async (req, res) => {
  const id = req.params.id;

  const genre = await Genre.findByIdAndRemove(id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});

module.exports = router;
