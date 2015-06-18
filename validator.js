var Mongo = require("./mongo.js");
var Hasher = require("./hasher.js");

var app ={

  signUp: function(object,callback){
    if(!(object.email1 && object.email2 && object.username && object.password1 && object.password2)){callback("missing required field");}
    if(object.email1!==object.email2){return callback("emails not the same");}
    if(object.password1!==object.password2){return callback("passwords not the same");}
    if(object.password1.length<7){return callback("password less than 7 characters");}
    Mongo.read({email:object.email1},{signUpTime:true},'users',function(results){
      if (results.length!==0){return callback("Email taken");}
      else {
        Mongo.read({username:object.username},{signUpTime:true},'users',function(results){
          if (results.length!==0){return callback("username already taken");}
          else {return callback();}
        });
      }
    });
  },
  login: function(email,password,callback){
    Mongo.read({email:email},{validated:true,passHash:true,_id:false},'users',function(results){
      if (results.length===0){return callback(false);} //No matching emails
      if(!results[0].validated){return callback(false);} // Your email has nto been validated.
      else {
        Hasher.compare(results[0].passHash,password,function (err, isMatch){
          return callback(isMatch);
        });
      }
    });
  },


};

module.exports = app;
