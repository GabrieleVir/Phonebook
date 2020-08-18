exports.isEmptyValidatorErrors = function isEmptyValidatorErrors(req) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            text: "Validator found an error",
            validator: errors.mapped()
        });
    }
    return 1;
}

exports.sanitizeString = function sanitizeString(str){
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    return str.trim();
}