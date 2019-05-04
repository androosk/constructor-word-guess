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
    console.log(this.currentString)
  }
  this.evaluate = function(guess) {
    this.characters.forEach(element =>{
      element.evaluate(guess)
    })
    this.current()
  }
}
module.exports = WORD
