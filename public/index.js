const priceDisplaySpan = document.getElementById("price-display");
const connectionStatusPara = document.getElementById("connection-status");
const investBtn = document.getElementById("invest-btn");
const closeBtn = document.getElementById("close-btn");
const investForm = document.getElementById("invest-form");
const modal = document.querySelector("dialog");
const modalPara = document.getElementById("investment-summary")
const investmentAmount = document.getElementById("investment-amount")

let pollInterval = null;
let currentGoldPrice = null;

// Event Listeners

investForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const moneyInvested = Number(investmentAmount.value)
	const goldPurchased = (moneyInvested / currentGoldPrice).toFixed(2)

	modalPara.textContent = `You just bought ${goldPurchased} ounces (ozt) for £${moneyInvested}. With the current price of £${currentGoldPrice} / Oz. You will receive documentation shortly.`

	modal.showModal();
});

closeBtn.addEventListener("click", () => modal.close());

// Price update prototype

async function fetchGoldPrice() {
	try {
		const res = await fetch("/api/prices");

		if (!res.ok) {
			throw new Error("Server error");
		}

		const data = await res.json();
		// console.log(data.price);

		currentGoldPrice = Number(data.price);
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

// Util functions

function startPolling() {
	if (pollInterval === null) {
		pollInterval = setInterval(fetchGoldPrice, 2500);
	}
}

function stopPolling() {
	clearInterval(pollInterval);
	pollInterval = null;
}
