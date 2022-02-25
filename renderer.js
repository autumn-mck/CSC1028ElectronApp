const apiUrl = "http://localhost";
let table;

async function main() {
	document.getElementById("query").onclick = clickQueryForm;
}

async function fetchAsync(url) {
	let response = await fetch(url);
	let data = await response.json();
	return data;
}

async function queryUrl(url) {
	console.log(`About to request ${url}.`);

	let res = await fetchAsync(url);
	console.log(res);
	return res;
}

async function queryAndTable(url, rowName) {
	let tr = table.insertRow(-1);
	let cell1 = tr.insertCell(-1);
	cell1.innerHTML = rowName;
	let cell2 = tr.insertCell(-1);
	let res = await queryUrl(url);
	if (Array.isArray(res) && res.length > 0) {
		let str = `\n<details>\n<summary>Expand to see all ${rowName}</summary>\n<p>\n`;

		for (let i = 0; i < res.length; i++) {
			str += `${res[i].subdomain}.${res[i].domainWithoutSuffix}.${res[i].publicSuffix}<br />\n`;
		}
		str += "</p>\n</details>";
		cell2.innerHTML = str;
	} else cell2.innerHTML = JSON.stringify(res);
	return res;
}

async function fetchExtHostnameData(hostname) {
	let similarweb,
		dnsLookup,
		phishingData = await Promise.all([
			queryAndTable(`${apiUrl}:10130/${hostname}`, "Phishing data"),
			queryAndTable(`${apiUrl}:10131/${hostname}`, "Similarweb rank"),
			queryAndTable(`${apiUrl}:10132/${hostname}`, "DNS Data"),
			queryAndTable(`${apiUrl}:10133/${hostname}`, "Earliest archive date"),
			queryAndTable(`${apiUrl}:10135/${hostname}`, "Subdomains"),
		]);
	return {
		similarweb: similarweb,
		dns: dnsLookup,
		phishingData: phishingData,
	};
}

async function clickQueryForm() {
	console.log("Click");

	let paragraph = document.getElementById("rawJson");
	let input = document.getElementById("url").value;
	var divContainer = document.getElementById("table");
	divContainer.innerHTML = "";

	let url = parseUrl(input);
	console.log(url);
	if (url && url.hostname) {
		table = document.createElement("table");
		divContainer.appendChild(table);

		paragraph.textContent = "Querying request...";
		let hostname = url.hostname;
		let data = await fetchExtHostnameData(hostname);
		//paragraph.textContent = JSON.stringify(data);
		paragraph.textContent = "Query complete!";
	} else paragraph.textContent = "Invalid URL!";
}

function parseUrl(url) {
	if (!url) return null;
	try {
		return new URL(url);
	} catch {
		try {
			return new URL("https://" + url);
		} catch {
			return null;
		}
	}
}

console.log("renderer.js");
main();
