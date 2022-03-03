import { Router } from "express"
import * as mealCtrl from "../controllers/meals.js"

const router = Router()

// GET - loclahost:3000/meals/new
router.get("/new", mealCtrl.new)

// POST - localhost:3000/meals
router.post('/', mealCtrl.create)


export {
  router
}