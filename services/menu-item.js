const MenuItem = require('../models/menu-item');

const getMenuItems = async () => {
    try {
        return await MenuItem.find();
    } catch (error) {
        throw error;
    }
}

const createMenuItem = async (body) => {
    try {
        if (!body) throw new Error('No body data provided');
        return await MenuItem.create(body);
    } catch (error) {
        throw error;
    }
}

const deleteMenuItem = async (id) => {
    try {
        if(!id) throw new Error('No id provided');
        return await MenuItem.findByIdAndDelete(id);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getMenuItems,
    createMenuItem,
    deleteMenuItem
}
