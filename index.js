var inquirer = require('inquirer')
var wordsToFind = ['boolean', 'constructor', 'recursion', 'variable', 'constant', 'function', 'return', 'object', 'json', 'node']
var roundWord = ''
var currentWord = []
var lastWord = ''
var guesses = []
var tries = 10
var wins = 0
var losses = 0
var WORD = require('./Word')
//Welcome player to the game
console.log('Welcome to word find. You must guess ten javascript related terms. You have a total of ten tries for each word.\nGood luck!\n')
//Get the current word randomly from array of words and run it through the object constructor (WORD)
function getCurrentWord() {
  var randWord = Math.floor(Math.random() * wordsToFind.length)
  roundWord = wordsToFind[randWord]
  wordsToFind.splice(randWord, 1)
  currentWord = new WORD(roundWord.split(''))
  currentWord.current()
  lastWord = currentWord.currentString
  console.log(lastWord + '\n')
//Run function to prompt player for first guess
  getLetter()
}
//Evaluate state of game play. If play state is not over, prompt player to guess a letter.
function getLetter() {
  tries--
  if (tries < 0) {
    console.log('\x1b[1;31m','SORRY, YOU HAVE RUN OUT OF TRIES. THE WORD WAS','\x1b[0m',roundWord + '\n')
    losses++
    playAgain()
  }
  else {
  inquirer.prompt([
    {
      type: 'input',
      name: 'letter',
      message: 'Please enter a letter:',
//Validate that letter is lower case a-z and only one character. If not, return to prompt.
      validate: function(value) {
        var pass = value.match(
          /^[a-z]{1,1}$/
        )
        if (pass) {
          return true
        }
        return 'PLEASE ENTER A LOWER CASE LETTER'
      }
    }
//Check if letter has already been guessed. If it has, add 1 back to tries left and return to prompt.
    ]).then(function(thingy){
      if (guesses.includes(thingy.letter)) {
        tries++
        console.log('\x1b[1;31m','YOU ALREADY GUESSED THAT LETTER. PLEASE TRY AGAIN.\n')
        getLetter()
      }
//Validate letter guessed is in the word or not
      else {
        guesses.push(thingy.letter)
        console.log('\n')
        currentWord.evaluate(thingy.letter)
        if (lastWord === currentWord.currentString) {
          console.log('\x1b[1;31m','INCORRECT!\n')
          console.log('\x1b[0m','You have ' + tries + ' guesses remaining.\n\n ' + currentWord.currentString + '\n')
          getLetter()
        }
//Check if word has been solved by player
        else {
          lastWord = currentWord.currentString
          console.log(' CORRECT!\n')
          if (!lastWord.includes('_')) {
            console.log(' CONGRATULATIONS! YOU HAVE GUESSED ' + roundWord + ' CORRECTLY!\n')
            wins++
            playAgain()
          }
//Word has not been solved. Inform player of how many tries are remaining and prompt player for next guess.
          else {
            console.log('\x1b[0m','You have ' + tries + ' guesses remaining.\n\n ' + currentWord.currentString + '\n')
            getLetter()
          }
        }
      }
    })
  }
}
//When word has been solved or tries have been exhausted, check to see if there are words left in the array and prompt the player for a new game or exit play. If no words left to guess, exit play.
function playAgain() {
  if (wordsToFind.length > 0) {
    inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Guess another word?'
      }
    ]).then(function(confirm) {
      if (confirm.confirm) {
        tries = 10
        guesses = []
        getCurrentWord()
      }
      else {
        finishUp()
      }
    })
  }
  else {
    finishUp()
  }
}
//End of game play statistics display and return to CLI prompt
function finishUp() {
  console.log('=========================================================\n')
  console.log('Thank you for playing constructor word guess game today!\nYour final score was:\nWins: ' + wins + '\nLosses: ' + losses + '\nHave a nice day!\n')
  console.log('=========================================================')
}
//Run function to begin game play
getCurrentWord()
