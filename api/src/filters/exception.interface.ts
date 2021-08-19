interface IExceptionResponse {
    statusCode: Number,
    timestamp: string,
    message: string,
    errors?: any,
    path: string
}

export { IExceptionResponse }