let MongoDB = require('./../mongodb');
let util = require('util')
let chai = require('chai')
let expect = chai.expect;
let assert = chai.assert;
describe('user_info', function () {
    it('save', function (done) {
        let user_info = {user_name: 'alex', user_age: new Date().getMilliseconds()}
        MongoDB.save('user_info', user_info, function (err, res) {
            util.log(res)
            assert.notEqual(res._id, '')
            done();
        })
    })
    it('findOne', function (done) {
        MongoDB.findOne('user_info', {user_name: 'alex'}, function (err, res) {
            util.log(res)
            expect(res).to.deep.include({user_name: 'alex'});
            done()
        })
    })
    it('find', function (done) {
        MongoDB.find('user_info', {user_name: 'alex'}, {}, function (err, res) {
            util.log(res)
            expect(res).to.have.lengthOf(5);
            done()
        })
    })
    it('updateData', function (done) {
        let codtion = {user_name: 'alex', user_age: 20}
        let update_data = {user_age: 18}
        MongoDB.updateData('user_info', codtion, {$set: update_data}, function (err, res) {
            util.log(res)

            done()
        })
    })
    it('remove', function (done) {
        MongoDB.remove('user_info', {_id: '5942421964c36c73b428f4b3'}, function (err, res) {
            util.log(res)
            expect(res.result.n).to.equal(1)
            done();
        })
    })
})