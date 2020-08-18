const mongoose = require("mongoose");

const phonebookSchema = mongoose.Schema(
    {
        first_name: {
            type: String,
            trim: true,
            required: true
        },
        last_name: {
            type: String,
            trim: true,
            required: true
        },
        phonenumber: {
            type: String,
            required: true

        }
    },
    { timestamps: { createdAt: "created_at" } }
);
const PhonebookModel = mongoose.model('CreatePhonebook', phonebookSchema);

module.exports = PhonebookModel;