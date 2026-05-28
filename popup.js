// ============================================
// POPUP.JS — I/O Announcements Tracker
// ============================================

const ANNOUNCEMENTS = [
  { id: 1, cat: 'gemini', title: 'Gemini 2.5 Pro update', desc: 'Updated reasoning model with 1M token context and breakthrough coding performance. Top-ranked model on Chatbot Arena — largest performance jump in Gemini history.', url: 'https://blog.google/technology/google-deepmind/google-gemini-update-io-2025/' },
  { id: 2, cat: 'gemini', title: 'Gemini 2.5 Flash', desc: 'Fastest, most efficient Gemini model with thinking mode. Best price-to-performance ratio for everyday tasks at scale — designed for high-volume API usage.', url: 'https://blog.google/technology/google-deepmind/gemini-model-updates-io-2025/' },
  { id: 3, cat: 'gemini', title: 'Project Astra', desc: 'Universal AI assistant that sees, hears, and understands the world in real time. Live demos showed persistent memory across sessions and seamless multimodal reasoning.', url: 'https://deepmind.google/technologies/project-astra/' },
  { id: 4, cat: 'gemini', title: 'Veo 3 — video with native audio', desc: "Google's video generation model now produces synchronized audio alongside video — realistic sound effects, dialogue, and ambient audio generated together.", url: 'https://deepmind.google/models/veo/' },
  { id: 5, cat: 'gemini', title: 'Gemini in the Chrome side panel', desc: 'Gemini appears as a persistent side panel in Chrome, reading your current page and answering questions about it without opening a new tab.', url: 'https://blog.google/products/chrome/google-chrome-gemini-ai-io-2025/' },
  { id: 6, cat: 'android', title: 'Android XR', desc: 'Android extended to XR devices — headsets, smart glasses, and mixed reality. First Samsung XR device partnership announced with Gemini as the core AI layer.', url: 'https://blog.google/products/android/android-xr-io-2025/' },
  { id: 7, cat: 'android', title: 'Gemini on Android — deeper integration', desc: "Gemini can now see your screen, access files and photos, and take actions across your phone. Replaces Google Assistant as the default AI system on Android.", url: 'https://blog.google/products/android/gemini-android-io-2025/' },
  { id: 8, cat: 'android', title: 'Google Beam (Project Starline)', desc: "Project Starline graduates to Google Beam — a 3D video calling system creating life-size holograms of meeting participants. Enterprise partnerships with HP and Zoom announced.", url: 'https://blog.google/technology/research/google-beam-io-2025/' },
  { id: 9, cat: 'chrome', title: 'Prompt API — on-device AI in Chrome', desc: 'JavaScript API giving web developers direct access to Gemini Nano running locally in Chrome. No API key, no server round-trip, no per-call cost. Available in Chrome 127+.', url: 'https://developer.chrome.com/docs/ai/prompt-api' },
  { id: 10, cat: 'chrome', title: 'WebMCP protocol', desc: 'Standard protocol for web apps to connect to AI model context servers (MCP). Chrome ships built-in WebMCP support — enabling AI-powered browser extensions without cloud calls.', url: 'https://developer.chrome.com/blog/web-mcp' },
  { id: 11, cat: 'chrome', title: 'Built-in Translation + Summarization APIs', desc: 'Chrome ships native APIs for page translation and summarization using on-device models. Works offline, no network call required, available via JavaScript in extensions and web apps.', url: 'https://developer.chrome.com/docs/ai/built-in-apis' },
  { id: 12, cat: 'cloud', title: 'Project Mariner — web agent', desc: 'AI agent that browses the web and takes actions autonomously — filling forms, clicking buttons, completing multi-step tasks. Powered by Gemini with computer-use capability.', url: 'https://deepmind.google/models/project-mariner/' },
  { id: 13, cat: 'cloud', title: 'Jules — async AI coding agent', desc: 'AI coding agent that works asynchronously on GitHub issues. Clones your repo, investigates the issue, makes changes, and opens a pull request while you move on.', url: 'https://blog.google/technology/google-labs/jules-ai-agent/' },
  { id: 14, cat: 'cloud', title: 'Google Agentspace', desc: "Enterprise platform for AI agents connected to your org's internal data, docs, and tools. Built on Vertex AI and Google Workspace — agents reason across internal knowledge bases.", url: 'https://cloud.google.com/agentspace' },
  { id: 15, cat: 'cloud', title: 'Firebase Studio', desc: 'AI-native app development environment. Describe an app in natural language — Firebase Studio scaffolds the full project including backend, database schema, and UI with one prompt.', url: 'https://firebase.google.com/products/studio' },
  { id: 16, cat: 'search', title: 'AI Mode in Google Search', desc: 'Dedicated AI-first search experience with deep reasoning and multi-step query support. Accessible via the "AI Mode" tab on google.com with full conversational search.', url: 'https://blog.google/products/search/google-search-ai-mode-io-2025/' },
  { id: 17, cat: 'search', title: 'AI Overviews — 100+ countries', desc: 'AI-generated summaries at the top of search results now available in over 100 countries and 40+ languages. Expanded to include code, math, and multi-step reasoning queries.', url: 'https://blog.google/products/search/ai-overviews-expansion-io-2025/' },
  { id: 18, cat: 'search', title: 'NotebookLM — new formats', desc: "NotebookLM adds study guides, briefing docs, and visual notebooks. Audio Overviews (AI podcast format) now has interactive mode — ask follow-up questions mid-playback.", url: 'https://blog.google/technology/ai/notebooklm-update-io-2025/' },
];

document.addEventListener('DOMContentLoaded', () => {
  const onboarding = document.getElementById('onboarding');
  const mainContent = document.getElementById('main-content');
  const settingsBtn = document.getElementById('settings-btn');
  const settingsPanel = document.getElementById('settings-panel');
  const settingsClose = document.getElementById('settings-close');
  const geminiKeyInput = document.getElementById('gemini-key-input');
  const openrouterKeyInput = document.getElementById('openrouter-key-input');
  const saveKeysBtn = document.getElementById('save-keys-btn');
  const clearKeysBtn = document.getElementById('clear-keys-btn');
  const toggleGeminiKey = document.getElementById('toggle-gemini-key');
  const toggleOpenrouterKey = document.getElementById('toggle-openrouter-key');
  const onboardGeminiInput = document.getElementById('onboard-gemini-input');
  const onboardOpenrouterInput = document.getElementById('onboard-openrouter-input');
  const onboardSaveBtn = document.getElementById('onboard-save-btn');
  const summaryBtn = document.getElementById('summary-btn');
  const summaryArea = document.getElementById('summary-area');
  const list = document.getElementById('announcement-list');
  const readCountEl = document.getElementById('read-count');

  let activeCat = 'all';
  let readState = {};
  let summaryGenerated = false;

  // ---- Onboarding ----
  function showOnboarding() {
    onboarding.classList.remove('hidden');
    mainContent.classList.add('hidden');
  }
  function hideOnboarding() { onboarding.classList.add('hidden'); }

  document.getElementById('onboard-toggle-gemini').addEventListener('click', () => {
    onboardGeminiInput.type = onboardGeminiInput.type === 'password' ? 'text' : 'password';
  });
  document.getElementById('onboard-toggle-openrouter').addEventListener('click', () => {
    onboardOpenrouterInput.type = onboardOpenrouterInput.type === 'password' ? 'text' : 'password';
  });

  onboardSaveBtn.addEventListener('click', () => {
    const gk = onboardGeminiInput.value.trim(), ok = onboardOpenrouterInput.value.trim();
    if (!gk && !ok) {
      onboardSaveBtn.textContent = '⚠️ Enter at least one key';
      setTimeout(() => { onboardSaveBtn.textContent = 'Get Started →'; }, 2000);
      return;
    }
    const updates = {};
    if (gk) updates.gemini_api_key = gk;
    if (ok) updates.openrouter_api_key = ok;
    chrome.storage.local.set(updates, () => { hideOnboarding(); initApp(); });
  });

  // ---- Init ----
  function initApp() {
    mainContent.classList.remove('hidden');
    chrome.storage.session.get(['io_read_state', 'io_active_cat', 'io_summary'], (data) => {
      if (data.io_read_state) readState = data.io_read_state;
      if (data.io_active_cat) activeCat = data.io_active_cat;
      if (data.io_summary) {
        summaryGenerated = true;
        renderSummary(data.io_summary);
      }
      setActiveFilter(activeCat);
      renderList();
      updateReadCount();
    });
  }

  chrome.storage.local.get(['gemini_api_key', 'openrouter_api_key'], (keys) => {
    if (!keys.gemini_api_key && !keys.openrouter_api_key) showOnboarding();
    else initApp();
  });

  // ---- Filter pills ----
  document.getElementById('filter-row').addEventListener('click', (e) => {
    const pill = e.target.closest('.pill');
    if (!pill) return;
    activeCat = pill.dataset.cat;
    setActiveFilter(activeCat);
    renderList();
    chrome.storage.session.set({ io_active_cat: activeCat });
  });

  function setActiveFilter(cat) {
    document.querySelectorAll('.pill').forEach(p => {
      p.classList.toggle('active', p.dataset.cat === cat);
    });
  }

  // ---- Render list ----
  function renderList() {
    const filtered = activeCat === 'all'
      ? ANNOUNCEMENTS
      : ANNOUNCEMENTS.filter(a => a.cat === activeCat);

    if (filtered.length === 0) {
      list.innerHTML = '<div class="no-results">No announcements in this category.</div>';
      return;
    }

    list.innerHTML = filtered.map(a => {
      const checked = readState[a.id] ? 'checked' : '';
      const readClass = readState[a.id] ? 'is-read' : '';
      return `
        <div class="announce-item ${readClass}" data-id="${a.id}">
          <div class="announce-row">
            <label class="announce-check" onclick="event.stopPropagation()">
              <input type="checkbox" class="read-checkbox" data-id="${a.id}" ${checked}>
              <span class="check-box"></span>
            </label>
            <div class="announce-title">${escapeHtml(a.title)}</div>
            <span class="cat-badge">${a.cat}</span>
            <span class="chevron">›</span>
          </div>
          <div class="announce-detail hidden">
            <p>${escapeHtml(a.desc)}</p>
            <a href="${a.url}" class="announce-link" target="_blank">Learn more ↗</a>
          </div>
        </div>
      `;
    }).join('');

    // Chevron expand/collapse — clicks on row but not on the checkbox label
    list.querySelectorAll('.announce-row').forEach(row => {
      row.addEventListener('click', (e) => {
        if (e.target.closest('.announce-check')) return;
        const item = row.closest('.announce-item');
        const detail = item.querySelector('.announce-detail');
        item.classList.toggle('expanded');
        detail.classList.toggle('hidden');
      });
    });

    // Checkbox read state
    list.querySelectorAll('.read-checkbox').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const id = parseInt(cb.dataset.id);
        readState[id] = cb.checked;
        const item = cb.closest('.announce-item');
        item.classList.toggle('is-read', cb.checked);
        updateReadCount();
        chrome.storage.session.set({ io_read_state: readState });
      });
    });
  }

  function updateReadCount() {
    const count = Object.values(readState).filter(Boolean).length;
    readCountEl.textContent = count;
  }

  // ---- Gemini Summary ----
  summaryBtn.addEventListener('click', () => {
    if (summaryGenerated) return;
    summaryBtn.textContent = '✦ Generating…';
    summaryBtn.disabled = true;

    const titles = ANNOUNCEMENTS.map((a, i) => `${i + 1}. [${a.cat.toUpperCase()}] ${a.title}`).join('\n');
    const prompt = `Here are all 18 Google I/O 2026 announcements:\n\n${titles}\n\nWrite a developer-focused summary of the 3 most important announcements from Google I/O 2026 and why they matter for developers building web and AI applications. Be specific and concrete. 3-4 sentences total. No bullet points. No markdown headers.`;

    chrome.runtime.sendMessage(
      { action: 'callGeminiBackground', prompt, options: { temperature: 0.4, maxTokens: 200 } },
      (response) => {
        if (response?.success) {
          summaryGenerated = true;
          const text = response.data.trim();
          renderSummary(text);
          chrome.storage.session.set({ io_summary: text });
          summaryBtn.textContent = '✦ Summary Generated';
        } else {
          summaryBtn.textContent = '✦ Gemini Summary';
          summaryBtn.disabled = false;
        }
      }
    );
  });

  function renderSummary(text) {
    summaryArea.innerHTML = `<div class="summary-card"><div class="summary-label">Gemini Developer Summary</div>${escapeHtml(text)}</div>`;
    summaryBtn.textContent = '✦ Summary Generated';
    summaryBtn.disabled = true;
  }

  function escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ---- Settings panel ----
  function openSettings() {
    settingsPanel.classList.remove('hidden');
    settingsPanel.classList.add('fade-in');
    chrome.storage.local.get(['gemini_api_key', 'openrouter_api_key'], (data) => {
      geminiKeyInput.value = data.gemini_api_key || '';
      openrouterKeyInput.value = data.openrouter_api_key || '';
    });
  }
  function closeSettings() {
    settingsPanel.classList.add('hidden');
    settingsPanel.classList.remove('fade-in');
  }

  settingsBtn.addEventListener('click', openSettings);
  settingsClose.addEventListener('click', closeSettings);
  toggleGeminiKey.addEventListener('click', () => {
    geminiKeyInput.type = geminiKeyInput.type === 'password' ? 'text' : 'password';
  });
  toggleOpenrouterKey.addEventListener('click', () => {
    openrouterKeyInput.type = openrouterKeyInput.type === 'password' ? 'text' : 'password';
  });

  saveKeysBtn.addEventListener('click', () => {
    const updates = {};
    const gk = geminiKeyInput.value.trim(), ok = openrouterKeyInput.value.trim();
    if (gk) updates.gemini_api_key = gk;
    if (ok) updates.openrouter_api_key = ok;
    if (!Object.keys(updates).length) return;
    chrome.storage.local.set(updates, () => {
      saveKeysBtn.textContent = '✅ Saved';
      setTimeout(() => { saveKeysBtn.textContent = 'Save Keys'; }, 1500);
    });
  });

  clearKeysBtn.addEventListener('click', () => {
    chrome.storage.local.remove(['gemini_api_key', 'openrouter_api_key'], () => {
      geminiKeyInput.value = '';
      openrouterKeyInput.value = '';
      clearKeysBtn.textContent = '✅ Cleared';
      setTimeout(() => { clearKeysBtn.textContent = 'Clear All Keys'; }, 1500);
    });
  });
});
