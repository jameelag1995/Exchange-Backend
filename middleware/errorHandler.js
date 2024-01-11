import { STATUS_CODES } from "../constants/constants.js";

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode
        ? res.statusCode
        : STATUS_CODES.SERVER_ERROR;
    res.status(statusCode);
    switch (statusCode) {
        case STATUS_CODES.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case STATUS_CODES.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case STATUS_CODES.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case STATUS_CODES.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case STATUS_CODES.SERVER_ERROR:
            res.json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        default:
            res.status(STATUS_CODES.SERVER_ERROR).json({
                title: "Something went wrong",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
    }
};
export { errorHandler };
