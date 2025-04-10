import express from "express";
import { authMiddleware } from "../../../middleware/authMiddleware";
import multer from "multer";

const router = express.Router();
const ArtistController = require("../controllers/artistController");

const storage = multer.diskStorage({
    destination: function(_req, _file, cb) {
        cb(null, './src/storage/image/artist/');
    },

    filename: function(_req, file, cb) {
        cb(null, "artist" + Date.now() + file.originalname);
    }
})

const subidas = multer({ storage: storage});

router.get("/prueba-artist", ArtistController.prueba);
router.post("/save", authMiddleware, ArtistController.save);
router.get("/get-artist/:id", authMiddleware, ArtistController.getById);
router.get("/list", authMiddleware, ArtistController.list); 
router.get("/list/:page", authMiddleware, ArtistController.list);
router.put("/update/:id", authMiddleware, ArtistController.update);
router.delete("/delete/:id", authMiddleware, ArtistController.deleteArtist);
router.post("/upload/:file", [authMiddleware, subidas.single("file0")], ArtistController.uplaod);
router.delete("/remove/:id", authMiddleware, ArtistController.remove);
module.exports = router;