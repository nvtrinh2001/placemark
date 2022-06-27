import Mongoose from "mongoose";

const { Schema } = Mongoose;

const discoverySchema = new Schema({
  name: String,
  address: String,
  lat: String,
  lng: String,
  description: String,
  images: {
    first: String,
    second: String,
  },
  type: String,
});

export const Discovery = Mongoose.model("Discovery", discoverySchema);
