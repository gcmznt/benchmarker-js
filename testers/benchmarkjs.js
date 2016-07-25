const benchmark = require('benchmark');

module.exports = function(mod) {
  const suite = new benchmark.Suite();

  for (let method in mod) {
    if (mod.hasOwnProperty(method) && typeof mod[method] === 'function') {
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
};
