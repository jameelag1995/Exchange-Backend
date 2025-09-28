import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Exchange API',
            version: '1.0.0',
            description: 'A RESTful API for exchanging products between users online',
            contact: {
                name: 'API Support',
                email: 'support@exchange.com'
            }
        },
        servers: [
            {
                url: process.env.API_URL || 'http://localhost:4545',
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ['./routes/*.js', './controllers/*.js']
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi }; 