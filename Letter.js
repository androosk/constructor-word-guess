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
