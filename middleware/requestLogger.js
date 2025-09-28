import logger from './logger.js';

export const requestLogger = (req, res, next) => {
    const start = Date.now();
    
    // Log request
    logger.info('Incoming request', {
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        userId: req.user?.id || 'anonymous'
    });

    // Override res.end to log response
    const originalEnd = res.end;
    res.end = function(chunk, encoding) {
        const duration = Date.now() - start;
        
        logger.info('Outgoing response', {
            method: req.method,
            url: req.originalUrl,
            statusCode: res.statusCode,
            duration: `${duration}ms`,
            contentLength: res.get('Content-Length'),
            userId: req.user?.id || 'anonymous'
        });
        
        originalEnd.call(this, chunk, encoding);
    };
    
    next();
}; 