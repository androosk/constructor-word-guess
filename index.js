var inquirer = require('inquirer')
var wordCount = 0
var wordsToFind = ['boolean', 'constructor', 'recursion', 'variable', 'constant', 'function', 'return', 'object', 'json', 'node']
var currentWord = []
var WORD = require('./Word')

console.log('Welcome to word find. You must guess ten javascript related terms.\n')

function getCurrentWord() {
  currentWord = new WORD(wordsToFind[wordCount].split(''))
  currentWord.current()
  console.log('\n')
}

function getLetter() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'letter',
      message: 'Please enter a letter:',
      validate: function(value) {
        var pass = value.match(
          /^[a-zA-Z]{1,1}$/
        )
        if (pass) {
          return true
        }
        return 'Please enter a letter'
      }
    }
    ]).then(function(thingy){
      console.log('\n')
      currentWord.evaluate(thingy.letter)
      console.log('\n')
      getLetter()
    })
}
getCurrentWord()
getLetter()
