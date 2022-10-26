const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

// copy password to clipboard
clipboardEl.addEventListener('click', () => {
    const textArea = document.createElement('textarea')
    const password = resultEl.innerText;
    if(!password){
        return;
    }
    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy')
    textArea.remove()
    alert('Password copied to clipboard!')

})

// Generate event listener
generateEl.addEventListener('click', () => {
    let length = lengthEl.value;
    let hasUpper = uppercaseEl.checked;
    let hasLower = lowercaseEl.checked;
    let hasNumber = numbersEl.checked;
    let hasSymbol = symbolsEl.checked;
    resultEl.innerHTML = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
})

// Generate password function
function generatePassword(lower, upper, number, symbol, length) {
    // let { lower, upper, number, symbol } = randomFunc;
    // 1. initailaise password string
    // 2. filter out unchecked type
    // 3. loop over length call generator function for each type
    // 4. Add final pw to the new pw var
    let generatedPassword ="";
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter((item)=> Object.values(item)[0] )
   // console.log(typesArr);

    if(typesCount === 0){
       return '';
    }
    for (let i = 0; i < length; i+= typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            generatedPassword += randomFunc[funcName]()
        })
    }
    return generatedPassword.slice(0 , length)
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97) // ASCII - for lowercase
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65) // ASCII - for uppercase
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48) // ASCII - for number
}

function getRandomSymbol() {
    let symbols = "!@#$%^&*()<>?_+{}[]\/"
    return symbols[Math.floor(Math.random() * symbols.length)]
}
