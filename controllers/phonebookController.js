const phonebook = require('./phonebook/lib.js');

module.exports = function (app) {
    app.post('/create', phonebook.createPhonebook);
    app.get('/search', phonebook.searchPhonebook);
}