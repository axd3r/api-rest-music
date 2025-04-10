import express from "express";
import { authMiddleware } from "../../../middleware/authMiddleware";
import multer from "multer";

const router = express.Router()

const storage = multer.diskStorage({
    destination: function(_req, _file, cb) {
        cb(null, './src/storage/media/song/');
    },

    filename: function(_req, file, cb) {
        cb(null, "song" + Date.now() + file.originalname);
    }
})

const subidas = multer({ storage: storage});

const SongController = require("../controllers/songController");

router.get("/prueba-song", SongController.prueba);
router.post("/save", [authMiddleware, subidas.single("file0")], SongController.save);
router.get("/get-song/:songId", authMiddleware, SongController.getById);
router.get("/get-all-song/:albumId", authMiddleware, SongController.getAll);
router.put("/update/:songId", authMiddleware, SongController.update);
router.delete("/delete-song/:songId", authMiddleware, SongController.deleteSong);
router.post("/upload/:songId", [authMiddleware, subidas.single("file0")], SongController.upload);

module.exports = router;