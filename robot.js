var position = null;
var face = null;

exports.place = function(args) {
    position = args.split(',');
    face = position.pop().toUpperCase();
};

exports.move = function() {
    switch(face) {
        case 'NORTH':
            position[1]++;
            break;
        case 'SOUTH':
            position[1]--;
            break;
        case 'EAST':
            position[0]--;
            break;
        case 'WEST':
            position[0]++;
            break;
    }
};

exports.turn = function(hand) {
    var directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    var index = directions.indexOf(face);
    switch(hand) {
        case 'left':
            index--;
            break;
        case 'right':
            index++;
            break;
    }
    face = directions[(index+4)%4];
};

exports.left = function() {
    this.turn('left');
};

exports.right = function() {
    this.turn('right');
};

exports.report = function() {
    position.push(face);
    console.log(position.join(','));
    position.pop();
};