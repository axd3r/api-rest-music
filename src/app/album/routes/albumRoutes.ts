import express from "express";
const router = express.Router()

const AlbumController = require("../controllers/albumController");

router.get("/prueba-album", AlbumController.prueba);

module.exports = router;
