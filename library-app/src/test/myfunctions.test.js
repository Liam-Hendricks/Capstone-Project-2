const myfunctions = require('../Modules/myFunctions.js');
const chai = require('chai');
const expect = chai.expect;

describe('Testing myfunctions', function() {
    it('Should return correct path', function() {
        let catergoryName = 'Movie';
        let expected = '/movie';
        let actual = myfunctions.PATH(catergoryName);
        expect(actual).to.equal(expected);
    });
    it('should return correct time format', function() {
        let milliseconds = 200000;
        let expected = '03 min 20 sec';
        let actual = myfunctions.TIME(milliseconds);
        expect(actual).to.equal(expected);
    });
    it('should corret calender month', function() {
        let month = 0;
        let expected = 'January';
        let actual = myfunctions.MONTH(month);
        expect(actual).to.equal(expected);
    });
    it('should return object with correct id', function() {
        let array = [{'trackId':1},{'trackId':2},{'trackId':3}];
        let expected =1;
        let actual = myfunctions.GetObject(array,1);
        expect(actual.trackId).to.equal(expected);
    });
    it('Check if item is in array', function() {
        let array = [{'trackId':1},{'trackId':2},{'trackId':3}];
        let expected =true;
        let actual = myfunctions.ONList(array,1);
        expect(actual).to.equal(expected);
    });
    it('Should remove item from array', function() {
        let array = [{'trackId':1},{'trackId':2},{'trackId':3}];
        let expected =2;
        let actual = myfunctions.removeItem(array,1);
        expect(actual.length).to.equal(expected);
    });
    
});

