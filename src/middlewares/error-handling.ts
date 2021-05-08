export function handleErrorMiddleware(err, req, res, next) {
  console.log(err.code, err.message);
  res.status(err.code).send({ message: err.message });
}
