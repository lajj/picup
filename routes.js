var fs = require('fs');
var Mongo = require("./mongo.js");

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
  {
    path: '/',
    method: 'GET',
    handler: function(request, reply){
      reply.file('upload.html');
    }
  },
  {
    path: '/upload',
    method: 'POST',
    handler: function (request, reply){
      // public or private, user, comment, time
      var insertObj={title:request.payload.title,picBuffer:request.payload.upload,time:new Date().getTime(),public:request.payload.public,comment:request.payload.comment};
      Mongo.insert([insertObj],'pictures');
      },
  },
  {
    path: '/pics/{picid}',
    method: 'GET',
    handler: function(request, reply){
      var queryObj={_id : Mongo.ObjectID(request.params.picid)};
      var projection={title:false,_id:false,time:false,public:false,comment:false};
      Mongo.read(queryObj,projection,'pictures',function(results){
        console.log(results);
        var pic=results[0].picBuffer.buffer;
        reply(pic);
      });
    }
  },
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
  {
    method: 'GET',
    path: '/src/{filename}',
    handler: function(request,reply){
       reply.file("./src/"+request.params.filename);
    }
  },
  {
    path: '/{whatever}',
    method: 'GET',
    handler: function(request, reply){
      reply.file('./src/index.html');
    }
  },
];
