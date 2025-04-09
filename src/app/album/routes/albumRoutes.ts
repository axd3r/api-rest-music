import { router } from "../../../config/router/router.config";

const AlbumController = require("../controllers/albumController");

router.get("/prueba-album", AlbumController.prueba);

module.exports = router;
