const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {

  // verify authentication 
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: { message: 'Authorization token required' } })
  }

  // response with token, be like 
  // authorization = 'Bearer 123231ipdsapifpqwe[qo'
  // need to split and only get the token 

  const token = authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, process.env.SECRET)

    req.user = await User.findOne({ _id }).select('_id')
    next()

  } catch(error) {
    console.log(error)
    res.status(401).json({ error: { message: 'Request is not authorized' } })
  }

}

module.exports = requireAuth