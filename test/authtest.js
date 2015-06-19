//// save user to database
//testUser.save(function(err) {
//    if (err) throw err;
//
//    // fetch user and test password verification
//    User.findOne({ username: 'jmar777' }, function(err, user) {
//        if (err) throw err;
//
//        // test a matching password
//        user.comparePassword('Password123', function(err, isMatch) {
//            if (err) throw err;
//            console.log('Password123:', isMatch); // -> Password123: true
//        });
//
//        // test a failing password
//        user.comparePassword('123Password', function(err, isMatch) {
//            if (err) throw err;
//            console.log('123Password:', isMatch); // -> 123Password: false
//        });
//    });
//});

var Shot     = require('shot');
var assert   = require('assert'); // using the node core module 'assert'
var server   = require('../server.js');

console.log(server)

var internals = {};

function testUser(){
    var randVar = Math.floor((Math.random() * 100000) + 1);
    this.email1 = "testUser"+ randVar + "@testUser.com";
    this.email2 = "testUser"+ randVar + "@testUser.com";
    this.username = "testUser" + randVar;
    this.password1 = "testUser123";
    this.password2 = "testUser123";
    this.firstname = "testUser" + randVar;
    this.lastname = "testUser" + randVar;
}

var staticTestUser = {
    email1: "testUser10@testUser.com",
    email2: "testUser10@testUser.com",
    username: "testUser10",
    password1: "testUser123",
    password2: "testUser123",
    firstname: "testUser10",
    lastname: "testUser10"   
};

internals.main = function () {
//var signUp;
//    var testUserInject = new testUser();
//    console.log(testUserInject);
   // Creating,reading and then deleting a tweet
    Shot.inject(server, { method: 'POST', url: '/createuser', payload: staticTestUser }, function (res) {
        testUserId = res.payload;
        console.log("Posted to createUser" + testUserId);
            //Reading the tweet from line 15
//        Shot.inject(server, { method: 'GET', url: '/t-api', payload: tvtID }, function (res) {
//          assert.equal(res.payload, '######Tweety twatty #yolo');
//          console.log("tvt read");
//            Shot.inject(server, { method: 'POST', url: '/t-api-delete', payload: tvtID }, function (res) {
//            console.log("tvt is being deleted");
//              Shot.inject(server, { method: 'GET', url: '/t-api', payload: tvtID }, function (res) {
//              assert.equal(res.payload, "Tvt existiert nicht mein Freund!");
//              console.log("tvt deleted!");
              process.exit();
        });
//      });
//    });
//    });
//    Shot.inject(server, { method: '', url: '/index.html' }, function (res) {
//     assert.equal(res.statusCode, '200');
//     console.log('Status-Code: ' + res.statusCode + ' GENERIC CALL SUCCESS');
//     });
//        Shot.inject(server, { method: 'GET', url: '/index.html?suck=it' }, function (res) {
//     assert.equal(res.statusCode, '404');
//     console.log('Status-Code: ' + res.statusCode + ' GENERIC CALL SUCCESS');
//     });

};

internals.main();
