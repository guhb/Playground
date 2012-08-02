var http = require("http");
var url = require("url");

function start(route, handle) {
	function onRequest(request, response) {
		//var postData = '';
		var pathname = url.parse(request.url).pathname;
		console.log("Request for %j recieved.", pathname);
		route(handle, pathname, response, request);

		/*request.setEncoding('utf8');
		request.addListener('data', function(postDataChunk) {
			postData += postDataChunk;
			console.log("Recieved POST data chunk %j.", postDataChunk);
		})

		request.addListener('end', function() {
			route(handle, pathname, response, request);
		})*/
		//route(handle, pathname, response);

		//console.log("Page requested.");
	}

	http.createServer(onRequest).listen(8888);

	console.log("Server has started.");
}

exports.start = start;