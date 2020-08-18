const Phonebook = require("../../schema/schemaPhonebook.js");
const { sanitizeString } = require('./utils.js');
const {validationResult} = require('express-validator');

async function createPhonebook(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            text: "Validator found an error",
            validator: errors.mapped()
        });
    }
    const { first_name, last_name, phonenumber } = req.body;
    const phonebook = {
        first_name: sanitizeString(first_name),
        last_name: sanitizeString(last_name),
        phonenumber: phonenumber,
    };

    try {
        const phonebookData = new Phonebook(phonebook);
        await phonebookData.save();
        return res.status(200).json({
            text: "CreatePhonebookForm added successfully",
        });
    } catch (error) {
        return res.status(500).json({
            text: error
        });
    }
}

async function searchPhonebook(req, res) {
    let phonebookTextSearch = req.query.search === undefined ? '' : req.query.search;
    if (phonebookTextSearch.indexOf('+') !== -1) {
        phonebookTextSearch = '\\' + phonebookTextSearch;
    }
    const regexForMongodb = new RegExp(phonebookTextSearch, 'i');
    const findPhonebook = await Phonebook.find({
        $or: [
            { first_name: regexForMongodb },
            { last_name: regexForMongodb },
            { phonenumber: regexForMongodb },
        ]
    });
    if (Array.isArray(findPhonebook) && findPhonebook.length === 0) {
        return res.status(404).json({
            text: 'No entry found',
        })
    }
    return res.status(200).json({
        phonebooks: findPhonebook,
    });
}

async function updatePhonebook(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            text: "Validator found an error",
            validator: errors.mapped()
        });
    }
    const id = sanitizeString(req.params.id);
    const { first_name, last_name, phonenumber } = req.body;

    const phonebook = {
        first_name: sanitizeString(first_name),
        last_name: sanitizeString(last_name),
        phonenumber: phonenumber,
    };

    try {
        const update = {
            first_name: phonebook.first_name,
            last_name: phonebook.last_name,
            phonenumber: phonebook.phonenumber
        };
        const phonebookObject = await Phonebook.findByIdAndUpdate(id, update);
        if (phonebookObject === null) {
            return res.status(404).json({
                text: "This phonebook doesn't exist",
            });
        }
        return res.status(200).json({
            text: "CreatePhonebookForm updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            text: error
        });
    }
}

async function fetchPhonebook(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            text: "Validator found an error",
            validator: errors.mapped()
        });
    }
    const id = sanitizeString(req.params.id);
    try {
        const phonebookObject = await Phonebook.findById(id);
        if (phonebookObject === null) {
            return res.status(404).json({
                phonebook: phonebookObject,
                text: "This phonebook doesn't exist",
            });
        }
        return res.status(200).json({
            phonebook: phonebookObject,
            text: "This phonebook exists",
        });
    } catch (error) {
        return res.status(500).json({
            text: error,
        });
    }

}

exports.createPhonebook = createPhonebook;
exports.searchPhonebook = searchPhonebook;
exports.updatePhonebook = updatePhonebook;
exports.fetchPhonebook = fetchPhonebook;