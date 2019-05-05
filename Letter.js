//Constructor to evaluate and return character objects for an array used in word guess game play:
//This constructor is used by the Word.js constructor to determine and establish the individual state of each letter
//in the current word of game play. It creates an object for each letter of the word and, based on whether the letter
//has been guessed or not, returns either an underscore or the letter itself which is used by the word constructor
//to create a concatenated string that represents the current state of the word in play
function LETTER(underLying) {
  this.underLying = underLying
  this.found = false
  this.test = function() {
    if (this.found) {
       return this.underLying
    }
    else {
      return '_'
    }
  }
  this.evaluate = function(guess) {
    if (guess === this.underLying) {
      this.found = true
    }
  }
}
module.exports = LETTER
