var robot = require('./robot');

var handleInput = function(input) {
    var matches = input.toString().match(/(\w+)(.*)/);
    var command = matches[1].toLowerCase();
    var args = matches[2].trim();
    
    robot[command](args);
};

process.stdin.on('data', handleInput);

exports.handleInput = handleInput;