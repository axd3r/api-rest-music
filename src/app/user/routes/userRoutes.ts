import express from "express";
const router = express.Router()
import { authMiddleware } from "../../../middleware/authMiddleware";
import multer from "multer";
const UserController = require("../controllers/userController");

const storage = multer.diskStorage({
    destination: function(_req, _file, cb) {
        cb(null, './src/image/user/');
    },

    filename: function(_req, file, cb) {
        cb(null, "users" + Date.now() + file.originalname);
    }
})

const subidas = multer({ storage: storage })

router.get("/prueba-user", authMiddleware, UserController.prueba);
router.post("/save", UserController.save);
router.post("/login", UserController.login);
router.get("/profile/:userId", authMiddleware, UserController.profile);
router.put("/update", authMiddleware, UserController.update);
router.post("/upload/", [authMiddleware, subidas.single("file0")], UserController.upload);
router.get("/avatar/:file", authMiddleware, UserController.avatar);

module.exports = router;