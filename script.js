/**
 * MAYANK CHAUHAN — CYBERNETIC KERNEL ENGINE (MC-OS v3.4)
 * Groundbreaking Features:
 * 1. Web Audio API Synthesizer (Zero-Asset UI Sound FX & Oscillators)
 * 2. Real Web Speech Recognition (Mic Voice Input) & SpeechSynthesis (Voice Output)
 * 3. Interactive Data-Pipeline Flow Simulator with Active Packet Beam
 * 4. Real-Time Dynamic FX Currency Exchange Engine
 * 5. Spatial Holographic Starfield Canvas
 * 6. HUD Telemetry Cursor with Coordinate Display
 * 7. Live System Telemetry Jiggle (psutil Simulation) & Delhi Clock
 * 8. CRT Mode & Interface Switcher
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Web Audio API Sound Synthesizer (Zero External MP3s Needed)
       ========================================================================== */
    let audioContext = null;
    let sfxEnabled = false;

    const initAudio = () => {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
    };

    const playTone = (freq = 440, type = 'sine', duration = 0.08, gainVal = 0.08) => {
        if (!sfxEnabled || !audioContext) return;
        try {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, audioContext.currentTime);
            gain.gain.setValueAtTime(gainVal, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);

            osc.connect(gain);
            gain.connect(audioContext.destination);

            osc.start();
            osc.stop(audioContext.currentTime + duration);
        } catch (e) {
            console.error('Audio synthesis error:', e);
        }
    };

    const playClickSound = () => playTone(800, 'triangle', 0.04, 0.06);
    const playBootSound = () => {
        playTone(320, 'sine', 0.15, 0.1);
        setTimeout(() => playTone(540, 'sine', 0.2, 0.1), 100);
        setTimeout(() => playTone(880, 'sine', 0.35, 0.12), 220);
    };
    const playBeep = () => playTone(1200, 'square', 0.06, 0.04);

    // Audio Toggle Button
    const audioToggleBtn = document.getElementById('audioToggleBtn');
    const audioText = document.getElementById('audioText');

    if (audioToggleBtn) {
        audioToggleBtn.addEventListener('click', () => {
            initAudio();
            sfxEnabled = !sfxEnabled;
            if (sfxEnabled) {
                audioToggleBtn.classList.add('active');
                if (audioText) audioText.textContent = 'SFX: ACTIVE';
                playBootSound();
            } else {
                audioToggleBtn.classList.remove('active');
                if (audioText) audioText.textContent = 'SFX: MUTED';
            }
        });
    }

    // Attach subtle click feedback to interactive items
    document.querySelectorAll('button, a, .pipeline-node, .desktop-shortcut').forEach(el => {
        el.addEventListener('click', () => {
            if (sfxEnabled) playClickSound();
        });
    });

    /* ==========================================================================
       2. Custom Sleek Cybernetic Cursor
       ========================================================================== */
    const hudCursor = document.getElementById('hudCursor');
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    if (!isTouch && hudCursor) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            hudCursor.style.left = `${mouseX}px`;
            hudCursor.style.top = `${mouseY}px`;
        });

        // Hover expansions
        document.querySelectorAll('a, button, input, select, .pipeline-node, .grand-project-card').forEach(el => {
            el.addEventListener('mouseenter', () => hudCursor.classList.add('active'));
            el.addEventListener('mouseleave', () => hudCursor.classList.remove('active'));
        });
    }

    /* ==========================================================================
       3. Live Telemetry Clock & Hardware Jiggle
       ========================================================================== */
    const clockStat = document.getElementById('clockStat');
    const liveCpuTelemetry = document.getElementById('liveCpuTelemetry');
    const sbTelemetry = document.getElementById('sbTelemetry');

    const updateClock = () => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', {
            timeZone: 'Asia/Kolkata',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        if (clockStat) clockStat.textContent = `DELHI_NODE // ${timeStr}`;
    };
    setInterval(updateClock, 1000);
    updateClock();

    // Jiggle CPU & RAM to simulate live psutil data streaming
    setInterval(() => {
        const cpu = Math.floor(Math.random() * 8 + 12);
        const ram = (Math.random() * 0.4 + 4.1).toFixed(1);
        const text = `CPU ${cpu}% | RAM ${ram}GB`;
        if (liveCpuTelemetry) liveCpuTelemetry.textContent = text;
        if (sbTelemetry) sbTelemetry.textContent = `CPU: ${cpu}% | RAM: ${ram}GB (psutil)`;
    }, 3500);

    /* ==========================================================================
       4. Spatial Holographic Starfield Canvas
       ========================================================================== */
    const canvas = document.getElementById('spatialCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        window.addEventListener('resize', () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            initStars();
        });

        const stars = [];
        const starCount = Math.min(Math.floor((w * h) / 14000), 70);

        class Star {
            constructor() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.size = Math.random() * 1.8 + 0.6;
                this.alpha = Math.random() * 0.6 + 0.2;
                this.speedX = (Math.random() - 0.5) * 0.35;
                this.speedY = (Math.random() - 0.5) * 0.35;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0) this.x = w;
                if (this.x > w) this.x = 0;
                if (this.y < 0) this.y = h;
                if (this.y > h) this.y = 0;

                // Mouse gravitational attraction
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 180) {
                    this.x += (dx / dist) * 0.4;
                    this.y += (dy / dist) * 0.4;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 242, 254, ${this.alpha})`;
                ctx.fill();
            }
        }

        const initStars = () => {
            stars.length = 0;
            for (let i = 0; i < starCount; i++) stars.push(new Star());
        };
        initStars();

        const renderCanvas = () => {
            ctx.clearRect(0, 0, w, h);

            for (let i = 0; i < stars.length; i++) {
                stars[i].update();
                stars[i].draw();

                // Connect closest stars
                for (let j = i + 1; j < stars.length; j++) {
                    const dx = stars[i].x - stars[j].x;
                    const dy = stars[i].y - stars[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(stars[i].x, stars[i].y);
                        ctx.lineTo(stars[j].x, stars[j].y);
                        ctx.strokeStyle = `rgba(99, 102, 241, ${(1 - dist / 120) * 0.2})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(renderCanvas);
        };
        requestAnimationFrame(renderCanvas);
    }

    /* ==========================================================================
       5. Interactive Pipeline Visualizer (World-First Feature)
       ========================================================================== */
    const pipelineNodes = document.querySelectorAll('.pipeline-node');
    const detailBadge = document.getElementById('detailBadge');
    const detailTitle = document.getElementById('detailTitle');
    const detailDesc = document.getElementById('detailDesc');
    const dStat1 = document.getElementById('dStat1');
    const dStat2 = document.getElementById('dStat2');
    const dStat3 = document.getElementById('dStat3');
    const detailCodeFile = document.getElementById('detailCodeFile');
    const detailCodeContent = document.getElementById('detailCodeContent');
    const triggerPacketBtn = document.getElementById('triggerPacketBtn');

    const nodeData = {
        input: {
            badge: 'NODE_01 // AUDIO & BIOMETRICS',
            title: 'Acoustic Signal & Face Verification Ingestion',
            desc: "The system captures microphone audio streams in 16-bit Mono at 16,000 Hz using SoundDevice while concurrently executing an OpenCV Haar Cascade video stream to authenticate the user's face before elevated assistant controls are unlocked.",
            stat1: '16 kHz PCM',
            stat2: '30 FPS Haar Match',
            stat3: 'Thread-Isolated',
            file: 'audio_biometric_capture.py',
            code: `import sounddevice as sd
import cv2

def capture_audio_and_auth(sample_rate=16000):
    audio = sd.rec(int(3 * sample_rate), samplerate=sample_rate, channels=1)
    face_verified = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
    return audio, face_verified`
        },
        stt: {
            badge: 'NODE_02 // SPEECH TRANSCRIPTION',
            title: 'Faster-Whisper INT8 Low-Latency Inference',
            desc: "Raw acoustic waveforms are passed directly into Faster-Whisper with INT8 quantization, bypassing high-cost cloud APIs and completing full sentence transcription in under 95 milliseconds on consumer CPU/CUDA hardware.",
            stat1: '< 95 ms Latency',
            stat2: 'INT8 Quantized',
            stat3: 'Zero Cloud Calls',
            file: 'whisper_inference.py',
            code: `from faster_whisper import WhisperModel

model = WhisperModel("base.en", device="cpu", compute_type="int8")

def transcribe(audio_buffer):
    segments, info = model.transcribe(audio_buffer, beam_size=5)
    return " ".join([seg.text for seg in segments])`
        },
        llm: {
            badge: 'NODE_03 // LOCAL NEURAL ENGINE',
            title: 'Ollama Llama 3 8B Local Reasoning',
            desc: "Transcribed text queries are dispatched to a locally running Ollama daemon serving Llama 3. Zero telemetry escapes the machine, guaranteeing enterprise privacy and sub-second prompt comprehension.",
            stat1: 'Llama 3 8B',
            stat2: 'Zero Token Cost',
            stat3: '100% Offline Privacy',
            file: 'ollama_reasoning.py',
            code: `import requests

def query_local_llama(prompt, system_context="Assistant"):
    res = requests.post('http://localhost:11434/api/generate', json={
        "model": "llama3:8b",
        "prompt": prompt,
        "stream": False
    })
    return res.json().get('response')`
        },
        bridge: {
            badge: 'NODE_04 // DISPATCH BRIDGE',
            title: 'Eel Python-to-Web IPC WebSocket Bridge',
            desc: "Bi-directional remote procedure calls connect the Python worker engine to the frontend Win95 GUI via Eel WebSockets, ensuring asynchronous event dispatch without thread locking.",
            stat1: 'Eel WebSocket',
            stat2: 'Full Asynchronous',
            stat3: 'Bi-directional RPC',
            file: 'eel_bridge.py',
            code: `import eel

eel.init('web')

@eel.expose
def dispatch_to_ui(command, payload):
    # Sends real-time payload to Win95 DOM
    eel.updateInterface(command, payload)()`
        },
        output: {
            badge: 'NODE_05 // SYNTHESIS & EXECUTION',
            title: 'PyTTSx3 Async Vocal Synth & psutil Telemetry',
            desc: "The response is vocalized using an asynchronous pyttsx3 thread pool worker that guarantees smooth speech playback without blocking system diagnostics or local automation scripts.",
            stat1: 'Async Thread Pool',
            stat2: 'psutil Hardware Hook',
            stat3: 'Volume/App Automation',
            file: 'synth_automation.py',
            code: `import pyttsx3
import threading
import psutil

def speak_async(text):
    def worker():
        engine = pyttsx3.init()
        engine.say(text)
        engine.runAndWait()
    threading.Thread(target=worker, daemon=True).start()`
        }
    };

    pipelineNodes.forEach(node => {
        node.addEventListener('click', () => {
            pipelineNodes.forEach(n => n.classList.remove('active'));
            node.classList.add('active');

            const key = node.getAttribute('data-node');
            const data = nodeData[key];

            if (data) {
                if (detailBadge) detailBadge.textContent = data.badge;
                if (detailTitle) detailTitle.textContent = data.title;
                if (detailDesc) detailDesc.textContent = data.desc;
                if (dStat1) dStat1.textContent = data.stat1;
                if (dStat2) dStat2.textContent = data.stat2;
                if (dStat3) dStat3.textContent = data.stat3;
                if (detailCodeFile) detailCodeFile.textContent = data.file;
                if (detailCodeContent) detailCodeContent.textContent = data.code;
            }
        });
    });

    // Animate packet flow across nodes
    if (triggerPacketBtn) {
        triggerPacketBtn.addEventListener('click', () => {
            const keys = ['input', 'stt', 'llm', 'bridge', 'output'];
            keys.forEach((key, index) => {
                setTimeout(() => {
                    const targetNode = document.querySelector(`.pipeline-node[data-node="${key}"]`);
                    if (targetNode) targetNode.click();
                    playBeep();
                }, index * 450);
            });
        });
    }

    /* ==========================================================================
       6. Live Win95 AI Voice Assistant Sandbox (Web Speech API Integration!)
       ========================================================================== */
    const w95Screen = document.getElementById('w95Screen');
    const w95TextInput = document.getElementById('w95TextInput');
    const w95SendBtn = document.getElementById('w95SendBtn');
    const voiceMicBtn = document.getElementById('voiceMicBtn');
    const micLabel = document.getElementById('micLabel');
    const micIcon = document.getElementById('micIcon');
    const ttsToggleBtn = document.getElementById('ttsToggleBtn');
    const w95Waveform = document.getElementById('w95Waveform');
    const pingAssistantBtn = document.getElementById('pingAssistantBtn');
    const heroLaunchWin95 = document.getElementById('heroLaunchWin95');
    const shortcutAssistant = document.getElementById('shortcutAssistant');

    let ttsEnabled = true;

    // Text to Speech Function (Speaks Mayank's Assistant Voice)
    const speakAssistantResponse = (text) => {
        if (!ttsEnabled || !('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel(); // Stop prior audio

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.05;
        utterance.pitch = 0.95;

        if (w95Waveform) w95Waveform.classList.add('active');

        utterance.onend = () => {
            if (w95Waveform) w95Waveform.classList.remove('active');
        };

        window.speechSynthesis.speak(utterance);
    };

    if (ttsToggleBtn) {
        ttsToggleBtn.addEventListener('click', () => {
            ttsEnabled = !ttsEnabled;
            ttsToggleBtn.innerHTML = ttsEnabled 
                ? '<i data-lucide="volume-2"></i> <span>TTS: ON</span>' 
                : '<i data-lucide="volume-x"></i> <span>TTS: OFF</span>';
            lucide.createIcons();
            if (sfxEnabled) playClickSound();
        });
    }

    // Append text to the retro Win95 terminal
    const appendW95Line = (text, className = '') => {
        if (!w95Screen) return;
        const line = document.createElement('div');
        line.className = `w95-line ${className}`;
        line.innerHTML = text;
        w95Screen.appendChild(line);
        w95Screen.scrollTop = w95Screen.scrollHeight;
    };

    // AI Intent Resolution Engine (Simulates Llama 3 on Mayank's profile)
    const handleWin95Query = (rawInput) => {
        const query = rawInput.trim();
        if (!query) return;

        appendW95Line(`&gt; USER: "${query}"`, 'user-line');
        if (sfxEnabled) playClickSound();

        const lower = query.toLowerCase();

        if (lower === 'clear') {
            w95Screen.innerHTML = '';
            appendW95Line('[SYSTEM] Terminal buffer cleared. Ready for instructions.', 'cyan-text');
            return;
        }

        // Processing latency simulation
        appendW95Line('[WHISPER] Audio stream processed in 84ms &rarr; Query dispatched to Ollama [Llama 3]...', 'cyan-text');

        setTimeout(() => {
            let reply = '';
            if (lower.includes('architecture') || lower.includes('stack') || lower.includes('work')) {
                reply = "The Retro Win95 Assistant is powered by Python 3.11 with an Eel WebSocket bridge to the retro frontend. Faster-Whisper provides INT8 speech recognition, while Ollama hosts quantized Llama-3 locally for 100% offline, zero-cloud NLP privacy.";
            } else if (lower.includes('telemetry') || lower.includes('check') || lower.includes('status')) {
                const cpu = Math.floor(Math.random() * 8 + 14);
                reply = `Hardware telemetry verified via psutil: CPU is at ${cpu}%, RAM allocation is 4.2GB, and Faster-Whisper inference pipeline is healthy.`;
            } else if (lower.includes('face') || lower.includes('scan') || lower.includes('verify')) {
                reply = "OpenCV Haar Cascade facial scan triggered. Biometric signature match confirmed for Mayank Chauhan with Level 5 clearance.";
            } else if (lower.includes('skill') || lower.includes('tech')) {
                reply = "Mayank's core stack includes Python, Node.js, Express, MongoDB, Ollama, Faster-Whisper, PyTTSx3, OpenCV, and Tailwind CSS.";
            } else if (lower.includes('project')) {
                reply = "Mayank has engineered 4 major applications: Retro Win95 Voice Assistant, Lumina Image Search App (live at lumina-image-search-app.vercel.app), Currency Converter (live at mayankch0.github.io/CURRENCY-CONVERTER), and Weather Forecasting App.";
            } else if (lower.includes('contact') || lower.includes('email') || lower.includes('hire')) {
                reply = "You can reach Mayank directly at mayankchauhan020202@gmail.com or via phone at +91 9899014114.";
            } else {
                reply = `Acknowledged: "${query}". All local inference nodes are operational. Mayank specializes in robust backend architectures and offline AI integrations.`;
            }

            appendW95Line(`[LLAMA-3]: ${reply}`, 'ai-line');
            speakAssistantResponse(reply);
        }, 350);
    };

    if (w95SendBtn && w95TextInput) {
        w95SendBtn.addEventListener('click', () => {
            handleWin95Query(w95TextInput.value);
            w95TextInput.value = '';
        });

        w95TextInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                handleWin95Query(w95TextInput.value);
                w95TextInput.value = '';
            }
        });
    }

    // Quick Command Chips
    document.querySelectorAll('.w95-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const cmd = chip.getAttribute('data-cmd');
            if (cmd) {
                handleWin95Query(cmd);
            }
        });
    });

    // Real Web Speech Recognition (Mic Input)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = null;
    let isRecording = false;

    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            isRecording = true;
            if (voiceMicBtn) voiceMicBtn.classList.add('recording');
            if (micLabel) micLabel.textContent = 'Listening...';
            if (w95Waveform) w95Waveform.classList.add('active');
            appendW95Line('[WHISPER_MIC] Capturing acoustic stream from microphone...', 'cyan-text');
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            if (w95TextInput) w95TextInput.value = transcript;
            handleWin95Query(transcript);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            appendW95Line(`[MIC_STATUS] Speech capture paused (${event.error}). Try typing below!`, 'cyan-text');
            stopRecording();
        };

        recognition.onend = () => {
            stopRecording();
        };

        const stopRecording = () => {
            isRecording = false;
            if (voiceMicBtn) voiceMicBtn.classList.remove('recording');
            if (micLabel) micLabel.textContent = 'Speak';
            if (w95Waveform) w95Waveform.classList.remove('active');
        };

        if (voiceMicBtn) {
            voiceMicBtn.addEventListener('click', () => {
                initAudio();
                if (!isRecording) {
                    try {
                        recognition.start();
                    } catch (e) {
                        recognition.stop();
                    }
                } else {
                    recognition.stop();
                }
            });
        }
    } else {
        if (voiceMicBtn) {
            voiceMicBtn.addEventListener('click', () => {
                appendW95Line('[MIC_NOTICE] Web Speech API not supported in this browser. Please type into the input prompt!', 'cyan-text');
            });
        }
    }

    // Broadcast Handshake Ping Button
    if (pingAssistantBtn) {
        pingAssistantBtn.addEventListener('click', () => {
            initAudio();
            handleWin95Query('Run system diagnostics');
            const target = document.getElementById('win95-sandbox');
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (heroLaunchWin95) {
        heroLaunchWin95.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById('win95-sandbox');
            if (target) target.scrollIntoView({ behavior: 'smooth' });
            handleWin95Query('Explain your local AI architecture');
        });
    }

    /* ==========================================================================
       7. Real-Time Dynamic Currency Exchange Calculator
       ========================================================================== */
    const fxInputAmount = document.getElementById('fxInputAmount');
    const fxCurrencySelect = document.getElementById('fxCurrencySelect');
    const fxCalculatedVal = document.getElementById('fxCalculatedVal');
    const fxExchangeRateText = document.getElementById('fxExchangeRateText');

    const updateFxCalculation = () => {
        if (!fxInputAmount || !fxCurrencySelect || !fxCalculatedVal) return;
        const amount = parseFloat(fxInputAmount.value) || 0;
        const rate = parseFloat(fxCurrencySelect.value) || 1;
        const currencyText = fxCurrencySelect.options[fxCurrencySelect.selectedIndex].text;
        const symbol = currencyText.split('(')[1]?.replace(')', '') || '';

        const total = (amount * rate).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        fxCalculatedVal.innerHTML = `${symbol} ${total}`;
        if (fxExchangeRateText) {
            fxExchangeRateText.textContent = `Exchange Rate: 1 USD = ${rate} (${currencyText.split('-')[0].trim()})`;
        }
    };

    if (fxInputAmount && fxCurrencySelect) {
        fxInputAmount.addEventListener('input', updateFxCalculation);
        fxCurrencySelect.addEventListener('change', updateFxCalculation);
    }

    /* ==========================================================================
       8. Lumina Interactive Mock Gallery
       ========================================================================== */
    const luminaDemoInput = document.getElementById('luminaDemoInput');
    const luminaPills = document.querySelectorAll('.l-pill');
    const luminaGallery = document.getElementById('luminaGallery');

    const themeGradients = {
        cyberpunk: [
            'linear-gradient(135deg, #09203f, #537895)',
            'linear-gradient(135deg, #134e5e, #71b280)',
            'linear-gradient(135deg, #2c3e50, #000000)'
        ],
        neural: [
            'linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b)',
            'linear-gradient(135deg, #4b1248, #f0c27b)',
            'linear-gradient(135deg, #0f2027, #203a43, #2c5364)'
        ],
        architecture: [
            'linear-gradient(135deg, #232526, #414345)',
            'linear-gradient(135deg, #1f4037, #99f2c8)',
            'linear-gradient(135deg, #16222a, #3a6073)'
        ],
        abstract: [
            'linear-gradient(135deg, #654ea3, #eaafc8)',
            'linear-gradient(135deg, #00b4db, #0083b0)',
            'linear-gradient(135deg, #ee0979, #ff6a00)'
        ]
    };

    luminaPills.forEach(pill => {
        pill.addEventListener('click', () => {
            luminaPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            const tag = pill.textContent.toLowerCase();
            if (luminaDemoInput) luminaDemoInput.value = pill.textContent;

            const grads = themeGradients[tag] || themeGradients.cyberpunk;
            if (luminaGallery) {
                const tiles = luminaGallery.querySelectorAll('.gallery-tile');
                tiles.forEach((t, i) => {
                    t.style.background = grads[i % grads.length];
                });
            }
        });
    });

    /* ==========================================================================
       9. CRT Mode Toggle & Executive/Win95 Mode Switcher
       ========================================================================== */
    const crtToggleBtn = document.getElementById('crtToggleBtn');
    const modeExecutiveBtn = document.getElementById('modeExecutiveBtn');
    const modeWin95Btn = document.getElementById('modeWin95Btn');

    if (crtToggleBtn) {
        crtToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('crt-on');
            document.body.classList.toggle('crt-off');
            if (sfxEnabled) playTone(950, 'sawtooth', 0.1, 0.05);
        });
    }

    if (modeExecutiveBtn && modeWin95Btn) {
        modeExecutiveBtn.addEventListener('click', () => {
            modeExecutiveBtn.classList.add('active');
            modeWin95Btn.classList.remove('active');
            document.documentElement.setAttribute('data-mode', 'executive');
            const hero = document.getElementById('hero');
            if (hero) hero.scrollIntoView({ behavior: 'smooth' });
        });

        modeWin95Btn.addEventListener('click', () => {
            modeWin95Btn.classList.add('active');
            modeExecutiveBtn.classList.remove('active');
            document.documentElement.setAttribute('data-mode', 'win95');
            const win95 = document.getElementById('win95-sandbox');
            if (win95) win95.scrollIntoView({ behavior: 'smooth' });
            if (sfxEnabled) playBootSound();
        });
    }

    /* ==========================================================================
       10. Email Copy with Global Toast
       ========================================================================== */
    const copyMailBtn = document.getElementById('copyMailBtn');
    const globalToast = document.getElementById('globalToast');
    const copyBtnLabel = document.getElementById('copyBtnLabel');

    if (copyMailBtn) {
        copyMailBtn.addEventListener('click', async () => {
            const email = copyMailBtn.getAttribute('data-email') || 'mayankchauhan020202@gmail.com';
            try {
                await navigator.clipboard.writeText(email);
                showToast('Email address copied to clipboard!');
            } catch (err) {
                const ta = document.createElement('textarea');
                ta.value = email;
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
                showToast('Email address copied to clipboard!');
            }
        });
    }

    const showToast = (msg) => {
        if (!globalToast) return;
        const msgEl = document.getElementById('toastMessage');
        if (msgEl) msgEl.textContent = msg;

        if (copyBtnLabel) copyBtnLabel.textContent = 'Copied!';
        globalToast.classList.add('show');
        if (sfxEnabled) playClickSound();

        setTimeout(() => {
            globalToast.classList.remove('show');
            if (copyBtnLabel) copyBtnLabel.textContent = 'Copy Email';
        }, 2800);
    };

    /* ==========================================================================
       11. Mobile Navigation Menu
       ========================================================================== */
    const mobileMenuTrigger = document.getElementById('mobileMenuTrigger');
    const navLinksDeck = document.getElementById('navLinksDeck');

    if (mobileMenuTrigger && navLinksDeck) {
        mobileMenuTrigger.addEventListener('click', () => {
            navLinksDeck.classList.toggle('open');
        });

        navLinksDeck.querySelectorAll('.nav-anchor').forEach(anchor => {
            anchor.addEventListener('click', () => {
                navLinksDeck.classList.remove('open');
            });
        });
    }
});
