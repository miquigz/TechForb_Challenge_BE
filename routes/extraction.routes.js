const express = require("express");
const routerExtraction = express.Router();

const extractionController = require("../controllers/extraction");

const authMiddleware = require("../middlewares/auth");

routerExtraction.get("/", authMiddleware, extractionController.getExtractions);
routerExtraction.get("/:cbu", authMiddleware, extractionController.getExtractionsByCbu);
routerExtraction.post("/", authMiddleware, extractionController.createExtraction);
routerExtraction.delete("/:id", authMiddleware, extractionController.deleteExtraction);

module.exports = routerExtraction;


