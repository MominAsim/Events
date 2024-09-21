      import ErrorHandler from "../utils/errorHandler.js";

      export default (err, req, res, next) => {
        let error = {
          statusCode: err?.statusCode || 500,
          message: err?.message || "Internal Server Error",
        };

      //handle invalid mongoose id error
      if(err.name === 'CastError'){
        const message = `Resource not found. Invalid ${err?.path}`
        error = new ErrorHandler(message, 404)
      }

      //handle validation error
      if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map((value) => value.message)
        error = new ErrorHandler(message, 400)
      }

      // Handle Mongoose Duplicate Key Error
      if (err.code === 11000) {
        const message = `An account with this ${Object.keys(err.keyValue)} already exists.`;
        error = new ErrorHandler(message, 400);
      }

        // Handle wrong JWT Error
        if (err.name === "JsonWebTokenError") {
          const message = `JSON Web Token is invalid. Try Again!!!`;
          error = new ErrorHandler(message, 400);
        }

        // Handle expired JWT Error
        if (err.name === "TokenExpiredError") {
          const message = `JSON Web Token is expired. Try Again!!!`;
          error = new ErrorHandler(message, 400);
        }

      res.status(error.statusCode).json({
          message: error.message,
      });
      }
