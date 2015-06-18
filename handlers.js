var Mongo = require("./mongo.js");
var Hasher = require("./hasher.js");
var Validator = require("./validator.js");
var Email = require('./mandrill.js');

var handlers = {

  landing: function(request, reply){
    reply.file('landing.html');
  },
  up: function(request, reply){
    reply.file('upload.html');
  },
  usersignin: function (request, reply){
      // public or private, user, comment, time
    var password=request.payload.password;
    var email=request.payload.email;
    Validator.login(email,password,function(isMatch){ //can change callback and validator to pass back more info like user id..
      console.log(isMatch);
    });
  },
  upload: function (request, reply){
    // public or private, user, comment, time
    var insertObj=request.payload;
    insertObj.time=new Date().getTime();
    Mongo.insert([insertObj],'pictures', function(dataInserted){}); //insert accepts an array of objects so must put teh single object in an array, could put a validator here to check if of right form for the 'pictures collection'
  },
  createuser: function (request, reply){
      var insertObj = request.payload;
      insertObj.validated = false; //for now! create with false and use an email to send a link to click to validate
      Validator.signUp(insertObj,function(err){
        var password=insertObj.password1; //this code extracts the password and deletes and sets (un)necessary properties respectively
        if(err){console.log(err);}
        else {
          insertObj.email=insertObj.email1;
          insertObj.signUpTime=new Date().getTime();
          delete insertObj.email1;
          delete insertObj.email2;
          delete insertObj.password1;
          delete insertObj.password2;
          Hasher.create(password,insertObj,function(err,objWithPass){
            if(err){
              console.log(err);
            }
            Mongo.insert([objWithPass],'users', function(dataInserted){
              Email.sendEmail(dataInserted[0]);
              reply.file('pleaseValidate.html')
            });

          });
        }
      }); //check user exists already
  },
  getpic: function (request, reply){
    var queryObj={_id : Mongo.ObjectID(request.params.picid)};
    var projection={picBuffer:true,_id:false};
    Mongo.read(queryObj,projection,'pictures',function(results){
      var pic=results[0].picBuffer.buffer;
      reply(pic);
    });
  },
  keyvaluesearch: function(request, reply){
    var replyString="";
    var queryObj={};
    var projection={picBuffer:false};
    queryObj[request.params.picKey]=request.params.picVal;
    Mongo.read(queryObj,projection,'pictures',function (results){
      console.log(results);
      for (var i=0; i<results.length;i++){
        replyString += '<img width="100px" height="100px" src = "/pics/' + results[i]._id + '">';
      }
      reply(replyString);
    });
  },
  recentsearch: function(request, reply){
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
  },
  getsrcfile: function(request,reply){
     reply.file("./src/"+request.params.filename);
  },
  whatever: function(request, reply){
    reply.file('./src/index.html');
  },
  emailvalidate: function(request, reply){
    var query = {
      _id: Mongo.ObjectID(request.params.id)
    }
    console.log(query);
    Mongo.update(query,{validated:true},"users",function(){
      reply("<h1>Congrats</h1>");
    });
  }
};


module.exports=handlers;
