const router = express.Router();
const { getArtist, getArtistById } = require("../controllers/artists.controllers");

router.get("/", getArtists);
router.get("/", getArtistById);

module.exports = router;