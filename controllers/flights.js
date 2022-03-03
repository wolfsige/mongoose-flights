import {Flight} from '../models/flight.js'

import { Meal } from '../models/meal.js'

function newFlights(req, res){
  res.render('flights/new', {
    title: 'Add flights'
  })
}

function create(req, res){
  const flight = new Flight(req.body)
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
	}
  flight.save(function(err){
    if (err) return res.redirect('/flights/new')
    
    res.redirect(`/flights/${flight._id}`)
  })
  
}

function index(req, res){
  Flight.find({}, function (error, flights){
    res.render('flights/index', {
      error: error,
      flights: flights,
      title: "All Flights"
    })
  })
}

function show(req, res) {
  // console.log(req.params.id);
  Flight.findById(req.params.id)
  .populate('meal')
  .exec(function (err, flight) {
    // console.log(err);
    Meal.find({_id: {$nin: flight.meal}}, function(err, meals){
      console.log(meals);
      res.render('flights/show', { 
      title: 'Flight Detail', 
      flight: flight,
      meals,
     })
    })
  })
}

function deleteFlight(req, res){
  Flight.findByIdAndDelete(req.params.id, function(err, flight) {
    res.redirect('/flights')
  })
}

function edit(req, res){
  Flight.findById(req.params.id, function(err, flight) {
    res.render('flights/edit', {
      flight,
      err,
      title: "Edit Flight"
    })
  })
}

function update(req, res){
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Flight.findByIdAndUpdate(req.params.id, req.body, function(err, flight) {
    res.redirect(`/flights/${flight._id}`)
  })

}

function createTicket(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    console.log(flight.tickets)
    flight.tickets.push(req.body)
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

function addMeals(req, res) {
  Flight.findById(req.params.id, function(err, flight){
    flight.meal.push(req.body.mealId)
    flight.save(function(err){
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

export {
  newFlights as new,
  create,
  index,
  show,
  deleteFlight as delete,
  edit,
  update,
  createTicket,
  addMeals
}