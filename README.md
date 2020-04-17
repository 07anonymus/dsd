Abs-Share
========================

This application is created by Abisai for learning about `http requests`  with `XMLHttpRequest` for **handle uploads progress**, cuz I don't know if `fetch` has this feature using PHP on server side.

Another problem I had when I wanted upload multiple files was `XMLHttpRequest` don't handle every one and by defaul it only will process one of all requests, using the same `input HTML`,  so I kept working on a solution for a few hours and I had one idea that I think is great, and it's a trivial trick, do I decided to share this `multiple files upload` **trick** cuz I was searching on google about this topic but, they used multiple `input HTML`, and I didn't want to do this.

Actually I am **not** using any database like `mysql`, but I could add this later.



I will list the features I guess is relevant for this app and me ovbiously :)


### Features
* Front-end
	* `XMLHttpRequest`
		* Multiple files upload
		* Handle progress upload
	* `Blobs`
		* Read mulimedia response like blob at home page
	* `Files type`
		* Group by type all uploaded files
* Back-end
	* `File System`
		* Groups files by its type
		* Set to every file one ID
	* `HTTP Request`
		* Set Headers
			* `Accept Ranges`
			* `Content-Type`
			* `Content-Length`
		* Send response in litle parts if file is big
	*  `Secure directories`
		*  Access to uploaded files folder only from `XMLHttpRequest` requests
		*  Encrypted url to files uploaded


### Security
One of the features I expect of this app is security.

* Not download files from any part of this app, except in **downloads** page
* Encrypted URL to files
* Secure Video player 
* Allow access only with credentials...


## Author
This proyect was developed by [Abisai Ramos](https://www.facebook.com/07anonymus) for learning aim.
