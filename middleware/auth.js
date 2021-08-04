const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
  const token = req.header('x-auth')
  
  if(!token){
    return res.status(401).send('No authentication token provided')
  }

  try{
    const decoded = jwt.verify(token, 'axaxathisisprivatekey')
    req.user = decoded
    next()
  }
  catch(err) {
    return res.status(400).send(err.message)
  }
}