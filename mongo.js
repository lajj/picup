var Mongodb=require('mongodb'),
		MongoClient = Mongodb.MongoClient,
		url = 'mongodb://localhost:27017/picup';

function removeDocument (name,db,folder,callback) {
	var collection = db.collection(folder);
	collection.remove(name, function(err, result) {
		assert.equal(err, null);
		console.log("result is" + result);
		callback(result);
	});
}


var mongo = {

	ObjectID: Mongodb.ObjectID,
	// data an array of objects, callback what you want to do with the array of data, not necessary
	insert: function (data,folder,callback){
		MongoClient.connect(url, function(err, db) {
			console.log("Connected correctly to server");
			var collection = db.collection(folder);
			collection.insert(data, function(err, result) {
			console.log("Inserted " + data.length + " document(s) into the document collection");
			db.close();
			});
		});
		callback(data);
	},


	read: function (query,folder,callback){
		MongoClient.connect(url, function(err, db) {
			console.log("Connected correctly to server");
			var collection = db.collection(folder);
			collection.find(query).toArray(function(err, docs) {
				console.log("Found the following records");
				db.close();
				callback(docs);
			});
		});
	},


  deleter: function (name,collection,callback){
  	MongoClient.connect(url, function(err, db) {
  	  assert.equal(null, err);
  	  console.log("Connected correctly to server");
  	  removeDocument(name,db,collection,function(data) {
          db.close();
          callback(data);
        });
  	});
  }
};

module.exports = mongo;
