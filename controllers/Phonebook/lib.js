const Phonebook = require("../../schema/schemaPhonebook.js");
const {validationResult} = require('express-validator');
const {sanitizeString, errorManager} = require('./utils.js');

async function createPhonebook(req, res) {
    const validatorErrors = isEmptyValidatorErrors(req);
    if (validatorErrors) {
        const { first_name, last_name, phonenumber } = req.body;
        const phonebook = {
            first_name: sanitizeString(first_name),
            last_name: sanitizeString(last_name),
            phonenumber: sanitizeString(phonenumber),
        };

        try {
            const phonebookData = new Phonebook(phonebook);
            const phonebookObject = await phonebookData.save();
            return res.status(200).json({
                text: "Phonebook added successfully",
            });
        } catch (error) {
            return res.status(500).json({ error });
        }
    } else {
        return validatorErrors;
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
    const validatorErrors = isEmptyValidatorErrors(req);
    if (validatorErrors) {
        const { id } = req.params.id;
        const { first_name, last_name, phonenumber } = req.body;

        const phonebook = {
            first_name: sanitizeString(first_name),
            last_name: sanitizeString(last_name),
            phonenumber: sanitizeString(phonenumber),
        };

        try {
            foundPhonebook = new Phonebook.findOne(
                {_id: id}
            );
            if (foundPhonebook.length === 0) {
                return res.status(400).json({
                    text: "Phonebook doesn't exist in database",
                });
            }
            const phonebookObject = await foundPhonebook.updateOne();
            return res.status(200).json({
                text: "Phonebook updated successfully",
            });
        } catch (error) {
            return res.status(500).json({ error });
        }
    } else {
        return validatorErrors;
    }
}

exports.createPhonebook = createPhonebook;
exports.searchPhonebook = searchPhonebook;
exports.updatePhonebook = updatePhonebook;