const Phonebook = require("../../schema/schemaPhonebook.js");
const {validationResult} = require('express-validator');

async function alreadyExists(phonebook) {
    try {
        const findPhonebook = await Phonebook.findOne({
            first_name: phonebook.first_name,
            last_name: phonebook.last_name,
            phonenumber: phonebook.phonenumber,
        });
        if (findPhonebook) {
            return 0;
        }
        return 1;
    } catch (error) {
        return -1;
    }

}

async function createPhonebook(req, res) {
    const errors = validationResult(req);
    const { first_name, last_name, phonenumber } = req.body;
    const trimmed_first_name = first_name ?  first_name.trim() : '';
    const trimmed_last_name = last_name ? last_name.trim() : '';
    const trimmed_phonenumber = phonenumber ? phonenumber.trim() : '';
    if (!errors.isEmpty()) {
        return res.status(400).json({
            text: "Validator found an error",
            validator: errors.mapped()
        });
    } else {
        const phonebook = {
            first_name: trimmed_first_name,
            last_name: trimmed_last_name,
            phonenumber: trimmed_phonenumber,
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
    const { id } = req.params.id;
    const { first_name, last_name, phonenumber } = req.body;
    const trimmed_first_name = first_name ?  first_name.trim() : '';
    const trimmed_last_name = last_name ? last_name.trim() : '';
    const trimmed_phonenumber = phonenumber ? phonenumber.trim() : '';
    if (trimmed_first_name.length === 0 || trimmed_last_name.length === 0 || !trimmed_phonenumber) {
        return res.status(400).json({
            text: "Invalid request"
        });
    }

    let regex = /^[+][\d]{2}[ ][\d]{2}[ ][\d]{6,}/g;
    if (!(trimmed_phonenumber.match(regex))) {
        return res.status(400).json({
            text: "Invalid phonenumber"
        });
    }
    if (typeof trimmed_first_name !== 'string' || typeof trimmed_last_name !== 'string') {
        return res.status(400).json({
            text: "First_name and last_name must be strings"
        });
    }
    const phonebook = {
        first_name: trimmed_first_name,
        last_name: trimmed_last_name,
        phonenumber: trimmed_phonenumber,
    };

    try {
        const findPhonebook = await Phonebook.findOne({
            first_name: trimmed_first_name,
            last_name: trimmed_last_name,
            phonenumber: trimmed_phonenumber,
        });
        if (findPhonebook) {
            return res.status(400).json({
                text: "This entry already exists"
            });
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
    try {
        const phonebookData = new Phonebook(phonebook);
        const phonebookObject = await phonebookData.save();
        return res.status(200).json({
            text: "Phonebook added successfully",
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

exports.createPhonebook = createPhonebook;
exports.searchPhonebook = searchPhonebook;
exports.updatePhonebook = updatePhonebook;
exports.alreadyExists = alreadyExists;