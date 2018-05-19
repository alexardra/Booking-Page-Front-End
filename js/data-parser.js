/* Asynchronous request to retrieve main page data from server */

// var requestURL = '../js/destinations.json';

// var request = new XMLHttpRequest();
// request.open('GET', requestURL);
// request.responseType = 'text';
// request.send();

// request.onload = function() {
// 	console.log("request done");
//	var data = JSON.parse(request.response);
// }

/* JSON object - on server would be stored as json
 * file(destinations.json) and retrieved with above code */
data = {
	"sections": [
		{
			"header": "Top beaches around the world",
			"overviews": [
				{
					"name": "Punta Cana",
					"image_name": "punta-cana.jpg"
				},
				{
					"name": "Playa del Carmen",
					"image_name": "playa-del-carmen.jpg"
				},
				{
					"name": "Bavaro",
					"image_name": "bavaro.jpg"
				},
				{
					"name": "Cancun",
					"image_name": "cancun.jpg"
				}
			] 
		},
		{
			"header": "Popular Destinations",
			"overviews": [
				{
					"name": "Sharm El Sheikh",
					"image_name": "sharm-el-sheikh.jpg"
				},
				{
					"name": "Belek",
					"image_name": "belek.jpg"
				},
				{
					"name": "Berlin",
					"image_name": "berlin.jpg"
				},
				{
					"name": "Milan",
					"image_name": "milan.jpg"
				}
			] 
		},
		{
			"header": "Most Romantic Destinations",
			"overviews": [
				{
					"name": "Paris",
					"image_name": "paris.jpg"
				},
				{
					"name": "Puerto Vallarta",
					"image_name": "puerto-vallarta.jpg"
				},
				{
					"name": "Venice",
					"image_name": "venice.jpg"
				},
				{
					"name": "Palm-Eagle Beach",
					"image_name": "palm-eagle-beach.jpg"
				}
			] 
		},
		{
			"header": "Cities with ancient history",
			"overviews": [
				{
					"name": "Punta Cana",
					"image_name": "punta-cana.jpg"
				},
				{
					"name": "Playa del Carmen",
					"image_name": "playa-del-carmen.jpg"
				},
				{
					"name": "Bavaro",
					"image_name": "bavaro.jpg"
				},
				{
					"name": "Cancun",
					"image_name": "cancun.jpg"
				}
			] 
		},
		{
			"header": "Best places to hear bluegrass",
			"overviews": [
				{
					"name": "Punta Cana",
					"image_name": "punta-cana.jpg"
				},
				{
					"name": "Playa del Carmen",
					"image_name": "playa-del-carmen.jpg"
				},
				{
					"name": "Bavaro",
					"image_name": "bavaro.jpg"
				},
				{
					"name": "Cancun",
					"image_name": "cancun.jpg"
				}
			] 
		},
		{
			"header": "Top cities for music lovers",
			"overviews": [
				{
					"name": "Punta Cana",
					"image_name": "punta-cana.jpg"
				},
				{
					"name": "Playa del Carmen",
					"image_name": "playa-del-carmen.jpg"
				},
				{
					"name": "Bavaro",
					"image_name": "bavaro.jpg"
				},
				{
					"name": "Cancun",
					"image_name": "cancun.jpg"
				}
			] 
		}
	]
}


function generateSectionElement(element_details) {
	var section_element = document.createElement("ul");
	for (var i = 0; i < 4; i++) {
		var info = element_details[i];
		var li = document.createElement("li");
		var info_container = document.createElement("div");
		info_container.className = "section_element";
		var text_container = document.createElement("span");
		text_container.textContent = info["name"];
		info_container.appendChild(text_container);
		li.appendChild(info_container);
		section_element.appendChild(li);
	}

	return section_element;
}

function generateSectionHeader(title) {
	var browse_header = document.createElement("div");
	browse_header.className = "browse_header";
	var header = document.createElement("h3");
	header.textContent = title;
	browse_header.appendChild(header);
	var see_all = document.createElement("button");
	see_all.textContent = "See All";
	browse_header.appendChild(see_all);

	return browse_header;	
}

function generateSection(section_data,parent_section) {
	var browse_section = document.createElement("div");
	browse_section.className = "browse_section";

	var browse_header = generateSectionHeader(section_data["header"]);
	browse_section.appendChild(browse_header);

	var overviews = section_data["overviews"];
	var section_element = generateSectionElement(overviews);
	browse_section.appendChild(section_element); 

	parent_section.appendChild(browse_section);
}

function parseAndDisplay(data_object) {
	var parent_section = document.querySelector('#browse');
	console.log(data_object['sections'].length);
	var sections = data_object["sections"];
	for (var i = 0; i < sections.length; i++) {
		generateSection(sections[i],parent_section);
	}
}

parseAndDisplay(data);