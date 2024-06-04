const checkPassword = (password) => {
    // Define the password requirements
    const minLength = 8; // Minimum length of 8 characters
    const hasUpperCase = /[A-Z]/.test(password); // At least one uppercase letter
    const hasNumber = /\d/.test(password); // At least one number

    // Check if the password meets all requirements
    return (
        password.length >= minLength &&
        hasUpperCase &&
        hasNumber
    )
};

export default checkPassword;

// function checkPasswordWithIndexOf(password) {
//     const numbers = "0123456789";
//     const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//     const minLength = 8;
//     let hasNumber = false;
//     let hasUppercase = false;

//     if (password.length < minLength) {
//         return false;
//     }

//     for (let char of password) {
//         if (numbers.indexOf(char) !== -1) {
//             hasNumber = true;
//         } else if (uppercaseLetters.indexOf(char) !== -1) {
//             hasUppercase = true;
//         }
//     }

//     return hasNumber && hasUppercase;
// }
