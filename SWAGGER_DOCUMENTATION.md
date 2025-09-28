# 📚 Swagger API Documentation

This document provides an overview of all the Swagger/OpenAPI documentation that has been added to the Exchange Backend API.

## 🎯 **Overview**

The API now includes comprehensive Swagger documentation for all endpoints, models, and schemas. The documentation is accessible at `/api-docs` when the server is running.

## 📋 **Documentation Structure**

### **API Information**
- **Title**: Exchange API
- **Version**: 1.0.0
- **Description**: A RESTful API for exchanging products between users online
- **Contact**: support@exchange.com

### **Authentication**
- **Type**: Bearer Token (JWT)
- **Scheme**: HTTP Bearer
- **Format**: JWT

## 🏷️ **API Tags**

The API is organized into the following tags:

1. **Users** - User management and authentication
2. **Products** - Product listing and management
3. **Offers** - Trade offer management
4. **Reviews** - User reviews and ratings
5. **Health** - System health and monitoring

## 📊 **Data Models (Schemas)**

### **User Schema**
```yaml
User:
  type: object
  required: [displayName, email, password]
  properties:
    _id: string (auto-generated)
    displayName: string (min: 2 chars)
    email: string (email format)
    password: string (min: 8 chars, hashed)
    profilePicture: string (optional)
    reviews: array of review IDs
    transactions: array of transaction IDs
    tokens: array of JWT tokens
    createdAt: date-time
    updatedAt: date-time
```

### **Product Schema**
```yaml
Product:
  type: object
  required: [type, category, subCategory, canBeTradedFor, title, description, estimatedValue, location]
  properties:
    _id: string (auto-generated)
    type: string (enum: [Goods, Service])
    category: string
    subCategory: string
    canBeTradedFor: array of strings
    title: string
    description: string
    estimatedValue: number (min: 0)
    color: string (optional)
    pictures: array of URLs
    location: string
    currentOwner: string (user ID)
    createdAt: date-time
    updatedAt: date-time
```

### **Offer Schema**
```yaml
Offer:
  type: object
  required: [sender, receiver, receiverProducts, senderProducts]
  properties:
    _id: string (auto-generated)
    sender: string (user ID)
    receiver: string (user ID)
    conversation: array of message objects
    receiverProducts: array of product IDs
    senderProducts: array of product IDs
    status: array of status objects
    completed: boolean
    createdAt: date-time
    updatedAt: date-time
```

### **Review Schema**
```yaml
Review:
  type: object
  required: [sender, receiver, content, rating]
  properties:
    _id: string (auto-generated)
    sender: string (user ID)
    receiver: string (user ID)
    content: string
    rating: number (min: 1, max: 5)
    offer: string (offer ID, optional)
    createdAt: date-time
    updatedAt: date-time
```

## 🔗 **API Endpoints**

### **Users** (`/api/v1/exchange/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all users | ✅ |
| POST | `/register` | Register new user | ❌ |
| POST | `/login` | Login user | ❌ |
| PATCH | `/update` | Update user profile | ✅ |
| GET | `/me` | Get current user | ✅ |
| GET | `/{userId}` | Get user by ID | ✅ |
| PUT | `/logoutAll` | Logout from all devices | ✅ |
| PUT | `/logout` | Logout current device | ✅ |

### **Products** (`/api/v1/exchange/products`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/all-products/` | Get all products | ✅ |
| GET | `/search/by` | Search products | ✅ |
| POST | `/create` | Create new product | ✅ |
| GET | `/myProducts` | Get my products | ✅ |
| GET | `/{productId}` | Get product by ID | ✅ |
| GET | `/by-userId/{userId}` | Get products by user ID | ✅ |
| DELETE | `/{productId}` | Delete product | ✅ |
| PUT | `/{productId}` | Update product | ✅ |

### **Offers** (`/api/v1/exchange/offers`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/create` | Create new offer | ✅ |
| GET | `/my-offers` | Get my offers | ✅ |
| GET | `/{offerId}` | Get offer by ID | ✅ |
| PATCH | `/{offerId}` | Update offer | ✅ |

### **Reviews** (`/api/v1/exchange/reviews`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/{userId}` | Get reviews by user ID | ✅ |
| POST | `/create` | Create new review | ✅ |
| DELETE | `/delete` | Delete review | ✅ |
| PUT | `/update` | Update review | ✅ |

### **Health** (`/`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/health` | Health check | ❌ |
| GET | `/metrics` | System metrics | ❌ |

## 🔐 **Security**

### **Authentication**
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### **Rate Limiting**
- **Authentication endpoints**: 5 requests per 15 minutes
- **General API**: 100 requests per 15 minutes

## 📝 **Request/Response Examples**

### **User Registration**
```json
POST /api/v1/exchange/users/register
{
  "displayName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### **Create Product**
```json
POST /api/v1/exchange/products/create
{
  "type": "Goods",
  "category": "Electronics",
  "subCategory": "Smartphones",
  "canBeTradedFor": ["Electronics", "Books", "Clothing"],
  "title": "iPhone 12 Pro",
  "description": "Excellent condition iPhone 12 Pro, 128GB, Space Gray",
  "estimatedValue": 800,
  "color": "Space Gray",
  "pictures": ["https://example.com/image1.jpg"],
  "location": "New York, NY"
}
```

### **Create Offer**
```json
POST /api/v1/exchange/offers/create
{
  "receiver": "507f1f77bcf86cd799439012",
  "receiverProducts": ["507f1f77bcf86cd799439013"],
  "senderProducts": ["507f1f77bcf86cd799439014"],
  "conversation": [
    {
      "sender": "507f1f77bcf86cd799439011",
      "content": "Hi, I'm interested in trading for your iPhone"
    }
  ]
}
```

## 🚀 **Accessing the Documentation**

1. **Start the server**: `npm run dev`
2. **Open browser**: Navigate to `http://localhost:4545/api-docs`
3. **Explore**: Use the interactive Swagger UI to:
   - View all endpoints
   - Test API calls
   - See request/response schemas
   - Authenticate with JWT tokens

## 📈 **Features**

### **Interactive Documentation**
- **Try it out**: Test endpoints directly from the UI
- **Authentication**: Enter JWT tokens for protected endpoints
- **Schema validation**: Automatic request validation
- **Response examples**: See expected response formats

### **Comprehensive Coverage**
- **All endpoints**: Every API route is documented
- **All models**: Complete schema definitions
- **Error responses**: All possible error scenarios
- **Authentication**: Clear security requirements

### **Developer Friendly**
- **Copy-paste examples**: Ready-to-use code snippets
- **Parameter validation**: Clear required/optional fields
- **Response schemas**: Detailed response structures
- **Environment support**: Development and production examples

## 🔧 **Maintenance**

### **Adding New Endpoints**
1. Add Swagger JSDoc comments above the route
2. Include all required fields: summary, description, tags, security, requestBody, responses
3. Reference existing schemas using `$ref: '#/components/schemas/SchemaName'`
4. Test the documentation at `/api-docs`

### **Updating Schemas**
1. Modify the JSDoc comments in the model files
2. Ensure all properties are documented with types, descriptions, and examples
3. Update any references in route documentation

### **Best Practices**
- Keep descriptions clear and concise
- Provide realistic examples
- Include all possible response codes
- Document authentication requirements
- Use consistent naming conventions

## 📞 **Support**

For questions about the API documentation:
- Check the interactive docs at `/api-docs`
- Review this documentation file
- Contact: support@exchange.com

---

**Last Updated**: June 2024
**API Version**: 1.0.0
**Documentation Version**: 1.0.0 