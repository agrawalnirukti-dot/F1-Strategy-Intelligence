// --- 2026 REAL-TIME DATA (As of March 31, 2026) ---
const teams = {
    ferrari: {
        model: "SF-26", color: "#e10600",
        driver1: { no: 16, name: "Leclerc" }, driver2: { no: 44, name: "Hamilton" },
        position: "2nd | 90 pts", wins: 0, podiums: 3, fastest: 2,
        base: "Maranello, Italy", engine: "Ferrari 066/12", chassis: "SF-26",
        gridAvg: 89, finishAvg: 91,
        carImg: "assets/images/ferrari-car.png", bgImg: "assets/images/ferrari-bg.jpg"
    },
    redbull: {
        model: "RB22", color: "#1e41ff",
        driver1: { no: 1, name: "Verstappen" }, driver2: { no: 6, name: "Hadjar" },
        position: "6th | 16 pts", wins: 0, podiums: 0, fastest: 1,
        base: "Milton Keynes, UK", engine: "Honda RBPT", chassis: "RB22",
        gridAvg: 72, finishAvg: 65,
        carImg: "assets/images/redbull-car.png", bgImg: "assets/images/redbull-bg.jpg"
    },
    mercedes: {
        model: "W17", color: "#27f4d2",
        driver1: { no: 63, name: "Russell" }, driver2: { no: 12, name: "Antonelli" },
        position: "1st | 135 pts", wins: 3, podiums: 5, fastest: 2,
        base: "Brackley, UK", engine: "Mercedes-AMG", chassis: "W17",
        gridAvg: 96, finishAvg: 94,
        carImg: "assets/images/mercedes-car.jpg", bgImg: "assets/images/mercedes-bg.jpg"
    }
};

// --- CORE APP LOGIC ---
const JOLPICA_API = "https://api.jolpi.ca/ergast/f1/2026";

async function initDashboard() {
    try {
        // Fetch 2026 Standings & Results
        const [standRes, resultsRes] = await Promise.all([
            fetch(`${JOLPICA_API}/driverStandings.json`),
            fetch(`${JOLPICA_API}/results.json`)
        ]);

        const standData = await standRes.json();
        const resultsData = await resultsRes.json();

        renderStandings(standData.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        renderRaceAnalysis(resultsData.MRData.RaceTable.Races);
        loadTeam("ferrari"); // Initial load

    } catch (error) {
        console.error("API Error - falling back to internal data", error);
        loadTeam("ferrari");
    }
}

// --- RENDERERS ---
function renderStandings(standings) {
    const table = document.getElementById("standingsTable");
    table.innerHTML = `<tr><th>Pos</th><th>Driver</th><th>Pts</th></tr>`;
    table.innerHTML += standings.slice(0, 10).map(s => `
        <tr><td>${s.position}</td><td>${s.Driver.familyName}</td><td>${s.points}</td></tr>
    `).join('');
}

function renderRaceAnalysis(races) {
    const container = document.getElementById("raceResults");
    if (!races.length) return;

    const latest = races[races.length - 1]; // Latest 2026 race (Japan)
    container.innerHTML = `<h3 style="grid-column: 1/-1; color: var(--team-color)">Latest: ${latest.raceName}</h3>`;
    container.innerHTML += latest.Results.slice(0, 4).map(res => `
        <div class="schedule-card">
            <h3>P${res.position} ${res.Driver.familyName}</h3>
            <p>${res.Constructor.name}</p>
            <small>${res.status === "Finished" ? res.Time.time : res.status}</small>
        </div>
    `).join('');
}

// --- TEAM & AESTHETICS ---
function loadTeam(key) {
    const t = teams[key];
    document.documentElement.style.setProperty('--team-color', t.color);
    document.getElementById("bannerTeamName").innerText = `${key.toUpperCase()} ${t.model}`;
    document.getElementById("teamCar").src = t.carImg;
    document.querySelector(".background-overlay").style.backgroundImage = `url('${t.bgImg}')`;

    // Stats Update
    document.getElementById("driver1No").innerText = t.driver1.no;
    document.getElementById("driver1Name").innerText = t.driver1.name;
    document.getElementById("driver2No").innerText = t.driver2.no;
    document.getElementById("driver2Name").innerText = t.driver2.name;
    document.getElementById("positionData").innerText = t.position;
    document.getElementById("winsData").innerText = t.wins;
    document.getElementById("podiumsData").innerText = t.podiums;
    document.getElementById("fastestData").innerText = t.fastest;

    document.getElementById("teamBase").innerText = t.base;
    document.getElementById("teamEngine").innerText = t.engine;
    document.getElementById("teamChassis").innerText = t.chassis;

    document.getElementById("gridBar").style.width = t.gridAvg + "%";
    document.getElementById("finishBar").style.width = t.finishAvg + "%";
}

// --- FULL SIMULATION ENGINE ---
document.getElementById("simulateBtn").onclick = function () {
    const tyre = document.getElementById("tyreSelect").value;
    const stops = parseInt(document.getElementById("pitStops").value);
    const fuel = document.getElementById("fuelLoad").value;
    const weather = document.getElementById("weatherSelect").value;
    const aggression = document.getElementById("aggression").value;
    const sc = document.getElementById("safetyCar").value;

    // Simulation Math
    const base = 90.0;
    const tyreMod = { soft: -1.2, medium: 0, hard: 1.1 }[tyre];
    const fuelMod = { light: -0.5, medium: 0.2, heavy: 0.9 }[fuel];
    const aggMod = { low: 0.5, medium: 0, high: -0.6 }[aggression];
    const weatherMod = weather === "rain" ? 9.5 : 0;
    const scMod = { low: 0, medium: -4, high: -10 }[sc];

    const lapTime = base + tyreMod + fuelMod + aggMod + weatherMod;
    const totalSecs = (lapTime * 53) + (stops * 22) + scMod;

    const risk = (aggression === "high" || tyre === "soft") ? "HIGH" : "STABLE";

    document.getElementById("strategyOutput").innerHTML = `
        <div class="card" style="border-left: 5px solid var(--team-color)">
            <h3>2026 STRATEGY ANALYSIS</h3>
            <p><strong>Predicted Total Time:</strong> ${(totalSecs / 60).toFixed(2)}m</p>
            <p><strong>Average Lap Pace:</strong> ${lapTime.toFixed(3)}s</p>
            <p><strong>Reliability Risk:</strong> ${risk}</p>
            <hr>
            <p><em>Verdict: ${totalSecs < 4900 ? "Highly Competitive" : "Conservative Finish"}</em></p>
        </div>
    `;
};

// --- TAB NAV ---
document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", function () {
        document.querySelectorAll(".nav-item").forEach(i => i.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));
        this.classList.add("active");
        document.getElementById(this.dataset.tab).classList.add("active");
    });
});

document.getElementById("teamSelect").onchange = (e) => loadTeam(e.target.value);
window.onload = initDashboard;
