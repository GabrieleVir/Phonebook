const Phonebook = require("../../schema/schemaPhonebook.js");

async function createPhonebook(req, res) {
    const { first_name, last_name, phonenumber } = req.body;
    if (!first_name || !last_name || !phonenumber) {
        return res.status(400).json({
            text: "Invalid request"
        });
    }

    let regex = /^[+][\d]{2}[ ][\d]{2}[ ][\d]{6,}/g;
    if (!(phonenumber.match(regex))) {
        return res.status(400).json({
            text: "Invalid phonenumber"
        });
    }
    if (typeof first_name !== 'string' || typeof last_name !== 'string') {
        return res.status(400).json({
            text: "First_name and last_name must be strings"
        });
    }
    const phonebook = {
        first_name,
        last_name,
        phonenumber
    };

    try {
        const findPhonebook = await Phonebook.findOne({
            first_name: first_name,
            last_name: last_name,
            phonenumber: phonenumber,
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

exports.createPhonebook = createPhonebook;
exports.searchPhonebook = searchPhonebook;