var Lab = require("lab"),
	server = require("../server.js"),
	lab = exports.lab = Lab.script(),
	Code = require("code");

var duplicateUser = {
    email:  "testUser15@testUser.com",
    email1: "testUser15@testUser.com",
    email2: "testUser15@testUser.com",
    username: "testUser15",
    password: "testUser123",
    password1: "testUser123",
    password2: "testUser123",
    firstname: "testUser15",
    lastname: "testUser15"   
};

var staticTestUser = {
    email:  "testUser14@testUser.com",
    email1: "testUser14@testUser.com",
    email2: "testUser14@testUser.com",
    username: "testUser14",
    password: "testUser123",
    password1: "testUser123",
    password2: "testUser123",
    firstname: "testUser14",
    lastname: "testUser14"   
};

lab.experiment("login chain test", function() {
	lab.test("server up", function(done){
		var options = {
			method: "GET",
			url: "/"
		};

		server.inject(options, function(response) {
			Code.expect(response.statusCode).to.equal(200);
			done();
		});
	});

	lab.test("create existing user", function(done){
		var options = {
			method: "POST",
			url: "/createuser",
            payload: duplicateUser
		};

		server.inject(options, function(response) {
			//Code.expect(response.statusCode).to.equal(200);
			done();
		});
	});
    
	lab.test("create user", function(done){
		var options = {
			method: "POST",
			url: "/createuser",
            payload: staticTestUser
		};

		server.inject(options, function(response) {
			//Code.expect(response.statusCode).to.equal(200);
			done();
		});
	});
    
	lab.test("login user fail", function(done){
		var options = {
			method: "POST",
			url: "/login",
            payload: {
                email: staticTestUser.email,
                password: "thisIsFuckedUp"
            }
		};

		server.inject(options, function(response) {
            console.log("Res statuscode: " + response.statuscode);
			Code.expect(response.statusCode).to.equal(400 || 500);
			done();
		});
	});
    
	lab.test("login user", function(done){
		var options = {
			method: "POST",
			url: "/login",
            payload: staticTestUser,
		};

		server.inject(options, function(response) {
			Code.expect(response.file).to.equal('./src/index.html');
			done();
		});
	});
});