import { Schema, model } from "mongoose";

const ArtistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    image: {
        type: String,
        default: "default.png"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

export default model("Artist", ArtistSchema, "artists");