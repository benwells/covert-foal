require('shelljs/global');
var Rwg = require('random-word-generator');
var fs = require('fs');

var newWord = new Rwg();
newWord.generate(); // yields something like Takalonazu

var numCommits = Math.floor(Math.random() * 15) + 1;  

console.log('numCommits', numCommits);
exec('git checkout test', {async: false});

return;
for (i = 0; i <= numCommits; i++) {
  var numWords = Math.floor(Math.random() * 7) + 1;
  console.log('numWords', numWords);
  var sentence = '';
  for (a = 0; a <= numWords; a++) {
    sentence += newWord.generate() + ' ';
  }
  sentence = sentence.trim();
  console.log('appending sentence', sentence + '\n');
  fs.appendFile('52331.txt', sentence, function (err) {
    echo('error appending', err);
  });
  exec('git add 52331.txt', { async: false });
  exec('git commit -m "' + newWord.generate() + '"', { async: false });

}

exec('git push origin test', { async: false });

//exec('git checkout master');

/*
if (exec('git commit -am "Auto-commit"').code !== 0) {
  echo('Error: Git commit failed');
  exit(1);
}
*/
