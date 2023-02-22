document.body.style.border = "5px solid red";
const queryPageParams = getParams();

//let xhr = new XMLHttpRequest();
let results = document.querySelector('.results').childNodes;
	console.log(results);
	for (let i = 0; i < results.length; i++) {

		let href = results[i].querySelector('a.cp-link.cp-availability-trigger');
		if(href != null) {
			console.log(href);

			let availabilityXHR = new XMLHttpRequest();
			availabilityXHR.onload = function () {
				console.log("availabilityXHR getTable: ");				
				let availabilityJSON = JSON.parse(availabilityXHR.responseXML.querySelectorAll('script[type="application/json"]')[0].innerHTML);
				let availabilityDetail = availabilityJSON['availabilityDetail'].items[0].items[0];
				console.log(availabilityDetail);
				results[i].querySelector('div.cp-physical-availability-block').append(JSON.stringify(availabilityDetail));

			}
			availabilityXHR.open('GET', href, true);
			availabilityXHR.responseType = 'document';
			availabilityXHR.send();
		}
	}

// xhr.onload = function () {
// 	// let hrefResults = Array.from(document.querySelectorAll('a.cp-link.cp-availability-trigger'))
// 	// 					.map(cpLink => cpLink.href);
// 	// //let hrefResults =
// 	// applyResults(hrefResults);

// 	/* 1. iterate through results
// 			if querySelectorAll for the href search does not return null:
// 				make xhr call to availability page and get all clearfix classes. 
// 				append clearfix classes to info or row div.
// 			else:
// 				nothing
// 	*/ 
// 	console.log(results);
// 	for (let i = 0; i < results.length; i++) {

// 		let href = results[i].querySelector('a.cp-link.cp-availability-trigger');
// 		if(href != null) {
// 			console.log(href);

// 			let availabilityXHR = new XMLHttpRequest();
// 			availabilityXHR.onload = function () {
// 				console.log("availabilityXHR getTable: ");
// 				let availbilityTable = document.querySelectorAll('.table');
// 			}
// 			availabilityXHR.open('GET', href, true);
// 			availabilityXHR.responseType = 'document';
// 			availabilityXHR.send();

// 			results[i].querySelector('div.cp-physical-availability-block').append(href);
// 		}
// 	}
// 	// results.forEach(function (result) {
// 	// 	const availabilityTrigger = result.querySelector('a.cp-link.cp-availability-trigger');
// 	// 	if(availabilityTrigger != null) {
// 	// 		console.log(availabilityTrigger);
// 	// 		// // const availbilityTable = getClearFixClasses(href);
// 	// 		// let availabilityXHR = new XMLHttpRequest();
// 	// 		// availabilityXHR.onload = function () {
// 	// 		// 	console.log("availabilityXHR getTable: ");
// 	// 		// 	console.log(document.getElementsByClassName('table cp-deprecated-table stacked-on-mobile table-striped '));
// 	// 		// 	return availbilityTable;
// 	// 		// }
// 	// 		// availabilityXHR.open('GET', href, true);
// 	// 		// availabilityXHR.responseType = 'document';
// 	// 		// availabilityXHR.send();
// 	// 		console.log(availabilityTrigger.href);
// 	// 		result.appendChild(availabilityTrigger.href);
// 	// 	}
// 	//});
	
// 	applyResults(results);

// }

// xhr.open('GET', 'https://gailborden.bibliocommons.com/v2/search?searchType=smart&query=' + queryPageParams.query, true);
// xhr.responseType = 'document';
// xhr.send();

// function getClearFixClasses(href) {
// 	let availabilityXHR = new XMLHttpRequest();
// 	availabilityXHR.onload = function () {
// 		console.log("availabilityXHR getTable: ");
// 		console.log(document.getElementsByClassName('table cp-deprecated-table stacked-on-mobile table-striped '));
// 		return availbilityTable;
// 	}
// 	availabilityXHR.open('GET', href, true);
// 	availabilityXHR.responseType = 'document';
// 	availabilityXHR.send();
// }

function getParams() {
	return new Proxy(new URLSearchParams(window.location.search), {
  		get: (searchParams, prop) => searchParams.get(prop),
	});
}

function applyResults(results) {
	//console.log(results);
	// let availablityPage = new XMLHttpRequest();
	// availablityPage.onload = function () {
	// 	//extract all clearfix class
		
	// }
}
