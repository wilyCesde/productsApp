const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); // Manejo de variables de entorno en el archivo .env
// Importar el archivo de las rutas
const routes = require("./src/app/controllers/routes");

const app = express();
const url =
  process.env.URL ||
  `mongodb+srv://punxio06:1414@cluster0.gfhiy0e.mongodb.net?retryWrites=true&w=majority`;
const port = process.env.PORT || 3200;

// Middleware para json
app.use(express.json());
// Middleware para rutas
app.use("/api", routes);
// cors
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hola, desde API REST");
});

mongoose
  .connect(url)
  .then(() => console.log("Conectado a la base de datos de MongoDB Atlas"))
  .catch(() => console.error("Error de conexión a la base de datos"));

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
