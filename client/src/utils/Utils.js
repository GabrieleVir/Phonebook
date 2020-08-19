exports.sanitizeString = function sanitizeString(str){
    str = str.replace(/[^a-z0-9áéíóúñü .,_-]/gim,"");
    return str.trim();
}

exports.arePhonebookInputsValid = function arePhonebookInputsValid(first_name, last_name, phonenumber) {
    if (first_name.length === 0 || last_name.length === 0) {
        window.flash("First name or last name empty, please insert a first name and last name", 'error');
        return false;
    }
    let regex = /^[+][\d]{2}[ ][\d]{2}[ ][\d]{6,}/g;
    if (!phonenumber.match(regex)) {
        window.flash("The format of the phonenumber is not respected: It has to start with the character '+' " +
            "followed by 2 digits then a space, 2 digits, a final space and at least 6 digits. Ex:+32 98 23232d32", 'error');
        return false;
    }
    return true;
}