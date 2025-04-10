import { Schema, model } from "mongoose";

const AlbumSchema = new Schema({
  artist: {
    type: Schema.ObjectId,
    ref: "Artist"
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  year: {
    type: Number,
    require: true
  },
  image: {
    type: String,
    default: "default.png"
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

export default model("Album", AlbumSchema, "albums");
