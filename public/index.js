const priceDisplaySpan = document.getElementById("price-display");
const connectionStatusPara = document.getElementById("connection-status");
const investBtn = document.getElementById("invest-btn");
const closeBtn = document.getElementById("close-btn")
const investForm = document.getElementById("invest-form");
const modal = document.querySelector("dialog")


let pollInterval = null;

function startPolling() {
	if (pollInterval === null) {
		pollInterval = setInterval(fetchGoldPrice, 2500);
	}
}

function stopPolling() {
	clearInterval(pollInterval);
	pollInterval = null;
}

async function fetchGoldPrice() {
	try {
		const res = await fetch("/api/prices");

		if (!res.ok) {
			throw new Error("Server error");
		}

		const data = await res.json();
		//console.log(data)
		priceDisplaySpan.textContent = data.price;
		connectionStatusPara.textContent = "Live Prices 🟢";
		investBtn.disabled = false;

		startPolling();
	} catch (error) {
		console.log(error);
		connectionStatusPara.textContent = "Disconnected 🔴";
		priceDisplaySpan.textContent = "----.--";
		investBtn.disabled = true;

		stopPolling();
		setTimeout(fetchGoldPrice, 5000);
	}
}

fetchGoldPrice();

investForm.addEventListener("submit", (e) => {
	e.preventDefault()
	console.log("invest button clicked");

	modal.showModal()

});

closeBtn.addEventListener("click", () => modal.close())
