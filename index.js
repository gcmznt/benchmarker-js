const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const testFolder = 'test';
const tester = {
  benchmarkjs: require('./testers/benchmarkjs.js'),
  bench: require('./testers/bench.js'),
};

inquirer.prompt([
  {
    type: 'list',
    name: 'tester',
    message: 'Choose the tester that you want to use:',
    choices: Object.keys(tester),
  },
  {
    type: 'list',
    name: 'module',
    message: 'Which module do you want to test:',
    choices: () => fs.readdirSync(path.join(__dirname, testFolder)),
  },
]).then(function (answers) {
  const mod = require(path.join(__dirname, testFolder, answers.module));
  tester[answers.tester](mod);
});
