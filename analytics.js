var fs = require('fs');

var analytics = {

	readRequireLog: function (object, callback){	
		var obj=[];
		var counter = {};
		var returnString = '<h1>Site call counter</h1>';
		fs.readFile(__dirname +'/src/log/response_log', 'utf8', function (err, data) {//derp-fault: switched arguments -> wasted 3,5h
	  		if (err) throw err;

	  		obj = data.split(/\r?\n/);
			for(var i=0;i<obj.length;i++){
				var thing = obj[i];
				if (thing){
				    try{
				        var a=JSON.parse(thing);
				    }catch(e){
				        alert(e); //always use try / catch for JSON.parse!!!!!!!!!!!!!!!!!
				    }
				}
				if (!counter[a.path]){
					counter[a.path] = 1 ;
				}
				else {
					counter[a.path]++;
				}
			}
			for(var key in counter){
				if (counter.hasOwnProperty(key)){
					returnString += '<p><strong>www.picup.com' + key + '</strong> has been accessed <i>'+ counter[key] +'</i> times.</p>';
				}
			}
			callback(returnString,null);
		});
	},

};
module.exports = analytics;