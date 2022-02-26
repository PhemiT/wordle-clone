
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

document.addEventListener("keydown", (k) => {
    console.log("keypress" + k.key)
    let keypress = k.key
    
    if (keypress.length == 1 && lettersPattern.test(k.key) && currentGuess.dataset.letters.length < 5) {
        updateLetters(keypress)
    } else if (k.key == "Backspace" && currentGuess.dataset.letters != "") {
        deleteLetter()
    } else if (k.key == "Enter" && currentGuess.dataset.letters.length == 5) {
        submitGuess() 
        
    }
      
})

const submitGuess = () => {
    for ( let i=0; i < 5; i++) {
        setTimeout(() => {
            revealTile(i, checkLetter(i))   
        }, i* 200 );
    }
}

/* const jumpTiles = () => {
    for(i = 0; i < 5; i++) {
        setTimeout(() => {
        document.querySelector("#guess" + currentGuessCount + "Tile" + (i + 1)).classList.add("jump-animation")
        }, i * 200);
        
    }
}
 */
const checkWin = () => {
    if(gameWord == currentGuess.dataset.letters) {
        console.log("Game is won!")
    } else {
        currentGuessCount++
        currentGuess = document.querySelector("#guess" + currentGuessCount)
    }
}
console.log(gameWord)
const guessComplete = (i) => {
    if(i == 4) {
        checkWin()
    } else {
        console.log("not yet")
}
}

 const updateLetters = (letter) => {
    let oldLetters = currentGuess.dataset.letters
    let newLetters = oldLetters + letter
    let currentTile = newLetters.length
    currentGuess.dataset.letters = newLetters
    updateTiles(currentTile, letter)
}

const updateTiles = (tileNumber, letter) => {
    let currentTileAlt = document.querySelector("#guess" + currentGuessCount + "Tile" + tileNumber)
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
    let currentTile = document.querySelector("#guess" + currentGuessCount + "Tile" + tileNumber)
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
    let tile = document.querySelector("#guess" + currentGuessCount + "Tile" + tileNum)
    flipTile(tileNum,state)
    guessComplete(i)
    }


const flipTile = (tileNum,state) => {
    let tile = document.querySelector("#guess" + currentGuessCount + "Tile" + tileNum)
    tile.classList.add("flip-in")
    setTimeout(() => {
        tile.classList.add(state)
    }, 100);
    
    setTimeout(() => {
        tile.classList.remove("flip-in")
        tile.classList.add("flip-out")    
    }, 200);
    setTimeout(() => {
        tile.classList.remove("flip-out")  
    }, 1500);
   
}
