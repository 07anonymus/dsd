const xhr = new XMLHttpRequest();


xhr.open('POST', './download/?file_code=421578273849727925939437213');
xhr.responseType = "blob";

xhr.onloadend = function (res) {
	const response = res.target.response;
	console.log(res.target);
	if (response.type.indexOf('image') != -1) {
		const tmpUrl = URL.createObjectURL(response);
		const imgTag = document.getElementById('img');
		imgTag.src = tmpUrl;
	} else {
		// console.log(response);
		const tmpUrl = URL.createObjectURL(response);
		console.log(tmpUrl);
	}
}

xhr.send();