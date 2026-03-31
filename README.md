# 🏎️ F1 Strategy Intelligence Dashboard (2026 Season)

An advanced, real-time Formula 1 analytics dashboard and race simulation engine built for the 2026 FIA Formula One World Championship. This project integrates live telemetry and historical data to provide strategic insights into the "New Era" of F1.

![F1 2026 Aesthetic](https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?auto=format&fit=crop&q=80&w=1000)

## 🚀 Key Features

* **Real-Time 2026 Data:** Dynamic integration with the **Jolpica (Ergast)** API to track the current 2026 Driver and Constructor standings.
* **Race Strategy Simulator:** A complex multi-variable engine that calculates race outcomes based on:
    * Tyre Compound Degredation (Soft/Medium/Hard)
    * Fuel Load Deltas (Light/Medium/Heavy)
    * Driver Aggression Levels
    * Weather Conditions (Dry/Rain)
    * Safety Car Probability
* **Interactive Team Hub:** Seamlessly switch between top constructors (Ferrari, Red Bull, Mercedes) to see 2026-specific car models, driver lineups (including Hamilton's Ferrari debut), and performance stats.
* **Live Countdown:** Real-time countdown to the next Grand Prix on the 2026 calendar.

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3 (Custom Variables, Flexbox/Grid)
* **Logic:** Vanilla JavaScript (ES6+)
* **APIs:** * [Jolpica-F1](https://api.jolpi.ca/ergast/f1/): Race results and standings.
    * [OpenF1](https://openf1.org/): Live telemetry and track data.

## 📂 Project Structure

```text
├── index1.html          # Main dashboard entry point
├── style1.css           # Global styles and team-specific themes
├── script.js            # API handling and simulation logic
├── assets/
│   └── images/          # Car renders and team-specific backgrounds
