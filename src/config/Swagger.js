import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "dockNode Application",
    version: "1.0.0",
    description: "user to do application....",
  },
  servers: [
      {
        url: "http://localhost:9999", // change your server URL
      },
    ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"], // Path to the API routes in your Node.js application
};

const swaggerSpec = swaggerJSDoc(options);
export { swaggerSpec };
