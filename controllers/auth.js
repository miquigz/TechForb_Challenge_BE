const authService = require('../services/auth');

const createUser = async (req, res, next)=>{
    try {
        const user = await authService.createUser(req.body);
        res.status(201).json({user});
    } catch (error) {
        next(error);
    }
}

const loginUser = async (req, res, next)=>{
    try {
        const token = await authService.loginUser(req.body);
        res.status(200).json({token});
    } catch (error) {
        next(error);
    }
}

const validateToken = async (req, res, next)=>{
    try {
        const user = await authService.validateToken(req.params.token);
        return res.status(200).json({user});
    } catch (error) {
        next(error);
    }
}

const searchUserByDNI = async (req, res, next)=>{
    try {
        const user = await authService.getUserByDNI(req.params.dni);
        res.status(200).json({user});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createUser,
    loginUser,
    validateToken,
    searchUserByDNI
}