import mongoose from "mongoose";

const Schema = mongoose.Schema

const flightSchema = new Schema({
  airline: String,
  airport: String,
  flightno: Number,
  departs: Date
})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}