var fs = require('fs');
var Mongo = require("./mongo.js");
var Hasher = require("./hasher.js");
var Validator = require("./validator.js");

//used in viewing
// function resultsToOrderedReplyString(results){
//   results.sort(function(a,b){return a.time-b.time;});
//   console.log(results);
//   for (var i=0; i<results.length;i++){
//     replyString += '<img width="100px" height="100px" src = "/pics/' + results[i]._id + '">';
//   }
//   reply(replyString);
// }

module.exports = [
  // sign up and login form on landing
  {
    path: '/',
    method: 'GET',
    handler: function(request, reply){
      reply.file('landing.html');
    }
  },
  // upload page
  {
    path: '/up',
    method: 'GET',
    handler: function(request, reply){
      reply.file('upload.html');
    }
  },
  // /usersignin path required by login form
  {
    path: '/usersignin',
    method: 'POST',
    handler: function (request, reply){
        // public or private, user, comment, time
      var password=request.payload.password;
      var email=request.payload.email;
      Validator.login(email,password,function(isMatch){ //can change callback and validator to pass back more info like user id..
        console.log(isMatch);
      });
    }
  },
  // /upload path required by upload form
  {
    path: '/upload',
    method: 'POST',
    handler: function (request, reply){
      // public or private, user, comment, time
      console.log(request.payload);
      var insertObj=request.payload;
      insertObj.time=new Date().getTime();
      Mongo.insert([insertObj],'pictures'); //insert accepts an array of objects so must put teh single object in an array, could put a validator here to check if of right form for the 'pictures collection'
      },
  },
  // /createuser path required from createuser form
  {
    path: '/createuser',
    method: 'POST',
    handler: function (request, reply){
        var insertObj = request.payload;
        insertObj.validated = true; //for now! create with false and use an email to send a link to click to validate
        Validator.signUp(insertObj,function(err){
          if(err){console.log(err);}
          else {
            var password=insertObj.password1; //this code extracts the password and deletes and sets (un)necessary properties respectively
            insertObj.email=insertObj.email1;
            insertObj.signUpTime=new Date().getTime();
            delete insertObj.email1;
            delete insertObj.email2;
            delete insertObj.password1;
            delete insertObj.password2;
            Hasher.create(password,insertObj,function(err,objWithPass){
              if(err){console.log(err);}
              Mongo.insert([objWithPass],'users');
            });
          }
        });
      }  //check user exists already
  },
  // /pics/{picid} path required by /view/{picKey}/{picVal} request
  {
    path: '/pics/{picid}',
    method: 'GET',
    handler: function(request, reply){
      var queryObj={_id : Mongo.ObjectID(request.params.picid)};
      var projection={picBuffer:true,_id:false};
      Mongo.read(queryObj,projection,'pictures',function(results){
        console.log(results);
        var pic=results[0].picBuffer.buffer;
        reply(pic);
      });
    }
  },
  // /view/{picKey}/{picVal} path required by read keyvalue form
  {
    path: '/view/{picKey}/{picVal}',
    method: 'GET',
    handler: function(request, reply){
      var replyString="";
      var queryObj={};
      queryObj[request.params.picKey]=request.params.picVal;
      var projection={picBuffer:false};
      Mongo.read(queryObj,projection,'pictures',function (results){
        console.log(results);
        for (var i=0; i<results.length;i++){
          replyString += '<img width="100px" height="100px" src = "/pics/' + results[i]._id + '">';
        }
        reply(replyString);
      });
    }
  },
  // //recent/{numhours} path required by read time form
  {
    path: '/recent/{numhours}',
    method: 'GET',
    handler: function(request, reply){
      var replyString="";
      var past=new Date().getTime()-request.params.numhours*60*60*1000;
      var queryObj={time:{$gt:past}};
      var projection={picBuffer:false};
      Mongo.read(queryObj,projection,'pictures',function (results){
        console.log(results);
        for (var i=0; i<results.length;i++){
          replyString += '<img width="100px" height="100px" src = "/pics/' + results[i]._id + '">';
        }
        reply(replyString);
      });
    }
  },
  // src files
  {
    method: 'GET',
    path: '/src/{filename}',
    handler: function(request,reply){
       reply.file("./src/"+request.params.filename);
    }
  },
  // generic goes to search photos page (must be changed when we decide on how to work things along with lots of stuff above)
  {
    path: '/{whatever}',
    method: 'GET',
    handler: function(request, reply){
      reply.file('./src/index.html');
    }
  },
];
