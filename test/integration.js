var expect = require('chai').expect;
var start = require('../start');
var robot = require('../robot');

describe('integration test', function() {

    it('go straight north', function() {
        start.handleInput('PLACE 0,0,NORTH');
        start.handleInput('MOVE');
        start.handleInput('MOVE');
        start.handleInput('MOVE');
        start.handleInput('MOVE');
        expect(robot.report()).to.equal('0,4,NORTH');
    });

    it('go straight east', function() {
        start.handleInput('PLACE 4,0,EAST');
        start.handleInput('MOVE');
        start.handleInput('MOVE');
        start.handleInput('MOVE');
        start.handleInput('MOVE');
        expect(robot.report()).to.equal('0,0,EAST');
    });

    it('turn 3 times', function() {
        start.handleInput('PLACE 0,0,NORTH');
        start.handleInput('LEFT');
        start.handleInput('LEFT');
        start.handleInput('LEFT');
        expect(robot.report()).to.equal('0,0,EAST');
    });

    it('go around', function() {
        start.handleInput('PLACE 2,3,SOUTH');
        start.handleInput('MOVE');
        start.handleInput('LEFT');
        start.handleInput('MOVE');
        start.handleInput('MOVE');
        start.handleInput('RIGHT');
        expect(robot.report()).to.equal('0,2,SOUTH');
    });

    it('protect form falling', function() {
        start.handleInput('PLACE 4,0,WEST');
        start.handleInput('MOVE');
        expect(robot.report()).to.equal('4,0,WEST');
    });

    it('ignore initial command other than place', function() {
        start.handleInput('RESET');
        start.handleInput('LEFT');
        expect(robot.checkPlaced()).to.equal(false);
    });
});