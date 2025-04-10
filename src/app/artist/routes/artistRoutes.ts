import express from "express";
import { authMiddleware } from "../../../middleware/authMiddleware";

const router = express.Router();
const ArtistController = require("../controllers/artistController");

router.get("/prueba-artist", ArtistController.prueba);
router.post("/save", authMiddleware, ArtistController.save);
router.get("/get-artist/:id", authMiddleware, ArtistController.getById);
router.get("/list", authMiddleware, ArtistController.list); 
router.get("/list/:page", authMiddleware, ArtistController.list);

module.exports = router;