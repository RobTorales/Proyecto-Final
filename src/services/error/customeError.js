export default class CustomError extends Error {
    constructor({
        name = "Error", cause, message, code = 500 
    }){
      super(message);
      this.name = name;
      this.cause = cause;
      this.code = code;
    }
}