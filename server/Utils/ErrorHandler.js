class ErrorHandler extends Error {
  constructor(message, StatusCode) {
    super(message);
    this.StatusCode = StatusCode;

    Error.captureStackTrace(this, this.contructor);
  }
}
module.exports=ErrorHandler
