import { router } from "../../../config/router/router.config";

const ArtistController = require("../controllers/artistController");

router.get("/prueba-artist", ArtistController.prueba);

module.exports = router;