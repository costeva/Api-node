function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    //si es un error de boom
    const { output } = err; //si es un error de boom, output tiene la info del error
    res.status(output.statusCode).json(output.payload); //devolvemos el status code y el payload
  } else {
    next(err);
  }
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
