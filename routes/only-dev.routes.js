const Transaction = require('../models/transaction');
const MenuItem = require('../models/menu-item');
const express = require('express');
const routerDev = express.Router();

const randomState = require('../helpers/only-dev');

const { faker } = require('@faker-js/faker')

routerDev.get('/fill/transactions/:cbu', async (req, res) => {
    try {
        const { cbu } = req.params;
        const transactions = [];
        for (let i = 0; i < 100; i++) {
            const transaction = {
                fromCBU: i < 50 ? faker.finance.iban() : cbu,
                toCBU: i < 50 ? cbu : faker.finance.iban(),
                amount: faker.finance.amount(),
                description: faker.lorem.sentence(),
                createdAt: faker.date.past(),
                state: randomState()
            }
            transactions.push(transaction);
        }
        await Transaction.insertMany(transactions);
        res.status(201).json({ message: 'Transactions created', transactions });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

routerDev.get('/fill/menu-items', async (req, res) => {
    try {
        const menuItems = [
            { icon: 'fa fa-home', title: 'Inicio', path: '/home' },
            { icon: 'fa fa-credit-card', title: 'Tarjetas', path: '/home/cards' },
            { icon: 'fa fa-sign-out', title: 'Cerrar sesion', path: '/auth/signin' },
        ]
        await MenuItem.insertMany(menuItems);
        res.status(201).json({ message: 'Menu items created', menuItems });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
});

module.exports = routerDev;