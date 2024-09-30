class ApiError extends Error {
    constructor(
        statuscode, 
        data = null, 
        message = "Something went Wrong!", 
        stack = "", 
        errors = []
    ){
        super(message);
        this.statuscode = statuscode
        this.data = data;
        this.message = message,
        this.errors = errors;  
        
        if(this.stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}
export default ApiError;