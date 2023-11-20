const express = require('express');
const plan_route = express();
const config = require('../config/config')
const userAuth = require('../middleware/auth')
const planController = require('../controllers/planController')
plan_route.use(express.static('public'));


plan_route.patch('/paymentUpdate', planController.paymentUpdate)
plan_route.post('/subscribePremium', planController.subscribePremium)
plan_route.get('/loadPlans', userAuth, planController.loadPlans)
plan_route.delete('/deletePlan', userAuth, planController.deletePlan)
plan_route.post('/addPlan', userAuth, planController.addPlan)
plan_route.patch('/editPlan', userAuth, planController.editPlan)



module.exports = plan_route

