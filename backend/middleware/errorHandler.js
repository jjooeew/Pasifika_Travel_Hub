// backend/middleware/errorHandler.js
function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(err.statusCode || 500).json({
    message: err.message || 'Server error',
  });
}

module.exports = errorHandler;   // 👈 export the function directly
