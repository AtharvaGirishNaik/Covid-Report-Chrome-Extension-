chrome.alarms.create("updateCovidData", { periodInMinutes: 30 });

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "updateCovidData") {
        fetchCovidData();
    }
});

async function fetchCovidData() {
    try {
        let response = await fetch("https://api.coronavirus.data.gov.uk/v1/data");
        if (!response.ok) throw new Error("API error");

        let data = await response.json();
        let latest = data.data[0];

        chrome.storage.local.set({ covidData: latest, lastUpdated: Date.now() });

    } catch (error) {
        console.error("Failed to fetch COVID-19 data in background:", error);
    }
}
