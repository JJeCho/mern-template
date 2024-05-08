const joi = require('joi')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const {signToken} = require('../middleware/jsonwebtoken')

async function register(request, response, next) {
  try {
    // Validate request data
    await joi
      .object({
        username: joi.string().required(),
        password: joi.string().required(),
        email: joi.string().email().required(),
        role: joi.string().required(),
      })
      .validateAsync(request.body)
  } catch (error) {
    return response.status(400).json({
      error: 'ValidationError',
      message: error.message,
    })
  }

  try {
    const {username, password, email, role} = request.body

    // Verify account username as unique
    const existingUser = await User.findOne({username})
    if (existingUser) {
      return response.status(400).json({
        error: username,
        message: 'An account already exists with that "username"',
      })
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // Create account
    const newUser = new User({username, password: hash, email, role})
    await newUser.save()

    // Remove password from response data
    newUser.password = undefined
    delete newUser.password

    // Generate access token
    const token = signToken({uid: newUser._id, role: newUser.role})

    response.status(201).json({
      message: 'Succesfully registered',
      data: newUser,
      token,
    })
  } catch (error) {
    console.error(error)
    return response.status(500).send()
  }
}

module.exports = register