# Mayank Chauhan — Cybernetic Kernel Portfolio (MC-OS v3.4)

An autonomous developer environment and spatial portfolio engineered specifically for **Mayank Chauhan** (Backend & AI Systems Engineer).

---

## 🚀 Groundbreaking Features (Never Seen on a Portfolio Before)

### 1. In-Browser Retro Win95 Voice AI Simulator with Web Speech API
- **Real Microphone Input**: Click the **Speak** button to talk into your microphone using the native **Web Speech Recognition API** (`webkitSpeechRecognition`).
- **Real Voice Output**: The assistant synthesizes spoken audio responses back to you using `window.speechSynthesis` while animating a live equalizer waveform!
- **Local AI Pipeline Simulation**: Demonstrates the low-latency Faster-Whisper INT8 transcription, Ollama Llama 3 reasoning, OpenCV facial verification, and psutil telemetry.

### 2. Interactive Data-Pipeline Architecture Graph
- Click any node along the pipeline:
  `[01. Capture (Audio/Face)] → [02. Transcription (Faster-Whisper)] → [03. Reasoning (Ollama Llama 3)] → [04. Dispatch (Eel WebSocket)] → [05. Execution (PyTTSx3 / psutil)]`
- Inspect code snippets, latency benchmarks, and concurrency mechanics.
- Click **"Simulate Packet Flow"** to watch live telemetry pulses travel through the entire stack in real time.

### 3. Native Web Audio API Sound Synthesizer
- Generates crisp mechanical keyboard clicks, terminal beeps, and boot chords through pure mathematical oscillators (`AudioContext`). Zero external MP3 files or network bloat.
- Toggle sound on/off with the floating audio pill.

### 4. Interactive Live App Sandboxes
- **Live FX Currency Calculator**: Calculates live exchange rates dynamically as you input amounts and switch currencies.
- **Lumina Visual Search**: Dynamic tag filtering with real-time masonry card transitions.
- **Atmospheric Telemetry Station**: Atmospheric indices (UV, Barometer, Humidity, Wind speed) HUD for Delhi.

### 5. Dual-Mode Interface & CRT Scanlines
- Switch between **Executive Cinematic Mode** and **Win95 Retro AI Desktop**.
- Toggle retro CRT scanlines and screen distortion with one click.

---

## 🔗 Projects & Repositories

- **Retro Win95 Voice Assistant**: [GitHub Repo](https://github.com/MAYANKCH0/retro-desktop-assistant) &bull; Tested in in-portfolio simulator
- **Lumina Image Search App**: [Live Demo](https://lumina-image-search-app.vercel.app/) &bull; [GitHub Repo](https://github.com/MAYANKCH0/LUMINA-IMAGE_SEARCH_APP)
- **Currency Converter**: [Live Demo](https://mayankch0.github.io/CURRENCY-CONVERTER/) &bull; [GitHub Repo](https://github.com/MAYANKCH0/CURRENCY-CONVERTER)
- **Weather Forecasting App**: Local asynchronous forecasting utility

---

## 💻 How to Run Locally

Your local server is running on:
👉 **`http://localhost:3000`**

Or simply double-click `index.html` in your file explorer.

---

## 🌐 Deploy to GitHub Pages

To make it live at `https://MAYANKCH0.github.io/Portfolio/`:

```bash
git init
git add .
git commit -m "Deploy Mayank Chauhan MC-OS portfolio"
git remote add origin https://github.com/MAYANKCH0/Portfolio.git
git branch -M main
git push -u origin main
```
Then under **Settings → Pages**, set the source to `main` branch `/ (root)`.
