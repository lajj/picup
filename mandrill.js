var mandrill = require("mandrill-api/mandrill");
var mandrill_client = new mandrill.Mandrill(process.env.SECRET);  

var email = {}; 

email.sendEmail = function (email) {
	var data = {


	      	'from_email': 'abdicagaros@gmail.com',
	      	'to': [
	          {
	            'email': email,
	            'name': 'Abdi',
	            'type': 'to'
	          }
	        ],
		      'autotext': 'true',
		      'subject': 'Thanks for signing up',
		      'html': 'YOu have now signed up to <h1>ranstagram</h1> app'
	};
	mandrill_client.messages.send({"message": data, "async": false},function(result) {
		console.log(result);
	}, function(e) {
		console.log("Error " + e.message);
	});
}

module.exports = email; 


