var Bcrypt = require('bcrypt');
    SALT_WORK_FACTOR =10;

    //hash function for working with bcrypt functions
    var hasher = {
        //function for creating bcrypt hashes, passed from routes
    	create: function (password, obj, cb){
        var result;
        //console.log(password);
        //Create random salt for each hash
        Bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
          if (err){}
          //console.log(salt);
          //Creates hash from password passed to function using randomly generated salt
          Bcrypt.hash(password,salt,function(err,hash){
            if(err){}
            obj.passHash = hash;
            //console.log(obj.PassHash);
            return cb(undefined, obj);
          });
        });
    	},
        //This function takes in a hash taken from the database and compares it to a potential password
        compare: function (dbhash, password, cb){
          //Compare uses the password and the salt data from the hash and creates a hash from the password, if the two hashes match then it returns true
          Bcrypt.compare(password, dbhash, function(err, isMatch) {
            console.log(password);
            console.log(dbhash);
            if (err) return cb(err);
            cb(null, isMatch);
          });
    	},
    };

    module.exports = hasher;
