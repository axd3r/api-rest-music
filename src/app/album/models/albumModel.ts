import { Schema, model } from "mongoose";

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
