const errorHendler = async (err, req, res, next) => {
  try {
    res.send(err.message);
  } catch (error) {
    next(error);
  }
};

module.exports.errorHendler = errorHendler;
