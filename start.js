var robot = require('./robot');

process.stdin.on('data', function (input) {
    var matches = input.toString().match(/(\w+)(.*)/);
    var command = matches[1].toLowerCase();
    var args = matches[2].trim();
    
    robot[command](args);
});
