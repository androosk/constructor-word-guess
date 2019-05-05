//Constructor used to process a word that has been split into an array into a concatenated string
//that represents the current state of the word in play. It uses the Letter constructor to retrieve
//a set of characters which are either underscores or the letter belonging in that space in the
//play word. It also brings the player's guessed letter and uses the Letter constructor to evaluate
//the accuracy of the player's guess.
var LETTER = require('./Letter')
function WORD(allTheLetters) {
  this.characters = []
  allTheLetters.forEach(element => {
    this.characters.push(new LETTER(element))
  })
  this.current = function() {
    this.currentString = ''
    this.characters.forEach(element =>{
      this.currentString += element.test() + ' '
    })
  }
  this.evaluate = function(guess) {
    this.characters.forEach(element =>{
      element.evaluate(guess)
    })
    this.current()
  }
}
module.exports = WORD
