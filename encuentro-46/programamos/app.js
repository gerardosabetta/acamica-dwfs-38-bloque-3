const express = require("express");
const app = express();
const Menu = require("./models/menu");

const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function verifyId(req, res, next) {
  const platoId = req.params.id;

  console.log("Pasaste por el middleware");

  Menu.findById(platoId)
    .exec()
    .then((plato) => {
      if (plato) {
        next();
      } else {
        res.status(404);
        res.send("Error, Id inexistente");
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500);
      res.send("Algo salio mal...");
    });
}

mongoose.connect("mongodb://localhost:27017/restaurante", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/menu", (req, res) => {
  Menu.find()
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

// app.get("/usuarios/:userId/photos/:photoId")

app.get("/menu/:id", async (req, res) => {
  await Menu.findById(req.params.id, (error, menu) => {
    if (error) {
      res.status(500);
      res.send("Algo salió mal, por favor intente más tarde...");
    }
    if (menu) {
      res.status(200);
      res.json(menu);
    } else {
      res.status(404);
      res.send("No se pudo encontrar el menú");
    }
  });
});

app.post("/menu", async (req, res) => {
  try {
    const newMenu = new Menu({
      _id: new mongoose.Types.ObjectId(),
      plato: req.body.plato,
      precio: req.body.precio,
      tipo_de_plato: req.body.tipo_de_plato,
    });

    await newMenu.save();
    res.status(201);
    res.json(newMenu);
  } catch (error) {
    console.log("Algo salió mal ", error);
    res.status(400);
    res.send("Peticion mal formada");
  }
});

app.put("/menu/:id", (req, res) => {
  Menu.updateOne(
    { _id: req.params.id },
    {
      $set: {
        plato: req.body.plato,
        precio: req.body.precio,
        tipo_de_plato: req.body.tipo_de_plato,
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

app.delete("/menu/:id", verifyId, (req, res) => {
  Menu.deleteOne({ _id: req.params.id })
    .exec()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500);
      res.send("Algo salio mal");
    });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
