var fs = require('fs');
var Mongo = require("./mongo.js");
var Hasher = require("./hasher.js");

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
  // upload page
  {
    path: '/',
    method: 'GET',
    handler: function(request, reply){
      reply.file('upload.html');
    }
  },
  // sign up page
  {
    path: '/signup',
    method: 'GET',
    handler: function(request, reply){
      reply.file('create.html');
    }
  },
  // login page
  {
    path: '/login',
    method: 'GET',
    handler: function(request, reply){
      reply.file('login.html');
    }
  },
  // /usersignin path required by login form
  {
    path: '/usersignin',
    method: 'POST',
    handler: function (request, reply){
      // public or private, user, comment, time
    var password=request.payload.password;
    var user=request.payload.email;
    Mongo.read({email:user},{passHash:true,_id:false},'users',function(results){
      var actualHash=results[0].passHash;
      Hasher.compare(actualHash,password,function (err, isMatch){
        if (isMatch){
          console.log('Yippee the hashes match');
        } else {
          console.log('hashes do not match');
        }
      });
    });

    //  if true(console.log(true)) // build onto console that sends and authorisation cookie
      console.log(user,password);
    }
  },
  // /upload path required by upload form
  {
    path: '/upload',
    method: 'POST',
    handler: function (request, reply){
      // public or private, user, comment, time
      var insertObj={
        title:request.payload.title,
        picBuffer:request.payload.upload,
        time:new Date().getTime(),
        public:request.payload.public,
        comment:request.payload.comment
      };
      Mongo.insert([insertObj],'pictures'); //insert accepts an array of objects so must put teh single object in an array, could put a validator here to check if of right form for the 'pictures collection'
      },
  },
  // /createuser path required from createuser form
  {
    path: '/createuser',
    method: 'POST',
    handler: function (request, reply){
      if (request.payload.email1!==request.payload.email2 ){
        reply("Check your emails match");
        return;
      } else if (request.payload.password1!==request.payload.password2 ){
        reply("Check your passwords match");
        return;
      } else {

        var insertObj = {
          email:request.payload.email1,
          username:request.payload.username,
          signUpTime:new Date().getTime(),
          first:request.payload.firstname,
          last:request.payload.lastname,
        };

        Hasher.create(request.payload.password1, insertObj, function (err, objWithPass){
          if(err) {console.log(err);}
          Mongo.insert([objWithPass],'users');
        });
      }
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
        // results.sort(function(a,b){return b.time-a.time;});
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
        // results.sort(function(a,b){return b.time-a.time;});
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
