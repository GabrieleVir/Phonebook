const phonebook = require('./Phonebook/lib.js');
const {param, body} = require('express-validator');

module.exports = function (app) {
    app.post('/create', [
        body('first_name').exists().trim().notEmpty(),
        body('last_name').exists().trim().notEmpty(),
        body('phonenumber').exists().trim().matches(/^[+][\d]{2}[ ][\d]{2}[ ][\d]{6,}/),
    ], phonebook.createPhonebook);
    app.get('/search', phonebook.searchPhonebook);
    app.get('/fetch/:id', [
        param('id').exists().notEmpty().matches(/^[a-f\d]{24}$/, 'i'),
    ], phonebook.fetchPhonebook);
    app.put('/edit/:id', [
        body('first_name').exists().trim().notEmpty(),
        body('last_name').exists().trim().notEmpty(),
        body('phonenumber').exists().trim().matches(/^[+][\d]{2}[ ][\d]{2}[ ][\d]{6,}/),
        param('id').exists().notEmpty().matches(/^[a-f\d]{24}$/, 'i'),
    ], phonebook.updatePhonebook);
}