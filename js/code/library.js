module.exports = {
	ready : function(callback) {
		// in case the document is already rendered
		if (document.readyState!='loading') 
			callback();
		// modern browsers
		else if (document.addEventListener) 
			document.addEventListener('DOMContentLoaded', callback);
		// IE <= 8
		else document.attachEvent('onreadystatechange', function(){
			if (document.readyState=='complete') callback();
		});
	},

	loadScript : function(src,callback) {
		// create script tag and append to the end of body
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = src;
		var body = document.getElementByTagName("body")[0];
		body.appendChild(script);
	
		if (script.readyState) { // internet explorer 
			script.onreadystatechange = function() {
				if (script.readyState == "loaded" || script.readyState == "complete") {
					script.onreadystatechange = null;
					callback();
				}
			}
		} else { // other browsers 
			script.onload = function() {
				callback();
			}
		}
	}, 

	get : function(url, callback) {
		var request = new XMLHttpRequest();
		request.open('GET', url, true);
	
		request.onload = function() {
		  if (request.status >= 200 && request.status < 400) {
			// Success!
			var data = request.responseText;
			callback(data);
		  } else {
			// We reached our target server, but it returned an error
		  }
		};
	
		request.onerror = function() {
		  // There was a connection error of some sort
		};
		request.send();
	}, 

	/* get json with promise - return json object */
	getJsonWithFetch : function(url, callback) {
		fetch(url)
			.then(
				function(response) {
				if (response.status !== 200) {
					console.log('Looks like there was a problem. Status Code: ' +
					response.status);
					return;
				}

				// Examine the text in the response
				response.json().then(function(data) {
					callback(data);
				});
				}
			)
			.catch(function(err) {
				console.log('Fetch Error :-S', err);
			});
	},

	getScript : function(source, callback) {
		var script = document.createElement('script');
		var prior = document.getElementsByTagName('script')[0];
		script.async = 1;
	
		script.onload = script.onreadystatechange = function( _, isAbort ) {
			if(isAbort || !script.readyState || /loaded|complete/.test(script.readyState) ) {
				script.onload = script.onreadystatechange = null;
				script = undefined;
	
				if(!isAbort) { if(callback) callback(); }
			}
		};
	
		script.src = source;
		prior.parentNode.insertBefore(script, prior);
	}, 

	sendJson : function(jsonObj, url, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				var json = JSON.parse(xhr.responseText);
				callback(json);
			}
		};
		var data = JSON.stringify(jsonObj);
		xhr.send(data);
	},
	
	/* Equivalents of jquery dom manipulation functions. */

	changeHtml : function(element,data) {
		element.innerHTML = data;
	}, 


	addClassToOne : function(element,className) {
		if (element.classList) {
			element.classList.add(className);
		} else {
			element.className += ' ' + className;
		}
		return element;
	}, 

	addClass : function(element, className) {
		var result;
		var len = element.length;
		if (element.length == undefined) { // one element
			result = this.addClassToOne(element,className)
		} else { // htmlCollection
			var elements = []
			for (var i = 0; i < len; i++) {
				elements.push(this.addClassToOne(element[i],className));
			}
			result = elements;
		}
		return result;
	}, 


	removeClass : function(element,className) {
		var result;
		if (className == undefined){
			element.className = '';
			return element;
		}
		var len = element.length;
		if (element.length == undefined) {
			result = removeClassFromOne(element,className);
		} else {
			var elements = []
			for (var i = 0; i < len; i++) {
				elements.push(removeClassFromOne(element[i],className));
			}
			result = elements;
		}
	
		return result;
	}, 

	removeClassFromOne : function(element,className) {
		if (element.classList) {
			element.classList.remove(className);
		}
		return element;	
	}, 
	
	hasClass : function(element,className) {
		if (element.classList) {
			return element.classList.contains(className)
		} else {
			return false;
		}
	}, 

	filter : function(selector,filterFn) {
		Array.prototype.filter.call(document.querySelectorAll(selector), filterFn);
	}, 
	
	/* className, parent - optional */
	createElementWithClass : function(tagName,className,parent) {
		// console.log(className);
		var element = document.createElement(tagName);
		if (className != undefined) {
			addClass(element,className);
		}
		if (parent != undefined) {
			document.getElementById(parent).appendChild(element);
		}
		return element;
	}, 
	/* data - html as string */
	append : function(element, data) {
		var child = document.createElement("div");
		child.innerHTML = data;
		while (child.firstChild) {
			element.appendChild(child.firstChild);
		}
	}, 
	/* convert string to dom element and wrap in container div */
	filter : function(text) {
		var div = document.createElement("div");
		div.insertAdjacentHTML("afterbegin", text);
		return div;
	}, 
	constructTemplate : function(templates, templateId) {
		var template = templates.querySelector("#" + templateId).innerHTML;
		return template;
	}
}