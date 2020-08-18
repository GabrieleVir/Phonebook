const phonebook = require('./Phonebook/lib.js');
const {validationResult, body, check} = require('express-validator');

module.exports = function (app) {
    app.post('/create', [
        body('first_name').exists().trim().notEmpty(),
        body('last_name').exists().trim().notEmpty(),
        body('phonenumber').exists().trim().matches(/^[+][\d]{2}[ ][\d]{2}[ ][\d]{6,}/),
        body().custom(async value  => {
            const data = {
                first_name: value.first_name,
                last_name: value.last_name,
                phonenumber: value.phonenumber,
            }
            switch (await phonebook.alreadyExists(data)) {
                case -1:
                    throw new Error('Phonebook findOne has returned a status 500');
                case 0:
                    throw new Error('Phonebook entry already exists');
                case 1:
                    return true;
            }
        }),
    ], phonebook.createPhonebook);
    app.get('/search', [

    ], phonebook.searchPhonebook);
    app.put('/edit/:id', [

    ], phonebook.updatePhonebook);
}