//XMLHttpRequest = built in class for back-end. generate an object using this class

const xhr = new XMLHttpRequest(); //new http message! (request)


xhr.addEventListener('load', () => {
	console.log(xhr.response);
}); //response has loaded!, get response.

xhr.open('GET', 'https://supersimplebackend.dev/'); 
xhr.send();

//

//if a response returns a code 4XX, then it failed due to our code, 5XX fails due to backends code and 2XX succeeded. 404 = our code failed, not found.

//back ends can send: plain text, JSON, html and an image

//xhr response takes time for internet to receive response. AKA async code. sends request and goes to next line!


//.open has 2 parameters, TYPE of http message ('GET', 'POST', 'PUT', 'DELETE' etc.), 2nd parameter is where to send the http message. can send it to any computer connected to http, typically 2nd parameter is a URL (uniform resource loader)

//using browser is the SAME as a GET request

// https://amazon.com
// http = hypertext transfer protocol
// s = secure
// rest = domain name

