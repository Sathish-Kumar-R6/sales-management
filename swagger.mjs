import swaggerAutogen from "swagger-autogen";
const outputFile = "./swagger.json";

const endpointsFiles = ["./src/routes/api.ts"];

const doc = {
  info: {
    title: "Sales Management",
    description:
      "Automatically generated API documentation using swagger-autogen",
    version: "1.0.0",
  },
  host: "localhost:3000",
  basePath: "/api",
  schemes: ["http"],
};

swaggerAutogen(outputFile, endpointsFiles, doc);
