const isAuthenticated = (req, res, next) => {
  if (req.session.username || req.session.username === '') {
    next()
  } else {
    next(new Error('User not logged in'))
  }
}

module.exports = isAuthenticated
