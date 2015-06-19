var Hapi = require('hapi');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

// Add the routes
server.route(require('./routes'));



var options = {
    opsInterval: 1000,
    reporters: [{
        reporter: require('good-file'),
        events: { response: '*'},
        config: './src/log/response_log'

    },
    {
        reporter: require('good-file'),
        events: { ops: '*' },
        config: './src/log/ops_log'

    },
    {
        reporter: require('good-file'),
        events: { request: '*' },
        config: './src/log/request_log'

    },
    {
        reporter: require('good-file'),
        events: { log: '*'},
        config: './src/log/log_log'

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



// Start the server
server.start();



