var expect = require('chai').expect;
var robot = require('../robot');

describe('robot unit test', function() {
    it('checkPlacedFromPosition', function() {
        expect(robot.checkPlacedFromPosition(null, 'NORTH'))
            .to.equal(false);
        expect(robot.checkPlacedFromPosition([3, 0], 'NORTH'))
            .to.equal(true);
    });

    it('checkPlaceArgsFormat', function() {
        expect(robot.checkPlaceArgsFormat('1,3,east'))
            .to.equal(true);
        expect(robot.checkPlaceArgsFormat('east'))
            .to.equal(false);
    });

    it('parsePlaceArgs', function() {
        expect(robot.parsePlaceArgs('1,3,EAST'))
            .to.eql({
                position: [1, 3],
                face: 'EAST'
            });
        expect(robot.parsePlaceArgs('2,0,west'))
            .to.eql({
                position: [2, 0],
                face: 'WEST'
            });
    });

    it('checkPosition', function() {
        expect(robot.checkPosition([1,3]))
            .to.equal(true);
        expect(robot.checkPosition([5,3]))
            .to.equal(false);
    });

    it('moveFromPostion', function() {
        expect(robot.moveFromPostion([1, 3], 'EAST'))
            .to.eql([0, 3]);
    });

    it('turnFromFace', function() {
        expect(robot.turnFromFace('EAST', 'left'))
            .to.equal('NORTH');
        expect(robot.turnFromFace('SOUTH', 'right'))
            .to.equal('WEST');
    });

    it('reportFromPostion', function() {
        expect(robot.reportFromPostion([3, 1], 'SOUTH'))
            .to.equal('3,1,SOUTH');
    });
});