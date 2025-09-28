import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import compression from "compression";
import { connectDB } from "./config/dbConnection.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { apiLimiter, authLimiter } from "./middleware/rateLimiter.js";
import { specs, swaggerUi } from "./config/swagger.js";
import logger from "./middleware/logger.js";
import chalk from "chalk";
import mongoose from "mongoose";

// Routes
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import offerRouter from "./routes/offer.routes.js";
import reviewRouter from "./routes/review.routes.js";
import healthRouter from "./routes/health.routes.js";

dotenv.config();

const app = express();

// Security middleware
app.use(helmet());

// Compression middleware
app.use(compression());

// CORS middleware
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use(requestLogger);

// Rate limiting
app.use('/api/v1/exchange/users/login', authLimiter);
app.use('/api/v1/exchange/users/register', authLimiter);
app.use('/api/v1/exchange', apiLimiter);

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Exchange API Documentation'
}));

// Health check (no rate limiting)
app.use("/", healthRouter);

// API Routes
app.use("/api/v1/exchange/users", userRouter);
app.use("/api/v1/exchange/products", productRouter);
app.use("/api/v1/exchange/offers", offerRouter);
app.use("/api/v1/exchange/reviews", reviewRouter);

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Route not found',
        message: `Cannot ${req.method} ${req.originalUrl}`
    });
});

// Error handler middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 4545;

// Graceful shutdown
process.on('SIGTERM', () => {
    logger.info('SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    logger.info('SIGINT received, shutting down gracefully');
    process.exit(0);
});

// Unhandled promise rejections
process.on('unhandledRejection', (err) => {
    logger.error('Unhandled Promise Rejection', { error: err.message, stack: err.stack });
    process.exit(1);
});

connectDB().then(() => {
    app.listen(PORT, () => {
        const env = process.env.NODE_ENV || 'development';
        const dbName = mongoose.connection.name;
        const dbHost = mongoose.connection.host;
        const docsUrl = `http://localhost:${PORT}/api-docs`;
        const healthUrl = `http://localhost:${PORT}/health`;
        const nodeVersion = process.version;
        const line = chalk.gray('='.repeat(60));
        console.log(
            `\n${line}\n` +
            chalk.green.bold('🚀 Exchange API Server Started!') +
            `\n${line}\n` +
            `${chalk.bold('Environment:')}   ${chalk.cyan(env)}` +
            `\n${chalk.bold('Port:')}         ${chalk.cyan(PORT)}` +
            `\n${chalk.bold('Database:')}    ${chalk.cyan(dbName)} @ ${chalk.cyan(dbHost)}` +
            `\n${chalk.bold('Node.js:')}      ${chalk.cyan(nodeVersion)}` +
            `\n${chalk.bold('API Docs:')}     ${chalk.yellowBright.underline(docsUrl)}` +
            `\n${chalk.bold('Health Check:')} ${chalk.yellowBright.underline(healthUrl)}` +
            `\n${line}\n`
        );
        logger.info(`Server is listening on port ${PORT}`, {
            port: PORT,
            environment: env,
            nodeVersion: nodeVersion
        });
    });
}).catch((error) => {
    logger.error('Failed to connect to database', { error: error.message });
    process.exit(1);
});
