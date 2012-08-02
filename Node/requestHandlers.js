var qeurystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

//var exec = require("child_process").exec;

function start(response, request) {
	console.log("Requst handler 'start' was called.");

	/*exec("ls -lah", function(error, stdout, stderr) {
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write(stdout);
		response.end();
	});*/

    /*var body = '<html>' +
               '<head>' +
               '<meta http-equiv="Content-Type" content="text/html;' +
               '<charset=UTF-8 />' +
               '</head>' +
               '<body>' +
               '<form action="/upload" enctype="multipart/form-data"' +
               'method="post">' +
               //'<textarea name="text" rows="20" cols="60"></textarea>' +
               '<input type="file" name="upload" multiple="multiple">' +
               '<input type="submit" value="Upload file" />' +
               '</form>' +
               '</body>' +
               '</html>';*/

       var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

     response.writeHead(200, {"Content-Type": "text/html"});
     response.write(body);
     response.end();
}

function upload(response, request) {
	console.log("Requst handler 'upload' was called");

	var form = new formidable.IncomingForm();
	console.log("about to response");
	form.parse(request, function(error, fields, files) {
		console.log("parsing done.");

		/* Possible error on Windows systems:
		   tried to rename to an already existing file */
		fs.rename(files.upload.path, "./tmp/test.png", function(err) {
			if (err) {
				fs.unlink("./tmp/test.png");
				fs.rename(files.upload.path, "./tmp/test.png");
			}
		});
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("recieved image:<br/>");
		response.write("<img src='/show' />");
		response.end();
	});
}

function show(response, request) {
	console.log("Requst handler 'show' was called.");
	fs.readFile("./tmp/test.png", "binary", function(error, file) {
		if (error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "image/png"});
			response.write(file, "binary");
			response.end();
		}
	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;