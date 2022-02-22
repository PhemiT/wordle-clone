const lettersPattern = /[a-z]/
let currentGuessCount = 1
let currentGuess = document.querySelector("#guess" + currentGuessCount)
//let currentLetters = currentGuess.dataset.letters

document.addEventListener("keydown", (k) => {
    console.log("keypress" + k.key)
    let keypress = k.key
    if (keypress.length == 1 && lettersPattern.test(k.key)) {
        updateLetters(keypress)
    } else if (k.key == "Backspace" && currentGuess.dataset.letters != "") {
        deleteLetter()
    }
    
})

 const updateLetters = (letter) => {
    let oldLetters = currentGuess.dataset.letters
    let newLetters = oldLetters + letter
    let currentTile = newLetters.length
    currentGuess.dataset.letters = newLetters
    updateTiles(currentTile, letter)
}

const updateTiles = (tileNumber, letter) => {
    let currentTileAlt = document.querySelector("#guessTile" + tileNumber)
    currentTileAlt.innerText = letter;
}

const deleteLetter = () => {
    let oldLetters = currentGuess.dataset.letters
    let newLetters = oldLetters.slice(0, -1)
    currentGuess.dataset.letters = newLetters
    clearTile(oldLetters.length)
}

const clearTile = (tileNumber) => {
    document.querySelector("#guessTile" + tileNumber).innerText = ""
}