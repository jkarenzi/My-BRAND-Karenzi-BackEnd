const express = require("express")
import { Router } from 'express';
const { userMgtController } = require('../controllers/UserMgtController')

const router: Router = express.Router()

router.get('/get_users', userMgtController.getUsers)

router.delete('/delete_user/:id', userMgtController.deleteUser)

router.post('/update_username', userMgtController.updateUsername)

router.post('/update_password', userMgtController.updatePassword)

router.post('/update_email', userMgtController.updateEmail)

module.exports = router