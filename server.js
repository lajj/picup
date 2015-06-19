var Hapi = require('hapi');
var HapiAuthCookie = require('hapi-auth-cookie');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

server.state('data', {
    ttl: null,
    isSecure: true,
    isHttpOnly: true,
    encoding: 'base64json',
    clearInvalid: false, // remove invalid cookies
    strictHeader: true // don't allow violations of RFC 6265
});

server.register(HapiAuthCookie, function (err) {
    console.log(server.app.cache);
    server.auth.strategy('session','cookie',  {
        password: 'random string to act as hash',
        cookie: 'sid-example',
        redirectTo: '/',
        isSecure: false,
    });

});
    // Add the routes
    server.route(require('./routes'));

    // Start the server
    server.start(function(){console.log('Server started at %s', server.info.uri);});
