const notFound = (res, res, next) => {
  res.status(404).send({ status: 404, message: "Resource not found" });
};

module.exports = notFound;
