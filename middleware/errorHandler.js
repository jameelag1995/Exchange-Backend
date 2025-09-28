import { STATUS_CODES } from "../constants/constants.js";
import logger from './logger.js';

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode
        ? res.statusCode
        : STATUS_CODES.SERVER_ERROR;
    
    // Log error with context
    logger.error('Error occurred', {
        error: err.message,
        stack: err.stack,
        statusCode,
        method: req.method,
        url: req.originalUrl,
        userId: req.user?.id || 'anonymous',
        ip: req.ip,
        userAgent: req.get('User-Agent')
    });

    res.status(statusCode);
    
    // Don't expose stack trace in production
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    switch (statusCode) {
        case STATUS_CODES.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed",
                message: err.message,
                ...(isDevelopment && { stackTrace: err.stack }),
            });
            break;
        case STATUS_CODES.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                ...(isDevelopment && { stackTrace: err.stack }),
            });
            break;
        case STATUS_CODES.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: err.message,
                ...(isDevelopment && { stackTrace: err.stack }),
            });
            break;
        case STATUS_CODES.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                ...(isDevelopment && { stackTrace: err.stack }),
            });
            break;
        case STATUS_CODES.SERVER_ERROR:
            res.json({
                title: "Server Error",
                message: isDevelopment ? err.message : "Internal server error",
                ...(isDevelopment && { stackTrace: err.stack }),
            });
            break;

        default:
            res.status(STATUS_CODES.SERVER_ERROR).json({
                title: "Something went wrong",
                message: isDevelopment ? err.message : "Internal server error",
                ...(isDevelopment && { stackTrace: err.stack }),
            });
            break;
    }
};
export { errorHandler };
