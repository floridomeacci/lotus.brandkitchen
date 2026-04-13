/* ── Shared Sidebar Component ──
   Single source of truth for sidebar HTML, settings tabs, and avatar sync.
   Each page just needs: <aside id="sidebar"></aside> and <script src="./js/sidebar.js"></script>
*/
(function () {
  'use strict';

  var el = document.getElementById('sidebar');
  if (!el) return;

  // ── Sidebar HTML ──
  el.className = 'sidebar';
  el.innerHTML = '' +
    '<a href="./index.html" class="brand-panel">' +
      '<span class="lotus-mark">' +
        '<img class="lotus-logo"' +
          ' src="' + (function(){ try { return localStorage.getItem('lotus:logoPath') || ''; } catch { return ''; } })() + '"' +
          ' alt=""' +
          (function(){ try { return localStorage.getItem('lotus:logoPath') ? '' : ' style="visibility:hidden"'; } catch { return ' style="visibility:hidden"'; } })() +
        ' />' +
      '</span>' +
    '</a>' +
    '<div class="profile" id="sidebarProfile" style="cursor:pointer;position:relative">' +
      '<div class="avatar" id="sidebarAvatar">CA</div>' +
      '<div class="profile-copy">' +
        '<h2 id="sidebarName">Cliff Allison</h2>' +
        '<p id="sidebarRole">Admin</p>' +
      '</div>' +
      '<i class="bi bi-chevron-down" style="font-size:10px;color:var(--muted);margin-left:auto;padding-right:4px"></i>' +
    '</div>' +
    '<div class="profile-dropdown" id="profileDropdown" style="display:none">' +
      '<button class="profile-dropdown-item" id="changePasswordBtn"><i class="bi bi-key"></i> Change Password</button>' +
      '<button class="profile-dropdown-item profile-dropdown-item--danger" id="logoutBtn"><i class="bi bi-box-arrow-right"></i> Log Out</button>' +
    '</div>' +
    '<div class="menu-group" id="khMenu">' +
      '<span class="menu-label">KNOWLEDGE HUB</span>' +
      '<ul>' +
        '<li><a class="app-nav-item" href="./index.html"><i class="ico bi bi-grid-3x3-gap"></i><span>Agents</span></a></li>' +
        '<li><a class="app-nav-item" href="./knowledge-hub.html"><i class="ico bi bi-chat-dots"></i><span>Ask</span></a></li>' +
        '<li><a class="app-nav-item" href="./knowledge-hub.html#logo"><i class="ico bi bi-image"></i><span>Logo</span></a></li>' +
        '<li><a class="app-nav-item" href="./knowledge-hub.html#colors"><i class="ico bi bi-palette"></i><span>Colors</span></a></li>' +
        '<li><a class="app-nav-item" href="./knowledge-hub.html#typography"><i class="ico bi bi-type"></i><span>Typography</span></a></li>' +
        '<li><a class="app-nav-item" href="./knowledge-hub.html#guidelines"><i class="ico bi bi-journal-text"></i><span>Guidelines</span></a></li>' +
        '<li><a class="app-nav-item" href="./knowledge-hub.html#inspiration"><i class="ico bi bi-lightbulb"></i><span>Inspiration</span></a></li>' +
        '<li><a class="app-nav-item" href="./knowledge-hub.html#clients"><i class="ico bi bi-people"></i><span>Clients</span></a></li>' +
        '<li><a class="app-nav-item" href="./asset-library.html"><i class="ico bi bi-folder2-open"></i><span>Assets Library</span></a></li>' +
      '</ul>' +
    '</div>' +
    '<div class="menu-group" id="resourcesMenu">' +
      '<ul>' +
        '<li><a class="app-nav-item" href="./knowledge-hub.html#templates"><i class="ico bi bi-layout-text-window"></i><span>Templates</span></a></li>' +
        '<li id="globalSettingsBtn"><i class="ico bi bi-gear"></i><span>Settings</span></li>' +
      '</ul>' +
    '</div>' +
    '<div class="sidebar-footer">' +
      '<div class="footer-mark"><img class="omc-logo" src="./Wordmark.png" alt="dotdotdash" /></div>' +
      '<button id="contactSupportBtn"><i class="bi bi-headset"></i>Contact Support</button>' +
      '<small>&copy; 2026 dotdotdash. All rights reserved.</small>' +
    '</div>';

  // ── Knowledge Hub in-page navigation ──
  var isKH = /knowledge-hub\.html/i.test(window.location.pathname);
  el.querySelectorAll('a[href*="knowledge-hub.html"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (!isKH) return;                       // different page — let browser navigate
      e.preventDefault();
      var hash = this.getAttribute('href').split('#')[1] || 'home';
      history.replaceState(null, '', hash === 'home' ? window.location.pathname : '#' + hash);
      if (window.activateView) window.activateView(hash);
    });
  });

  // ── Profile dropdown toggle ──
  var profileEl = document.getElementById('sidebarProfile');
  var dropdownEl = document.getElementById('profileDropdown');
  if (profileEl && dropdownEl) {
    profileEl.addEventListener('click', function(e) {
      e.stopPropagation();
      dropdownEl.style.display = dropdownEl.style.display === 'none' ? '' : 'none';
    });
    document.addEventListener('click', function() { dropdownEl.style.display = 'none'; });
    dropdownEl.addEventListener('click', function(e) { e.stopPropagation(); });
  }

  // ── Logout ──
  var logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      window.location.href = '/api/logout';
    });
  }

  // ── Contact Support → screen capture ──
  var supportBtn = document.getElementById('contactSupportBtn');
  if (supportBtn) {
    supportBtn.addEventListener('click', function() {
      var pop = document.createElement('div');
      pop.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px)';
      pop.innerHTML = '<div style="background:var(--card,#1e1e1e);border:1px solid var(--border,#333);border-radius:14px;padding:28px 32px;text-align:center;min-width:300px;max-width:340px;box-shadow:0 12px 40px rgba(0,0,0,.5)">'
        + '<div style="font-size:14px;font-weight:700;color:var(--text,#fff);margin-bottom:4px">Screen Capture</div>'
        + '<div style="font-size:12px;color:var(--muted,#888);margin-bottom:16px">Choose capture mode</div>'
        /* Screenshot */
        + '<button class="sr-mode" data-mode="screenshot" style="width:100%;padding:10px 14px;border-radius:8px;border:1px solid var(--border,#333);background:var(--accent-subtle-bg,rgba(255,255,255,.06));color:var(--text,#fff);font-size:13px;font-weight:600;cursor:pointer;transition:border-color .15s;display:flex;align-items:center;gap:10px;margin-bottom:8px;text-align:left">'
        + '<i class="bi bi-camera" style="font-size:16px;opacity:.6"></i><div><div>Screenshot (PNG)</div><div style="font-size:10px;font-weight:400;color:var(--muted,#888);margin-top:2px">Capture a still image</div></div></button>'
        /* GIF */
        + '<button class="sr-mode" data-mode="gif" style="width:100%;padding:10px 14px;border-radius:8px;border:1px solid var(--border,#333);background:var(--accent-subtle-bg,rgba(255,255,255,.06));color:var(--text,#fff);font-size:13px;font-weight:600;cursor:pointer;transition:border-color .15s;display:flex;align-items:center;gap:10px;margin-bottom:8px;text-align:left">'
        + '<i class="bi bi-filetype-gif" style="font-size:16px;opacity:.6"></i><div><div>GIF Recording</div><div style="font-size:10px;font-weight:400;color:var(--muted,#888);margin-top:2px">Animated GIF · 8 fps · max 1080px</div></div></button>'
        /* WebM */
        + '<button class="sr-mode" data-mode="webm" style="width:100%;padding:10px 14px;border-radius:8px;border:1px solid var(--border,#333);background:var(--accent-subtle-bg,rgba(255,255,255,.06));color:var(--text,#fff);font-size:13px;font-weight:600;cursor:pointer;transition:border-color .15s;display:flex;align-items:center;gap:10px;text-align:left">'
        + '<i class="bi bi-camera-video" style="font-size:16px;opacity:.6"></i><div><div>Video Recording (WebM)</div><div style="font-size:10px;font-weight:400;color:var(--muted,#888);margin-top:2px">Full quality screen capture</div></div></button>'
        + '</div>';
      document.body.appendChild(pop);
      pop.addEventListener('click', function(e) { if (e.target === pop) pop.remove(); });

      pop.querySelectorAll('.sr-mode').forEach(function(btn) {
        btn.addEventListener('mouseenter', function() { btn.style.borderColor = 'var(--accent,#4af)'; });
        btn.addEventListener('mouseleave', function() { btn.style.borderColor = 'var(--border,#333)'; });
        btn.addEventListener('click', function() {
          var mode = btn.getAttribute('data-mode');
          if (mode === 'screenshot') { pop.remove(); startScreenshot(); }
          else { pop.remove(); showDurationPicker(mode); }
        });
      });
    });
  }

  /* ── Screenshot (PNG) ── */
  async function startScreenshot() {
    try {
      var stream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: 'always', displaySurface: 'browser' },
        audio: false, preferCurrentTab: true
      });
      var track = stream.getVideoTracks()[0];
      var imgCapture = new ImageCapture(track);
      var bitmap = await imgCapture.grabFrame();
      track.stop();
      var canvas = document.createElement('canvas');
      canvas.width = bitmap.width; canvas.height = bitmap.height;
      canvas.getContext('2d').drawImage(bitmap, 0, 0);
      canvas.toBlob(function(blob) {
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'screenshot-' + new Date().toISOString().slice(0,19).replace(/:/g,'-') + '.png';
        a.click();
        setTimeout(function() { URL.revokeObjectURL(url); }, 1000);
      }, 'image/png');
    } catch(e) { /* user cancelled */ }
  }

  /* ── Duration picker (shared by GIF + WebM) ── */
  function showDurationPicker(mode) {
    var pop = document.createElement('div');
    pop.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px)';
    var durations = mode === 'gif' ? [5, 10, 20] : [30, 60, 120];
    pop.innerHTML = '<div style="background:var(--card,#1e1e1e);border:1px solid var(--border,#333);border-radius:14px;padding:28px 32px;text-align:center;min-width:260px;box-shadow:0 12px 40px rgba(0,0,0,.5)">'
      + '<div style="font-size:14px;font-weight:700;color:var(--text,#fff);margin-bottom:4px">' + (mode === 'gif' ? 'GIF Recording' : 'Video Recording') + '</div>'
      + '<div style="font-size:12px;color:var(--muted,#888);margin-bottom:20px">Choose recording duration</div>'
      + '<div style="display:flex;gap:10px;justify-content:center">'
      + durations.map(function(d) { return '<button class="sr-dur" data-dur="' + d + '" style="flex:1;padding:10px 0;border-radius:8px;border:1px solid var(--border,#333);background:var(--accent-subtle-bg,rgba(255,255,255,.06));color:var(--text,#fff);font-size:14px;font-weight:600;cursor:pointer;transition:border-color .15s,background .15s">' + d + 's</button>'; }).join('')
      + '</div></div>';
    document.body.appendChild(pop);
    pop.addEventListener('click', function(e) { if (e.target === pop) pop.remove(); });

    pop.querySelectorAll('.sr-dur').forEach(function(btn) {
      btn.addEventListener('mouseenter', function() { btn.style.borderColor = 'var(--accent,#4af)'; });
      btn.addEventListener('mouseleave', function() { btn.style.borderColor = 'var(--border,#333)'; });
      btn.addEventListener('click', async function() {
        var duration = parseInt(btn.getAttribute('data-dur'));
        pop.remove();
        if (mode === 'gif') startGifRecording(duration);
        else startWebmRecording(duration);
      });
    });
  }

  /* ── WebM recording ── */
  async function startWebmRecording(duration) {
    try {
      var stream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: 'always', displaySurface: 'browser' },
        audio: false, preferCurrentTab: true
      });

      var recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
      var chunks = [];
      recorder.ondataavailable = function(e) { if (e.data.size) chunks.push(e.data); };

      function navGuard(e) { e.preventDefault(); e.returnValue = 'Switching tabs will stop recording'; }
      window.addEventListener('beforeunload', navGuard);
      function linkGuard(e) {
        var a = e.target.closest('a[href]');
        if (!a) return;
        e.preventDefault();
        if (confirm('Switching tabs will stop recording. Continue?')) {
          window.removeEventListener('beforeunload', navGuard);
          document.removeEventListener('click', linkGuard, true);
          window.location.href = a.href;
        }
      }
      document.addEventListener('click', linkGuard, true);

      var overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;top:16px;right:16px;z-index:99999;background:rgba(0,0,0,.85);color:#fff;padding:10px 18px;border-radius:10px;font-size:13px;display:flex;align-items:center;gap:10px;backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.12);font-family:inherit;pointer-events:none';
      var secs = duration;
      function updateOverlay() {
        overlay.innerHTML = '<span style="width:10px;height:10px;border-radius:50%;background:#f44;display:inline-block;box-shadow:0 0 6px #f44"></span> Recording… ' + secs + 's';
      }
      updateOverlay();
      document.body.appendChild(overlay);

      var iv = setInterval(function() { secs--; if (secs < 0) { clearInterval(iv); return; } updateOverlay(); }, 1000);

      recorder.onstop = function() {
        stream.getTracks().forEach(function(t) { t.stop(); });
        clearInterval(iv);
        window.removeEventListener('beforeunload', navGuard);
        document.removeEventListener('click', linkGuard, true);
        overlay.remove();
        var blob = new Blob(chunks, { type: 'video/webm' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'support-recording-' + new Date().toISOString().slice(0,19).replace(/:/g,'-') + '.webm';
        a.click();
        setTimeout(function() { URL.revokeObjectURL(url); }, 1000);
      };

      stream.getVideoTracks()[0].addEventListener('ended', function() {
        if (recorder.state === 'recording') recorder.stop();
      });

      recorder.start();
      setTimeout(function() { if (recorder.state === 'recording') recorder.stop(); }, duration * 1000);
    } catch (err) { /* user cancelled */ }
  }

  /* ── GIF recording (8fps, max 1080px, compressed) ── */
  async function startGifRecording(duration) {
    try {
      var stream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: 'always', displaySurface: 'browser' },
        audio: false, preferCurrentTab: true
      });

      var track = stream.getVideoTracks()[0];

      var video = document.createElement('video');
      video.srcObject = stream; video.muted = true; video.playsInline = true;
      await video.play();
      /* Wait for actual video dimensions */
      if (!video.videoWidth) await new Promise(function(r) { video.addEventListener('loadedmetadata', r); });
      var srcW = video.videoWidth || 1920, srcH = video.videoHeight || 1080;
      /* scale to max 1080px wide */
      var scale = srcW > 1080 ? 1080 / srcW : 1;
      var w = Math.round(srcW * scale), h = Math.round(srcH * scale);

      var canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      var ctx2d = canvas.getContext('2d');

      function navGuard(e) { e.preventDefault(); e.returnValue = 'Switching tabs will stop recording'; }
      window.addEventListener('beforeunload', navGuard);
      function linkGuard(e) {
        var a = e.target.closest('a[href]');
        if (!a) return;
        e.preventDefault();
        if (confirm('Switching tabs will stop recording. Continue?')) {
          window.removeEventListener('beforeunload', navGuard);
          document.removeEventListener('click', linkGuard, true);
          window.location.href = a.href;
        }
      }
      document.addEventListener('click', linkGuard, true);

      var overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;top:16px;right:16px;z-index:99999;background:rgba(0,0,0,.85);color:#fff;padding:10px 18px;border-radius:10px;font-size:13px;display:flex;align-items:center;gap:10px;backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.12);font-family:inherit;pointer-events:none';
      var secs = duration;
      function updateOverlay() {
        overlay.innerHTML = '<span style="width:10px;height:10px;border-radius:50%;background:#f44;display:inline-block;box-shadow:0 0 6px #f44"></span> Recording GIF… ' + secs + 's';
      }
      updateOverlay();
      document.body.appendChild(overlay);
      var iv = setInterval(function() { secs--; if (secs < 0) { clearInterval(iv); return; } updateOverlay(); }, 1000);

      /* Capture frames at 8fps */
      var frames = [];
      var frameInterval = setInterval(function() {
        ctx2d.drawImage(video, 0, 0, w, h);
        frames.push(ctx2d.getImageData(0, 0, w, h));
      }, 125); /* 1000/8 = 125ms */

      var stopped = false;
      function stopGif() {
        if (stopped) return; stopped = true;
        clearInterval(frameInterval); clearInterval(iv);
        track.stop(); video.pause(); video.srcObject = null;
        window.removeEventListener('beforeunload', navGuard);
        document.removeEventListener('click', linkGuard, true);
        overlay.innerHTML = '<span style="width:10px;height:10px;border-radius:50%;background:#fbbf24;display:inline-block;animation:pulse 1s ease infinite"></span> Encoding GIF… (' + frames.length + ' frames)';
        overlay.style.pointerEvents = 'none';
        encodeGif(frames, w, h, function(blob) {
          overlay.remove();
          var url = URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = url;
          a.download = 'support-recording-' + new Date().toISOString().slice(0,19).replace(/:/g,'-') + '.gif';
          a.click();
          setTimeout(function() { URL.revokeObjectURL(url); }, 1000);
        });
      }

      track.addEventListener('ended', stopGif);
      setTimeout(stopGif, duration * 1000);
    } catch(e) { /* user cancelled */ }
  }

  /* ── Minimal GIF encoder (LZW) ── */
  function encodeGif(frames, width, height, callback) {
    /* Uses a compact GIF89a encoder with LZW compression.
       Quantizes each frame to 256 colours via median-cut, then LZW-encodes. */
    var GIF_HEAD = [0x47,0x49,0x46,0x38,0x39,0x61]; /* GIF89a */
    var buf = [];
    function pu8(v) { buf.push(v & 0xff); }
    function pu16(v) { buf.push(v & 0xff); buf.push((v >> 8) & 0xff); }
    function puBytes(arr) { for (var i = 0; i < arr.length; i++) buf.push(arr[i]); }

    /* header */
    puBytes(GIF_HEAD);
    pu16(width); pu16(height);
    pu8(0xf7); /* GCT flag, 8-bit color (256) */
    pu8(0); /* bg */
    pu8(0); /* aspect */

    /* Build global color table from first frame */
    var globalPalette = buildPalette(frames[0]);
    for (var p = 0; p < 256; p++) {
      pu8(globalPalette[p * 3]); pu8(globalPalette[p * 3 + 1]); pu8(globalPalette[p * 3 + 2]);
    }

    /* Netscape loop extension */
    puBytes([0x21, 0xff, 0x0b]);
    puBytes([0x4e,0x45,0x54,0x53,0x43,0x41,0x50,0x45,0x32,0x2e,0x30]); /* NETSCAPE2.0 */
    puBytes([0x03, 0x01]); pu16(0); pu8(0); /* loop forever */

    for (var fi = 0; fi < frames.length; fi++) {
      var pixels = frames[fi].data;
      /* GCE */
      puBytes([0x21, 0xf9, 0x04, 0x00]);
      pu16(12); /* delay: 12 centiseconds ≈ 8fps (125ms) */
      pu8(0); pu8(0);

      /* Image descriptor */
      pu8(0x2c); pu16(0); pu16(0); pu16(width); pu16(height);
      pu8(0x00); /* no local CT */

      /* Quantize to palette indices */
      var indices = quantize(pixels, globalPalette, width * height);

      /* LZW encode */
      var lzwMin = 8;
      pu8(lzwMin);
      var encoded = lzwEncode(indices, lzwMin);
      /* Output sub-blocks */
      var pos = 0;
      while (pos < encoded.length) {
        var chunk = Math.min(255, encoded.length - pos);
        pu8(chunk);
        for (var ci = 0; ci < chunk; ci++) buf.push(encoded[pos++]);
      }
      pu8(0); /* block terminator */
    }

    pu8(0x3b); /* trailer */
    callback(new Blob([new Uint8Array(buf)], { type: 'image/gif' }));
  }

  function buildPalette(frame) {
    /* Median-cut quantization: builds a 256-colour palette from actual frame content */
    var pixels = frame.data, count = frame.width * frame.height;
    var step = count > 60000 ? Math.floor(count / 40000) : 1;
    var colors = [];
    for (var i = 0; i < count; i += step) {
      var off = i * 4;
      colors.push([pixels[off], pixels[off + 1], pixels[off + 2]]);
    }

    function mcut(box, depth) {
      if (depth === 0 || box.length <= 1) {
        if (!box.length) return [[0, 0, 0]];
        var rs = 0, gs = 0, bs = 0;
        for (var i = 0; i < box.length; i++) { rs += box[i][0]; gs += box[i][1]; bs += box[i][2]; }
        var n = box.length;
        return [[Math.round(rs / n), Math.round(gs / n), Math.round(bs / n)]];
      }
      var rMin = 255, rMax = 0, gMin = 255, gMax = 0, bMin = 255, bMax = 0;
      for (var i = 0; i < box.length; i++) {
        var c = box[i];
        if (c[0] < rMin) rMin = c[0]; if (c[0] > rMax) rMax = c[0];
        if (c[1] < gMin) gMin = c[1]; if (c[1] > gMax) gMax = c[1];
        if (c[2] < bMin) bMin = c[2]; if (c[2] > bMax) bMax = c[2];
      }
      var rR = rMax - rMin, gR = gMax - gMin, bR = bMax - bMin;
      var ch = rR >= gR && rR >= bR ? 0 : (gR >= bR ? 1 : 2);
      box.sort(function(a, b) { return a[ch] - b[ch]; });
      var mid = box.length >> 1;
      return mcut(box.slice(0, mid), depth - 1).concat(mcut(box.slice(mid), depth - 1));
    }

    var result = mcut(colors, 8); /* 2^8 = 256 buckets */
    var pal = new Uint8Array(768);
    for (var i = 0; i < 256; i++) {
      var c = i < result.length ? result[i] : [0, 0, 0];
      pal[i * 3] = c[0]; pal[i * 3 + 1] = c[1]; pal[i * 3 + 2] = c[2];
    }
    return pal;
  }

  function quantize(pixels, palette, count) {
    /* Nearest-colour quantization with cache for speed */
    var idx = new Uint8Array(count);
    var palR = new Uint8Array(256), palG = new Uint8Array(256), palB = new Uint8Array(256);
    for (var p = 0; p < 256; p++) {
      palR[p] = palette[p * 3]; palG[p] = palette[p * 3 + 1]; palB[p] = palette[p * 3 + 2];
    }
    var cache = {};
    for (var i = 0; i < count; i++) {
      var off = i * 4;
      var r = pixels[off], g = pixels[off + 1], b = pixels[off + 2];
      var key = ((r >> 2) << 12) | ((g >> 2) << 6) | (b >> 2); /* 6-bit per channel → 262K max keys */
      if (cache[key] !== undefined) { idx[i] = cache[key]; continue; }
      var bestD = 1e9, bestI = 0;
      for (var p = 0; p < 256; p++) {
        var dr = r - palR[p], dg = g - palG[p], db = b - palB[p];
        var d = dr * dr + dg * dg + db * db;
        if (d < bestD) { bestD = d; bestI = p; }
      }
      cache[key] = bestI;
      idx[i] = bestI;
    }
    return idx;
  }

  function lzwEncode(indices, minCodeSize) {
    var clearCode = 1 << minCodeSize;
    var eoiCode = clearCode + 1;
    var codeSize = minCodeSize + 1;
    var nextCode = eoiCode + 1;
    var maxCode = 1 << codeSize;
    var table = {};
    var output = [];
    var bitBuf = 0, bitCount = 0;

    function emit(code) {
      bitBuf |= code << bitCount;
      bitCount += codeSize;
      while (bitCount >= 8) {
        output.push(bitBuf & 0xff);
        bitBuf >>= 8; bitCount -= 8;
      }
    }

    /* init table */
    function resetTable() {
      table = {};
      for (var i = 0; i < clearCode; i++) table[String(i)] = i;
      nextCode = eoiCode + 1;
      codeSize = minCodeSize + 1;
      maxCode = 1 << codeSize;
    }

    emit(clearCode);
    resetTable();

    if (!indices.length) { emit(eoiCode); if (bitCount > 0) output.push(bitBuf & 0xff); return output; }

    var cur = String(indices[0]);
    for (var i = 1; i < indices.length; i++) {
      var next = cur + ',' + indices[i];
      if (table[next] !== undefined) {
        cur = next;
      } else {
        emit(table[cur]);
        if (nextCode < 4096) {
          table[next] = nextCode++;
          if (nextCode > maxCode && codeSize < 12) { codeSize++; maxCode = 1 << codeSize; }
        } else {
          emit(clearCode);
          resetTable();
        }
        cur = String(indices[i]);
      }
    }
    emit(table[cur]);
    emit(eoiCode);
    if (bitCount > 0) output.push(bitBuf & 0xff);
    return output;
  }

  // ── Change Password Modal ──
  var cpBtn = document.getElementById('changePasswordBtn');
  if (cpBtn) {
    cpBtn.addEventListener('click', function() {
      dropdownEl.style.display = 'none';
      // Build modal
      var overlay = document.createElement('div');
      overlay.className = 'cp-overlay';
      overlay.innerHTML = '<div class="cp-modal">' +
        '<div class="cp-modal-head"><h3>Change Password</h3><button class="cp-close">&times;</button></div>' +
        '<div class="cp-modal-body">' +
          '<label class="cp-label">Current Password</label>' +
          '<input id="cpCurrent" class="cp-input" type="password" autocomplete="current-password" />' +
          '<label class="cp-label">New Password</label>' +
          '<input id="cpNew" class="cp-input" type="password" autocomplete="new-password" />' +
          '<label class="cp-label">Confirm New Password</label>' +
          '<input id="cpConfirm" class="cp-input" type="password" autocomplete="new-password" />' +
          '<div id="cpError" style="color:#ff5050;font-size:12px;min-height:18px;margin-top:4px"></div>' +
          '<button id="cpSave" class="cp-save">Update Password</button>' +
        '</div>' +
      '</div>';
      document.body.appendChild(overlay);
      overlay.querySelector('.cp-close').addEventListener('click', function(){ overlay.remove(); });
      overlay.addEventListener('click', function(e){ if(e.target === overlay) overlay.remove(); });

      document.getElementById('cpSave').addEventListener('click', function() {
        var cur = document.getElementById('cpCurrent').value;
        var nw = document.getElementById('cpNew').value;
        var cf = document.getElementById('cpConfirm').value;
        var errEl = document.getElementById('cpError');
        errEl.textContent = '';
        if (!cur || !nw || !cf) { errEl.textContent = 'All fields are required'; return; }
        if (nw !== cf) { errEl.textContent = 'New passwords do not match'; return; }
        if (nw.length < 8) { errEl.textContent = 'Minimum 8 characters'; return; }
        var btn = document.getElementById('cpSave');
        btn.disabled = true; btn.textContent = 'Saving...';
        fetch('/api/change-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ currentPassword: cur, newPassword: nw, confirmPassword: cf })
        }).then(function(r){ return r.json(); }).then(function(d) {
          if (d.ok) {
            overlay.remove();
            alert('Password updated! You will be prompted to log in again.');
            window.location.href = '/api/logout';
          } else {
            errEl.textContent = d.error || 'Failed to change password';
            btn.disabled = false; btn.textContent = 'Update Password';
          }
        }).catch(function() {
          errEl.textContent = 'Network error';
          btn.disabled = false; btn.textContent = 'Update Password';
        });
      });
    });
  }

  // ── Avatar initials sync ──
  var nameEl = document.getElementById('sidebarName');
  var avatarEl = document.getElementById('sidebarAvatar');
  if (nameEl && avatarEl) {
    nameEl.addEventListener('input', function () {
      var parts = this.textContent.trim().split(/\s+/).filter(Boolean);
      var initials = parts.map(function (w) { return w.charAt(0).toUpperCase(); }).join('');
      avatarEl.textContent = initials.slice(0, 2) || 'U';
    });
  }

  // ── Inline Settings Tabs ──
  var tabs = [
    { id: 'global', label: 'Global' },
    { id: 'agents', label: 'Agents' },
    { id: 'users', label: 'Users', adminOnly: true },
    { id: 'usage', label: 'Usage' }
  ];

  var panels = {};

  var mainEl = document.querySelector('main.content');
  var savedMain = null;
  var globalWrapParent = null;

  // Fetch current user info on load
  window.__currentUser = null;
  fetch('/api/me').then(function(r){ return r.json(); }).then(function(data){
    if(data.ok){
      window.__currentUser = data;
      // Update sidebar profile
      var nameEl = document.getElementById('sidebarName');
      var avatarEl = document.getElementById('sidebarAvatar');
      if(nameEl && data.name) nameEl.textContent = data.name;
      if(avatarEl && data.name){
        var parts = data.name.trim().split(/\s+/).filter(Boolean);
        avatarEl.textContent = parts.map(function(w){ return w.charAt(0).toUpperCase(); }).join('').slice(0,2) || 'U';
      }
      var roleEl = document.getElementById('sidebarRole');
      if(roleEl) roleEl.textContent = data.role === 'admin' ? 'Admin' : 'User';
      // Enforce client restrictions for non-admins
      if(data.role !== 'admin') {
        var addBtn = document.getElementById('addClientBtn');
        var delBtn = document.getElementById('deleteClientBtn');
        if(addBtn) addBtn.style.display = 'none';
        if(delBtn) delBtn.style.display = 'none';
      }
    }
  }).catch(function(){});

  function openSettings(activeTab) {
    if (!mainEl) return;
    if (window.__globalSettingsWrap && globalWrapParent && window.__globalSettingsWrap.parentNode !== globalWrapParent) {
      globalWrapParent.appendChild(window.__globalSettingsWrap);
    }
    if (!savedMain) savedMain = mainEl.innerHTML;
    var isAdmin = window.__currentUser && window.__currentUser.role === 'admin';
    var visibleTabs = tabs.filter(function(t){ return !t.adminOnly || isAdmin; });
    var tabHtml = '<div class="st-tabs">';
    visibleTabs.forEach(function (t) {
      tabHtml += '<button class="st-tab' + (t.id === activeTab ? ' active' : '') + '" data-st="' + t.id + '">' + t.label + '</button>';
    });
    tabHtml += '</div>';
    mainEl.innerHTML = '<div class="st-page">'
      + '<div class="st-header"><button class="st-back" id="stBack"><i class="bi bi-arrow-left"></i></button><h2>Settings</h2></div>'
      + tabHtml
      + '<div class="st-body" id="stBody"></div>'
      + '</div>';
    var stBody = document.getElementById('stBody');
    if ((activeTab === 'global' || activeTab === 'agents') && window.__globalSettingsWrap) {
      var wrap = window.__globalSettingsWrap;
      if (!globalWrapParent) globalWrapParent = wrap.parentNode;
      var head = wrap.querySelector('.theme-modal-head');
      if (head) head.style.display = 'none';
      wrap.style.display = '';
      stBody.appendChild(wrap);
      // Show/hide sections based on active tab
      wrap.querySelectorAll('[data-settings-section]').forEach(function(sec) {
        var tabs = sec.getAttribute('data-settings-section').split(' ');
        sec.style.display = tabs.indexOf(activeTab) !== -1 ? '' : 'none';
      });
      wrap.classList.toggle('global-tab-active', activeTab === 'global');
      // Hide client creation for non-admins
      if(!isAdmin){
        var addBtn = wrap.querySelector('#addClientBtn');
        var delBtn = wrap.querySelector('#deleteClientBtn');
        if(addBtn) addBtn.style.display = 'none';
        if(delBtn) delBtn.style.display = 'none';
      }
      // Populate brand import section on Global tab
      if (activeTab === 'global') {
        var brandSec = wrap.querySelector('#brandImportSection');
        if (brandSec && !brandSec.hasChildNodes()) {
          var onKH = window.location.pathname.indexOf('knowledge-hub') >= 0;
          var brandfetchAction = onKH
            ? 'onclick="openBrandfetchModal()"'
            : 'onclick="window.location.href=\'./knowledge-hub.html#logo\'"';
          var guidelinesAction = onKH
            ? 'onclick="openBrandResearchModal()"'
            : 'onclick="window.location.href=\'./knowledge-hub.html#guidelines\'"';
          brandSec.innerHTML = '<span class="global-section-label">Brand Tools</span>'
            + '<div class="global-tools-grid">'
            + '<button class="global-tool-btn" ' + brandfetchAction + '>'
            + '<i class="bi bi-cloud-download"></i>'
            + '<div><span class="global-tool-title">Import from Brandfetch</span>'
            + '<span class="global-tool-desc">Logos, colors, and fonts</span></div>'
            + '</button>'
            + '<button class="global-tool-btn" ' + guidelinesAction + '>'
            + '<i class="bi bi-file-text"></i>'
            + '<div><span class="global-tool-title">Generate Guidelines</span>'
            + '<span class="global-tool-desc">About, tone of voice, mission</span></div>'
            + '</button>'
            + '</div>';
        }
      }
      if (window.__globalSettingsLoad) window.__globalSettingsLoad();
    } else if (activeTab === 'users') {
      renderUsersTab(stBody);
    } else if (activeTab === 'usage') {
      renderUsageTab(stBody);
    } else {
      stBody.innerHTML = panels[activeTab] || '';
    }
    mainEl.scrollTop = 0;
    mainEl.style.overflow = 'auto';
    document.getElementById('stBack').addEventListener('click', closeSettings);
    document.querySelectorAll('.st-tab').forEach(function (btn) {
      btn.addEventListener('click', function () { openSettings(btn.getAttribute('data-st')); });
    });
  }

  // ── Users Tab ──
  function renderUsersTab(container) {
    container.innerHTML = '<div class="users-tab-loading" style="color:var(--muted);font-size:13px;padding:20px 0"><i class="bi bi-hourglass-split"></i> Loading users...</div>';
    Promise.all([
      fetch('/api/users').then(function(r){ return r.json(); }),
      fetch('/api/settings-dashboard').then(function(r){ return r.json(); })
    ]).then(function(results){
      var userData = results[0];
      var settingsData = results[1];
      if(!userData.ok){ container.innerHTML = '<p style="color:var(--status-fail)">Failed to load users</p>'; return; }
      var users = userData.users || [];
      var clients = settingsData.clients || {};
      var clientKeys = Object.keys(clients);
      // Get agent slugs from the widget list
      var agentSlugs = [];
      if(settingsData.widgets){
        agentSlugs = Object.keys(settingsData.widgets);
      }
      // Fallback: use known widget slugs from the page
      if(!agentSlugs.length && window.__widgetSlugs) agentSlugs = window.__widgetSlugs;

      var html = '<div class="settings-section" style="margin-bottom:16px">'
        + '<div class="settings-section-head"><label class="accent-control-label"><i class="bi bi-people"></i> Users</label>'
        + '<span class="settings-agent-count">' + users.length + ' user(s)</span></div>'
        + '<div id="usersListWrap"></div>'
        + '<button id="addUserBtn" class="thumb-generate-btn" type="button" style="margin-top:12px"><i class="bi bi-person-plus"></i> <span>Add User</span></button>'
        + '</div>';
      container.innerHTML = html;

      var listWrap = document.getElementById('usersListWrap');

      function renderUserList(){
        var lhtml = '';
        users.forEach(function(u, idx){
          lhtml += '<div class="agent-card" style="padding:12px 0">'
            + '<div style="width:40px;height:40px;border-radius:8px;background:var(--accent-subtle-bg);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:700;font-size:14px;color:var(--accent)">'
            + (u.name || u.username).charAt(0).toUpperCase()
            + '</div>'
            + '<div style="flex:1;min-width:0">'
            + '<div style="font-weight:600;font-size:13px;color:var(--text)">' + escHtmlSb(u.name || u.username) + '</div>'
            + '<div style="font-size:12px;color:var(--muted)">@' + escHtmlSb(u.username) + ' · <span style="color:' + (u.role === 'admin' ? 'var(--accent)' : 'var(--muted)') + ';font-weight:600">' + u.role + '</span></div>'
            + '<div style="font-size:11px;color:var(--muted);margin-top:2px">'
            + 'Clients: ' + formatAccessList(u.clients, clients) + ' · Agents: ' + formatAgentsList(u.agents)
            + '</div>'
            + '</div>'
            + '<button class="settings-action-btn settings-action-btn--small" data-edit-user="' + idx + '" title="Edit"><i class="bi bi-pencil"></i></button>'
            + (u.username !== 'admin' ? '<button class="settings-action-btn settings-action-btn--small settings-action-btn--danger" data-delete-user="' + idx + '" title="Delete"><i class="bi bi-trash3"></i></button>' : '')
            + '</div>';
        });
        listWrap.innerHTML = lhtml || '<p style="color:var(--muted);font-size:13px;padding:12px 0">No users yet.</p>';

        listWrap.querySelectorAll('[data-edit-user]').forEach(function(btn){
          btn.addEventListener('click', function(){ openUserForm(users[parseInt(btn.getAttribute('data-edit-user'))]); });
        });
        listWrap.querySelectorAll('[data-delete-user]').forEach(function(btn){
          btn.addEventListener('click', function(){
            var u = users[parseInt(btn.getAttribute('data-delete-user'))];
            if(!confirm('Delete user "' + u.username + '"?')) return;
            fetch('/api/users', { method:'DELETE', headers:{'Content-Type':'application/json'}, body: JSON.stringify({username:u.username}) })
              .then(function(r){ return r.json(); })
              .then(function(d){
                if(d.ok){ users = users.filter(function(x){return x.username !== u.username;}); renderUserList(); }
                else alert(d.error || 'Failed');
              });
          });
        });
      }

      function formatAccessList(arr, clients){
        if(!arr || !arr.length) return '<em>none</em>';
        if(arr.indexOf('__all__') >= 0) return 'All';
        return arr.map(function(k){ return clients[k] ? clients[k].name : k; }).join(', ');
      }
      function formatAgentsList(arr){
        if(!arr || !arr.length) return '<em>none</em>';
        if(arr.indexOf('__all__') >= 0) return 'All';
        return arr.length + ' selected';
      }

      function openUserForm(existingUser){
        var isEdit = !!existingUser;
        var u = existingUser || { username:'', password:'', name:'', role:'user', clients:[], agents:['__all__'] };
        var formHtml = '<div class="settings-section" style="margin-bottom:16px">'
          + '<label class="accent-control-label">' + (isEdit ? 'Edit User' : 'New User') + '</label>'
          + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">'
          + '<div><label style="font-size:11px;color:var(--muted);display:block;margin-bottom:4px">Display Name</label>'
          + '<input id="ufName" class="accent-hex-input" type="text" value="' + escAttrSb(u.name || '') + '" placeholder="Full name" /></div>'
          + '<div><label style="font-size:11px;color:var(--muted);display:block;margin-bottom:4px">Username</label>'
          + '<input id="ufUsername" class="accent-hex-input" type="text" value="' + escAttrSb(u.username) + '" ' + (isEdit ? 'readonly style="opacity:0.5"' : '') + ' placeholder="username" /></div>'
          + '</div>'
          + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">'
          + '<div><label style="font-size:11px;color:var(--muted);display:block;margin-bottom:4px">Password</label>'
          + '<input id="ufPassword" class="accent-hex-input" type="text" value="' + (isEdit ? '' : '') + '" placeholder="' + (isEdit ? 'Leave blank to keep' : 'password') + '" /></div>'
          + '<div><label style="font-size:11px;color:var(--muted);display:block;margin-bottom:4px">Role</label>'
          + '<select id="ufRole" class="accent-hex-input"><option value="user"' + (u.role==='user'?' selected':'') + '>User</option><option value="admin"' + (u.role==='admin'?' selected':'') + '>Admin</option></select></div>'
          + '</div>'
          + '<label style="font-size:11px;color:var(--muted);display:block;margin-bottom:4px">Client Access</label>'
          + '<div id="ufClients" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px">'
          + '<label style="font-size:12px;display:flex;align-items:center;gap:4px;cursor:pointer"><input type="checkbox" value="__all__"' + (u.clients.indexOf('__all__')>=0?' checked':'') + ' /> All clients</label>';
        clientKeys.forEach(function(ck){
          formHtml += '<label style="font-size:12px;display:flex;align-items:center;gap:4px;cursor:pointer"><input type="checkbox" value="' + ck + '"' + (u.clients.indexOf(ck)>=0||u.clients.indexOf('__all__')>=0?' checked':'') + ' /> ' + escHtmlSb(clients[ck].name || ck) + '</label>';
        });
        formHtml += '</div>'
          + '<label style="font-size:11px;color:var(--muted);display:block;margin-bottom:4px">Agent Access</label>'
          + '<div id="ufAgents" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px">'
          + '<label style="font-size:12px;display:flex;align-items:center;gap:4px;cursor:pointer"><input type="checkbox" value="__all__"' + (u.agents.indexOf('__all__')>=0?' checked':'') + ' /> All agents</label>';
        // Render agent checkboxes from known slugs
        var slugs = agentSlugs.length ? agentSlugs : (window.__widgetSlugs || []);
        slugs.forEach(function(slug){
          var label = slug.replace(/-/g,' ').replace(/\b\w/g, function(c){ return c.toUpperCase(); });
          formHtml += '<label style="font-size:12px;display:flex;align-items:center;gap:4px;cursor:pointer"><input type="checkbox" value="' + slug + '"' + (u.agents.indexOf(slug)>=0||u.agents.indexOf('__all__')>=0?' checked':'') + ' /> ' + label + '</label>';
        });
        formHtml += '</div>'
          + '<div style="display:flex;gap:8px">'
          + '<button id="ufSave" class="thumb-generate-btn" type="button"><i class="bi bi-check-lg"></i> <span>' + (isEdit ? 'Update' : 'Create') + '</span></button>'
          + '<button id="ufCancel" class="thumb-generate-btn" type="button" style="background:transparent;border:1px solid var(--border);color:var(--card-text)"><span>Cancel</span></button>'
          + '</div></div>';

        listWrap.innerHTML = formHtml;
        document.getElementById('addUserBtn').style.display = 'none';

        document.getElementById('ufCancel').addEventListener('click', function(){ renderUserList(); document.getElementById('addUserBtn').style.display = ''; });
        document.getElementById('ufSave').addEventListener('click', function(){
          var payload = {
            username: isEdit ? u.username : document.getElementById('ufUsername').value.trim(),
            name: document.getElementById('ufName').value.trim(),
            role: document.getElementById('ufRole').value
          };
          var pw = document.getElementById('ufPassword').value;
          if(pw) payload.password = pw;
          else if(!isEdit){ alert('Password is required'); return; }

          // Gather checked clients
          var clientCbs = document.querySelectorAll('#ufClients input:checked');
          payload.clients = [];
          clientCbs.forEach(function(cb){ payload.clients.push(cb.value); });
          if(payload.clients.indexOf('__all__') >= 0) payload.clients = ['__all__'];

          // Gather checked agents
          var agentCbs = document.querySelectorAll('#ufAgents input:checked');
          payload.agents = [];
          agentCbs.forEach(function(cb){ payload.agents.push(cb.value); });
          if(payload.agents.indexOf('__all__') >= 0) payload.agents = ['__all__'];

          fetch('/api/users', { method: isEdit ? 'PUT' : 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
            .then(function(r){ return r.json(); })
            .then(function(d){
              if(d.ok){
                // Refresh user list
                fetch('/api/users').then(function(r){ return r.json(); }).then(function(d2){
                  if(d2.ok) users = d2.users;
                  renderUserList();
                  document.getElementById('addUserBtn').style.display = '';
                });
              } else { alert(d.error || 'Failed'); }
            });
        });
      }

      renderUserList();
      document.getElementById('addUserBtn').addEventListener('click', function(){ openUserForm(null); });
    });
  }

  // ── Usage Tab ──
  function renderUsageTab(container) {
    container.innerHTML = '<div style="color:var(--muted);font-size:13px;padding:20px 0"><i class="bi bi-hourglass-split"></i> Loading usage data...</div>';

    var currentDays = 30;
    var currentUser = null;
    var isAdminView = false;

    function loadUsage() {
      var qp = '?days=' + currentDays;
      if (currentUser) qp += '&user=' + encodeURIComponent(currentUser);
      fetch('/api/usage' + qp).then(function(r){ return r.json(); }).then(function(d) {
        if (!d.ok) { container.innerHTML = '<p style="color:var(--status-fail)">Failed to load usage</p>'; return; }
        isAdminView = !!d.isAdmin;
        // Non-admins always see their own detail view
        if (!isAdminView && !currentUser) currentUser = d.filterUser;
        renderUsageData(d);
      }).catch(function() {
        container.innerHTML = '<p style="color:var(--status-fail)">Failed to load usage</p>';
      });
    }

    function fmtCost(v) { return '$' + (v || 0).toFixed(4); }
    function fmtDate(iso) {
      if (!iso) return '—';
      var d = new Date(iso);
      return d.toLocaleDateString('en-GB', { day:'numeric', month:'short' }) + ' ' + d.toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit' });
    }
    function endpointLabel(ep) {
      return (ep || '').replace('/api/', '').replace(/-/g, ' ').replace(/\//g, ' › ').replace(/\b\w/g, function(c){ return c.toUpperCase(); });
    }

    function renderUsageData(data) {
      var html = '<div class="settings-section" style="margin-bottom:16px">';

      // Header with period selector and optional back button
      html += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">';
      if (currentUser && isAdminView) {
        html += '<div style="display:flex;align-items:center;gap:8px">'
          + '<button id="usageBack" class="settings-action-btn settings-action-btn--small" title="Back to all users"><i class="bi bi-arrow-left"></i></button>'
          + '<label class="accent-control-label" style="margin:0"><i class="bi bi-bar-chart-line"></i> ' + escHtmlSb(currentUser) + '</label>'
          + '</div>';
      } else if (currentUser) {
        html += '<label class="accent-control-label" style="margin:0"><i class="bi bi-bar-chart-line"></i> My Usage</label>';
      } else {
        html += '<label class="accent-control-label" style="margin:0"><i class="bi bi-bar-chart-line"></i> API Usage</label>';
      }
      html += '<select id="usagePeriod" class="accent-hex-input" style="width:auto;min-width:100px;font-size:12px">'
        + '<option value="7"' + (currentDays === 7 ? ' selected' : '') + '>7 days</option>'
        + '<option value="30"' + (currentDays === 30 ? ' selected' : '') + '>30 days</option>'
        + '<option value="90"' + (currentDays === 90 ? ' selected' : '') + '>90 days</option>'
        + '<option value="365"' + (currentDays === 365 ? ' selected' : '') + '>1 year</option>'
        + '</select></div>';

      // Grand total card
      html += '<div style="background:var(--accent-subtle-bg);border:1px solid var(--border);border-radius:10px;padding:16px;margin-bottom:16px;display:flex;gap:24px;align-items:center">'
        + '<div><div style="font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px">Total Spend</div>'
        + '<div style="font-size:22px;font-weight:700;color:var(--text)">' + fmtCost(data.grandTotal) + '</div></div>'
        + '<div><div style="font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px">API Calls</div>'
        + '<div style="font-size:22px;font-weight:700;color:var(--text)">' + (data.grandCount || 0) + '</div></div>'
        + '</div>';

      if (!currentUser) {
        // Per-user cards
        html += '<label class="accent-control-label" style="font-size:11px;margin-bottom:8px"><i class="bi bi-people"></i> Per User</label>';
        if (data.userTotals.length) {
          data.userTotals.forEach(function(u) {
            html += '<div class="agent-card usage-user-row" data-usage-user="' + escAttrSb(u.username) + '" style="padding:10px 0;cursor:pointer">'
              + '<div style="width:36px;height:36px;border-radius:8px;background:var(--accent-subtle-bg);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:700;font-size:13px;color:var(--accent)">'
              + escHtmlSb(u.username.charAt(0).toUpperCase())
              + '</div>'
              + '<div style="flex:1;min-width:0">'
              + '<div style="font-weight:600;font-size:13px;color:var(--text)">' + escHtmlSb(u.username) + '</div>'
              + '<div style="font-size:11px;color:var(--muted)">'
              + (u.total_count || 0) + ' calls · Last: ' + fmtDate(u.last_use)
              + '</div></div>'
              + '<div style="font-weight:700;font-size:14px;color:var(--text);white-space:nowrap">' + fmtCost(u.total_cost) + '</div>'
              + '<i class="bi bi-chevron-right" style="color:var(--muted);font-size:12px"></i>'
              + '</div>';
          });
        } else {
          html += '<p style="color:var(--muted);font-size:13px;padding:8px 0">No usage data yet.</p>';
        }
      } else {
        // Per-endpoint breakdown for this user
        html += '<label class="accent-control-label" style="font-size:11px;margin-bottom:8px"><i class="bi bi-layers"></i> Breakdown</label>';
        if (data.breakdown.length) {
          html += '<div style="border:1px solid var(--border);border-radius:8px;overflow:hidden">';
          data.breakdown.forEach(function(row, i) {
            var bg = i % 2 === 0 ? 'transparent' : 'var(--accent-subtle-bg)';
            html += '<div style="display:flex;align-items:center;padding:8px 12px;gap:10px;font-size:12px;background:' + bg + '">'
              + '<div style="flex:1;min-width:0">'
              + '<div style="font-weight:600;color:var(--text)">' + endpointLabel(row.endpoint) + '</div>'
              + '<div style="font-size:11px;color:var(--muted)">' + escHtmlSb(row.model || '—') + ' · ' + escHtmlSb(row.provider || '—') + '</div>'
              + '</div>'
              + '<div style="text-align:right;white-space:nowrap;font-size:11px;color:var(--muted)">' + (row.total_count || 0) + ' calls</div>'
              + '<div style="text-align:right;white-space:nowrap;font-weight:700;min-width:60px">' + fmtCost(row.total_cost) + '</div>'
              + '</div>';
          });
          html += '</div>';
        } else {
          html += '<p style="color:var(--muted);font-size:13px;padding:8px 0">No usage data for this user.</p>';
        }

        // Recent activity
        if (data.recent && data.recent.length) {
          html += '<label class="accent-control-label" style="font-size:11px;margin:16px 0 8px"><i class="bi bi-clock-history"></i> Recent Activity</label>';
          html += '<div style="border:1px solid var(--border);border-radius:8px;overflow:hidden;max-height:300px;overflow-y:auto">';
          data.recent.forEach(function(row, i) {
            var bg = i % 2 === 0 ? 'transparent' : 'var(--accent-subtle-bg)';
            html += '<div style="display:flex;align-items:center;padding:6px 12px;gap:8px;font-size:11px;background:' + bg + '">'
              + '<div style="flex:1;min-width:0;color:var(--text)">' + endpointLabel(row.endpoint) + '</div>'
              + '<div style="color:var(--muted);white-space:nowrap">' + fmtDate(row.created_at) + '</div>'
              + '<div style="font-weight:600;white-space:nowrap;min-width:50px;text-align:right">' + fmtCost(row.cost_usd) + '</div>'
              + '</div>';
          });
          html += '</div>';
        }
      }

      html += '</div>';
      container.innerHTML = html;

      // Event: period selector
      var periodSel = document.getElementById('usagePeriod');
      if (periodSel) {
        periodSel.addEventListener('change', function() {
          currentDays = parseInt(periodSel.value) || 30;
          loadUsage();
        });
      }

      // Event: back button
      var backBtn = document.getElementById('usageBack');
      if (backBtn) {
        backBtn.addEventListener('click', function() {
          currentUser = null;
          loadUsage();
        });
      }

      // Event: click user row to drill down
      container.querySelectorAll('[data-usage-user]').forEach(function(row) {
        row.addEventListener('click', function() {
          currentUser = row.getAttribute('data-usage-user');
          loadUsage();
        });
      });
    }

    loadUsage();
  }

  function escHtmlSb(s){ var d = document.createElement('div'); d.textContent = s || ''; return d.innerHTML; }
  function escAttrSb(s){ return (s||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  function closeSettings() {
    if (window.__globalSettingsWrap) {
      var wrap = window.__globalSettingsWrap;
      var head = wrap.querySelector('.theme-modal-head');
      if (head) head.style.display = '';
      wrap.style.display = 'none';
      if (globalWrapParent) globalWrapParent.appendChild(wrap);
    }
    if (savedMain && mainEl) {
      mainEl.innerHTML = savedMain;
      mainEl.style.overflow = '';
      savedMain = null;
    }
  }

  window.__closeSettings = closeSettings;

  var gsBtn = document.getElementById('globalSettingsBtn');
  if (gsBtn) gsBtn.addEventListener('click', function () { openSettings('global'); });

  /* Fullscreen toggle now handled by session-history.js */
})();
