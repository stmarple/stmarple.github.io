


var httpRequest;

// event handler for button, 'btn'
document.getElementById('btn').addEventListener("click", button_click_event)
function button_click_event(){
	makeRequest("https://stmarple.github.io/schools.json");
};

// Code to create a request to get JSON information on github accout
function makeRequest(url) {
	httpRequest = new XMLHttpRequest();  // Create XMLHttpRequest object

	if (!httpRequest) {
		alert('Exiting : Cannot create an XMLHTTP Instance');
		return false;
	}
	httpRequest.onreadystatechange = alertContents;
	httpRequest.open('GET', url, true);
	httpRequest.send();
};
function alertContents(){
	if(httpRequest.readyState == XMLHttpRequest.DONE) { 
		if (httpRequest.status === 200){
			//alert(httpRequest.responseText);                       // alert the JSON text

			responseObject = JSON.parse(httpRequest.responseText); 

			// Create resulting table
			// attribute list includes all column headers, which are attributes in JSON file

			var attrlist = ['name', 'major','degree type','year completed'] 
			var tbl = document.getElementById('tbl');
			var th = '';                               // initialize table header

			// Create table headers by looping through the attribute list
			for (var i = 0; i < attrlist.length; i++) {
				th += '<th>' + attrlist[i] + '</th>'  
			}

			// Create table rows
			var tr = document.createElement("tr");
			tr.innerHTML = th;
			tbl.appendChild(tr);

			var newContent = '';  // initialize variable
			for (var i = 0; i < responseObject.degrees.length; i++) {
				var tr = document.createElement("tr");  // reassign var tr for every loop pass
				var td = '';                            // (re)initialize table data variable

				// for each degree, add table data for all of its attributes
				for (var j = 0; j < attrlist.length; j++) {
					td += '<td>' + responseObject.degrees[i][attrlist[j]] + '</td>'
				}
				tr.innerHTML = td;
				tbl.appendChild(tr);
			}
		}
		else{
			alert('There was a problem with the request.');
		}
		document.getElementById('content').innerHTML = newContent;
	}
}

