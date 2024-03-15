"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { authController } = require('../controllers/AuthController');
const router = express.Router();
router.post('/signup', authController.signUp);
router.post('/login', authController.login);
module.exports = router;
