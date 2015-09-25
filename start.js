var robot = require('./robot');

/**
 * parse input
 * @param  {string} input
 * @return {Object}
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
        throw new Error('Command invalid');
    }
};

process.stdin.on('data', function(input) {
    try {
        handleInput(input);
    } catch (e) {
        console.log(e);
    }
});

exports.parseInput = parseInput;
exports.handleInput = handleInput;