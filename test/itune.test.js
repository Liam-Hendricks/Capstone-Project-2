
const chai = require('chai');
const expect = chai.expect;
const fetch = require("node-fetch");


describe('Testing fetch', () => {
    it('Should return one result', async () => {
        let expected = 1;
        await fetch('https://itunes.apple.com/search?term=X-men+apocalypse&entity=movie&limit=1')
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                console.log(res);
                expect(res.resultCount).to.equal(expected);
            });
    });
})