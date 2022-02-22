const lettersPattern = /[a-z]/
let currentGuessCount = 1
let currentGuess = document.querySelector("#guess" + currentGuessCount)
//let currentLetters = currentGuess.dataset.letters

document.addEventListener("keydown", (k) => {
    console.log("keypress" + k.key)
    let keypress = k.key
    if (keypress.length == 1 && lettersPattern.test(k.key)) {
        updateLetters(keypress)
    }
    
})

 const updateLetters = (letter) => {
    currentGuess.dataset.letters += letter
}

const updateTiles = () => {

}