var http = require('http');
var fs = require('fs');

/* Standard 404 response on failure */
function send404Response(response) {
	response.writeHead(404, {"Context-Type": "text/plain"});
	response.write("Error 404: Page not found!");
	response.end();
}

/* Main function to handle user requests */
function onRequest(request, response) {

	if (request.method == 'GET' && request.url == '/') {
		response.writeHead(200, {"Context-Type": "text/html"});
		fs.createReadStream("../html/index.html").pipe(response);
	}  else if (request.method == 'GET' && request.url == '/css/style.css') {
		response.writeHead(200, {"Context-Type": "text/html"});
		fs.createReadStream("../css/style.css").pipe(response);
	} else if (request.method == 'GET' && request.url == '/js/destinations.json') {
		response.writeHead(200, {"Context-Type": "application/json"});
		fs.createReadStream("./destinations.json").pipe(response);
	}
}

http.createServer(onRequest).listen(8888);