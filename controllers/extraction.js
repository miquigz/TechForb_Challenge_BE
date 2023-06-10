
const extractionService = require('../services/extraction');

const getExtractions = async (req, res, next)=>{
    try {
        const extractions = await extractionService.getExtractions();
        res.status(200).json({extractions});
    } catch (error) {
        next(error);
    }
}

const getExtractionsByCbu = async (req, res, next)=>{
    try {
        const extractions = await extractionService.getExtractionsByCbu(req.params.cbu);
        res.status(200).json({extractions});
    } catch (error) {
        next(error);
    }
}

const createExtraction = async (req, res, next)=>{
    try {
        const extraction = await extractionService.createExtraction(req.body);
        res.status(201).json({extraction});
    } catch (error) {
        next(error);
    }
}

const deleteExtraction = async (req, res, next)=>{
    try {
        const extraction = await extractionService.deleteExtraction(req.params.id);
        res.status(200).json({extraction});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getExtractions,
    getExtractionsByCbu,
    createExtraction,
    deleteExtraction
}