import express from "express";
import mongoose from "mongoose";
import logger from "../middleware/logger.js";

const router = express.Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     description: Check the health status of the API and database connection
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uptime:
 *                   type: number
 *                   description: Server uptime in seconds
 *                   example: 3600
 *                 message:
 *                   type: string
 *                   description: Health status message
 *                   example: "OK"
 *                 timestamp:
 *                   type: number
 *                   description: Current timestamp
 *                   example: 1640995200000
 *                 environment:
 *                   type: string
 *                   description: Current environment
 *                   example: "development"
 *                 database:
 *                   type: string
 *                   description: Database connection status
 *                   example: "Connected"
 *       503:
 *         description: Service is unhealthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Service unavailable"
 */
router.get("/health", async (req, res) => {
    try {
        const healthCheck = {
            uptime: process.uptime(),
            message: 'OK',
            timestamp: Date.now(),
            environment: process.env.NODE_ENV || 'development'
        };

        // Check database connection
        if (mongoose.connection.readyState === 1) {
            healthCheck.database = 'Connected';
        } else {
            healthCheck.database = 'Disconnected';
            res.status(503);
        }

        res.json(healthCheck);
    } catch (error) {
        logger.error('Health check failed', { error: error.message });
        res.status(503).json({ message: 'Service unavailable' });
    }
});

/**
 * @swagger
 * /metrics:
 *   get:
 *     summary: System metrics
 *     description: Get system performance metrics including memory usage, CPU usage, and uptime
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Metrics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 memory:
 *                   type: object
 *                   description: Memory usage statistics
 *                   properties:
 *                     rss:
 *                       type: number
 *                       description: Resident Set Size in bytes
 *                       example: 52428800
 *                     heapTotal:
 *                       type: number
 *                       description: Total heap size in bytes
 *                       example: 20971520
 *                     heapUsed:
 *                       type: number
 *                       description: Used heap size in bytes
 *                       example: 10485760
 *                     external:
 *                       type: number
 *                       description: External memory usage in bytes
 *                       example: 2097152
 *                 cpu:
 *                   type: object
 *                   description: CPU usage statistics
 *                   properties:
 *                     user:
 *                       type: number
 *                       description: User CPU time in microseconds
 *                       example: 1000000
 *                     system:
 *                       type: number
 *                       description: System CPU time in microseconds
 *                       example: 500000
 *                 uptime:
 *                   type: number
 *                   description: Server uptime in seconds
 *                   example: 3600
 *                 activeConnections:
 *                   type: string
 *                   description: Database connection status
 *                   example: "Connected"
 */
router.get("/metrics", (req, res) => {
    const metrics = {
        memory: process.memoryUsage(),
        cpu: process.cpuUsage(),
        uptime: process.uptime(),
        activeConnections: mongoose.connection.db?.admin()?.listDatabases() || 'N/A'
    };
    
    res.json(metrics);
});

export default router; 