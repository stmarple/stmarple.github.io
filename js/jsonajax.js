

(
	function()
	{
		var httpRequest;
		document.getElementById("btn").onclick = function() 
		{
		makeRequest("https://github.com/stmarple/stmarple.github.io/schools.json");
		};

		function makeRequest(url) {
			httpRequest = new XMLHttpRequest();  // Create XMLHttpRequest object

			if (!httpRequest) {
				alert('Exiting : Cannot create an XMLHTTP Instance');
				return false;
			}
			httpRequest.onreadystatechange = alertContents;
			alert(url);
			httpRequest.open('GET', url, true);
			httpRequest.send(null);
		};
		function alertContents(){
			alert()
			if (httpRequest.status === 200){
				alert(httpRequest.responseText);
				responseObject = JSON.parse(httpRequest.responseText);

				var newContent = '';
				for (var i = 0; i < responseObject.degrees.length; i++) {
					newContent =   `<div class="event">;
									<p> responseObject.degrees[i].name </p>
									</div>
									`
					}
			}
			else{
				alert('There was a problem with the request.');
			}
			document.getElementById('content').innerHTML = newContent;
		}
	}
)();


document.getElementById('btn').addEventListener("click", button_click_event)
function button_click_event(){
	document.getElementById('demo').innerHTML = ""
}

