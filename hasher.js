var Bcrypt = require('bcrypt');
    SALT_WORK_FACTOR =10;

var hasher = {
	create: function (password, obj, cb){
    var result;
    Bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
      if (err){}
      Bcrypt.hash(password,salt,function(err,hash){
        if(err){}//do something?
        obj.passHash = hash;
        return cb(undefined, obj);
      });
    });
	},
  compare: function (dbhash, password, cb){
    Bcrypt.compare(password, dbhash, function(err, isMatch) {
      if (err) {return cb(err);}
      else {cb(null, isMatch);}
    });
	},
};

module.exports = hasher;
