# 📡 I/O Announcements Tracker

> **All 18 Google I/O 2026 announcements. Filtered, tracked, summarized.**
> Browse every major I/O announcement by category, mark what you've read, and get a Gemini developer summary — all in a single extension popup.

<div align="center">

[![Chrome MV3](https://img.shields.io/badge/Chrome-Manifest_V3-ec4899?style=for-the-badge&logo=google-chrome&logoColor=white)](https://developer.chrome.com/docs/extensions/)
[![Gemini AI](https://img.shields.io/badge/Gemini-2.0_Flash-D4AF37?style=for-the-badge&logo=google-gemini&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)
[![Streak](https://img.shields.io/badge/Day-13_/_180-vanilla?style=for-the-badge&logo=github&logoColor=white)](https://x.com/happy_ships)

</div>

---

## 📖 The Problem & The Solution

**Google I/O 2026 dropped 18 major announcements across 5 product areas in 2 days. Nobody has time to watch 6 hours of keynote.**

The manual flow: watch keynote → take notes → Google each announcement → open 10 tabs → try to remember which ones you already read. By the time you get through it, you've forgotten what mattered.

**I/O Announcements Tracker gives you all 18 in one popup.** Filter by Gemini / Android / Chrome / Cloud / Search. Tap to expand any announcement and read the full description. Check it off when done. One Gemini button writes a developer-focused summary of the three biggest I/O 2026 takeaways.

![Demo](demo.gif)

---

## ⚡ Core Features

- 📡 **18 Curated Announcements** — Every major Google I/O 2026 announcement with 2-sentence descriptions and links to official blog posts.
- 🏷️ **Category Filters** — One-click filter: All / Gemini / Android / Chrome / Cloud / Search. Filter state persists across popup reopens.
- ✅ **Read Tracking** — Check off announcements as you go. Progress counter shows X/18 read. State persists for the browser session.
- 🔗 **Direct Blog Links** — Each announcement links directly to the official Google blog post or product page.
- ✦ **Gemini Developer Summary** — One click generates a 3-4 sentence developer-focused summary of the most important I/O announcements.
- 💾 **Session Persistence** — Read state, active filter, and generated summary are cached in `chrome.storage.session` across popup close/reopen.

---

## 🛠 Getting Started

### 1. Load the Extension
1. Clone this repository locally.
2. Open Chrome and navigate to `chrome://extensions`.
3. Toggle on **Developer mode** in the top right.
4. Click **Load unpacked** and select the `io-announcements-tracker` folder.

### 2. Configure Your Keys
On first launch, the extension shows an onboarding screen:
- **Gemini Key** — Get one free at [aistudio.google.com](https://aistudio.google.com/app/apikey).
- **OpenRouter Key** — Get one at [openrouter.ai](https://openrouter.ai) *(optional fallback)*.

*To update your keys later, click the **⚙** gear icon in the popup header.*

### 3. Browse the Announcements
1. Click the extension icon.
2. Use the category pills to filter by Gemini, Android, Chrome, Cloud, or Search.
3. Click any announcement to expand the full description and open the official link.
4. Check off each announcement once you've read it.
5. Click **✦ Gemini Summary** for an AI-written developer brief on the biggest takeaways.

---

## 🧠 Engineering Highlight: Zero-Cost Idle State

Most extensions with dynamic content make an API call on every popup open — fetching data, re-rendering, re-querying. For a tracker with 18 static items, that's wasteful and adds latency to every open.

The design here keeps idle cost to zero: the announcement data lives as a plain JS array in the popup script. There is no fetch, no background data sync, no message passing for content. On popup open, a single `chrome.storage.session.get` call reads the cached read state and renders immediately.

The only API call in the entire extension is the Gemini summary, and it fires only when the user explicitly clicks the button. The result is then cached in session storage — so clicking the button twice never costs two API calls.

> [!NOTE]
> Session storage resets when the browser closes. This is intentional — I/O tracking is a one-time, short-lived task. Persisting across browser restarts would require `chrome.storage.local`, adding complexity for no real benefit during an I/O week.

---

## 🔧 Technical Stack

- **Extension Framework**: Chrome Extension Manifest V3
- **Primary AI Model**: Gemini 2.0 Flash via Gemini API
- **Fallback Engine**: OpenRouter API (multi-model cascade)
- **State**: `chrome.storage.session` — read state, active filter, and summary cached for the browser session
- **Data**: Hardcoded JS array — 18 announcements, 5 categories, zero fetch calls
- **Client Implementation**: Pure Vanilla JS — zero build steps, zero dependencies

---

## 📅 180 Days of Building

This project is part of a larger developer journey: shipping one useful AI tool every day for 180 days.

This release is part of the **Google I/O 2026 Sprint — 7 Project Series** (`IO-6`), powered by **Gemini 2.0 Flash**.

Follow along for daily releases and tech-stack deep dives:
- **Twitter / X**: [@happy_ships](https://x.com/happy_ships)
- **Day**: `13 / 180`

---

*Licensed under the [MIT License](LICENSE).*
