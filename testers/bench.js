const bench = require('bench');

module.exports = function(mod) {
  require.main.exports.compare = mod;
  bench.runMain();
};
