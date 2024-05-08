const joi = require('joi')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const {signToken} = require('../middleware/jsonwebtoken')

async function login(request, response, next) {
  try {
    // Validate request data
    await joi
      .object({
        username: joi.string().required(),
        password: joi.string().required(),
      })
      .validateAsync(request.body)
  } catch (error) {
    return response.status(400).json({
      error: 'ValidationError',
      message: error.message,
    })
  }

  try {
    const {username, password} = request.body

    // Get account from DB, and verify existance
    const foundUser = await User.findOne({username})
    if (!foundUser) {
      return response.status(400).json({
        message: 'Bad credentials1',
      })
    }

    // Decrypt and verify password
    const passOk = await bcrypt.compare(password, foundUser.password)
    if (!passOk) {
      return response.status(400).json({
        message: 'Bad credentials2',
      })
    }

    // Remove password from response data
    foundUser.password = undefined
    delete foundUser.password

    // Generate access token
    const token = signToken({uid: foundUser._id, role: foundUser.role})

    response.status(200).json({
      message: 'Succesfully logged-in',
      data: foundUser,
      token,
    })
  } catch (error) {
    console.error(error)
    response.status(500).send()
  }
}

module.exports = login