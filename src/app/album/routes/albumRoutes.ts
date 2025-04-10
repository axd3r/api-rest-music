import express from "express";
import { authMiddleware } from "../../../middleware/authMiddleware";
import multer from "multer";

const router = express.Router()
const AlbumController = require("../controllers/albumController");

const storage = multer.diskStorage({
    destination: function(_req, _file, cb) {
        cb(null, './src/storage/image/album/');
    },

    filename: function(_req, file, cb) {
        cb(null, "album" + Date.now() + file.originalname);
    }
})

const subidas = multer({ storage: storage});

router.get("/prueba-album", AlbumController.prueba);
router.post("/save", authMiddleware, AlbumController.save);
router.get("/get-album/:id", authMiddleware, AlbumController.getById);
router.get("/get-all-album/:artistId", authMiddleware, AlbumController.getAll);
router.put("/update/:albumId", authMiddleware, AlbumController.update);
router.post("/upload/:albumId", [authMiddleware, subidas.single("file0")], AlbumController.upload);
router.delete("/remove/:albumId", authMiddleware, AlbumController.remove);

module.exports = router;
