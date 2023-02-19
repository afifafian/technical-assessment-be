import variables from "../helpers/variables.js";

export const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case variables.errNames.customValidation:
      return res.status(err.statusCode || 400).json({
        message: err.name, detailErrMessage: err.message, request: { type: req.method, url: req.originalUrl }
      });
    case variables.errNames.jsonWebToken.jwtMalformed:
      return res.status(401).json({
        message: err.name, detailErrMessage: 'Auth Failed', request: { type: req.method, url: req.originalUrl }
      });
    case variables.errNames.jsonWebToken.tokenExpired:
      return res.status(401).json({
        message: err.name, detailErrMessage: 'Your session has ended', request: { type: req.method, url: req.originalUrl }
      });
  
    default:
      return res.status(500).json({
        message: err.name, detailErrMessage: `Internal Server Error: ${err}`
      });
  }
};
