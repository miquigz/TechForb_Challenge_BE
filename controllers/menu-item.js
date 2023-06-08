const menuItemService = require('../services/menu-item');

const getMenuItem = async (req, res) => {
    try {
        const menuItems = await menuItemService.getMenuItems();
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createMenuItem = async (req, res) => {
    try {
        const menuItem = await menuItemService.createMenuItem(req.body);
        res.status(201).json(menuItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteMenuItem = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await menuItemService.deleteMenuItem(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getMenuItem,
    createMenuItem,
    deleteMenuItem
}