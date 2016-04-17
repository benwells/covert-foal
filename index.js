require('shelljs/global');
var Rwg = require('random-word-generator');
var fs = require('fs');

var newWord = new Rwg();
newWord.generate(); // yields something like Takalonazu

var numCommits = Math.floor(Math.random() * 15) + 1;  

console.log('numCommits', numCommits);

for (i = 0; i <= numCommits; i++) {
  var numWords = Math.floor(Math.random() + 7) + 1;
  console.log('numWords', numWords);
  var sentence = '';
  for (i = 0; i <= numWords; i++) {
    sentence += newWord.generate() + ' ';
  }
  sentence = sentence.trim();
  fs.appendFile('52331.txt', sentence, function (err) {
    echo('error appending');
  });
  exec('git add .');
  exec('git commit -m "' + newWord.generate() + '"');

}

exec('git push origin master');


/*
if (exec('git commit -am "Auto-commit"').code !== 0) {
  echo('Error: Git commit failed');
  exit(1);
}
*/
