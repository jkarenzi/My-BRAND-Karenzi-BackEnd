"use strict";
const swaggerJsdoc = require('swagger-jsdoc');
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My Brand API',
            version: '1.0.0',
            description: 'Documentation for my Brand API with Swagger',
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    in: 'header',
                    bearerformat: 'JWT'
                }
            }
        },
    },
    apis: ['./routes/*'],
};
const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
