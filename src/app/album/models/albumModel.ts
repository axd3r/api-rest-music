import { Schema, model } from "../../../config/models/models.config";

const AlbumSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    typre: String,
  },
  year: Number,
  genre: String,
  cover: String,
});

export default model("Album", AlbumSchema);
