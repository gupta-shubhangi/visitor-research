# Visitor Tracker

A small web app for timing and observing museum visitors at an exhibit, and recording follow-up interviews. It's built for use on a phone on the museum floor.

**Open the app:** https://gupta-shubhangi.github.io/visitor-research/

## What it does

- **Projects and sessions:** one project per study, with as many sessions (days on the floor) as you need. Visitor numbers continue from one session to the next.
- **Timing:** a stopwatch for each observed visitor. It keeps the correct time even when the phone locks or you switch apps.
- **Observation sheet:** custom fields (text, number, dropdown, checkboxes, long text with dictation) in an order you choose.
- **Groups:** add more people (V2, V3, ...) to an observation, with age range and gender for each.
- **Qualification:** a minimum time, a checklist, and checkbox options that disqualify a visitor if checked (or if not checked). Visitors can be disqualified during or after observation, with a reason.
- **Interviews:** after stopping the timer, mark the interview as finished or declined and add notes. An optional countdown (default 15 minutes) shows when the next interview is allowed, with an optional chime.
- **Export:** Excel files per session or for the whole project. "Export All" includes an "All visitors" sheet with every session combined.

## Install on a phone

The app works offline after it has been opened once with an internet connection.

- **iPhone (Safari):** open the link, tap **Share**, then **Add to Home Screen**.
- **Android (Chrome):** open the link, tap **⋮**, then **Install app**.

## Where the data is stored

All data stays **on the device**, in the browser's local storage. Nothing is sent to GitHub or to any server. The app has no server and no accounts.

- Each phone or browser has its own separate data. On iPhone, the home-screen app and Safari also keep separate data.
- Clearing browser data or deleting the app's site data erases everything.
- Use **Download backup** (at the bottom of the projects page) after each day on the floor. **Restore from backup** loads that file on any device.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The whole app. It also contains its own editable source code (`<script id="app-source">`). |
| `sw.js` | Lets the app open offline. |
| `manifest.json` | App name, colours and icon, so the app can be installed. |
| `icon-192.png`, `icon-512.png` | App icons. |

## Updating

Replace the files in this repository and wait a minute for GitHub Pages to publish. Then open the app once with an internet connection, close it, and open it again to load the new version.

## Third-party code

`index.html` includes:

- [React](https://react.dev) 18.3.1 (MIT License)
- [SheetJS](https://sheetjs.com) xlsx 0.18.5 (Apache License 2.0), for Excel export

The fonts (DM Sans, JetBrains Mono) are loaded from Google Fonts when online. Without a connection, the app falls back to the phone's system fonts.
