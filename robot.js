var robotPosition = null;
var robotFace = null;
var CONSTRAINT = [[0, 4], [0, 4]];  // table boundary
var DIRECTIONS = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

/**
 * check placed from position
 * @param  {Array} position
 * @param  {string} face
 * @return {boolean}
 */
exports.checkPlacedFromPosition = function(position, face) {
    return position !== null && face !== null;
};

exports.checkPlaced = function() {
    if (this.checkPlacedFromPosition(robotPosition, robotFace)) {
        return true;
    } else {
        console.log('Alert: Robot not placed.');
        return false;
    }
};

/**
 * check place command argument format
 * @param  {string} args in a format like '0,1,NORTH'
 * @return {boolean} pass or not
 */
exports.checkPlaceArgsFormat = function(args) {
    args = args.split(',');
    var reportError = function() {
        throw new Error('Place command argument error.');
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

/**
 * parse place arguments
 * @param  {string} args
 * @return {Object}
 */
exports.parsePlaceArgs = function(args) {
    var position = args.split(',');
    var face = position.pop().toUpperCase();
    // transform to number
    for (var key in position) {
        position[key] = position[key] - 0;
    }
    return {
        position: position,
        face: face
    };
};

/**
 * check position in boundary
 * @param  {Array} position
 * @return {boolean} pass or not
 */
exports.checkPosition = function(position) {
    return position[0]>=CONSTRAINT[0][0]
        && position[0]<=CONSTRAINT[0][1]
        && position[1]>=CONSTRAINT[1][0]
        && position[1]<=CONSTRAINT[1][1];
};

/**
 * check position and then reset robot position
 * @param  {Array} position
 * @return {boolean}
 */
exports.checkAndReposition = function(position) {
    if (this.checkPosition(position)) {
        robotPosition = position;
        return true;
    } else {
        console.log('Alert: Robot protected from falling.');
        return false;
    }
};

/**
 * place command
 * @param  {string} args arguments
 */
exports.place = function(args) {
    if (!this.checkPlaceArgsFormat(args)) {
        return;
    }
    var parsedArgs = this.parsePlaceArgs(args);
    if (this.checkAndReposition(parsedArgs.position)) {
        robotFace = parsedArgs.face;
    }
};

/**
 * move from postion
 * @param  {Array} position
 * @param  {string} face
 * @return {Array} new position
 */
exports.moveFromPostion = function(position, face) {
    var newPosition = position.slice(0);
    switch(face) {
        case DIRECTIONS[0]:
            newPosition[1]++;
            break;
        case DIRECTIONS[1]:
            newPosition[0]--;
            break;
        case DIRECTIONS[2]:
            newPosition[1]--;
            break;
        case DIRECTIONS[3]:
            newPosition[0]++;
            break;
    }
    return newPosition;
};

exports.move = function() {
    if (!this.checkPlaced()) {
        return;
    }
    this.checkAndReposition(
        this.moveFromPostion(robotPosition, robotFace)
    );
};

/**
 * turn from face
 * @param  {string} face
 * @param  {string} hand left or right
 * @return {string} new face direction
 */
exports.turnFromFace = function(face, hand) {
    var index = DIRECTIONS.indexOf(face);
    switch(hand) {
        case 'left':
            index--;
            break;
        case 'right':
            index++;
            break;
    }
    return DIRECTIONS[(index+4)%4];
};

/**
 * turn command
 * @param  {string} hand left or right
 */
exports.turn = function(hand) {
    if (!this.checkPlaced()) {
        return;
    }
    robotFace = this.turnFromFace(robotFace, hand);
};

exports.left = function() {
    this.turn('left');
};

exports.right = function() {
    this.turn('right');
};

/**
 * report form position
 * @param  {Array} position
 * @param  {string} face
 * @return {string} report, in a format like '0,1,NORTH'
 */
exports.reportFromPostion = function(position, face) {
    var report = position.slice(0);
    report.push(face);
    return report.join(',');
};

exports.report = function() {
    if (!this.checkPlaced()) {
        return;
    }
    var report = this.reportFromPostion(
        robotPosition, robotFace
    );
    console.log(report);
    return report;
};

exports.reset = function() {
    robotPosition = null;
    robotFace = null;
};