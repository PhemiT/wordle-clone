
const lettersPattern = /[a-z]/
let currentGuessCount = 1
let currentGuess = document.querySelector("#guess" + currentGuessCount)
const words = ["story", "gnarl", "snail", "zonal", "blair", "metal"]
let gameWord = ""

const chooseWord = () => {
    gameWord = words[Math.floor(Math.random()*5)]
    return gameWord
}
chooseWord()

const submitGuess = () => {

}

document.addEventListener("keydown", (k) => {
    console.log("keypress" + k.key)
    let keypress = k.key
    
    if (keypress.length == 1 && lettersPattern.test(k.key) && currentGuess.dataset.letters.length < 5) {
        updateLetters(keypress)
    } else if (k.key == "Backspace" && currentGuess.dataset.letters != "") {
        deleteLetter()
    } else if (k.key == "Enter" && currentGuess.dataset.letters.length == 5) {
        submitGuess()
        for ( let i=0; i < 5; i++) {
            setTimeout(() => {
                revealTile(i, checkLetter(i))   
            }, i* 200 );
        }
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
    currentTileAlt.classList.add("has-letter")
}

const deleteLetter = () => {
    let oldLetters = currentGuess.dataset.letters
    let newLetters = oldLetters.slice(0, -1)
    currentGuess.dataset.letters = newLetters
    clearTile(oldLetters.length)
}

const clearTile = (tileNumber) => {
    let currentTile = document.querySelector("#guessTile" + tileNumber)
    currentTile.innerText = ""
    currentTile.classList.remove("has-letter")
}

const checkLetter = (position) => {
    let guessedLetter = currentGuess.dataset.letters.charAt(position)
    let solutionLetter = gameWord.charAt(position)

    if (solutionLetter == guessedLetter) {
        return "correct"
    } else {
        return checkLetterExists(guessedLetter) ? "present" : "absent"
    }
}

const checkLetterExists = (letter) => {
    return gameWord.includes(letter)
}

const revealTile = (i, state) => {
    let tileNum = i + 1
    let tile = document.querySelector("#guessTile" + tileNum)
    
    /* if (state == "correct") {
        tile.classList.add("correct")
    } else if (state == "present") {
        tile.classList.add("present")
    } else if (state == "absent") {
        tile.classList.add("absent")
    } */
    flipTile(tileNum,state)
}

const flipTile = (tileNum,state) => {
    let tile = document.querySelector("#guessTile" + tileNum)
    tile.classList.add("flip-in")
    setTimeout(() => {
        tile.classList.add(state)
    }, 100);
    
    setTimeout(() => {
        tile.classList.add("flip-out")     
    }, 200);
   
}