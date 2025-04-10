import { Schema, model } from "mongoose";

const ArtistSchema = new Schema({
    album: {
        type: Schema.ObjectId,
        ref: "Album"
    },
    track: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        require: true
    },
    file: {
        type: String,
        require: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
    
})

export default model("Song", ArtistSchema, "songs");