var fs = require('fs');
var mongo = require("./mongo.js");



mongo.read({title:'wqdqwdqwd'},'pictures',function(results){
    console.log(results);
});
