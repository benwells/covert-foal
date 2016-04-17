require('shelljs/global');
var Rwg = require('random-word-generator');
var fs = require('fs');

var numCommits = Math.floor(Math.random() * 15) + 1;  
var newWord = new Rwg();

/**
  This is a a little lazy, but checkout to a new branch first.
  if branch already exists, then -b will fail.  Then you can 
  checkout to the existing branch.
  The vice versa scenario works as well.  If test doesn't exist,
  then -b will create new branch, then checkout without -b will
  just tell you that you are already on that branch.
*/
syncExec('git checkout -b test');
syncExec('git checkout test');

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

syncExec('git push origin test');
syncExec('git checkout master');

function syncExec(cmd) {
  exec(cmd, { async: false });
}

