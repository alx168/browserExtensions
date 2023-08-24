function buildHTMLTable({ availibility, location, collection, status }) {
	return `<table class="cp-table">
    <thead class="cp-table-header">
        <tr>
            <th scope="col" class="cp-table-heading"><button class="cp-button table-heading__sort-button"><span
                        class="button__content">Location<span class="table-heading__sort-button__icon"><svg
                                aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"
                                class="cp-svg icon-svg-caret-double" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M16.077 14l-4.039 5L8 14h8.077zm0-4H8l4.038-5 4.039 5z"
                                    fill-rule="evenodd"></path>
                            </svg></span></span></button></th>
            <th scope="col" class="cp-table-heading"><button class="cp-button table-heading__sort-button"><span
                        class="button__content">Collection<span class="table-heading__sort-button__icon"><svg
                                aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"
                                class="cp-svg icon-svg-caret-double" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M16.077 14l-4.039 5L8 14h8.077zm0-4H8l4.038-5 4.039 5z"
                                    fill-rule="evenodd"></path>
                            </svg></span></span></button></th>
            <th scope="col" class="cp-table-heading"><button class="cp-button table-heading__sort-button"><span
                        class="button__content">Call No.<span class="table-heading__sort-button__icon"><svg
                                aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"
                                class="cp-svg icon-svg-caret-double" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M16.077 14l-4.039 5L8 14h8.077zm0-4H8l4.038-5 4.039 5z"
                                    fill-rule="evenodd"></path>
                            </svg></span></span></button></th>
            <th scope="col" class="cp-table-heading"><button class="cp-button table-heading__sort-button"><span
                        class="button__content">Status<span class="table-heading__sort-button__icon"><svg
                                aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"
                                class="cp-svg icon-svg-caret-double" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M16.077 14l-4.039 5L8 14h8.077zm0-4H8l4.038-5 4.039 5z"
                                    fill-rule="evenodd"></path>
                            </svg></span></span></button></th>
        </tr>
    </thead>
    <tbody class="cp-table-body">
        <tr class="cp-table-row group-heading-row">
            <th scope="col" colspan="4" class="cp-table-heading">
                <h3 class="cp-heading heading-medium availability-group-heading heading--linked"><span
                        class="group-icon"><svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"
                            class="cp-svg" width="12" height="12" viewBox="0 0 12 12">
                            <path fill="#A82009" fill-rule="evenodd"
                                d="M6,12 C2.6862915,12 0,9.3137085 0,6 C0,2.6862915 2.6862915,0 6,0 C9.3137085,0 12,2.6862915 12,6 C12,9.3137085 9.3137085,12 6,12 Z M4,4.7 C3.28202983,4.7 2.7,5.28202983 2.7,6 C2.7,6.71797017 3.28202983,7.3 4,7.3 L8,7.3 C8.71797017,7.3 9.3,6.71797017 9.3,6 C9.3,5.28202983 8.71797017,4.7 8,4.7 L4,4.7 Z">
                            </path>
                        </svg></span>${availibility}</h3>
            </th>
        </tr>
        <tr class="cp-table-row">
            <td class="cp-table-cell" colspan="1"><span
                    class="table-cell__label table-cell__label--block">Location</span>${location}</td>
            <td class="cp-table-cell" colspan="1"><span
                    class="table-cell__label table-cell__label--block">Collection</span>
                <div>${collection}</div>
            </td>
            <td class="cp-table-cell" colspan="1"><span class="table-cell__label table-cell__label--block">Call
                    No.</span>004.16 Stokes</td>
            <td class="cp-table-cell" colspan="1"><span
                    class="table-cell__label table-cell__label--block">Status</span><span>${status}</span></td>
        </tr>
    </tbody>
</table>`
}

async function exampleFunction(url) {
	console.log(url);
	const response = await fetch(url, {headers:{accept: "application/json"}});
	const body = await response.text();
	console.log(body);
	const data = JSON.parse(body);

	console.log("grabbing the url: " + url + data);
	return data;
}


//use in console for immediate inspection / testing.
//fetch('https://gateway.bibliocommons.com/v2/libraries/gailborden/bibs/S151C1890336/availability?locale=en-US').then(response => response.json()).then(console.log)

//run the main on every navigation event
async function main() {
	document.body.style.border = "5px solid red";
	//const queryPageParams = getParams();

	//let xhr = new XMLHttpRequest();
	let results = document.querySelector('.results').childNodes;
	for (let i = 0; i < results.length; i++) {

		if (results[i].innerText.indexOf("View location availability") != -1) {

			// square bracket in strings is telling js to select the attribute data-key (name), "bib-availability-link" (value). The whole thing is the attribute (data-key="bib-availability-link")
			let href = results[i].querySelector('[data-key="bib-availability-link"]').href;
			if (href != null) {

				//TODO:
				// 
				// first make this work on all results not just first result in the search result row.
				// get table header info from json.
				// get table cells info from json based on available headers. (number of headers change so must base on this)
				// put that header and info into the table.
				// make the borders visible on table. 

				// this gets us the json data from the view details page
				//results[i].querySelector('div.cp-physical-availability-block').append(JSON.stringify(availabilityDetail));
				let div = document.createElement("div");
				let id = href.split("/").pop();
				let newHref = `https://gateway.bibliocommons.com/v2/libraries/gailborden/bibs/${id}/availability?locale=en-US`;
				div.innerHTML = JSON.stringify((await exampleFunction(newHref)).entities.bibItems);
				results[i].appendChild(div);

				//table creation, pull out into another function
				// const tbl = document.createElement("table");
				// const tblBody = document.createElement("tbody");
				// for (let i = 0; i < 2; i++) {
				// 	const row = document.createElement("tr");
				// 	for (let j = 0; j < 2; j++) {
				// 		const cell = document.createElement("td");
				// 		const cellText = document.createTextNode(`cell in row ${i}, column ${j}`);
				// 		cell.appendChild(cellText);
				// 		row.appendChild(cell);
				// 	}
				// 	tblBody.appendChild(row);
				// }
				// tbl.appendChild(tblBody);

				//append the table as part of the row of the search result.
				//results[i].querySelector('.cp-manifestation-list').append(tbl);

			}
		} else {
			results[i].appendChild(document.createElement("undefined"));
		}
		// availabilityXHR.open('GET', href, true);
		// availabilityXHR.responseType = 'document';
		// availabilityXHR.send();
	}
}
main();

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
