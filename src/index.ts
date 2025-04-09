import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connection";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const UserRoutes = require("./app/user/routes/userRoutes");
const AlbumRoutes = require("./app/album/routes/albumRoutes");
const ArtistController = require("./app/artist/routes/artistRoutes");
const SongController = require("./app/song/routes/songRoutes");

app.use("/api/user", UserRoutes);
app.use("/api/album", AlbumRoutes);
app.use("/api/artist", ArtistController);
app.use("/api/song", SongController);

app.get("/", (_, res) => {
    res.send("¡Hola, TypeScript con Express!");
});

app.listen(PORT, () => {
    console.log(`Servidor corriedo en http://localhost:${PORT}`);
})