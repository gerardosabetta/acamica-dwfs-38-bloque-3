const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Movie = require("./models/movies");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost:27017/peliculas", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/movies", (req, res) => {
  Movie.find()
    .exec()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500);
      res.send("Algo salio mal...");
    });
});

app.post("/movies", (req, res) => {
  const newMovie = new Movie({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
  });

  newMovie
    .save()
    .then((result) => {
      console.log(result);
      res.status(201);
      res.json(newMovie);
    })
    .catch((error) => {
      console.log(error);
      res.status(500);
      res.send("Algo salio mal...");
    });
});

app.get("/movies/:id", (req, res) => {
  Movie.findById(req.params.id)
    .exec()
    .then((movie) => {
      if (movie) {
        res.json(movie);
      } else {
        res.status(404);
        res.send("404 Pelicula no encontrada...");
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500);
      res.send("Algo salio mal...");
    });
});

app.put("/movies/:id", (req, res) => {
  Movie.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        description: req.body.description,
      },
    }
  )
    .exec()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500);
      res.send("Algo salio mal...");
    });
});

app.delete("/movies/:id", (req, res) => {
  Movie.deleteOne({ _id: req.params.id })
    .exec()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.send("Algo salio mal...");
    });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
