var robot = require('./robot');

/**
 * parse input
 * @param  {[type]} input [description]
 * @return {[type]}       [description]
 */
var parseInput = function(input) {
    var matches = input.toString().match(/(\w+)(.*)/);
    return {
        command: matches[1].toLowerCase(),
        args: matches[2].trim()
    };
};

var handleInput = function(input) {
    var parsedInput = parseInput(input);
    
    if (robot[parsedInput.command]) {
        robot[parsedInput.command](parsedInput.args);
    } else {
        console.log('Alert: Command invalid');
    }
};

process.stdin.on('data', handleInput);

exports.parseInput = parseInput;
exports.handleInput = handleInput;