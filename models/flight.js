import mongoose from "mongoose";

const Schema = mongoose.Schema

const ticketSchema = new Schema({
  price: Number, 
  seat: {type: String, match: /[A-F][1-9]\d?/}, 
}, {
  timestamps: true
})

const flightSchema = new Schema({
  airline: {
    type: String,
    required: true,
  },
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN',]
  },
  flightNo: {type: Number, min: 10, max: 9999},
  departs: {
    type: Date,
    default: function(){
      return new Date().getFullYear()
    },
  },
  tickets: [ticketSchema],
  meal: [{ type: Schema.Types.ObjectId, ref: "Meal"}]
})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}