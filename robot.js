var robotPosition = null;
var robotFace = null;
var CONSTRAINT = [[0, 4], [0, 4]];  // table boundary
var DIRECTIONS = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

var checkPlaced = function() {
    if (robotPosition !== null && robotFace !== null) {
        return true;
    } else {
        console.log('ALert: Robot not placed.');
        return false;
    }
};

var checkArgsFormat = function(args) {
    args = args.split(',');
    var reportError = function() {
        console.log('Alert: Place command argument error.');
    };

    if (args.length === 3) {
        var x = args[0];
        var y = args[1];
        var face = args[2];
        var numberExp = /^\d*$/;
        if (numberExp.test(x)
            && numberExp.test(y)
            && DIRECTIONS.indexOf(face.toUpperCase()) >= 0) {
            return true;
        } else {
            reportError();
            return false;
        }
    } else {
        reportError();
        return false;
    }
};

var checkPosition = function(position) {
    return position[0]>=CONSTRAINT[0][0]
        && position[0]<=CONSTRAINT[0][1]
        && position[1]>=CONSTRAINT[1][0]
        && position[1]<=CONSTRAINT[1][1];
};

var checkAndReposition = function(position) {
    if (checkPosition(position)) {
        robotPosition = position;
        return true;
    } else {
        console.log('Alert: Robot protected from falling.');
        return false;
    }
};

exports.place = function(args) {
    if (!checkArgsFormat(args)) {
        return;
    }
    var position = args.split(',');
    var face = position.pop().toUpperCase();
    if (checkAndReposition(position)) {
        robotFace = face;
    }
};

exports.move = function() {
    if (!checkPlaced()) {
        return;
    }
    var position = robotPosition.slice(0);
    switch(robotFace) {
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
    checkAndReposition(position);
};

exports.turn = function(hand) {
    if (!checkPlaced()) {
        return;
    }
    var index = DIRECTIONS.indexOf(robotFace);
    switch(hand) {
        case 'left':
            index--;
            break;
        case 'right':
            index++;
            break;
    }
    robotFace = DIRECTIONS[(index+4)%4];
};

exports.left = function() {
    this.turn('left');
};

exports.right = function() {
    this.turn('right');
};

exports.report = function() {
    if (!checkPlaced()) {
        return;
    }
    var position = robotPosition.slice(0);
    position.push(robotFace);
    var report = position.join(',');
    console.log(report);
    return report;
};