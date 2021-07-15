// Getting the DOM Elements
const resultDOM = document.getElementById('result');
const copybtnDOM = document.getElementById('copy');

const lengthDOM = document.getElementById('length');
const uppercaseDOM = document.getElementById('uppercase');
const lowercaseDOM = document.getElementById('lowercase');
const numbersDOM = document.getElementById('numbers');
const symbolsDOM = document.getElementById('symbols');
const lastestVersionDOM = document.getElementById("lastest-version");

const generatebtn = document.getElementById('generate-btn');
const form = document.getElementById('password-generate-form');

var arrayFromLowToHigh = (low, high) => {
    const array = [];
    for (let i = low; i <= high; i++) {
        array.push(i);
    }
    return array;
};

// Generating Character Codes
const UPPERCASE_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CODES = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126));

var lastestPaswordGenerator = (
    characterAmount,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols
) => {
    let charCodes = [], randomPassword = "Empty Password";
    if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CODES);
    if (includeLowercase) charCodes = charCodes.concat(LOWERCASE_CODES);
    if (includeNumbers) charCodes = charCodes.concat(NUMBER_CODES);
    if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CODES);

    
    if (!charCodes.length) return randomPassword;
    
    const passwordCharacters = [];
    for (let i = 0; i < characterAmount; i++) {
        const characterCode =
        charCodes[Math.floor(Math.random() * charCodes.length)];
        passwordCharacters.push(String.fromCharCode(characterCode));
    }

    randomPassword = passwordCharacters.join('');
    return randomPassword;
};



var currentPasswordGenerator = (
    characterAmount,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols
) => {
    let numberChars = "0123456789";
    let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lowerChars = "abcdefghijklmnopqrstuvwxyz";
    let symbols = "!@#$%^&*_-+=";

    let allChars = "", randomPassword = "Empty Password";
    if (includeUppercase) allChars = allChars + upperChars;
    if (includeLowercase) allChars = allChars + lowerChars;
    if (includeNumbers) allChars = allChars + numberChars;
    if (includeSymbols) allChars = allChars + symbols;

    let randPasswordArray = Array(characterAmount);
    // Asign the first element to numberChars
    randPasswordArray[0] = numberChars;
    // Asign the second element to upperChars;
    randPasswordArray[1] = upperChars;
    // Asign the third element to lowerChars;
    randPasswordArray[2] = lowerChars;
    // Asign the fourth element to symbol
    randPasswordArray[3] = symbols;
    // Asign rest elements to allchars
    randPasswordArray.fill(allChars, 4);

    var suffleArray = function(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    randomPassword = suffleArray(randPasswordArray.map((Chars) => {
        return Chars[Math.floor(Math.random() * Chars.length)];
    })).join("");

    return randomPassword;
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const characterAmount = lengthDOM.value;
    const includeUppercase = uppercaseDOM.checked;
    const includeLowercase = lowercaseDOM.checked;
    const includeNumbers = numbersDOM.checked;
    const includeSymbols = symbolsDOM.checked;
    const usingLastestVersion = lastestVersionDOM.checked;

    let password = "";
    if (usingLastestVersion) {
        password = lastestPaswordGenerator(
            characterAmount, 
            includeUppercase,
            includeLowercase,
            includeNumbers,
            includeSymbols
        );
    } else {
        password = currentPasswordGenerator(
            characterAmount, 
            includeUppercase,
            includeLowercase,
            includeNumbers,
            includeSymbols
        )
    }
    resultDOM.innerHTML = password;
});

copybtnDOM.addEventListener("click", (event) => {
    const textarea = document.createElement('textarea');
    const passwordToCopy = resultDOM.innerText;

    // Edge Case when Password is Empty
    if (!passwordToCopy) return;

    // Copy Functionality
    textarea.value = passwordToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password Copied to Clipboard');
});

