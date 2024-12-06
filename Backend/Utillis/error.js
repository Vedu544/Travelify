export const errorHandler = (status,Message,stack)=>{
    const error = new Error();
    error.status = status;
    error.Message = Message
    error.stack = stack
    return error;
};