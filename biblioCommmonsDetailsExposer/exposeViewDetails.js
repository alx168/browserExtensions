function buildHTMLTable({ availability, location, collection, callNumber, status }) {
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
                        </svg></span>${availability}</h3>
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
                    No.</span>${callNumber}</td>
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
				let div = document.createElement("div");
				const id = href.split("/").pop();
				const newHref = `https://gateway.bibliocommons.com/v2/libraries/gailborden/bibs/${id}/availability?locale=en-US`;
				const bibItemsJSON = (await exampleFunction(newHref)).entities.bibItems;
				//div.innerHTML = JSON.stringify(bibItems);
				//this is telling us to get the object's keys (Object.keys) and then take the first key in the array generated by Object.keys
				//then get the first element of bibItemsJSON using that first key. 
				//Doing it this way because for each listing, the first key's name changes.
				const firstElementOfbibItemsJSON = bibItemsJSON[Object.keys(bibItemsJSON)[0]];
				var args = {
					availability: firstElementOfbibItemsJSON.availability.libraryStatus,
					location: firstElementOfbibItemsJSON.branch.name, 
					collection: firstElementOfbibItemsJSON.collection, 
					callNumber: firstElementOfbibItemsJSON.callNumber,
					status: firstElementOfbibItemsJSON.availability.libraryStatus
				}
				div.innerHTML = buildHTMLTable(args);
				results[i].append(div);
			}
		} else {
			results[i].appendChild(document.createElement("undefined"));
		}
	}
}
main();

