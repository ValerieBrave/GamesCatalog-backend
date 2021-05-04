export function handleErrorMiddleware(err, req, res, next) {
  console.log('MIDDLEWARE', err.code, err.message);
  res.status(err.code).send({ message: err.message });
}
