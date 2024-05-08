const User = require('../models/User')
const { signToken } = require('../middleware/jsonwebtoken')

async function loginWithToken(request, response, next) {
  try {
    const { uid } = request.auth

    // Get account from DB, existance not verified because we are already authorized at this point
    const foundUser = await User.findOne({ _id: uid }).select('-password')

    // Generate access token
    const token = signToken({ uid: foundUser._id, role: foundUser.role })

    response.status(200).json({
      message: 'User fetched',
      data: foundUser,
      token,
    })
  } catch (error) {
    console.error(error)
    response.status(500).send()
  }
}

module.exports = loginWithToken