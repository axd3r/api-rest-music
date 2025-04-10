import express from "express";
const router = express.Router()

const SongController = require("../controllers/songController");

router.get("/prueba-song", SongController.prueba);

module.exports = router;