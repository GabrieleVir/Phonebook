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
            text: "Invalid phonennumber"
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

exports.createPhonebook = createPhonebook;