var Hapi = require('hapi');

var Validator = require("./validator.js");

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

// Add the routes
server.route(require('./routes'));

<<<<<<< HEAD
server.state('data', {
    ttl: null,
    isSecure: true,
    isHttpOnly: true,
    encoding: 'base64json',
    clearInvalid: false, // remove invalid cookies
    strictHeader: true // don't allow violations of RFC 6265
});

var home = function (request, reply) {

    reply('<html><head><title>Login page</title></head><body><h3>Welcome '
      + request.auth.credentials.name
      + '!</h3><br/><form method="get" action="/logout">'
      + '<input type="submit" value="Logout">'
      + '</form></body></html>');
};

var login2 = function (request, reply) {

    if (request.auth.isAuthenticated) {
        console.log('authenticated');
        return reply.redirect('/');
    }

    var message = '';
    var account = null;

    if (request.method === 'post') {
            var password=request.payload.password;
            var email=request.payload.email;
        console.log(password);
        console.log(email);
            if(Validator.login(email,password,function(isMatch){ //can change callback and validator to pass back more info like user id..
            console.log("Match up: " + isMatch);
            })) {
                account = {id: "jack"};
            }
    }

    if (request.method === 'get' ||
        message) {

        return reply('<html><head><title>Login page</title></head><body>'
            + (message ? '<h3>' + message + '</h3><br/>' : '')
            + '<form method="post" action="/cookie">'
            + 'Email: <input type="text" name="email"><br>'
            + 'Password: <input type="password" name="password"><br/>'
            + '<input type="submit" value="Login"></form></body></html>');
    }

    request.auth.session.set({id: "jack"});
    return reply.redirect('/cookie');
};


server.register(require('hapi-auth-cookie'), function (err) {

    server.auth.strategy('session', 'cookie', {
        password: 'password',
        cookie: 'sid-example',
        redirectTo: '/cookie',
        isSecure: false
    });
});

server.route(
    {
        method: ['GET', 'POST'],
        path: '/cookie',
        config: {
            handler: login2,
            auth: {
                mode: 'try',
                strategy: 'session'
            },
            plugins: {
                'hapi-auth-cookie': {
                    redirectTo: false
                }
            }
        }
    }
);
=======


var options = {
    opsInterval: 1000,
    reporters: [{
        reporter: require('good-console'),
        events: { log: '*', response: '*' }
    }]
};


server.register({
    register: require('good'),
    options: options
}, function (err) {

    if (err) {
        console.error(err);
    }
    else {
        server.start(function () {

            console.info('Server started at ' + server.info.uri);
        });
    }
});

>>>>>>> 613ac8fbfd2771133b435c8126d095754ad18e8d


// Start the server
server.start();



