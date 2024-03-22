const express = require("express")
import { Router } from 'express';
const { userMgtController } = require('../controllers/UserMgtController')
const { authorizeAdmin, authenticateUser } = require('../middleware/Authorization')

const router: Router = express.Router()

router.get('/get_users', authenticateUser, authorizeAdmin, userMgtController.getUsers)

router.delete('/delete_user/:id', authenticateUser, authorizeAdmin, userMgtController.deleteUser)

router.post('/update_username', authenticateUser, userMgtController.updateUsername)

router.post('/update_password', authenticateUser, userMgtController.updatePassword)

router.post('/update_email', authenticateUser, userMgtController.updateEmail)

module.exports = router