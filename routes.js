var fs = require('fs');
var Mongo = require("./mongo.js");

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
      ongo.insert([{title:request.payload.title,picBuffer:request.payload.upload}],'pictures',function(){
          console.log('hi');
      });
      },
  },
  {
    path: '/pics/{picid}',
    method: 'GET',
    handler: function(request, reply){
      console.log(request.params.picid);
      Mongo.read({_id : Mongo.ObjectID(request.params.picid)},'pictures',function(results){
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
      Mongo.read(queryObj,'pictures',function(results){
        console.log(results);
        for (var i=0; i<results.length;i++){
          replyString += '<img width="100px" height="100px" src = "/pics/' + results[i]['_id'] + '">';
        }
        reply(replyString);

      });
  }
}

];
