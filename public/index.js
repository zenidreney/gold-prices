async function fetchGoldPrice() {
	const res = await fetch("/api/prices");
	const data = await res.json();
    console.log(data)

	const priceDisplaySpan = document.getElementById("price-display");

	priceDisplaySpan.textContent = data.price;
}

setInterval(fetchGoldPrice, 2500);

fetchGoldPrice();
