module.exports= (f) => (req, res, next) => {
  Promise.resolve(f(req, res, next)).catch(next);
};
