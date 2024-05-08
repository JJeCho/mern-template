const express = require('express')
const { authorizeBearerToken } = require('../middleware/jsonwebtoken')
const register = require('../controllers/register')
const login = require('../controllers/login')
const loginWithToken = require('../controllers/login-with-token')

// initialize router
const router = express.Router()

router.post('/register', [], register)
router.post('/login', [], login)
router.get('/login', [authorizeBearerToken], loginWithToken)

module.exports = router