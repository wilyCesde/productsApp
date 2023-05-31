const express = require("express");
var cors = require("cors");

const userSchema = require("../models/user");
const productsSchema = require("../models/products");
const saleSchema = require("../models/sale");

const router = express.Router();
// Middleware
router.use(cors());

//#region users
// getAll
router.get("/users/getAll", cors(), (req, res) => {
  try {
    userSchema
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  } catch (error) {
    res.json({ message: error });
  }
});
// getById
router.get("/users/getById/:id", cors(), (req, res) => {
  try {
    const { id } = req.params;
    userSchema
      .findById(id)
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  } catch (error) {
    res.json({ message: error });
  }
});
// getByEmail
router.get("/users/getByEmail/:email", cors(), (req, res) => {
  try {
    const { email } = req.params;
    userSchema.findOne({ email: email }, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Result : ", docs);
        res.json(docs);
      }
    });
  } catch (error) {
    res.json({ message: error });
  }
});
// create
router.post("/users/create", cors(), (req, res) => {
  try {
    const user = userSchema(req.body);
    user
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  } catch (error) {
    res.json({ message: error });
  }
});
// Actualizar user por id
router.put("/users/update/:id", cors(), (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, email } = req.body;
    userSchema
      .updateOne({ _id: id }, { $set: { name, age, email } })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  } catch (error) {
    res.json({ message: error });
  }
});
// Eliminar user por id
router.delete("/users/delet/:id", cors(), (req, res) => {
  try {
    const { id } = req.params;
    userSchema
      .deleteOne({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  } catch (error) {
    res.json({ message: error });
  }
});
//#endregion

//#region products
// getAll
router.get("/products/getAll", cors(), (req, res) => {
  productsSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// getById
router.get("/products/getById/:id", cors(), (req, res) => {
  const { id } = req.params;
  productsSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// create
router.post("/products/create", cors(), (req, res) => {
  const products = productsSchema(req.body);
  products
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update
router.put("/products/update/:id", cors(), (req, res) => {
  const { id } = req.params;
  const { username, product, price, dateOfproducts } = req.body;
  productsSchema
    .updateOne(
      { _id: id },
      { $set: { username, product, price, dateOfproducts } }
    )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Delete
router.delete("/products/delete/:id", cors(), (req, res) => {
  const { id } = req.params;
  productsSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
//#endregion

//#region sale
// getAll
router.get("/sale/getAll", cors(), (req, res) => {
  try {
    saleSchema
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  } catch (error) {
    res.json({ message: error });
  }
});

// getById
router.get("/sale/getById/:id", cors(), (req, res) => {
  try {
    const { id } = req.params;
    saleSchema
      .findById(id)
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  } catch (error) {
    res.json({ message: error });
  }
});

// create
router.post("/sale/create", cors(), (req, res) => {
  try {
    const sale = saleSchema(req.body);
    sale
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  } catch (error) {
    res.json({ message: error });
  }
});

// update
router.put("/sale/update/:id", cors(), (req, res) => {
  try {
    const { id } = req.params;
    const { username, product, price, dateOfSale } = req.body;
    saleSchema
      .updateOne(
        { _id: id },
        { $set: { username, product, price, dateOfSale } }
      )
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  } catch (error) {
    res.json({ message: error });
  }
});

// Delete
router.delete("/sale/delete/:id", cors(), (req, res) => {
  try {
    const { id } = req.params;
    saleSchema
      .deleteOne({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  } catch (error) {
    res.json({ message: error });
  }
});
//#endregion

module.exports = router;
