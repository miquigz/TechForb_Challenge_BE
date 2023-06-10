const Extraction = require('../models/extraction');
const User = require('../models/auth');


const getExtractions = async () => {
    try {
        return await Extraction.find();
    } catch (error) {
        throw error;
    }
}

const getExtractionsByCbu = async (cbu) => {
    try {
        if (!cbu) throw new Error('Cbu is required');
        return await Extraction.find({ CBU: cbu });
    } catch (error) {
        throw error;
    }
}

const createExtraction = async (body) => {
    try {
        if (!body) throw new Error('Body data is required');
        if (!body.cbu) throw new Error('Cbu is required');
        const actualUser = await User.findOne({ CBU: body.cbu });
        if (!actualUser) throw new Error('User not found');
        if (actualUser.currency < body.amount) throw new Error('Insufficient funds for extraction');
        await User.findByIdAndUpdate(actualUser._id, { currency: actualUser.currency - body.amount });
        return await Extraction.create(body);
    } catch (error) {
        throw error;
    }
}

const deleteExtraction = async (id) => {
    try {
        if(!id) throw new Error('No id provided');
        return await Extraction.findByIdAndDelete(id);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getExtractions,
    getExtractionsByCbu,
    createExtraction,
    deleteExtraction
}