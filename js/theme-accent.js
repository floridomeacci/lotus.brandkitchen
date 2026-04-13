// Global accent theme controller for all Lotus widgets.
(function () {
  const STORAGE_KEY = 'lotus:accent';
  const DEFAULT_ACCENT = '#fff200';

  // Widget config field definitions — drives the settings UI per widget
  const WIDGET_CONFIG_FIELDS = {
    'ad-generator': [
      { key: 'cardDescription', label: 'Dashboard Card Description', type: 'text' },
      { key: 'socialHandle', label: 'Social Handle', type: 'text' }
    ],
    'creative-copywriter': [
      { key: 'cardDescription', label: 'Dashboard Card Description', type: 'text' },
      { key: 'systemPrompt_headline', label: 'System Prompt — Headline Agent', type: 'textarea', placeholder: 'Write 5 compelling headlines based on this brief. Number them 1-5. Keep each under 10 words. Be creative and punchy.' },
      { key: 'systemPrompt_social', label: 'System Prompt — Social Copy Agent', type: 'textarea', placeholder: 'Write social media copy based on this brief. Include: 1 Instagram caption (with emojis), 1 LinkedIn post (professional tone), 1 X/Twitter post (under 280 chars). Label each clearly.' },
      { key: 'systemPrompt_refine', label: 'System Prompt — Refine & Polish', type: 'textarea', placeholder: 'Refine and polish this copy. Fix grammar, improve flow, make it punchier and more impactful. Return only the improved text.' },
      { key: 'systemPrompt_freestyle', label: 'System Prompt — Freestyle', type: 'textarea', placeholder: 'Custom prompt — the user writes their own instruction on the node.' },
      { key: 'systemPrompt_translate', label: 'System Prompt — Translate', type: 'textarea', placeholder: 'Culturally adapt and translate this text. Adapt idioms, tone, and cultural references.' },
      { key: 'systemPrompt_truncate', label: 'System Prompt — Truncate', type: 'textarea', placeholder: 'Shorten this text. Keep the core message and tone intact. Return only the shortened text.' },
      { key: 'systemPrompt_doneornot', label: 'System Prompt — Done or Not', type: 'textarea', placeholder: 'Analyse this campaign idea and check whether it has been done before. Search advertising campaigns, award-winning work. Rate originality 1-10.' },
      { key: 'systemPrompt_whatif', label: 'System Prompt — What If', type: 'textarea', placeholder: 'Generate 8 bold "What if..." questions that challenge assumptions and open unexpected creative territories.' },
      { key: 'systemPrompt_futuremap', label: 'System Prompt — Future Mapper', type: 'textarea', placeholder: 'Identify 5 emerging cultural or technological shifts the brand could explore. Think beyond obvious trends.' },
      { key: 'systemPrompt_confidant', label: 'System Prompt — Creative Confidant', type: 'textarea', placeholder: 'Assess this campaign idea. Rate out of 10 across: Brand Fit, Strategic Alignment, Creative Ambition, Audience Resonance, Executional Feasibility.' },
      { key: 'systemPrompt_bravething', label: 'System Prompt — The Brave Thing', type: 'textarea', placeholder: 'Assess this idea on a Disruption Scale of 1-10. Break down: Convention Challenge, Cultural Tension, Brand Risk, Legacy Potential.' }
    ],
    'briefing-agent': [
      { key: 'cardDescription', label: 'Dashboard Card Description', type: 'text' },
      { key: 'toneOptions', label: 'Tone Options (comma-separated)', type: 'text' }
    ],
    'brand-guardian': [
      { key: 'cardDescription', label: 'Dashboard Card Description', type: 'text' }
    ],
    'content-kalender': [
      { key: 'cardDescription', label: 'Dashboard Card Description', type: 'text' }
    ],
    'creative-cooker': [
      { key: 'cardDescription', label: 'Dashboard Card Description', type: 'text' },
      { key: 'systemPrompt_scrutinizer', label: 'System Prompt — Idea Scrutinizer', type: 'textarea', placeholder: 'Analyse this idea critically: Originality Check, Strength, Weakness, Audience Resonance, Executional Risk. Rate 1-10.' },
      { key: 'systemPrompt_cultural', label: 'System Prompt — Cultural Insight', type: 'textarea', placeholder: 'Analyse this idea through a cultural lens: Cultural Tensions, Zeitgeist Fit, Audience Tribes, Geographic Sensitivity, Cultural Longevity.' },
      { key: 'systemPrompt_reframer', label: 'System Prompt — Reframer', type: 'textarea', placeholder: 'Take an idea and its critique, synthesize a stronger version: Reframed Concept, New Angle, Provocative Hook, Execution Spark, Bold Move.' },
      { key: 'systemPrompt_freestyle', label: 'System Prompt — Freestyle', type: 'textarea', placeholder: 'Custom prompt — the user writes their own instruction on the node.' },
      { key: 'systemPrompt_whatif', label: 'System Prompt — What If', type: 'textarea', placeholder: 'Generate 8 bold "What if..." questions that challenge assumptions and open unexpected creative territories.' },
      { key: 'systemPrompt_futuremap', label: 'System Prompt — Future Mapper', type: 'textarea', placeholder: 'Identify 5 emerging cultural or technological shifts the brand could explore. Look at the edges of culture.' },
      { key: 'systemPrompt_confidant', label: 'System Prompt — Creative Confidant', type: 'textarea', placeholder: 'Rate this campaign idea out of 10 across: Brand Fit, Strategic Alignment, Creative Ambition, Audience Resonance, Executional Feasibility.' },
      { key: 'systemPrompt_bravething', label: 'System Prompt — The Brave Thing', type: 'textarea', placeholder: 'Assess this idea on a Disruption Scale of 1-10: Convention Challenge, Cultural Tension, Brand Risk, Legacy Potential.' }
    ],
    'insight-generator': [
      { key: 'cardDescription', label: 'Dashboard Card Description', type: 'text' },
      { key: 'framework', label: 'Framework Name', type: 'text' },
      { key: 'markets', label: 'Markets (JSON array)', type: 'textarea', placeholder: '["NL", "UK", "DE"]' },
      { key: 'templates', label: 'Templates (JSON array of objects)', type: 'textarea', placeholder: '[{"name":"...","description":"...","promptInstruction":"...","jsonSchema":"..."}]' },
      { key: 'features', label: 'Focus Point Suggestions (JSON object)', type: 'textarea', placeholder: '{"Sustainability": "description...", "Pricing": "description..."}' }
    ],
    'iab-bannerset': [
      { key: 'cardDescription', label: 'Dashboard Card Description', type: 'text' }
    ],
    'visual-generator': [
      { key: 'cardDescription', label: 'Dashboard Card Description', type: 'text' },
      { key: 'visualStyles', label: 'Visual Styles', type: 'list' },
      { key: 'systemPrompt_generate', label: 'Prompt — Generate Image', type: 'textarea', placeholder: 'Default image generation prompt (combined with user input)' },
      { key: 'systemPrompt_restyle', label: 'Prompt — Restyle Image', type: 'textarea', placeholder: 'Style instructions for restyling images' },
      { key: 'systemPrompt_describe', label: 'Prompt — Describe Image', type: 'textarea', placeholder: 'Analyze this image. Describe the composition, subjects, lighting, mood, color palette, and style in detail.' },
      { key: 'systemPrompt_refine', label: 'Prompt — Refine Prompt', type: 'textarea', placeholder: 'Take this visual prompt and dramatically improve it. Add details about composition, lighting, camera angle, lens type, color palette, mood, and style.' },
      { key: 'systemPrompt_freestyle', label: 'Prompt — Freestyle', type: 'textarea', placeholder: 'Custom prompt — the user writes their own instruction on the node.' }
    ],
    'restyle-photo': [
      { key: 'cardDescription', label: 'Dashboard Card Description', type: 'text' },
      { key: 'photographyStyle', label: 'Photography Style', type: 'text' },
      { key: 'stylePrompt_seasonal', label: 'Style Prompt — Seasonal', type: 'textarea', placeholder: 'Spring / Summer / Autumn / Winter — soft pastels, vivid sun, golden foliage, frosted textures' },
      { key: 'stylePrompt_cinematic', label: 'Style Prompt — Cinematic', type: 'textarea', placeholder: 'Volumetric lighting, anamorphic flare, teal-orange grading, film grain' },
      { key: 'stylePrompt_editorial', label: 'Style Prompt — Editorial', type: 'textarea', placeholder: 'Clean diffused light, muted neutral tones, high-fashion, minimalist' },
      { key: 'stylePrompt_urbannight', label: 'Style Prompt — Urban Night', type: 'textarea', placeholder: 'Neon reflections, wet pavement, electric city glow, moody cyan' },
      { key: 'stylePrompt_studiominimal', label: 'Style Prompt — Studio Minimal', type: 'textarea', placeholder: 'Seamless background, clean edges, product feel, minimal lighting' },
      { key: 'stylePrompt_goldenhour', label: 'Style Prompt — Golden Hour', type: 'textarea', placeholder: 'Sun low on horizon, warm amber, long shadows, dreamy gradient sky' },
      { key: 'stylePrompt_moodynoir', label: 'Style Prompt — Moody Noir', type: 'textarea', placeholder: 'Harsh side lighting, deep shadows, high contrast, film grain' }
    ],
    'create-photo': [
      { key: 'cardDescription', label: 'Dashboard Card Description', type: 'text' },
      { key: 'photographyStyle', label: 'Photography Style', type: 'text' }
    ],
    'ugc-video': [
      { key: 'cardDescription', label: 'Dashboard Card Description', type: 'text' },
      { key: 'products', label: 'Products (JSON)', type: 'json' }
    ],
    'data-dashboard': [
      { key: 'cardDescription', label: 'Dashboard Card Description', type: 'text' }
    ],
    'asset-scaler': [
      { key: 'cardDescription', label: 'Dashboard Card Description', type: 'text' },
      { key: 'formats', label: 'Output Formats (JSON)', type: 'json' }
    ],
    'campaign-scanner': [
      { key: 'cardDescription', label: 'Dashboard Card Description', type: 'text' }
    ],
    'what-if-generator': [
      { key: 'cardDescription', label: 'Dashboard Card Description', type: 'text' }
    ],
    'future-mapper': [
      { key: 'cardDescription', label: 'Dashboard Card Description', type: 'text' }
    ],
    'brave-thing': [
      { key: 'cardDescription', label: 'Dashboard Card Description', type: 'text' }
    ]
  };

  const WIDGET_NAMES = {
    'data-dashboard': 'Data Dashboard',
    'creative-copywriter': 'Creative Copywriter',
    'iab-bannerset': 'IAB Bannerset',
    'content-kalender': 'Content Planner',
    'asset-scaler': 'Asset Scaler',
    'brand-guardian': 'Brand Guardian',
    'briefing-agent': 'Briefing Agent',
    'visual-generator': 'Visual Studio',
    'ad-generator': 'Social AD Generator',
    'creative-cooker': 'Creative Cooker',
    'insight-generator': 'Insight Generator',
    'restyle-photo': 'Restyle Photo',
    'create-photo': 'Brand Ambassador',
    'brand-reviewer': 'Brand Reviewer',
    'ugc-video': 'UGC Video Creator',
    'campaign-scanner': 'Campaign Scanner',
    'what-if-generator': 'What If Generator',
    'future-mapper': 'Future Mapper',
    'brave-thing': 'The Brave Thing'
  };

  const BRAND_GUIDELINE_SECTIONS = [
    { key: 'about', label: 'About' },
    { key: 'vision', label: 'Vision' },
    { key: 'mission', label: 'Mission' },
    { key: 'tone_of_voice', label: 'Tone' },
    { key: 'dos_donts', label: "Do's & Don'ts" },
    { key: 'growth_audiences', label: 'Audiences' },
    { key: 'cultural_tenants', label: 'Values' },
    { key: 'colors', label: 'Colors' },
    { key: 'photography', label: 'Photography' }
  ];

  // Per-agent default brand guideline selections (keys that should be ON by default)
  // Agents not listed here get all tags on by default
  const DEFAULT_BRAND_TAGS = {
    'iab-bannerset': ['tone_of_voice', 'dos_donts', 'colors', 'photography'],
    'creative-cooker': ['about', 'vision', 'mission', 'dos_donts', 'growth_audiences', 'cultural_tenants'],
    'visual-generator': ['about', 'tone_of_voice', 'colors', 'photography'],
    'ad-generator': ['about', 'tone_of_voice', 'dos_donts', 'growth_audiences', 'colors'],
    'creative-copywriter': ['about', 'tone_of_voice', 'dos_donts', 'growth_audiences'],
    'insight-generator': ['about', 'growth_audiences', 'cultural_tenants'],
    'what-if-generator': ['about', 'vision', 'mission', 'growth_audiences', 'cultural_tenants'],
    'future-mapper': ['about', 'vision', 'growth_audiences', 'cultural_tenants'],
    'brave-thing': ['about', 'vision', 'mission', 'cultural_tenants']
  };

  // Agents where brand guideline toggles should be hidden from the UI
  // NO_BRAND = don't inject brand data at all; MANDATORY = always inject (no user toggle)
  const NO_BRAND_GUIDELINES = new Set(['content-kalender', 'asset-scaler', 'briefing-agent', 'data-dashboard', 'asset-library', 'campaign-scanner']);
  const MANDATORY_BRAND_GUIDELINES = new Set(['brand-guardian', 'restyle-photo', 'ugc-video', 'create-photo']);
  const HIDE_BRAND_PILLS = new Set([...NO_BRAND_GUIDELINES, ...MANDATORY_BRAND_GUIDELINES]);

  function normalizeHex(value) {
    if (!value || typeof value !== 'string') return null;
    const hex = value.trim().toLowerCase();
    const match = hex.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (!match) return null;
    if (match[1].length === 3) {
      return `#${match[1][0]}${match[1][0]}${match[1][1]}${match[1][1]}${match[1][2]}${match[1][2]}`;
    }
    return `#${match[1]}`;
  }

  function hexToRgb(hex) {
    const v = normalizeHex(hex) || DEFAULT_ACCENT;
    const n = v.replace('#', '');
    const r = parseInt(n.slice(0, 2), 16);
    const g = parseInt(n.slice(2, 4), 16);
    const b = parseInt(n.slice(4, 6), 16);
    return { r, g, b };
  }

  function getAccentContrast(hex) {
    const { r, g, b } = hexToRgb(hex);
    const toLinear = (c) => {
      const v = c / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    const L = 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
    // WCAG-friendly split: light accents get dark text, dark accents get white text.
    return L > 0.45 ? '#111316' : '#ffffff';
  }

  function applyAccent(hex) {
    const value = normalizeHex(hex) || DEFAULT_ACCENT;
    const { r, g, b } = hexToRgb(value);
    const root = document.documentElement;

    root.style.setProperty('--accent', value);
    root.style.setProperty('--accent-rgb', `${r}, ${g}, ${b}`);
    root.style.setProperty('--accent-contrast', getAccentContrast(value));

    // --yellow is deprecated — all CSS/JS now uses --accent directly.

    return value;
  }

  function saveAccent(hex) {
    try {
      localStorage.setItem(STORAGE_KEY, hex);
    } catch {
      // Ignore storage failures.
    }
  }

  function getStoredAccent() {
    try {
      return normalizeHex(localStorage.getItem(STORAGE_KEY));
    } catch {
      return null;
    }
  }

  function injectAccentControl(initialAccent) {
    if (document.querySelector('.accent-theme-control')) return;

    // Global Settings wrap — sidebar.js embeds this inline in the settings tab

    const wrap = document.createElement('div');
    wrap.className = 'accent-theme-control';
    wrap.innerHTML = `
      <div class="theme-modal-head">
        <h3>Global Settings</h3>
        <button class="theme-close-btn" type="button" aria-label="Close theme settings">×</button>
      </div>

      <div class="global-section" data-settings-section="global">
        <div class="global-section-header">
          <span class="global-section-label">Client</span>
          <div class="client-cards-actions">
            <button id="addClientBtn" class="settings-action-btn settings-action-btn--small" type="button" title="Add new client"><i class="bi bi-plus-lg"></i></button>
            <button id="onboardClientBtn" class="settings-action-btn settings-action-btn--small" type="button" title="Run onboarding wizard on current client"><i class="bi bi-rocket-takeoff"></i></button>
            <button id="deleteClientBtn" class="settings-action-btn settings-action-btn--small settings-action-btn--danger" type="button" title="Delete client"><i class="bi bi-trash3"></i></button>
          </div>
        </div>
        <select id="clientSelectInput" class="accent-hex-input" style="display:none"></select>
        <div id="clientCardsWrap" class="client-cards-grid"></div>
        <div id="newClientRow" style="display:none;grid-template-columns:1fr 1fr auto;gap:8px;align-items:center;">
          <input id="clientKeyInput" class="accent-hex-input" type="text" placeholder="client-key (e.g. odido)" />
          <input id="clientNameInput" class="accent-hex-input" type="text" placeholder="Display name" />
          <button id="createClientBtn" class="settings-action-btn settings-action-btn--small" type="button" title="Create client"><i class="bi bi-check-lg"></i></button>
        </div>
      </div>

      <div id="existingClientRow" class="global-section" data-settings-section="global" style="display:none;">
        <span class="global-section-label">Details</span>
        <div class="global-client-detail">
          <input id="clientNameInput2" class="accent-hex-input" type="text" placeholder="Client name" />
          <div class="logo-upload-control">
            <img id="logoPreview" class="logo-preview-img" src="" alt="" />
            <label class="settings-action-btn settings-action-btn--small" title="Upload logo">
              <i class="bi bi-upload"></i>
              <input id="logoFileInput" type="file" accept="image/*" style="display:none" />
            </label>
          </div>
        </div>
        <input id="logoPathInput" class="accent-hex-input" type="text" style="display:none" />
      </div>

      <div class="global-section" data-settings-section="global" id="brandImportSection"></div>

      <div id="accentColorSection" style="display:none;">
          <input id="accentColorInput" class="accent-color-input" type="color" value="${initialAccent}" aria-label="Pick global accent color" />
          <input id="accentHexInput" class="accent-hex-input" type="text" value="${initialAccent}" maxlength="7" aria-label="Accent hex value" />
      </div>

      <div class="settings-section" data-settings-section="agents">
          <label class="accent-control-label"><i class="bi bi-stars"></i> AI Auto-fill</label>
          <p class="thumb-tools-hint">Describe the client in one sentence — AI will fill accent color, logo suggestion, and all widget subjects.</p>
          <textarea id="aiPromptInput" class="accent-hex-input ai-prompt-textarea" placeholder="e.g. Odido is a Dutch telecom brand with orange branding, targeting young digital-first consumers..."></textarea>
          <button id="aiAutofillBtn" class="thumb-generate-btn" type="button">
            <i class="bi bi-stars"></i>
            <span>Fill with AI</span>
          </button>
      </div>

      <div class="settings-section settings-agents-section" data-settings-section="agents">
        <div class="settings-section-head">
          <label class="accent-control-label">Agents</label>
          <span id="agentCount" class="settings-agent-count"></span>
        </div>
        <div id="subjectFieldsWrap" class="settings-agents-grid"></div>
      </div>

      <div class="settings-section settings-actions-bar" data-settings-section="global agents">
        <button id="saveSettingsBtn" class="thumb-generate-btn" type="button" style="display:none">
          <i class="bi bi-save2"></i>
          <span>Save Settings</span>
        </button>
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <button id="thumbGenerateZipBtn" class="thumb-generate-btn" type="button">
            <i class="bi bi-images"></i>
            <span>Generate All Assets</span>
          </button>
          <label id="globalRefLabel" class="settings-action-btn" title="Add global reference images for all thumbnails" style="gap:6px;width:auto;padding:0 12px;font-size:12px;cursor:pointer">
            <i class="bi bi-image"></i>
            <span id="globalRefText">Reference Images</span>
            <input type="file" accept="image/*" multiple id="globalRefInput" style="display:none" />
          </label>
        </div>
        <p id="thumbGenStatus" class="thumb-gen-status" aria-live="polite"></p>
      </div>

      <!-- ═══ New Client Onboarding Wizard ═══ -->
      <div id="wizardOverlay" class="wiz-overlay" style="display:none">
        <div class="wiz-panel">
          <button id="wizClose" class="wiz-close" type="button" aria-label="Close"><i class="bi bi-x-lg"></i></button>

          <!-- Progress bar -->
          <div class="wiz-progress">
            <div class="wiz-progress-fill" id="wizProgressFill" style="width:25%"></div>
          </div>
          <div class="wiz-step-labels">
            <span class="wiz-step-label active" data-wiz="0"><i class="bi bi-building"></i> Create</span>
            <span class="wiz-step-label" data-wiz="1"><i class="bi bi-palette2"></i> Brand</span>
            <span class="wiz-step-label" data-wiz="2"><i class="bi bi-file-earmark-text"></i> Guidelines</span>
            <span class="wiz-step-label" data-wiz="3"><i class="bi bi-stars"></i> Configure</span>
          </div>

          <div class="wiz-body">
            <!-- Step 0: Client name + key -->
            <div class="wiz-step active" data-wiz-step="0">
              <div class="wiz-step-icon"><i class="bi bi-building"></i></div>
              <h2 class="wiz-step-title">Create your client workspace</h2>
              <p class="wiz-step-desc">Give your client a unique ID and display name. Everything else will be set up automatically.</p>
              <div class="wiz-field-group">
                <label class="wiz-field-label" for="wizClientKey">Client ID <span class="wiz-field-hint">lowercase, no spaces</span></label>
                <input id="wizClientKey" class="wiz-input" type="text" placeholder="odido" autocomplete="off" />
              </div>
              <div class="wiz-field-group">
                <label class="wiz-field-label" for="wizClientName">Display Name</label>
                <input id="wizClientName" class="wiz-input" type="text" placeholder="Odido" autocomplete="off" />
              </div>
              <p class="wiz-step-note" id="wizStep0Hint"><i class="bi bi-info-circle"></i> Next, we'll import brand assets automatically.</p>
              <p class="wiz-step-note" id="wizStep0HintExisting" style="display:none"><i class="bi bi-arrow-repeat"></i> Re-running onboarding — existing brand data will be refreshed.</p>
            </div>

            <!-- Step 1: Import Brand Data (Brandfetch) -->
            <div class="wiz-step" data-wiz-step="1">
              <div class="wiz-step-icon"><i class="bi bi-palette2"></i></div>
              <h2 class="wiz-step-title">Import brand identity</h2>
              <p class="wiz-step-desc">Enter the brand's website — we'll extract logos, colors, and typography automatically.</p>
              <div class="wiz-field-group">
                <label class="wiz-field-label" for="wizDomain">Website domain</label>
                <div class="wiz-input-icon-wrap">
                  <i class="bi bi-globe2"></i>
                  <input id="wizDomain" class="wiz-input wiz-input--icon" type="text" placeholder="odido.nl" autocomplete="off" />
                </div>
              </div>
              <div id="wizBfPreview" class="wiz-result-card" style="display:none"></div>
              <div id="wizBfStatus" class="wiz-status-area"></div>
            </div>

            <!-- Step 2: Generate Brand Guidelines -->
            <div class="wiz-step" data-wiz-step="2">
              <div class="wiz-step-icon"><i class="bi bi-file-earmark-text"></i></div>
              <h2 class="wiz-step-title">Generate brand guidelines</h2>
              <p class="wiz-step-desc">AI will research the brand and create a comprehensive brief — tone of voice, mission, do's & don'ts, and more.</p>
              <div id="wizGuidelinesStatus" class="wiz-status-area"></div>
              <div id="wizGuidelinesPreview" class="wiz-result-card wiz-result-card--scroll" style="display:none"></div>
            </div>

            <!-- Step 3: AI Auto-fill Agents -->
            <div class="wiz-step" data-wiz-step="3">
              <div class="wiz-step-icon"><i class="bi bi-stars"></i></div>
              <h2 class="wiz-step-title">Configure agents with AI</h2>
              <p class="wiz-step-desc">Describe the client in a sentence — AI will configure all agent prompts and generate thumbnails.</p>
              <div class="wiz-field-group">
                <label class="wiz-field-label" for="wizAiPrompt">Client description</label>
                <textarea id="wizAiPrompt" class="wiz-input wiz-textarea" placeholder="Odido is a Dutch telecom brand targeting young, digital-first consumers. They use bold orange branding and a playful, confident tone." rows="3"></textarea>
              </div>
              <div id="wizAiStatus" class="wiz-status-area"></div>
            </div>
          </div>

          <div class="wiz-footer">
            <button id="wizBack" class="wiz-btn wiz-btn--ghost" type="button" style="display:none"><i class="bi bi-arrow-left"></i> Back</button>
            <div class="wiz-footer-spacer"></div>
            <button id="wizSkip" class="wiz-btn wiz-btn--ghost" type="button" style="display:none">Skip this step</button>
            <button id="wizNext" class="wiz-btn wiz-btn--primary" type="button">Create Client <i class="bi bi-arrow-right"></i></button>
          </div>
        </div>
      </div>
    `;

    wrap.style.display = 'none';
    document.body.appendChild(wrap);

    const colorInput = wrap.querySelector('#accentColorInput');
    const hexInput = wrap.querySelector('#accentHexInput');
    const closeBtn = wrap.querySelector('.theme-close-btn');
    const clientSelect = wrap.querySelector('#clientSelectInput');
    const clientKeyInput = wrap.querySelector('#clientKeyInput');
    const clientNameInput2 = wrap.querySelector('#clientNameInput2');
    const newClientNameInput = wrap.querySelector('#clientNameInput');
    const newClientRow = wrap.querySelector('#newClientRow');
    const existingClientRow = wrap.querySelector('#existingClientRow');
    const logoPathInput = wrap.querySelector('#logoPathInput');
    const logoFileInput = wrap.querySelector('#logoFileInput');
    const logoPreview = wrap.querySelector('#logoPreview');
    const subjectFieldsWrap = wrap.querySelector('#subjectFieldsWrap');
    const saveSettingsBtn = wrap.querySelector('#saveSettingsBtn');
    const addClientBtn = wrap.querySelector('#addClientBtn');
    const createClientBtn = wrap.querySelector('#createClientBtn');
    const deleteClientBtn = wrap.querySelector('#deleteClientBtn');
    const aiPromptInput = wrap.querySelector('#aiPromptInput');
    const aiAutofillBtn = wrap.querySelector('#aiAutofillBtn');
    const thumbBtn = wrap.querySelector('#thumbGenerateZipBtn');
    const thumbStatus = wrap.querySelector('#thumbGenStatus');
    let settingsData = null;
    let isAddingNewClient = false;

    function applyLogoPath(logoPath) {
      if (!logoPath) return;
      document.querySelectorAll('.lotus-logo').forEach((img) => {
        img.src = logoPath;
      });
    }

    let _thumbVersion = Date.now();
    const _refImages = {};  // slug -> array of base64 data URIs for thumbnail reference images
    let _globalRefImages = [];  // global reference images applied to all agents
    function getThumbUrl(slug, ckOverride) {
      const ck = ckOverride || (clientSelect ? clientSelect.value || 'lotus' : 'lotus');
      // R2 path for generated/uploaded thumbs; static fallback for originals
      return `/r2/thumbnails/${ck}/${slug}.webp?v=${_thumbVersion}`;
    }

    function staticThumbUrl(slug) {
      return `./assets/thumbnails/${slug}-thumb.png`;
    }

    function renderSubjects(widgets, widgetConfigs) {
      const disabledSet = new Set(settingsData?.disabledWidgets || []);
      const entries = Object.entries(widgets || {});
      const agentCountEl = wrap.querySelector('#agentCount');
      if (agentCountEl) {
        const enabledCount = entries.filter(([s]) => !disabledSet.has(s)).length;
        agentCountEl.textContent = enabledCount + ' of ' + entries.length + ' enabled';
      }

      const rows = entries
        .map(([slug, entry]) => {
          const subject = entry && entry.subject ? entry.subject : '';
          const configFields = WIDGET_CONFIG_FIELDS[slug] || [];
          const cfg = (widgetConfigs || {})[slug] || {};
          const isDisabled = disabledSet.has(slug);
          const name = WIDGET_NAMES[slug] || slug;

          // Brand guideline toggles (hidden for agents in HIDE_BRAND_PILLS)
          const showBrandPills = !HIDE_BRAND_PILLS.has(slug);
          const bgt = cfg.brandGuidelineToggles || {};
          const hasBgt = Object.keys(bgt).length > 0;
          const agentDefaults = DEFAULT_BRAND_TAGS[slug];
          const brandTogglesHtml = showBrandPills ? BRAND_GUIDELINE_SECTIONS.map(s => {
            const on = hasBgt ? bgt[s.key] !== false : (agentDefaults ? agentDefaults.includes(s.key) : true);
            return `<button class="brand-ctx-pill${on ? ' on' : ''}" data-brand-ctx="${slug}.${s.key}" type="button">${s.label}</button>`;
          }).join('') : '';

          // Config fields (excluding systemPrompt)
          const visibleFields = configFields.filter(f => f.key !== 'systemPrompt');

          const configFieldsHtml = visibleFields.map(f => {
            const val = cfg[f.key] !== undefined ? cfg[f.key] : '';
            if (f.type === 'list') {
              const items = Array.isArray(val) ? val : [];
              const itemsHtml = items.map((item, i) => {
                const esc = String(item).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
                return `<div class="wc-list-item">
                  <input class="accent-hex-input wc-list-input" data-wc-list="${slug}.${f.key}" type="text" value="${esc}" />
                  <button class="settings-action-btn settings-action-btn--small wc-list-delete" type="button" title="Remove"><i class="bi bi-dash-lg"></i></button>
                </div>`;
              }).join('');
              return `<label class="wc-field-label">${f.label}</label>
                <div class="wc-list-wrap" data-wc-list-key="${slug}.${f.key}">
                  ${itemsHtml}
                  <button class="settings-action-btn settings-action-btn--small wc-list-add" type="button" data-wc-list-add="${slug}.${f.key}" title="Add item"><i class="bi bi-plus-lg"></i></button>
                </div>`;
            }
            const displayVal = (f.type === 'json' && typeof val === 'object') ? JSON.stringify(val, null, 2) : String(val);
            const escaped = displayVal.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
            if (f.type === 'textarea' || f.type === 'json') {
              const ph = f.placeholder ? ` placeholder="${f.placeholder.replace(/"/g,'&quot;')}"` : '';
              return `<label class="wc-field-label">${f.label}</label>
                <textarea class="accent-hex-input wc-textarea" data-wc-field="${slug}.${f.key}" rows="${f.type === 'json' ? 6 : 3}"${ph}>${escaped}</textarea>`;
            }
            return `<label class="wc-field-label">${f.label}</label>
              <input class="accent-hex-input" data-wc-field="${slug}.${f.key}" type="text" value="${escaped}" />`;
          }).join('');

          return `
            <div class="agent-card${isDisabled ? ' agent-disabled' : ''}" data-row-slug="${slug}">
              <label class="agent-card-thumb" style="background:var(--accent-subtle-bg,rgba(var(--accent-rgb),.12));cursor:pointer" title="Click to upload thumbnail">
                <img src="${getThumbUrl(slug)}" alt="${name}" onerror="this.style.display='none'" />
                <input type="file" accept="image/*" data-thumb-click-slug="${slug}" style="display:none" />
              </label>
              <div class="agent-card-body">
                <span class="agent-card-name">${name}</span>
                <input class="accent-hex-input" data-widget-slug="${slug}" type="text" value="${String(subject).replace(/"/g, '&quot;')}" placeholder="Subject…" style="flex:1" />
                <div class="agent-card-controls">
                  <button class="agent-toggle${isDisabled ? '' : ' on'}" data-toggle-slug="${slug}" type="button" title="${isDisabled ? 'Enable' : 'Disable'}">
                    <span class="agent-toggle-dot"></span>
                  </button>
                  <button class="settings-action-btn settings-action-btn--small wc-expand-btn" type="button" data-expand-slug="${slug}" title="Configure"><i class="bi bi-sliders2"></i></button>
                </div>
                <div class="agent-card-actions">
                  <label class="settings-action-btn settings-action-btn--small" title="Upload thumbnail">
                    <i class="bi bi-upload"></i>
                    <input type="file" accept="image/*" data-upload-slug="${slug}" style="display:none" />
                  </label>
                  <label class="settings-action-btn settings-action-btn--small" title="Add reference images" data-ref-label="${slug}">
                    <i class="bi bi-image"></i>
                    <input type="file" accept="image/*" multiple data-ref-slug="${slug}" style="display:none" />
                  </label>
                  <button class="settings-action-btn settings-action-btn--small" type="button" data-regen-slug="${slug}" title="Regenerate">
                    <i class="bi bi-arrow-clockwise"></i>
                  </button>
                </div>
              </div>
              <div class="widget-config-panel" data-config-slug="${slug}" style="display:none;margin-top:8px;padding:10px 0 0;border-top:1px solid rgba(255,255,255,.06);">
                ${showBrandPills ? `<label class="wc-field-label" style="margin-bottom:2px">Brand Guidelines</label>
                <div class="brand-ctx-pills" style="display:flex;flex-wrap:wrap;gap:5px;margin:0 0 12px">${brandTogglesHtml}</div>` : ''}
                ${configFieldsHtml}
              </div>
            </div>
          `;
        })
        .join('');
      subjectFieldsWrap.innerHTML = rows
        ? `<div class="agent-grid-header" style="display:flex;align-items:center;gap:12px;padding:4px 0 8px;border-bottom:1px solid rgba(255,255,255,.08);margin-bottom:2px;">
            <span style="width:48px;flex-shrink:0"></span>
            <span style="width:160px;flex-shrink:0;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--muted)">Agent</span>
            <span style="flex:1;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--muted)">Thumbnail Prompt</span>
          </div>` + rows
        : '<p class="thumb-tools-hint">No agents found.</p>';

      // Wire toggle handlers
      subjectFieldsWrap.querySelectorAll('[data-toggle-slug]').forEach((btn) => {
        btn.addEventListener('click', () => {
          btn.classList.toggle('on');
          const card = btn.closest('.agent-card');
          card.classList.toggle('agent-disabled');
          btn.title = btn.classList.contains('on') ? 'Disable' : 'Enable';
          const allToggles = subjectFieldsWrap.querySelectorAll('[data-toggle-slug]');
          const enabled = [...allToggles].filter(t => t.classList.contains('on')).length;
          if (agentCountEl) agentCountEl.textContent = enabled + ' of ' + allToggles.length + ' enabled';
          scheduleAutoSave();
        });
      });

      // Wire per-widget upload handlers
      subjectFieldsWrap.querySelectorAll('[data-upload-slug]').forEach((input) => {
        input.addEventListener('change', () => uploadWidgetThumb(input.dataset.uploadSlug, input.files[0]));
      });

      // Wire click-on-thumbnail upload handlers
      subjectFieldsWrap.querySelectorAll('[data-thumb-click-slug]').forEach((input) => {
        input.addEventListener('change', () => { uploadWidgetThumb(input.dataset.thumbClickSlug, input.files[0]); input.value = ''; });
      });

      // Wire per-widget reference image handlers (multiple files)
      subjectFieldsWrap.querySelectorAll('[data-ref-slug]').forEach((input) => {
        input.addEventListener('change', () => {
          const slug = input.dataset.refSlug;
          const files = [...input.files];
          if (!files.length) return;
          _refImages[slug] = [];
          let loaded = 0;
          files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
              _refImages[slug].push(reader.result);
              loaded++;
              if (loaded === files.length) {
                const label = subjectFieldsWrap.querySelector(`[data-ref-label="${slug}"]`);
                if (label) { label.classList.add('ref-active'); label.title = files.length + ' reference image(s) — click to change'; }
                thumbStatus.textContent = `${files.length} reference image(s) set for ${slug}. Click regenerate to use.`;
              }
            };
            reader.readAsDataURL(file);
          });
        });
      });

      // Wire per-widget regenerate handlers
      subjectFieldsWrap.querySelectorAll('[data-regen-slug]').forEach((btn) => {
        btn.addEventListener('click', () => regenWidgetThumb(btn.dataset.regenSlug));
      });

      // Wire expand/collapse for config panels
      subjectFieldsWrap.querySelectorAll('[data-expand-slug]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const panel = subjectFieldsWrap.querySelector(`[data-config-slug="${btn.dataset.expandSlug}"]`);
          if (panel) {
            const isOpen = panel.style.display !== 'none';
            panel.style.display = isOpen ? 'none' : '';
            btn.classList.toggle('active', !isOpen);
          }
        });
      });

      // Wire list-field add / delete handlers
      subjectFieldsWrap.querySelectorAll('.wc-list-add').forEach((btn) => {
        btn.addEventListener('click', () => {
          const wrap = btn.closest('.wc-list-wrap');
          const listKey = btn.dataset.wcListAdd;
          const row = document.createElement('div');
          row.className = 'wc-list-item';
          row.innerHTML = `<input class="accent-hex-input wc-list-input" data-wc-list="${listKey}" type="text" value="" />
            <button class="settings-action-btn settings-action-btn--small wc-list-delete" type="button" title="Remove"><i class="bi bi-dash-lg"></i></button>`;
          wrap.insertBefore(row, btn);
          row.querySelector('.wc-list-delete').addEventListener('click', () => row.remove());
          row.querySelector('input').focus();
        });
      });
      subjectFieldsWrap.querySelectorAll('.wc-list-delete').forEach((btn) => {
        btn.addEventListener('click', () => btn.closest('.wc-list-item').remove());
      });

      // Wire brand guideline toggle pills
      subjectFieldsWrap.querySelectorAll('.brand-ctx-pill').forEach((pill) => {
        pill.addEventListener('click', () => {
          pill.classList.toggle('on');
          scheduleAutoSave();
        });
      });
    }

    async function uploadWidgetThumb(slug, file) {
      if (!file) return;
      thumbStatus.textContent = `Uploading ${slug}...`;
      try {
        const clientKey = clientSelect.value || 'lotus';
        const formData = new FormData();
        formData.append('file', file);
        formData.append('clientKey', clientKey);
        formData.append('path', `thumbnails/${clientKey}/${slug}.webp`);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        if (!res.ok) throw new Error('Upload failed');
        // Refresh the thumbnail image
        _thumbVersion = Date.now();
        const img = subjectFieldsWrap.querySelector(`[data-row-slug="${slug}"] .agent-card-thumb img`);
        if (img) { img.style.display = ''; img.src = getThumbUrl(slug); }
        thumbStatus.textContent = `${slug} thumbnail uploaded.`;
      } catch (err) {
        thumbStatus.textContent = `Upload failed: ${err.message}`;
      }
    }

    async function regenWidgetThumb(slug) {
      const subjectInput = subjectFieldsWrap.querySelector(`[data-widget-slug="${slug}"]`);
      const currentSubject = subjectInput ? subjectInput.value : '';
      const prompt = window.prompt('Edit the generation prompt:', currentSubject);
      if (prompt === null) return; // cancelled
      if (!prompt.trim()) { thumbStatus.textContent = 'Prompt cannot be empty.'; return; }

      const clientKey = clientSelect.value || 'lotus';
      const btn = subjectFieldsWrap.querySelector(`[data-regen-slug="${slug}"]`);
      if (btn) btn.disabled = true;
      const refImages = _refImages[slug] || _globalRefImages || [];
      const hasRef = refImages.length > 0;
      thumbStatus.textContent = `Generating ${slug}${hasRef ? ` (with ${refImages.length} reference image(s))` : ''}...`;
      try {
        const payload = { clientKey, slug, subject: prompt.trim() };
        if (hasRef) payload.referenceImages = refImages;
        const res = await fetch('/api/thumbnails/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          throw new Error(errBody.error || `Generation failed (${res.status})`);
        }
        // Write the (possibly edited) prompt back into the subject input
        if (subjectInput) subjectInput.value = prompt.trim();
        // Bust image cache so the new thumbnail shows immediately
        _thumbVersion = Date.now();
        const img = subjectFieldsWrap.querySelector(`[data-row-slug="${slug}"] .agent-card-thumb img`);
        if (img) { img.style.display = ''; img.src = getThumbUrl(slug); }
        thumbStatus.textContent = `${slug} thumbnail regenerated.`;
      } catch (err) {
        thumbStatus.textContent = `Failed: ${err.message}`;
      } finally {
        if (btn) btn.disabled = false;
      }
    }

    function populateClientOptions(clients, currentKey) {
      // Keep hidden select in sync for backward compat
      const options = Object.entries(clients || {})
        .map(([key, value]) => `<option value="${key}">${(value && value.name) || key}</option>`)
        .join('');
      clientSelect.innerHTML = options;
      clientSelect.value = currentKey;

      // Render visual client cards
      const cardsWrap = wrap.querySelector('#clientCardsWrap');
      if (cardsWrap) {
        cardsWrap.innerHTML = Object.entries(clients || {}).map(([key, c]) => {
          const active = key === currentKey ? ' client-card--active' : '';
          const name = (c && c.name) || key;
          const logo = c && c.logoPath;
          const accent = (c && c.accent) || '#666';
          const initial = name.charAt(0).toUpperCase();
          const logoHtml = logo
            ? `<img src="${logo}" alt="${name}" class="client-card-logo" />`
            : `<span class="client-card-initial" style="background:${accent}">${initial}</span>`;
          return `<button class="client-card${active}" data-client-key="${key}" type="button" title="${name}">
            ${logoHtml}
            <span class="client-card-name">${name}</span>
          </button>`;
        }).join('');

        cardsWrap.querySelectorAll('.client-card').forEach(btn => {
          btn.addEventListener('click', () => {
            const key = btn.dataset.clientKey;
            if (key === clientSelect.value) return;
            clientSelect.value = key;
            clientSelect.dispatchEvent(new Event('change'));
            // Update active state immediately
            cardsWrap.querySelectorAll('.client-card').forEach(b => b.classList.remove('client-card--active'));
            btn.classList.add('client-card--active');
          });
        });
      }
    }

    /** Sync-only: populate settings form fields from already-loaded settingsData */
    function populateClientUI(clientKey) {
      if (!settingsData || !settingsData.clients) return;
      const client = settingsData.clients[clientKey] || {};
      clientNameInput2.value = client.name || '';
      logoPathInput.value = client.logoPath || '';
      updateAccent(client.accent || DEFAULT_ACCENT);
      if (client.logoPath) {
        const sep = client.logoPath.includes('?') ? '&' : '?';
        logoPreview.src = `${client.logoPath}${sep}_=${Date.now()}`;
        logoPreview.style.display = '';
      } else {
        logoPreview.src = '';
        logoPreview.style.display = 'none';
      }
      hydrateBrandElements(client);
    }

    /** Full hydrate: update UI, persist selection, and re-fetch client-scoped data */
    async function hydrateClientFields(clientKey) {
      populateClientUI(clientKey);

      const client = (settingsData && settingsData.clients) ? settingsData.clients[clientKey] || {} : {};

      // Persist selected client as current on the backend
      // Only send accent if we have a real value – never push the default
      const postBody = {
        clientKey,
        clientName: client.name || clientKey,
        logoPath: client.logoPath || ''
      };
      if (client.accent && client.accent !== DEFAULT_ACCENT) postBody.accent = client.accent;
      fetch('/api/settings-dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postBody)
      }).catch(() => {});

      // Reload ALL client-scoped data (subjects, configs, thumbnails)
      try {
        const res = await fetch(`/api/settings-dashboard?clientKey=${encodeURIComponent(clientKey)}`);
        if (res.ok) {
          const data = await res.json();
          settingsData.widgets = data.widgets;
          settingsData.widgetConfigs = data.widgetConfigs;
          settingsData.disabledWidgets = data.disabledWidgets || [];
          renderSubjects(data.widgets || {}, data.widgetConfigs || {});
        }
      } catch { /* keep current view on error */ }
    }

    function toggleAddMode(on) {
      isAddingNewClient = on;
      newClientRow.style.display = on ? 'grid' : 'none';
      existingClientRow.style.display = on ? 'none' : '';
      clientSelect.disabled = on;
      addClientBtn.innerHTML = on ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-plus-lg"></i>';
      addClientBtn.title = on ? 'Cancel' : 'Add new client';
      if (on) {
        clientKeyInput.value = '';
        newClientNameInput.value = '';
        // Clear widget subjects and configs for a blank slate
        subjectFieldsWrap.querySelectorAll('[data-widget-slug]').forEach(i => i.value = '');
        subjectFieldsWrap.querySelectorAll('[data-wc-field]').forEach(i => i.value = '');
        if (logoPathInput) logoPathInput.value = '';
        clientKeyInput.focus();
      }
    }

    async function loadDashboardSettings() {
      const res = await fetch('/api/settings-dashboard');
      if (!res.ok) throw new Error('Failed to load settings');
      settingsData = await res.json();
      populateClientOptions(settingsData.clients, settingsData.currentClientKey);
      populateClientUI(settingsData.currentClientKey);
      renderSubjects(settingsData.widgets || {}, settingsData.widgetConfigs || {});
      if (!isAddingNewClient) existingClientRow.style.display = '';
    }

    function collectWidgetSubjects() {
      const out = {};
      subjectFieldsWrap.querySelectorAll('[data-widget-slug]').forEach((input) => {
        out[input.dataset.widgetSlug] = input.value.trim();
      });
      return out;
    }

    function collectWidgetConfigs() {
      const out = {};
      // Collect text/textarea/json fields
      subjectFieldsWrap.querySelectorAll('[data-wc-field]').forEach((el) => {
        const [slug, key] = el.dataset.wcField.split('.');
        if (!out[slug]) out[slug] = {};
        let val = (el.tagName === 'TEXTAREA' ? el.value : el.value);
        // Detect JSON fields and parse them
        const fieldDef = (WIDGET_CONFIG_FIELDS[slug] || []).find(f => f.key === key);
        if (fieldDef && fieldDef.type === 'json') {
          try { val = JSON.parse(val); } catch { /* keep as string if invalid JSON */ }
        }
        out[slug][key] = val;
      });
      // Collect list fields — group inputs by their data-wc-list key
      subjectFieldsWrap.querySelectorAll('.wc-list-wrap[data-wc-list-key]').forEach((wrap) => {
        const [slug, key] = wrap.dataset.wcListKey.split('.');
        if (!out[slug]) out[slug] = {};
        const items = [];
        wrap.querySelectorAll('.wc-list-input').forEach((input) => {
          const v = input.value.trim();
          if (v) items.push(v);
        });
        out[slug][key] = items;
      });
      // Collect brand guideline toggles per agent
      subjectFieldsWrap.querySelectorAll('.brand-ctx-pills').forEach((wrap) => {
        const pills = wrap.querySelectorAll('.brand-ctx-pill');
        pills.forEach((pill) => {
          const [slug, sectionKey] = pill.dataset.brandCtx.split('.');
          if (!out[slug]) out[slug] = {};
          if (!out[slug].brandGuidelineToggles) out[slug].brandGuidelineToggles = {};
          out[slug].brandGuidelineToggles[sectionKey] = pill.classList.contains('on');
        });
      });
      return out;
    }

    function collectDisabledWidgets() {
      const disabled = [];
      subjectFieldsWrap.querySelectorAll('[data-toggle-slug]').forEach((btn) => {
        if (!btn.classList.contains('on')) disabled.push(btn.dataset.toggleSlug);
      });
      return disabled;
    }

    async function saveDashboardSettings(silent) {
      saveSettingsBtn.disabled = true;
      if (!silent) thumbStatus.textContent = 'Saving settings...';
      else thumbStatus.textContent = 'Auto-saving...';
      try {
        let key, name;
        if (isAddingNewClient) {
          key = (clientKeyInput.value || '').trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
          name = (newClientNameInput.value || key).trim();
          if (!key) throw new Error('Client key is required');
        } else {
          key = clientSelect.value || 'lotus';
          name = (clientNameInput2.value || key).trim();
        }
        const payload = {
          clientKey: key,
          clientName: name,
          accent: colorInput.value,
          logoPath: (logoPathInput.value || '').trim(),
          widgetSubjects: collectWidgetSubjects(),
          widgetConfigs: collectWidgetConfigs(),
          disabledWidgets: collectDisabledWidgets()
        };

        const res = await fetch('/api/settings-dashboard', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: 'Failed to save settings' }));
          throw new Error(err.error || 'Failed to save settings');
        }

        if (isAddingNewClient) toggleAddMode(false);
        await loadDashboardSettings();
        hydrateBrandElements({ name: payload.clientName, logoPath: payload.logoPath, accent: payload.accent });
        saveAccent(payload.accent);
        capturePayloadSnapshot();
        thumbStatus.textContent = silent ? 'Saved.' : 'Settings saved to Cloudflare.';
        if (silent) setTimeout(() => { if (thumbStatus.textContent === 'Saved.') thumbStatus.textContent = ''; }, 2000);
      } catch (err) {
        thumbStatus.textContent = `Failed: ${err.message}`;
      } finally {
        saveSettingsBtn.disabled = false;
      }
    }

    async function deleteCurrentClient() {
      const key = clientSelect.value;
      if (!key) return;
      if (!confirm(`Delete client "${key}"? This cannot be undone.`)) return;

      deleteClientBtn.disabled = true;
      thumbStatus.textContent = 'Deleting...';
      try {
        const res = await fetch('/api/settings-dashboard', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clientKey: key })
        });
        if (!res.ok) throw new Error('Delete failed');
        await loadDashboardSettings();
        thumbStatus.textContent = `Client "${key}" deleted.`;
      } catch (err) {
        thumbStatus.textContent = `Failed: ${err.message}`;
      } finally {
        deleteClientBtn.disabled = false;
      }
    }

    async function aiAutofill() {
      const prompt = (aiPromptInput.value || '').trim();
      if (!prompt) { thumbStatus.textContent = 'Please describe the client first.'; return; }

      // Collect only enabled agent slugs so the AI doesn't waste tokens on disabled ones
      const disabled = collectDisabledWidgets();
      const enabledSlugs = [...subjectFieldsWrap.querySelectorAll('[data-toggle-slug]')]
        .filter(btn => btn.classList.contains('on'))
        .map(btn => btn.dataset.toggleSlug);

      aiAutofillBtn.disabled = true;
      aiAutofillBtn.querySelector('span').textContent = 'Thinking...';
      thumbStatus.textContent = 'AI is generating settings...';
      try {
        const res = await fetch('/api/ai-autofill', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, enabledSlugs })
        });
        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          const msg = errBody.error || `AI autofill failed (${res.status})`;
          if (errBody.raw) console.error('[AI autofill] raw output:', errBody.raw);
          throw new Error(msg);
        }
        const data = await res.json();

        // Apply AI results to form
        if (data.clientName) {
          if (isAddingNewClient) {
            newClientNameInput.value = data.clientName;
            if (!clientKeyInput.value) clientKeyInput.value = data.clientName.toLowerCase().replace(/[^a-z0-9]/g, '-');
          } else {
            clientNameInput2.value = data.clientName;
          }
        }
        if (data.logoSuggestion) logoPathInput.value = data.logoSuggestion;

        // Fill widget subjects — only for enabled agents
        if (data.widgetSubjects) {
          for (const [slug, subject] of Object.entries(data.widgetSubjects)) {
            if (disabled.includes(slug)) continue;
            const input = subjectFieldsWrap.querySelector(`[data-widget-slug="${slug}"]`);
            if (input) input.value = subject;
          }
        }

        // Fill widget LLM configs — only for enabled agents
        if (data.widgetConfigs) {
          for (const [slug, cfg] of Object.entries(data.widgetConfigs)) {
            if (disabled.includes(slug)) continue;
            for (const [key, val] of Object.entries(cfg)) {
              const field = subjectFieldsWrap.querySelector(`[data-wc-field="${slug}.${key}"]`);
              if (field) {
                const displayVal = (typeof val === 'object') ? JSON.stringify(val, null, 2) : String(val);
                field.value = displayVal;
              }
            }
          }
        }

        thumbStatus.textContent = 'AI filled all fields. Saving...';
        await saveDashboardSettings(true);
        thumbStatus.textContent = 'AI filled all fields. Saved.';
      } catch (err) {
        thumbStatus.textContent = `AI failed: ${err.message}`;
      } finally {
        aiAutofillBtn.disabled = false;
        aiAutofillBtn.querySelector('span').textContent = 'Fill with AI';
      }
    }

    async function generateThumbnails() {
      if (thumbBtn) thumbBtn.disabled = true;
      if (thumbStatus) thumbStatus.textContent = 'Starting asset generation...';
      try {
        const clientKey = clientSelect.value || 'lotus';
        const subjects = collectWidgetSubjects();
        const jobs = Object.entries(subjects).filter(([, s]) => s && s.trim());
        console.log('[generateThumbnails] clientKey:', clientKey, 'jobs:', jobs.length, Object.keys(subjects));

        // ── Phase 1: Submit all thumbnail predictions with 100ms stagger ──
        if (jobs.length) {
          thumbStatus.textContent = `Submitting ${jobs.length} thumbnail jobs...`;
        }
        const pending = [];
        const submitFailed = [];
        for (let i = 0; i < jobs.length; i++) {
          const [slug, subject] = jobs[i];
          thumbStatus.textContent = `Submitting thumbnails ${i + 1}/${jobs.length}...`;
          try {
            const refImgs = _refImages[slug] || _globalRefImages || [];
            const submitPayload = { clientKey, slug, subject };
            if (refImgs.length) submitPayload.referenceImages = refImgs;
            const res = await fetch('/api/thumbnails/submit', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(submitPayload)
            });
            if (!res.ok) throw new Error('Submit failed');
            const data = await res.json();
            if (data.predictionId) {
              pending.push({ slug, predictionId: data.predictionId, type: 'thumb' });
            } else {
              submitFailed.push(slug);
            }
          } catch {
            submitFailed.push(slug);
          }
          if (i < jobs.length - 1) await new Promise(r => setTimeout(r, 100));
        }

        // ── Phase 1b: Submit product image predictions ──
        const ugcCfg = collectWidgetConfigs()['ugc-video'] || {};
        let productsList = [];
        try {
          if (ugcCfg.products) productsList = typeof ugcCfg.products === 'string' ? JSON.parse(ugcCfg.products) : ugcCfg.products;
        } catch { /* ignore parse errors */ }
        if (Array.isArray(productsList) && productsList.length) {
          thumbStatus.textContent = `Submitting ${productsList.length} product image jobs...`;
          for (let i = 0; i < productsList.length; i++) {
            const p = productsList[i];
            const visualDesc = p.visualDesc || p.name || '';
            if (!visualDesc) continue;
            try {
              const res = await fetch('/api/products/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ clientKey, slug: p.slug, visualDesc })
              });
              if (!res.ok) continue;
              const data = await res.json();
              if (data.predictionId) {
                pending.push({ slug: p.slug, predictionId: data.predictionId, type: 'product' });
              }
            } catch { /* skip */ }
            if (i < productsList.length - 1) await new Promise(r => setTimeout(r, 100));
          }
        }

        // ── Phase 1c: Trigger widget content generation (fire-and-forget) ──
        const contentSlugs = ['creative-copywriter', 'brand-guardian', 'insight-generator', 'iab-bannerset'];
        thumbStatus.textContent = `Generating widget content for ${contentSlugs.length} widgets...`;
        const contentPromises = contentSlugs.map(slug =>
          fetch('/api/generate-widget-content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ clientKey, slug })
          }).catch(() => null)
        );

        // ── Phase 2: Poll all image predictions until complete ──
        thumbStatus.textContent = `Submitted ${pending.length} image jobs. Waiting for results...`;
        const POLL_INTERVAL = 3000;
        const MAX_POLLS = 60;
        const completed = new Set();
        const failed = new Set(submitFailed);
        let polls = 0;

        while (completed.size + failed.size < pending.length + submitFailed.length && polls < MAX_POLLS) {
          await new Promise(r => setTimeout(r, POLL_INTERVAL));
          polls++;
          const active = pending.filter(j => !completed.has(j.slug + j.type) && !failed.has(j.slug + j.type));
          if (!active.length) break;

          const pollResults = await Promise.allSettled(
            active.map(j => {
              const pollUrl = j.type === 'product' ? '/api/products/poll' : '/api/thumbnails/poll';
              return fetch(pollUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ predictionId: j.predictionId, slug: j.slug, clientKey })
              }).then(r => r.json()).then(d => ({ ...d, _slug: j.slug, _type: j.type }));
            })
          );

          for (const pr of pollResults) {
            if (pr.status !== 'fulfilled') continue;
            const d = pr.value;
            const key = d._slug + d._type;
            if (d.status === 'succeeded') {
              completed.add(key);
              if (d._type === 'thumb') {
                const img = subjectFieldsWrap.querySelector(`[data-row-slug="${d._slug}"] .agent-card-thumb img`);
                if (img) { img.style.display = ''; img.src = getThumbUrl(d._slug, clientKey); }
              }
            } else if (d.status === 'failed') {
              failed.add(key);
            }
          }
          const thumbsDone = [...completed].filter(k => k.endsWith('thumb')).length;
          const prodsDone = [...completed].filter(k => k.endsWith('product')).length;
          const inProgress = pending.length - completed.size - (failed.size - submitFailed.length);
          thumbStatus.textContent = `Thumbnails: ${thumbsDone}, Products: ${prodsDone}, In progress: ${inProgress > 0 ? inProgress : 0}...`;
        }

        // ── Phase 3: Retry failed thumbnails (sync fallback) ──
        const retryable = [...failed].filter(s => s.endsWith('thumb') && !submitFailed.includes(s.replace('thumb', '')));
        if (retryable.length) {
          thumbStatus.textContent = `Retrying ${retryable.length} failed thumbnails...`;
          for (const key of retryable) {
            const slug = key.replace('thumb', '');
            const subject = subjects[slug];
            try {
              const refImgs = _refImages[slug] || _globalRefImages || [];
              const retryPayload = { clientKey, slug, subject };
              if (refImgs.length) retryPayload.referenceImages = refImgs;
              const res = await fetch('/api/thumbnails/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(retryPayload)
              });
              if (res.ok) { failed.delete(key); completed.add(key); }
            } catch { /* stays failed */ }
          }
        }

        // Wait for content generation to complete
        await Promise.allSettled(contentPromises);

        const totalImages = completed.size;
        const totalFail = failed.size;
        thumbStatus.textContent = `Done. ${totalImages} images generated. Widget content updated. ${totalFail ? totalFail + ' failed.' : ''}`;
      } catch (err) {
        console.error('[generateThumbnails] error:', err);
        if (thumbStatus) thumbStatus.textContent = `Failed: ${err.message}`;
      } finally {
        if (thumbBtn) thumbBtn.disabled = false;
      }
    }

    // Expose globally so sidebar.js settings tab can embed it inline
    window.__globalSettingsWrap = wrap;
    window.__globalSettingsLoad = function() {
      loadDashboardSettings().catch((err) => {
        thumbStatus.textContent = `Failed: ${err.message}`;
      });
    };

    function updateAccent(next) {
      const normalized = applyAccent(next);
      colorInput.value = normalized;
      hexInput.value = normalized;
      saveAccent(normalized);
      wrap.querySelectorAll('.accent-preset').forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.accent.toLowerCase() === normalized.toLowerCase());
      });
    }

    colorInput.addEventListener('input', (e) => updateAccent(e.target.value));

    hexInput.addEventListener('change', () => {
      const normalized = normalizeHex(hexInput.value);
      if (normalized) {
        updateAccent(normalized);
      } else {
        hexInput.value = colorInput.value;
      }
    });

    wrap.querySelectorAll('.accent-preset').forEach((btn) => {
      btn.addEventListener('click', () => updateAccent(btn.dataset.accent));
    });

    clientSelect.addEventListener('change', async () => {
      clearTimeout(_autoSaveTimer); // don't auto-save stale data during switch
      await hydrateClientFields(clientSelect.value);
      capturePayloadSnapshot();
      // Fire event only on actual user-initiated client switch
      const client = settingsData?.clients?.[clientSelect.value] || {};
      fireClientChanged(client);
    });

    // Logo file upload handler
    logoFileInput.addEventListener('change', async () => {
      const file = logoFileInput.files[0];
      if (!file) return;
      // Cancel any pending auto-save to prevent race conditions
      clearTimeout(_autoSaveTimer);
      thumbStatus.textContent = 'Uploading logo...';
      try {
        const clientKey = clientSelect.value || 'lotus';
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const formData = new FormData();
        formData.append('file', file);
        formData.append('clientKey', clientKey);
        formData.append('path', `logos/${clientKey}/${safeName}`);
        // Send old logo key so worker can clean up only that specific file
        const oldLogo = (logoPathInput.value || '').trim();
        if (oldLogo) formData.append('oldLogoKey', oldLogo);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        if (!res.ok) throw new Error('Upload failed');
        const data = await res.json();
        const basePath = data.url || `/r2/logos/${clientKey}/${safeName}`;
        const logoUrl = `${basePath}?v=${Date.now()}`;
        logoPathInput.value = logoUrl;
        logoPreview.src = logoUrl;
        logoPreview.style.display = '';
        hydrateBrandElements({ name: clientNameInput2.value, logoPath: logoUrl });
        // Auto-save settings so the logo path persists to D1
        thumbStatus.textContent = 'Saving logo...';
        await saveDashboardSettings();
      } catch (err) {
        thumbStatus.textContent = `Logo upload failed: ${err.message}`;
      }
    });

    addClientBtn.addEventListener('click', () => openWizard());
    const onboardClientBtn = wrap.querySelector('#onboardClientBtn');
    onboardClientBtn.addEventListener('click', () => openWizard(true));
    createClientBtn.addEventListener('click', () => saveDashboardSettings());
    deleteClientBtn.addEventListener('click', deleteCurrentClient);
    aiAutofillBtn.addEventListener('click', aiAutofill);
    // Close button calls sidebar closeSettings
    closeBtn.addEventListener('click', function() { if (window.__closeSettings) window.__closeSettings(); });
    saveSettingsBtn.addEventListener('click', saveDashboardSettings);
    thumbBtn.addEventListener('click', generateThumbnails);

    // Wire global reference image upload
    const globalRefInput = wrap.querySelector('#globalRefInput');
    const globalRefLabel = wrap.querySelector('#globalRefLabel');
    const globalRefText = wrap.querySelector('#globalRefText');
    globalRefInput.addEventListener('change', () => {
      const files = [...globalRefInput.files];
      if (!files.length) return;
      _globalRefImages = [];
      let loaded = 0;
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          _globalRefImages.push(reader.result);
          loaded++;
          if (loaded === files.length) {
            globalRefLabel.classList.add('ref-active');
            globalRefText.textContent = `${files.length} Reference Image${files.length > 1 ? 's' : ''}`;
            thumbStatus.textContent = `${files.length} global reference image(s) set. They will be used for all thumbnails.`;
          }
        };
        reader.readAsDataURL(file);
      });
    });

    // ═══ Onboarding Wizard Controller ═══
    const wizOverlay = wrap.querySelector('#wizardOverlay');
    const wizClose = wrap.querySelector('#wizClose');
    const wizBack = wrap.querySelector('#wizBack');
    const wizSkip = wrap.querySelector('#wizSkip');
    const wizNext = wrap.querySelector('#wizNext');
    const wizProgressFill = wrap.querySelector('#wizProgressFill');
    const wizStepLabels = wrap.querySelectorAll('.wiz-step-label');
    const wizSteps = wrap.querySelectorAll('.wiz-step');
    let wizStep = 0;
    let wizClientKey = '';
    let wizBfData = null; // brandfetch mapped data
    let wizBfGoogleFonts = null;
    let wizIsExisting = false; // true when re-running onboarding for existing client

    function openWizard(existing) {
      wizStep = 0;
      wizClientKey = '';
      wizBfData = null;
      wizBfGoogleFonts = null;
      wizIsExisting = !!existing;

      const keyInput = wrap.querySelector('#wizClientKey');
      const nameInput = wrap.querySelector('#wizClientName');
      const domainInput = wrap.querySelector('#wizDomain');

      if (wizIsExisting) {
        // Pre-fill from current client
        const ck = clientSelect.value || '';
        const cn = clientNameInput2.value || ck;
        wizClientKey = ck;
        keyInput.value = ck;
        keyInput.readOnly = true;
        keyInput.style.opacity = '0.5';
        nameInput.value = cn;
        domainInput.value = cn.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com';
        wrap.querySelector('#wizStep0Hint').style.display = 'none';
        wrap.querySelector('#wizStep0HintExisting').style.display = '';
        // Skip step 0, jump straight to import
        showWizStep(1);
      } else {
        keyInput.value = '';
        keyInput.readOnly = false;
        keyInput.style.opacity = '';
        nameInput.value = '';
        domainInput.value = '';
        wrap.querySelector('#wizStep0Hint').style.display = '';
        wrap.querySelector('#wizStep0HintExisting').style.display = 'none';
        showWizStep(0);
      }

      wrap.querySelector('#wizAiPrompt').value = '';
      wrap.querySelector('#wizBfPreview').style.display = 'none';
      wrap.querySelector('#wizBfPreview').innerHTML = '';
      wrap.querySelector('#wizBfStatus').textContent = '';
      wrap.querySelector('#wizBfStatus').className = 'wiz-status-area';
      wrap.querySelector('#wizGuidelinesStatus').textContent = '';
      wrap.querySelector('#wizGuidelinesStatus').className = 'wiz-status-area';
      wrap.querySelector('#wizGuidelinesPreview').style.display = 'none';
      wrap.querySelector('#wizGuidelinesPreview').innerHTML = '';
      wrap.querySelector('#wizAiStatus').textContent = '';
      wrap.querySelector('#wizAiStatus').className = 'wiz-status-area';
      wizOverlay.style.display = '';
    }
    window.__openClientWizard = openWizard;

    function closeWizard() {
      wizOverlay.style.display = 'none';
    }

    function showWizStep(n) {
      wizStep = n;
      const minStep = wizIsExisting ? 1 : 0;
      // Animate step transition
      wizSteps.forEach((s, i) => {
        s.classList.toggle('active', i === n);
      });
      // Progress bar
      wizProgressFill.style.width = ((n + 1) / 4 * 100) + '%';
      // Step labels
      wizStepLabels.forEach((d, i) => {
        d.classList.toggle('active', i === n);
        d.classList.toggle('done', i < n);
      });
      wizBack.style.display = n > minStep ? '' : 'none';
      wizSkip.style.display = (n >= 1 && n < 3) ? '' : 'none';
      wizNext.disabled = false;
      const labels = ['Create Client <i class="bi bi-arrow-right"></i>', 'Import Brand <i class="bi bi-arrow-right"></i>', 'Generate <i class="bi bi-arrow-right"></i>', 'Configure & Finish <i class="bi bi-check-lg"></i>'];
      wizNext.innerHTML = labels[n] || 'Next';
      if (wizIsExisting && n === 0) wizNext.innerHTML = 'Next <i class="bi bi-arrow-right"></i>';
    }

    wizClose.addEventListener('click', closeWizard);
    wizOverlay.addEventListener('click', (e) => { if (e.target === wizOverlay) closeWizard(); });

    wizBack.addEventListener('click', () => {
      const minStep = wizIsExisting ? 1 : 0;
      if (wizStep > minStep) showWizStep(wizStep - 1);
    });

    wizSkip.addEventListener('click', () => {
      if (wizStep < 3) showWizStep(wizStep + 1);
    });

    wizNext.addEventListener('click', async () => {
      wizNext.disabled = true;
      try {
        if (wizStep === 0) {
          // ── Step 0: Create the client ──
          const key = wrap.querySelector('#wizClientKey').value.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
          const name = wrap.querySelector('#wizClientName').value.trim() || key;
          if (!key) { wizNext.disabled = false; return; }
          wizClientKey = key;
          // Save minimal client
          const res = await fetch('/api/settings-dashboard', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ clientKey: key, clientName: name, accent: '#ffffff', logoPath: '' })
          });
          if (!res.ok) throw new Error('Failed to create client');
          // Refresh settings & switch to new client
          await loadDashboardSettings();
          // Select the new client
          if (clientSelect) { clientSelect.value = key; clientSelect.dispatchEvent(new Event('change')); }
          showWizStep(1);
          // Pre-fill domain from client name
          const domainInput = wrap.querySelector('#wizDomain');
          if (!domainInput.value) domainInput.value = name.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com';
        }
        else if (wizStep === 1) {
          // ── Step 1: Brandfetch import ──
          const domain = wrap.querySelector('#wizDomain').value.trim();
          const bfStatus = wrap.querySelector('#wizBfStatus');
          const bfPreview = wrap.querySelector('#wizBfPreview');
          if (!domain) { bfStatus.textContent = 'Enter a domain.'; bfStatus.className = 'wiz-status-area error'; wizNext.disabled = false; return; }
          bfStatus.textContent = 'Extracting brand assets from ' + domain + '…';
          bfStatus.className = 'wiz-status-area loading';
          const res = await fetch('/api/brandfetch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ domain })
          });
          if (!res.ok) throw new Error('Brandfetch request failed');
          const json = await res.json();
          if (!json.ok) throw new Error(json.error || 'Brandfetch failed');
          wizBfData = json.mapped;
          wizBfGoogleFonts = json.googleFonts || {};

          // Show summary
          const m = wizBfData;
          let html = '<div class="wiz-import-summary">';
          if (m.brandName) html += '<div class="wiz-import-brand">' + escHtml(m.brandName) + '</div>';
          const stats = [];
          if (m.logo) {
            const totalLogos = (m.logo.lockups||[]).length + (m.logo.marks||[]).length;
            if (totalLogos) stats.push('<span><i class="bi bi-image"></i> ' + totalLogos + ' logo' + (totalLogos > 1 ? 's' : '') + '</span>');
          }
          if (m.colors && m.colors.brandColors && m.colors.brandColors.length) {
            stats.push('<span><i class="bi bi-palette"></i> ' + m.colors.brandColors.length + ' color' + (m.colors.brandColors.length > 1 ? 's' : '') + '</span>');
          }
          if (m.typography && m.typography.fontFamily) {
            stats.push('<span><i class="bi bi-fonts"></i> ' + escHtml(m.typography.fontFamily) + '</span>');
          }
          if (stats.length) html += '<div class="wiz-import-stats">' + stats.join('') + '</div>';
          if (m.colors && m.colors.brandColors) {
            html += '<div class="wiz-import-colors">';
            m.colors.brandColors.forEach(c => {
              html += '<span class="wiz-color-dot" style="background:' + c.hex + '" title="' + escHtml(c.name || c.hex) + '"></span>';
            });
            html += '</div>';
          }
          html += '</div>';
          bfPreview.innerHTML = html;
          bfPreview.style.display = '';

          // Apply to Knowledge Hub (save brand data to KV)
          // Import logos
          const saveBody = { clientKey: wizClientKey };
          if (m.brandName) saveBody.clientName = m.brandName;
          // Pick first brand color as accent
          if (m.colors && m.colors.brandColors && m.colors.brandColors.length) {
            saveBody.accent = m.colors.brandColors[0].hex;
            updateAccent(m.colors.brandColors[0].hex);
          }
          // Pick first lockup logo or mark as primary
          if (m.logo) {
            const allLogos = [...(m.logo.lockups || []), ...(m.logo.marks || [])];
            const bestLogo = allLogos.find(l => l.imageUrl);
            if (bestLogo) saveBody.logoPath = bestLogo.imageUrl;
          }
          // Save brand data
          await fetch('/api/settings-dashboard', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(saveBody)
          });

          // Save hub data (logos, colors, fonts) via knowledge hub API
          // Build complete hub structures with all required sub-properties
          const hubData = {};
          // Logo — include all required sub-keys
          hubData.logo = {
            subtitle: 'Our logo system. Download approved assets and follow usage guidelines.',
            sections: { lockup:{enabled:true}, logomark:{enabled:true}, wordmark:{enabled:true}, guidelines:{enabled:true} },
            lockups: (m.logo && m.logo.lockups) || [],
            marks: (m.logo && m.logo.marks) || [],
            words: (m.logo && m.logo.words) || [],
            starredUrl: saveBody.logoPath || '',
            guidelines_do: [],
            guidelines_dont: []
          };
          // Colors — include neutrals + gradients
          hubData.colors = {
            subtitle: 'Brand color palette and gradient presets. Click hex values to copy.',
            sections: { brandColors:{enabled:true}, neutrals:{enabled:true}, gradients:{enabled:true} },
            brandColors: (m.colors && m.colors.brandColors) || [],
            neutrals: [],
            gradients: []
          };
          // Typography — include typeScale
          const gfUrls = [];
          if (wizBfGoogleFonts) {
            Object.values(wizBfGoogleFonts).forEach(gf => { if (gf && gf.available && gf.url) gfUrls.push(gf.url); });
          }
          hubData.typography = {
            subtitle: 'Font families, weights, and usage examples. Copy-ready CSS snippets included.',
            sections: { fontFamily:{enabled:true}, typeScale:{enabled:true}, cssSnippets:{enabled:true} },
            fontFamily: (m.typography && m.typography.fontFamily) || 'Plus Jakarta Sans',
            fontCss: (m.typography && m.typography.fontCss) || "font-family: 'Plus Jakarta Sans', system-ui, sans-serif;",
            weights: (m.typography && m.typography.weights) || ['400 Regular'],
            googleFontsUrls: gfUrls,
            typeScale: [],
            customFonts: []
          };
          await fetch('/api/brand-hub', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: hubData })
          });

          // Refresh the local settings data
          await loadDashboardSettings();
          bfStatus.textContent = 'Brand identity imported successfully.';
          bfStatus.className = 'wiz-status-area success';

          // Pre-fill AI prompt with brand description
          const aiPrompt = wrap.querySelector('#wizAiPrompt');
          if (!aiPrompt.value && m.brandName) {
            aiPrompt.value = m.brandName + (m.description ? ' — ' + m.description : '');
          }
          showWizStep(2);
        }
        else if (wizStep === 2) {
          // ── Step 2: Generate brand guidelines ──
          const gStatus = wrap.querySelector('#wizGuidelinesStatus');
          const gPreview = wrap.querySelector('#wizGuidelinesPreview');
          const brandName = wizBfData?.brandName || wrap.querySelector('#wizClientName').value.trim() || wizClientKey;
          gStatus.textContent = 'Researching ' + brandName + ' — this takes about 15 seconds…';
          gStatus.className = 'wiz-status-area loading';
          const res = await fetch('/api/brand-research', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ brand: brandName })
          });
          if (!res.ok) throw new Error('Brand research failed');
          const gData = await res.json();
          if (!gData.ok) throw new Error(gData.error || 'Research failed');

          // Save guidelines to hub (merge with existing hub data from step 1)
          const guidelinesObj = {
            subtitle: 'Core brand principles, voice, and visual standards.',
            sections: [],
            about: '', tone_of_voice: [], vision: '', mission: '',
            growth_audiences: [], growth_tactics: [], dos: [], donts: [],
            acronyms: [], cultural_tenants: []
          };
          const textFields = ['about', 'vision', 'mission'];
          const listFields = ['tone_of_voice', 'growth_audiences', 'growth_tactics', 'dos', 'donts', 'acronyms', 'cultural_tenants'];
          textFields.forEach(k => { if (gData[k]) guidelinesObj[k] = gData[k]; });
          listFields.forEach(k => { if (gData[k] && gData[k].length) guidelinesObj[k] = gData[k]; });
          // GET existing hub data to merge
          let existingHub = {};
          try {
            const hubGet = await fetch('/api/brand-hub');
            if (hubGet.ok) { const hj = await hubGet.json(); existingHub = hj.data || {}; }
          } catch(_) {}
          const mergedHub = { ...existingHub, guidelines: guidelinesObj };
          // Ensure templates and inspiration exist
          if (!mergedHub.templates) mergedHub.templates = { subtitle: 'Ready-to-use templates for common brand deliverables.', items: [] };
          if (!mergedHub.inspiration) mergedHub.inspiration = { subtitle: 'Mood boards, references, and creative inspiration for the brand.', items: [] };
          await fetch('/api/brand-hub', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: mergedHub })
          });

          // Show preview
          let preview = '';
          if (gData.about) preview += '<strong>About:</strong> ' + escHtml(gData.about) + '<br><br>';
          if (gData.tone_of_voice) preview += '<strong>Tone:</strong> ' + gData.tone_of_voice.map(escHtml).join(', ') + '<br><br>';
          if (gData.vision) preview += '<strong>Vision:</strong> ' + escHtml(gData.vision) + '<br><br>';
          if (gData.mission) preview += '<strong>Mission:</strong> ' + escHtml(gData.mission) + '<br><br>';
          gPreview.innerHTML = preview;
          gPreview.style.display = '';
          gStatus.textContent = 'Brand guidelines ready.';
          gStatus.className = 'wiz-status-area success';
          showWizStep(3);
        }
        else if (wizStep === 3) {
          // ── Step 3: AI Auto-fill + Thumbnails ──
          const aiStatus = wrap.querySelector('#wizAiStatus');
          const aiPromptVal = wrap.querySelector('#wizAiPrompt').value.trim();
          if (!aiPromptVal) { aiStatus.textContent = 'Describe the client first.'; aiStatus.className = 'wiz-status-area error'; wizNext.disabled = false; return; }

          // Phase A: AI autofill
          aiStatus.textContent = 'AI is configuring your agents…';
          aiStatus.className = 'wiz-status-area loading';
          const aiRes = await fetch('/api/ai-autofill', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: aiPromptVal })
          });
          if (!aiRes.ok) throw new Error('AI autofill failed');
          const aiData = await aiRes.json();

          // Apply AI data to form
          if (aiData.clientName && clientNameInput2) clientNameInput2.value = aiData.clientName;
          if (aiData.logoSuggestion && logoPathInput) logoPathInput.value = aiData.logoSuggestion;
          if (aiData.widgetSubjects) {
            for (const [slug, subject] of Object.entries(aiData.widgetSubjects)) {
              const input = subjectFieldsWrap.querySelector(`[data-widget-slug="${slug}"]`);
              if (input) input.value = subject;
            }
          }
          if (aiData.widgetConfigs) {
            for (const [slug, cfg] of Object.entries(aiData.widgetConfigs)) {
              for (const [key, val] of Object.entries(cfg)) {
                const field = subjectFieldsWrap.querySelector(`[data-wc-field="${slug}.${key}"]`);
                if (field) field.value = (typeof val === 'object') ? JSON.stringify(val, null, 2) : String(val);
              }
            }
          }

          // Save everything before generating thumbnails
          aiStatus.textContent = 'Saving configurations…';
          await saveDashboardSettings(true);

          // Phase B: Generate thumbnails
          aiStatus.textContent = 'Generating thumbnails — this runs in the background.';

          // Close wizard — thumbnail generation continues via the existing function
          closeWizard();
          // Trigger thumbnail generation
          generateThumbnails().catch(err => {
            console.error('[wizard] generateThumbnails failed:', err);
            if (thumbStatus) thumbStatus.textContent = 'Thumbnail generation failed: ' + err.message;
          });
        }
      } catch (err) {
        // Show error on current step
        const statusEl = wizStep === 1 ? wrap.querySelector('#wizBfStatus')
          : wizStep === 2 ? wrap.querySelector('#wizGuidelinesStatus')
          : wizStep === 3 ? wrap.querySelector('#wizAiStatus')
          : null;
        if (statusEl) {
          statusEl.textContent = err.message;
          statusEl.className = 'wiz-status-area error';
        }
      } finally {
        wizNext.disabled = false;
      }
    });

    function escHtml(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

    // --- Auto-save: debounced, only on real changes ---
    var _autoSaveTimer = null;
    var _lastPayloadJson = '';
    function scheduleAutoSave() {
      if (isAddingNewClient) return; // don't auto-save while adding new client
      clearTimeout(_autoSaveTimer);
      _autoSaveTimer = setTimeout(function() {
        // Build payload snapshot and compare
        var key = clientSelect.value || 'lotus';
        var name = (clientNameInput2.value || key).trim();
        var snap = JSON.stringify({
          clientKey: key, clientName: name,
          accent: colorInput.value,
          logoPath: (logoPathInput.value || '').trim(),
          widgetSubjects: collectWidgetSubjects(),
          widgetConfigs: collectWidgetConfigs(),
          disabledWidgets: collectDisabledWidgets()
        });
        if (snap !== _lastPayloadJson) {
          _lastPayloadJson = snap;
          saveDashboardSettings(true);
        }
      }, 1500);
    }
    // Capture initial state after settings load
    function capturePayloadSnapshot() {
      var key = clientSelect.value || 'lotus';
      var name = (clientNameInput2.value || key).trim();
      _lastPayloadJson = JSON.stringify({
        clientKey: key, clientName: name,
        accent: colorInput.value,
        logoPath: (logoPathInput.value || '').trim(),
        widgetSubjects: collectWidgetSubjects(),
        widgetConfigs: collectWidgetConfigs(),
        disabledWidgets: collectDisabledWidgets()
      });
    }
    // Listen for changes on the whole settings panel
    wrap.addEventListener('input', scheduleAutoSave);
    wrap.addEventListener('change', scheduleAutoSave);

    updateAccent(initialAccent);
    // Load settings from Cloudflare on boot and hydrate all brand elements
    loadDashboardSettings().then(() => {
      if (settingsData && settingsData.currentClient) {
        hydrateBrandElements(settingsData.currentClient);
      }
      capturePayloadSnapshot();
      // Re-enable transitions now that the final accent is applied
      requestAnimationFrame(() => document.documentElement.classList.remove('no-transition'));
    }).catch(() => {
      requestAnimationFrame(() => document.documentElement.classList.remove('no-transition'));
    });

    /** Apply logo, tenant name, and page title from loaded client data */
    function hydrateBrandElements(client) {
      if (!client) return;
      window.BrandKitchen = window.BrandKitchen || {};
      window.BrandKitchen.brandName = client.name || '';
      window.BrandKitchen.clientKey = clientSelect ? clientSelect.value || 'lotus' : 'lotus';

      // Logo — update sidebar + any widget-content logos with .lotus-logo class
      if (client.logoPath) {
        window.BrandKitchen.logoUrl = client.logoPath;
        try { localStorage.setItem('lotus:logoPath', client.logoPath); } catch {}
        document.querySelectorAll('.lotus-logo').forEach((img) => {
          img.src = client.logoPath;
          img.alt = client.name || '';
          img.style.visibility = '';
        });
      } else {
        // No logo for this client — hide it
        window.BrandKitchen.logoUrl = '';
        try { localStorage.removeItem('lotus:logoPath'); } catch {}
        document.querySelectorAll('.lotus-logo').forEach((img) => {
          img.src = '';
          img.alt = '';
          img.style.visibility = 'hidden';
        });
      }
      // Logo container background — persisted separately from accent
      if (client.logoBg) {
        try { localStorage.setItem('lotus:logoBg', client.logoBg); } catch {}
        document.documentElement.style.setProperty('--hero-logo-bg', client.logoBg);
      } else {
        try { localStorage.removeItem('lotus:logoBg'); } catch {}
        document.documentElement.style.removeProperty('--hero-logo-bg');
      }
      // Accent — apply, save, and sync the colour-picker UI
      const accent = client.accent || DEFAULT_ACCENT;
      updateAccent(accent);

      // Tenant name
      const tenantName = client.name ? `${client.name} Tenant` : '';
      document.querySelectorAll('.tenant-name').forEach((el) => {
        el.textContent = tenantName;
      });
      // Page title
      const baseTitle = document.title.replace(/ · .*$/, '');
      document.title = client.name
        ? (baseTitle === 'Brand Kitchen' ? client.name : `${baseTitle} · ${client.name}`)
        : baseTitle;
      // Update h1 brand title on index page
      const brandTitle = document.querySelector('.brand-title');
      if (brandTitle) {
        brandTitle.textContent = client.name || '';
      }
      // Update hero title on knowledge-hub (Ask) page
      const heroTitle = document.getElementById('heroTitle');
      if (heroTitle && client.name) {
        heroTitle.textContent = client.name;
      }
      // Dynamic favicon — logo on accent-colored square
      updateFavicon(client.logoPath, accent);
    }

    /** Generate a 64×64 favicon: accent bg + logo centred */
    function updateFavicon(logoUrl, bgColor) {
      const size = 64;
      const canvas = document.createElement('canvas');
      canvas.width = size; canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = bgColor || '#fff200';
      ctx.fillRect(0, 0, size, size);

      function applyFavicon() {
        let link = document.querySelector('link[rel="icon"]');
        if (!link) { link = document.createElement('link'); link.rel = 'icon'; document.head.appendChild(link); }
        link.href = canvas.toDataURL('image/png');
      }

      if (logoUrl) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function() {
          const pad = size * 0.12;
          const inner = size - pad * 2;
          let w = img.width, h = img.height;
          const scale = Math.min(inner / w, inner / h);
          w *= scale; h *= scale;
          ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
          applyFavicon();
        };
        img.onerror = function() { applyFavicon(); };
        img.src = logoUrl;
      } else {
        applyFavicon();
      }
    }

    /** Fire client-changed only on real switches (not modal opens) */
    function fireClientChanged(client) {
      _thumbVersion = Date.now();
      window.dispatchEvent(new CustomEvent('brandkitchen:clientchanged', {
        detail: { clientKey: window.BrandKitchen.clientKey, client }
      }));
    }
  }

  // Suppress CSS transitions until the API-driven accent is resolved
  // to avoid visible colour flashes on every page load.
  document.documentElement.classList.add('no-transition');
  const bootAccent = applyAccent(getStoredAccent() || DEFAULT_ACCENT);

  // Apply cached logo background immediately to prevent flash
  try {
    const cachedLogoBg = localStorage.getItem('lotus:logoBg');
    if (cachedLogoBg) document.documentElement.style.setProperty('--hero-logo-bg', cachedLogoBg);
  } catch {}

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => injectAccentControl(bootAccent));
  } else {
    injectAccentControl(bootAccent);
  }

  window.addEventListener('storage', (event) => {
    if (event.key !== STORAGE_KEY || !event.newValue) return;
    applyAccent(event.newValue);

    const colorInput = document.getElementById('accentColorInput');
    const hexInput = document.getElementById('accentHexInput');
    const normalized = normalizeHex(event.newValue);
    if (!normalized) return;

    if (colorInput) colorInput.value = normalized;
    if (hexInput) hexInput.value = normalized;

    document.querySelectorAll('.accent-preset').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.accent.toLowerCase() === normalized.toLowerCase());
    });
  });

  // Expose global widget config loader for all widgets
  let _configCache = null;
  window.BrandKitchen = window.BrandKitchen || {};
  // Invalidate config cache on client switch
  window.addEventListener('brandkitchen:clientchanged', () => { _configCache = null; });
  window.BrandKitchen.loadConfig = async function (slug) {
    try {
      const res = await fetch('/api/widget-config?slug=' + encodeURIComponent(slug));
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  };
  window.BrandKitchen.loadAllConfigs = async function () {
    if (_configCache) return _configCache;
    try {
      const res = await fetch('/api/settings-dashboard');
      if (!res.ok) return {};
      const data = await res.json();
      _configCache = data.widgetConfigs || {};
      return _configCache;
    } catch {
      return {};
    }
  };
})();
