import { router } from "../../../config/router/router.config";

const SongController = require("../controllers/songController");

router.get("/prueba-song", SongController.prueba);

module.exports = router;