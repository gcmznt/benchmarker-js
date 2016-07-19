const fs = require('fs');
const path = require('path');
const argv = require('yargs').argv;
const benchmark = require('benchmark');
const inquirer = require('inquirer');

const tester = {
  benchmarkjs: function(mod) {
    const suite = new benchmark.Suite();

    for (let method in mod) {
      if (mod.hasOwnProperty(method) && typeof mod[method] === "function") {
        suite.add(method, mod[method]);
      }
    }

    suite
      .on('start', () => console.log('Starting tests'))
      .on('cycle', event => console.log(String(event.target)))
      .on('complete', function() {
        console.log(`Fastest: ${this.filter('fastest').map('name')}`);
      })
      .run({ 'async': true });
  },

  bench: function(mod) {
    exports.compare = mod;
    require("bench").runMain();
  },
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
    choices: () => fs.readdirSync(path.join(__dirname, 'test')),
  },
]).then(function (answers) {
  const mod = require(path.join(__dirname, 'test', answers.module));
  tester[answers.tester](mod);
});
