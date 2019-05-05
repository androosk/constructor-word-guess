var inquirer = require('inquirer')
var wordCount = 0
var wordsToFind = ['boolean', 'constructor', 'recursion', 'variable', 'constant', 'function', 'return', 'object', 'json', 'node']
var roundWord = ''
var currentWord = []
var lastWord = ''
var guesses = []
var tries = 10
var letters = new Object
var wordLength = 0
var currentCount = 0
var wins = 0
var losses = 0
var WORD = require('./Word')

console.log('Welcome to word find. You must guess ten javascript related terms. You have a total of ten tries for each word.\nGood luck!\n')

function getCurrentWord() {
  var randWord = Math.floor(Math.random() * wordsToFind.length)
  roundWord = wordsToFind[randWord]
  wordsToFind.splice(randWord, 1)
  currentWord = new WORD(roundWord.split(''))
  currentWord.current()
  lastWord = currentWord.currentString
  console.log(lastWord + '\n')
  getLetter()
}

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
    ]).then(function(thingy){
      if (guesses.includes(thingy.letter)) {
        tries++
        console.log('\x1b[1;31m','YOU ALREADY GUESSED THAT LETTER. PLEASE TRY AGAIN.\n')
        getLetter()
      }
      else {
        guesses.push(thingy.letter)
        console.log('\n')
        currentWord.evaluate(thingy.letter)
          if (lastWord === currentWord.currentString) {
            console.log('\x1b[1;31m','INCORRECT!\n')
            console.log('\x1b[0m','You have ' + tries + ' guesses remaining.\n\n ' + currentWord.currentString + '\n')
            getLetter()
          }
          else {
          lastWord = currentWord.currentString
          console.log(' CORRECT!\n')
            if (!lastWord.includes('_')) {
              console.log(' CONGRATULATIONS! YOU HAVE GUESSED ' + roundWord + ' CORRECTLY!\n')
              wins++
              playAgain()
            }
            else {
              console.log('\x1b[0m','You have ' + tries + ' guesses remaining.\n\n ' + currentWord.currentString + '\n')
              getLetter()
            }
          }
      }
    })
  }
}
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
        currentCount = 0
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
function finishUp() {
  console.log('=========================================================\n')
  console.log('Thank you for playing constructor word guess game today!\nYour final score was:\nWins: ' + wins + '\nLosses: ' + losses + '\nHave a nice day!\n')
  console.log('=========================================================')
}
getCurrentWord()
