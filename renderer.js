// The domain at which the APIs are hosted
const apiUrl = "http://localhost";
// Used to construct the table for displaying the data to the user
let table;

/**
 * Main function
 */
async function main() {
	// Make the query button work
	document.getElementById("query").onclick = clickQueryForm;
}

/**
 * Fetch JSON from the given URL
 * @param {string} url The URL to query
 */
async function fetchJSON(url) {
	console.log(`About to request ${url}.`);
	// Fetch the URL
	let response = await fetch(url);
	// Response as JSON
	let data = await response.json();
	console.log(data);
	// Return the JSON
	return data;
}

/**
 * Query the given URL and add its results to the table
 * @param {string} url The URL to query
 * @param {string} rowName The name of the data source
 * @returns The result of the query
 */
async function queryAndTable(url, rowName) {
	// Add a new row at the bottom of the table
	let tr = table.insertRow(-1);

	// Add a new cell to the new row, containing the name out the data source
	let cell1 = tr.insertCell(-1);
	cell1.innerHTML = rowName;

	// Add a seccond cell to the new row, containing the data
	let cell2 = tr.insertCell(-1);
	let res = await fetchJSON(url);
	// If the data is in an array, hide it behind a details element so it doesn't take up too much room
	if (Array.isArray(res) && res.length > 0) {
		let str = `\n<details>\n<summary>Expand to see all ${rowName}</summary>\n<p>\n`;

		// Add all items to the details element
		for (let i = 0; i < res.length; i++) {
			str += `${res[i].subdomain}.${res[i].domainWithoutSuffix}.${res[i].publicSuffix}<br />\n`;
		}
		str += "</p>\n</details>";
		cell2.innerHTML = str;
	}
	// Otherwise just display the raw JSON for now
	else cell2.innerHTML = JSON.stringify(res);
	return res;
}

/**
 * Fetch and table all data for the given hostname
 */
async function fetchExtHostnameData(hostname) {
	let data = await Promise.all([
		queryAndTable(`${apiUrl}:10130/${hostname}`, "Phishing data"),
		queryAndTable(`${apiUrl}:10131/${hostname}`, "Similarweb rank"),
		queryAndTable(`${apiUrl}:10132/${hostname}`, "DNS Data"),
		queryAndTable(`${apiUrl}:10133/${hostname}`, "Earliest archive date"),
		queryAndTable(`${apiUrl}:10135/${hostname}`, "Subdomains"),
		queryAndTable(`${apiUrl}:10136/${hostname}`, "StackShare"),
	]);
	return data;
}

/**
 * Called when the user clicks on the query button
 */
async function clickQueryForm() {
	console.log("Click");

	let paragraph = document.getElementById("rawJson");
	let input = document.getElementById("url").value;
	var divContainer = document.getElementById("table");
	divContainer.innerHTML = "";

	// Parse the URL
	let url = parseUrl(input);
	console.log(url);

	if (url && url.hostname) {
		// Create the table used to display the data
		table = document.createElement("table");
		divContainer.appendChild(table);

		paragraph.textContent = "Querying request...";
		let hostname = url.hostname;
		// Table the data
		let data = await fetchExtHostnameData(hostname);
		//paragraph.textContent = JSON.stringify(data);
		paragraph.textContent = "Query complete!";
	} else paragraph.textContent = "Invalid URL!";
}

/**
 * Parse the given URL
 */
function parseUrl(url) {
	if (!url) return null;
	try {
		return new URL(url);
	} catch {
		try {
			// Assume https if no protocol given
			return new URL("https://" + url);
		} catch {
			return null;
		}
	}
}

// Run the main function
main().catch(console.error);
