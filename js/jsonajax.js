


var httpRequest;
document.getElementById('btn').addEventListener("click", button_click_event)
function button_click_event(){
	makeRequest("https://stmarple.github.io/schools.json");
};

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

		alert(httpRequest.status)

		if (httpRequest.status === 200){
			alert(httpRequest.responseText);

			responseObject = JSON.parse(httpRequest.responseText);

			var attrlist = ['name', 'major','degree type','year completed']
			var tbl = document.getElementById('tbl');
			var th = '';

			for (var i = 0; i < attrlist.length; i++) {
				th += '<th>' + attrlist[i] + '</th>'
			}

			var tr = document.createElement("tr");
			tr.innerHTML = th;
			tbl.appendChild(tr);

			var newContent = '';
			for (var i = 0; i < responseObject.degrees.length; i++) {
			//	newContent +=   '<div class="event"><p>' + responseObject.degrees[i].name + '</p></div>'
				
				var tr = document.createElement("tr");
				var td = '';

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

