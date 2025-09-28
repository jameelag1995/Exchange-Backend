# Exchange Backend API

A RESTful API for exchanging products between users online, built with Node.js, Express, and MongoDB.

## 🚀 Features

### Core Features
- **User Management**: Registration, authentication, profile management
- **Product Management**: Create, read, update, delete products
- **Offer System**: Make and manage trade offers
- **Review System**: User reviews and ratings
- **JWT Authentication**: Secure token-based authentication

### New Improvements

#### 📊 **Logging & Monitoring**
- **Structured Logging**: Winston-based logging with JSON format
- **Request/Response Logging**: Track all API requests with performance metrics
- **Error Logging**: Comprehensive error tracking with context
- **Health Checks**: `/health` and `/metrics` endpoints for monitoring
- **Database Connection Monitoring**: Real-time database status

#### 🔒 **Security Enhancements**
- **Helmet**: Security headers for protection against common vulnerabilities
- **Rate Limiting**: Protection against API abuse with configurable limits
- **CORS Configuration**: Configurable cross-origin resource sharing
- **Input Validation**: Joi-based request validation
- **Environment-based Error Handling**: Stack traces only in development

#### 📚 **API Documentation**
- **Swagger/OpenAPI 3.0**: Interactive API documentation
- **Comprehensive Schema Definitions**: Detailed request/response schemas
- **Authentication Documentation**: JWT bearer token documentation
- **Example Requests**: Ready-to-use API examples

#### ⚡ **Performance & Reliability**
- **Response Compression**: Gzip compression for faster responses
- **Graceful Shutdown**: Proper process termination handling
- **Unhandled Rejection Handling**: Prevent crashes from unhandled promises
- **Request Size Limits**: Configurable body size limits

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd exchange-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 📋 Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Server Configuration
NODE_ENV=development
PORT=4545
API_URL=http://localhost:4545

# Database
MONGO_URI=mongodb://localhost:27017/exchange

# JWT
ACCESS_TOKEN_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Logging
LOG_LEVEL=info

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 📖 API Documentation

### Interactive Documentation
Visit `/api-docs` when the server is running to access the interactive Swagger documentation.

### Health Check Endpoints
- `GET /health` - Check API and database status
- `GET /metrics` - Get system metrics (memory, CPU, uptime)

### Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Rate Limiting
- **Authentication endpoints**: 5 requests per 15 minutes
- **General API**: 100 requests per 15 minutes

## 📁 Project Structure

```
├── config/
│   ├── dbConnection.js    # Database connection with logging
│   └── swagger.js         # Swagger configuration
├── controllers/           # Route controllers
├── middleware/
│   ├── errorHandler.js    # Enhanced error handling
│   ├── logger.js          # Winston logger setup
│   ├── requestLogger.js   # Request/response logging
│   ├── rateLimiter.js     # Rate limiting middleware
│   ├── responseHandler.js # Standardized responses
│   └── validator.js       # Request validation
├── models/                # Mongoose models with Swagger schemas
├── routes/                # API routes with documentation
├── logs/                  # Application logs (auto-created)
└── server.js              # Main application file
```

## 🔍 Logging

### Log Files
- `logs/error.log` - Error-level logs only
- `logs/combined.log` - All logs (info, warn, error)

### Log Format
```json
{
  "level": "info",
  "message": "Incoming request",
  "timestamp": "2023-12-01T10:00:00.000Z",
  "service": "exchange-api",
  "method": "GET",
  "url": "/api/v1/exchange/users",
  "ip": "127.0.0.1",
  "userAgent": "Mozilla/5.0...",
  "userId": "507f1f77bcf86cd799439011"
}
```

## 🧪 Testing

```bash
# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

## 🚀 Deployment

### Production Considerations
1. Set `NODE_ENV=production`
2. Configure proper `MONGO_URI`
3. Set strong `ACCESS_TOKEN_SECRET`
4. Configure `ALLOWED_ORIGINS`
5. Set up proper logging (consider external log aggregation)
6. Configure rate limiting based on your needs

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 4545
CMD ["npm", "start"]
```

## 📈 Monitoring

### Health Checks
Monitor your API health using the `/health` endpoint:
```bash
curl http://localhost:4545/health
```

### Metrics
Get system metrics using the `/metrics` endpoint:
```bash
curl http://localhost:4545/metrics
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Jameel Agbaria
