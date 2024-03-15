const express = require("express")
import { Router } from 'express';
const { authController } = require('../controllers/AuthController')

const router: Router = express.Router()

router.post('/signup', authController.signUp)

router.post('/login', authController.login)

module.exports = router