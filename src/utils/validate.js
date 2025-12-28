const validator = require('validator');

const registerValidation = function(data) {
    const mandatoryFields = ["firstname", "email", "password"];
    
    const allFieldsPresent = mandatoryFields.every((key) => Object.keys(data).includes(key));
    
    if (!allFieldsPresent) {
        throw new Error("Fill the missing field");
    }
    
    if (!validator.isEmail(data.email)) {
        throw new Error('Invalid Email');
    }
    
    if (!validator.isStrongPassword(data.password)) {
        throw new Error('Invalid Password');
    }
}

module.exports = registerValidation;
