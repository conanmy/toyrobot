var expect = require('chai').expect;
var start = require('../start');
var robot = require('../robot');

describe('integration test', function() {
    it('move around', function() {
        start.handleInput('PLACE 0,0,NORTH');
        start.handleInput('MOVE');
        expect(robot.report()).to.equal('0,1,NORTH');
    });
});