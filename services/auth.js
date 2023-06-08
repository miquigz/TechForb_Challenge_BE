const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = process.env;

const createUser = async (user)=>{
    try {
        if (await User.exists({documentNumber: user.documentNumber}))
            throw new Error('User already exists');
        
        const newUser = {
            name: user.name,
            lastname: user.lastname,
            documentType: user.documentType,
            documentNumber: user.documentNumber,
            password: await bcrypt.hash(user.password, 10),
            cbu: user.cbu
        }
        return await User.create(newUser);
    } catch (error) {
        throw error;
    }
}

const loginUser = async (user)=>{
    try {
        if(!user) throw new Error('Fields are required');
        const userFound = await User.findOne({documentNumber: user.documentNumber});
        if (!userFound) throw new Error('User not found');
        const isMatch = await bcrypt.compare(user.password, userFound.password);
        if (!isMatch) throw new Error('Invalid credentials');
        const token = jwt.sign({id: userFound.documentNumber}, config.JWT_SECRET, {expiresIn: '12h'});
        return token;
    } catch (error) {
        throw error;
    }
}

const getUserByDNI = async (documentNumber)=>{
    try {
        const userFound = await User.findOne({documentNumber: documentNumber});
        if (!userFound) throw new Error('User not found');
        return userFound;
    } catch (error) {
        throw error;
    }
}

const validateToken = async (token)=>{
    try {
        if(!token) throw new Error('Token not found');
        const decoded = jwt.verify(token, config.JWT_SECRET);
        if (!decoded) throw new Error('Invalid token');
        console.log('decoded', decoded);
        res.send(await getUserByDNI(decoded.id));
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    loginUser,
    getUserByDNI,
    validateToken
}
