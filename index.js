require('shelljs/global');
var Rwg = require('random-word-generator');
var fs = require('fs');

var maxCommits = 3;
var numCommits = Math.floor(Math.random() * maxCommits) + 1;  
var newWord = new Rwg();

// loop through commits
for (i = 0; i < numCommits; i++) {

  var numWords = Math.floor(Math.random() * 7) + 1;
  var sentence = '';

  // append sentence
  for (a = 0; a <= numWords; a++) {
    sentence += newWord.generate() + ' ';
  }

  sentence = sentence.trim();
  console.log('appending sentence', sentence + '\r\n');
  fs.appendFileSync('52331.txt', sentence + '\r\n');

  syncExec('git add 52331.txt');
  syncExec('git commit -m "' + newWord.generate() + '"');
}


syncExec('git rm 52331.txt');
syncExec('git commit -m "' + newWord.generate() + '"');
syncExec('git push origin master');

function syncExec(cmd) {
  console.log('calling cmd: ' + cmd);
  exec(cmd, { async: false });
}

