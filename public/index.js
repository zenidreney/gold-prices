const priceDisplaySpan = document.getElementById("price-display");
const connectionStatusPara = document.getElementById("connection-status")
const investBtn = document.getElementById("invest-btn")

let pollInterval = null

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

		if(!res.ok) {
			throw new Error("Server error")
		}

		const data = await res.json();
	    //console.log(data)
		priceDisplaySpan.textContent = data.price;
		connectionStatusPara.textContent = "Live Price 🟢"
		investBtn.disabled = false

		startPolling()

	} catch (error) {
		console.log(error)
		connectionStatusPara.textContent = "Disconnected 🔴"
		priceDisplaySpan.textContent = "----.--"
		investBtn.disabled = true

		stopPolling()
		setTimeout(fetchGoldPrice, 5000)
	}


}


fetchGoldPrice();

investBtn.addEventListener("click", () => console.log("investe button clicked"))
