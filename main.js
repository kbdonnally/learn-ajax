(function() {
	var btn,
		item,
		httpRequest;

	btn = document.querySelector('.ajax-btn');
	item = document.querySelector('.item');
	

	btn.addEventListener('click', makeRequest);

	

	function makeRequest() {
		httpRequest = new XMLHttpRequest();
		console.log('test');

		var url = 'http://takeback.scholarslab.org/api/items/' + item.getAttribute('data-id');
		console.log(url);
		
		httpRequest.onreadystatechange = populateItem;
		httpRequest.open('GET', url, true);
		httpRequest.send();
	}

	function populateItem() {
		if (httpRequest.readyState === XMLHttpRequest.DONE) {
			if (httpRequest.status === 200) {
				var response = JSON.parse(httpRequest.responseText);

				// fetch title
				for (var i=0; i < response.element_texts.length; i++) {
					if (response.element_texts[i].element.name === "Title") {
						var title = response.element_texts[i].text;
					}
				}

				// fetch image
				var files = response.files.url;
				console.log(files);

				var requestTwo = new XMLHttpRequest();
				requestTwo.onreadystatechange = myFunction;

				function myFunction() {
					if (requestTwo.readyState === XMLHttpRequest.DONE) {
						if (requestTwo.status === 200) {
							var responseTwo = JSON.parse(requestTwo.responseText);
							var use = responseTwo[0];
							var img = use.file_urls.fullsize;
							item.innerHTML = `<img src="${img}"><br/><div>${title}</div>`;
						} else {
							alert('There was an error in processing your request.');
						}
					}
				};
				requestTwo.open('GET', files, true);
				requestTwo.send();


			} else {
				alert('There was an error in processing your request.');
			}
		}
	}
})();