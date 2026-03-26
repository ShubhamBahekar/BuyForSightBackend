const CustomResponses = {
  success(result, statusCode = 200) {
    return this.status(statusCode).json({
      success: true,
      result,
    });
  },
 successNewEntry(result, statusCode = 201) {
    return this.status(statusCode).json({
      success: true,
      result,
    });
  },

 badRequest(msg) {
    return this.status(400).json({
      success: false,
      error: msg,
    });
  },


  unauthorized(msg) {
    return this.status(401).json({
      success: false,
      error: msg || 'unauthorized',
    });
  },

 
forbidden(msg) {
    return this.status(403).json({
      success: false,
      error: msg || 'forbidden',
    });
  },

  notFound(msg) {
    return this.status(404).json({
      success: false,
      error: msg || 'not_found',
    });
  },

  serverError(msg) {
    return this.status(503).json({
      success: false,
      error: msg || 'Internal Server Error',
    });
  },
};

module.exports = (req, res, next) => {
  Object.assign(res, CustomResponses);
  next();
};
