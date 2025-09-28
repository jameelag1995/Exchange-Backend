import rateLimit from 'express-rate-limit';
import logger from './logger.js';

export const createRateLimiter = (windowMs = 15 * 60 * 1000, max = 100) => {
    return rateLimit({
        windowMs,
        max,
        message: {
            error: 'Too many requests from this IP, please try again later.'
        },
        standardHeaders: true,
        legacyHeaders: false,
        handler: (req, res) => {
            logger.warn('Rate limit exceeded', {
                ip: req.ip,
                userAgent: req.get('User-Agent'),
                url: req.originalUrl
            });
            res.status(429).json({
                error: 'Too many requests from this IP, please try again later.'
            });
        }
    });
};

// Different limiters for different endpoints
export const authLimiter = createRateLimiter(15 * 60 * 1000, 5); // 5 requests per 15 minutes for auth
export const apiLimiter = createRateLimiter(15 * 60 * 1000, 100); // 100 requests per 15 minutes for general API 