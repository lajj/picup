var Bcrypt = require('bcrypt');
    SALT_WORK_FACTOR =10;


    var hasher = {

    	create: function (password, obj, cb){
        var result;
        console.log(password);
        Bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
          if (err){}
          console.log(salt);
          Bcrypt.hash(password,salt,function(err,hash){
            if(err){}
            obj.passHash = hash;
            console.log(obj.PassHash);
            return cb(undefined, obj);
          });
        });
    	},
      compare: function (dbhash, password, cb){
        Bcrypt.compare(password, dbhash, function(err, isMatch) {
          console.log(password);
          console.log(dbhash);
          if (err) return cb(err);
          cb(null, isMatch);
        });
    	},
    };

    module.exports = hasher;
