async function fetchCovidData() {
    try {
        let response = await fetch("https://disease.sh/v3/covid-19/countries/UK?strict=true");
        if (!response.ok) throw new Error("API error");

        let data = await response.json();
        console.log("API Data:", data); // Debugging

        document.getElementById("cases").innerText = data.cases.toLocaleString();
        document.getElementById("recovered").innerText = data.recovered.toLocaleString();
        document.getElementById("vaccinations").innerText = data.vaccinated?.toLocaleString() || "N/A";

        chrome.storage.local.set({ covidData: data, lastUpdated: Date.now() });

    } catch (error) {
        console.error("Failed to fetch data:", error);
        document.getElementById("cases").innerText = "Error";
        document.getElementById("recovered").innerText = "Error";
        document.getElementById("vaccinations").innerText = "Error";
    }
}

// Run fetch when popup opens
document.addEventListener("DOMContentLoaded", fetchCovidData);
document.querySelector("button").addEventListener("mouseover", function() {
    document.querySelector(".container").style.color = "red";
});

document.querySelector("button").addEventListener("mouseout", function() {
    document.querySelector(".container").style.color = "black";
});
