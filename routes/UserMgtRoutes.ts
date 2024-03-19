const express = require("express")
import { Router } from 'express';
const { getUsers, deleteUser, updateUsername, updatePassword, updateEmail } = require('../controllers/UserMgtController')
const { authorizeAdmin, authenticateUser } = require('../middleware/Authorization')

const router: Router = express.Router()

router.get('/get_users', authenticateUser, authorizeAdmin, getUsers)

router.delete('/delete_user/:id', authenticateUser, authorizeAdmin, deleteUser)

router.post('/update_username', authenticateUser, updateUsername)

router.post('/update_password', authenticateUser, updatePassword)

router.post('/update_email', authenticateUser, updateEmail)

module.exports = router