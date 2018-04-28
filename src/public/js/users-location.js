function main() {
	const submitButton = document.querySelector("#submitLocation");
	submitButton.onclick = submitButtonClick;

	function submitButtonClick(event) {
		event.preventDefault();

		const location = document.querySelector('#location').value;
		const comments = document.querySelector('#comments').value;	

		const req = new XMLHttpRequest;			

		let newLocation = 'location=' + location + '&comments=' + comments;

		req.open('POST', '/users/location');
		req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		
		req.addEventListener('load', function() {	
			const locations = JSON.parse(req.responseText);

			if(req.status >= 200 && req.status < 300) {
	            document.querySelector('#location').value = "";
	            document.querySelector('#comments').value = "";

	            let tr, td, textNode;

                tr = document.createElement('tr');
                td = document.createElement('td');
                
                textNode = document.createTextNode(locations.userName);
                td.appendChild(textNode);
                tr.appendChild(td);

                td = document.createElement('td');
                textNode = document.createTextNode(locations.location);
                td.appendChild(textNode);
                tr.appendChild(td);

                td = document.createElement('td');
                textNode = document.createTextNode(locations.comments);
                td.appendChild(textNode);
                tr.appendChild(td);

                td = document.createElement('td');
                textNode = document.createTextNode(locations.restaurantName);
                td.appendChild(textNode);
                tr.appendChild(td);

                document.getElementsByTagName('tbody')[0].appendChild(tr);
			}
		});

		req.addEventListener('error', function() {
			console.log(req.status, "ERROR");
		});

		req.send(newLocation);
	}
}
document.addEventListener("DOMContentLoaded", main);