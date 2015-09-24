var expect = require('chai').expect;
var start = require('../start');

describe('start unit test', function() {
    describe('parseInput', function() {
        it('normal input', function() {
            expect(start.parseInput('PLACE 0,0,NORTH'))
                .to.eql({
                    command: 'place',
                    args: '0,0,NORTH'
                });
            expect(start.parseInput('MOVE'))
                .to.eql({
                    command: 'move',
                    args: ''
                });
        });

        it('handle lower case input', function() {
            expect(start.parseInput('place 0,0,north'))
                .to.eql({
                    command: 'place',
                    args: '0,0,north'
                });
        });
    });

    it('ignore invalid command', function() {
        start.handleInput('Give me five');
    });
});