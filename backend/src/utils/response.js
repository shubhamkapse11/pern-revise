
const successResponse = (res, message, data=[], statusCode=200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    })

}

const errorResponse = (res, message,statusCode=500 ,error) => {
    return res.status(statusCode).json({
        success: false,     
        message,
        error
    })
}

const validationErrorResponse = (res, message, errors=[], statusCode=400) => {
    return res.status(statusCode).json({
        success: false,
        message,
        errors
    })
}

module.exports = {
    successResponse,
    errorResponse,
    validationErrorResponse
}