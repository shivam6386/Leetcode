const validator = require('validator');

/**
 * Validate registration data
 * @param {Object} data - User registration data
 * @returns {Array} Throws an error if validation fails
 */
const registerValidation = (data) => {
  // Define mandatory fields
  const mandatoryFields = ["firstname", "email", "password"];
   const errors = [];

  /*******
 // ONE-LINE RULE TO REMEMBER

Present fields → includes(key)
Missing fields → !includes(key)

**********/

  // Collect missing fields
   const missingFields = mandatoryFields.filter(
    (k) => !Object.keys(data).includes(k));

  if (missingFields.length > 0) {
   errors.push(`Missing required field(s): ${missingFields.join(', ')}`);
  }

  // Trim input values to remove extra spaces
  // We need to trim this value BECAUSE
  /***** 
Email validation:---
User might accidentally add spaces: " test@example.com ".
Without trimming, validator.isEmail(data.email) would fail because the spaces make it an invalid email.
tolowercase: Email normalized to lowercase to avoids case-sensitive issues.

Password validation:----
Leading/trailing spaces might unintentionally make the password different from what the user intended.
Example: " myPass123! " vs "myPass123!" are different strings.

Firstname/Lastname:
Extra spaces can cause problems when storing names in the database or displaying them:
" John " → "John"
********/



 
 // Validate fields only if they exist
  if (Object.keys(data).includes("firstname")) {
    const firstname = data.firstname.trim();
    if (firstname.length < 2) {
      errors.push("Firstname must be at least 2 characters long");
    }
  }

  if (Object.keys(data).includes("email")) {
    const email = data.email.trim().toLowerCase();
    if (!validator.isEmail(email)) {
      errors.push("Invalid Email format");
    }
  }

if (Object.keys(data).includes("password")) {
    const password = data.password.trim();
    if (!validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })) {
      errors.push(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and symbol."
      );
    }
  }

  return errors;
  
};

module.exports = registerValidation;
