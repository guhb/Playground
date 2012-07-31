function route(handle, pathname, response) {
	console.log("About to route a request for %j .", pathname);
	if (typeof handle[pathname] === 'function') {
		handle[pathname](response);
	} else {
		console.log("No request handler found for %j.", pathname);
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.write("404 Not found");
		response.end();
	}
}

exports.route = route;