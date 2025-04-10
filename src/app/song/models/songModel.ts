import { Schema, model } from "mongoose";

const ArtistSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

export default model("Artist", ArtistSchema, "artists");