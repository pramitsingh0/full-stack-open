const requestLogger = (req, res, next) => {
  console.log("Method: ", req.method);
  console.log("Path: ", req.path);
  console.log("Body: ", req.body);
  console.log("------");
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "Unknown Endpoint" });
};

const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (err.name === "Validation Error") {
    return res.status(400).json({ error: err.message });
  }
  next(err);
};

const tokenExtractor = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    req.token = authorization.split(" ")[1];
    next();
  }
  return null;
};
module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
};
