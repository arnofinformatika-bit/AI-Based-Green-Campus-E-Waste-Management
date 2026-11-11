/**
 * Component: Klasifikasi AI
 * Simulasi AI Vision untuk mengenali jenis e-waste, tingkat bahaya B3, dan nilai daur ulang
 */
(function () {
  window.AppComponents = window.AppComponents || {};

  const AI_PRESETS = {
    monitor: {
      item: 'Monitor LCD / LED Bekas',
      category: 'Komputer',
      confidence: '97.4%',
      hazard: 'Sedang (Merkuri Backlight & PCB)',
      estWeight: 4.8,
      materials: ['Plastik ABS (42%)', 'Kaca Panel LCD (28%)', 'Logam Aluminium & Tembaga (22%)', 'PCB & Emas Mikro (8%)'],
      recommendation: 'Simpan tegak tanpa menekan layar. Serahkan ke mitra daur ulang bersertifikat untuk pemisahan panel LCD.'
    },
    printer: {
      item: 'Printer Laser / Inkjet Kantor',
      category: 'Printer',
      confidence: '96.1%',
      hazard: 'Sedang (Serbuk Toner & Sirkuit)',
      estWeight: 6.2,
      materials: ['Polimer Casing (54%)', 'Motor Stepper & Baja (28%)', 'Board PCB (12%)', 'Sisa Cartridge (6%)'],
      recommendation: 'Lepas cartridge/toner sebelum pengangkutan agar tidak bocor di kendaraan EV kampus.'
    },
    battery: {
      item: 'Baterai Laptop / UPS Lithium-Ion',
      category: 'Baterai',
      confidence: '98.3%',
      hazard: 'Tinggi (Limbah B3 Mudah Terbakar)',
      estWeight: 1.4,
      materials: ['Litium & Kobalt (45%)', 'Tembaga & Aluminium Foil (30%)', 'Selongsong Polimer (25%)'],
      recommendation: 'Wajib dimasukkan ke wadah isolasi tahan panas dan tidak ditumpuk dengan logam konduktif.'
    },
    router: {
      item: 'Router Wi-Fi & Switch Jaringan Lab',
      category: 'Perangkat Jaringan',
      confidence: '95.2%',
      hazard: 'Rendah (PCB & Solder)',
      estWeight: 2.1,
      materials: ['Motherboard PCB (48%)', 'Casing Metal/Plastik (37%)', 'Konektor Berlapis Emas (15%)'],
      recommendation: 'Reset konfigurasi pabrik terlebih dahulu, lalu kumpulkan di dropbox e-waste Gedung Rektorat.'
    }
  };

  let currentResult = AI_PRESETS.monitor;

  function detectPresetFromName(fileName) {
    const lower = (fileName || '').toLowerCase();
    if (lower.includes('print') || lower.includes('epson') || lower.includes('canon')) return AI_PRESETS.printer;
    if (lower.includes('bat') || lower.includes('ups') || lower.includes('accu')) return AI_PRESETS.battery;
    if (lower.includes('rout') || lower.includes('switch') || lower.includes('wifi') || lower.includes('modem')) return AI_PRESETS.router;
    return AI_PRESETS.monitor;
  }

  window.AppComponents.klasifikasi = {
    render() {
      const state = window.GreenCampusStore.getState();

      return `
        <div class="page-header-bar">
          <div>
            <h1 class="page-heading">Klasifikasi E-Waste Dengan AI</h1>
            <p class="page-subheading">Unggah foto perangkat atau pilih sampel untuk identifikasi otomatis jenis limbah elektronik & nilai daur ulang.</p>
          </div>
          <span class="badge badge-green">Model AI Vision v2.4 • Aktif</span>
        </div>

        <div class="grid-equal-2">
          <!-- Upload & Sample Selector -->
          <div class="card">
            <div class="card-header">
              <div class="card-title-wrap">
                <span style="color:#1d4ed8;display:inline-flex;width:18px;height:18px;">${window.Icons.ai}</span>
                <h2 class="card-title">Pemindai Gambar AI</h2>
              </div>
            </div>

            <div class="dropzone" id="ai-dropzone">
              <div style="width:46px;height:46px;margin:0 auto 10px;border-radius:14px;background:#e3f5ea;color:#15803d;display:flex;align-items:center;justify-content:center;">
                ${window.Icons.upload}
              </div>
              <div style="font-weight:700;font-size:14.5px;color:#14281d;">Seret & lepas foto perangkat di sini</div>
              <div style="font-size:12.5px;color:#586c60;margin:4px 0 12px;">Format JPG, PNG, WEBP (Maks. 10 MB)</div>
              <button type="button" class="btn btn-secondary btn-sm" id="ai-browse-btn">Pilih Foto Perangkat</button>
              <input type="file" id="ai-file-input" accept="image/*" style="display:none;" />
            </div>

            <div id="ai-preview-box" style="display:none;margin-top:14px;text-align:center;">
              <img id="ai-preview-img" alt="Preview Scan AI" style="max-height:150px;border-radius:12px;border:1px solid #d5e2da;" />
            </div>

            <div id="ai-scanning-box" style="display:none;margin-top:14px;padding:12px 14px;background:#f2faf5;border-radius:12px;border:1px solid #cce7d5;">
              <div style="display:flex;justify-content:space-between;font-size:12.5px;font-weight:700;margin-bottom:6px;color:#14532d;">
                <span>Menganalisis komponen elektronik...</span>
                <span id="ai-scan-pct">0%</span>
              </div>
              <div class="progress-bar-track">
                <div class="progress-bar-fill" id="ai-scan-bar" style="width:0%;"></div>
              </div>
            </div>

            <div style="margin-top:16px;">
              <div style="font-size:12.5px;font-weight:700;color:#586c60;margin-bottom:8px;">Atau uji cepat dengan sampel perangkat UBL:</div>
              <div style="display:flex;flex-wrap:wrap;gap:8px;">
                <button type="button" class="btn btn-secondary btn-sm ai-sample-btn" data-sample="monitor">Monitor LCD</button>
                <button type="button" class="btn btn-secondary btn-sm ai-sample-btn" data-sample="printer">Printer Laser</button>
                <button type="button" class="btn btn-secondary btn-sm ai-sample-btn" data-sample="battery">Baterai Li-Ion</button>
                <button type="button" class="btn btn-secondary btn-sm ai-sample-btn" data-sample="router">Router Jaringan</button>
              </div>
            </div>
          </div>

          <!-- Classification Result -->
          <div class="card" id="ai-result-card">
            <div class="card-header">
              <div class="card-title-wrap">
                <span style="color:#15803d;display:inline-flex;width:18px;height:18px;">${window.Icons.recycle}</span>
                <h2 class="card-title">Hasil Analisis AI</h2>
              </div>
              <span class="badge badge-green">Akurasi ${currentResult.confidence}</span>
            </div>

            <div style="background:#f4faf6;border:1px solid #d6ebdd;border-radius:14px;padding:14px 16px;margin-bottom:14px;">
              <div style="font-size:12px;color:#586c60;font-weight:600;">Objek Terdeteksi</div>
              <div style="font-size:18px;font-weight:800;color:#143624;margin:2px 0 8px;">${currentResult.item}</div>
              <div style="display:flex;flex-wrap:wrap;gap:8px;">
                <span class="badge badge-blue">Kategori: ${currentResult.category}</span>
                <span class="badge ${currentResult.hazard.includes('Tinggi') ? 'badge-red' : 'badge-orange'}">Risiko: ${currentResult.hazard}</span>
                <span class="badge badge-purple">Est. Berat: ${currentResult.estWeight} kg</span>
              </div>
            </div>

            <div style="margin-bottom:14px;">
              <div style="font-size:12.5px;font-weight:700;color:#14281d;margin-bottom:6px;">Komposisi Material Daur Ulang:</div>
              <div class="materials-grid">
                ${currentResult.materials.map((m) => `
                  <div style="padding:8px 10px;border-radius:10px;background:#f8fbf9;border:1px solid #e4ece6;font-size:12.5px;font-weight:600;color:#2e4738;">
                    • ${m}
                  </div>
                `).join('')}
              </div>
            </div>

            <div style="padding:11px 13px;border-radius:12px;background:#fef6eb;border:1px solid #f7dfc1;font-size:12.5px;color:#78350f;line-height:1.45;margin-bottom:16px;">
              <strong>Rekomendasi Penanganan:</strong> ${currentResult.recommendation}
            </div>

            <button type="button" class="btn btn-primary" id="btn-ai-to-report" style="width:100%;">
              <span>Lanjutkan ke Form Lapor E-Waste</span>
              ${window.Icons.arrowRight}
            </button>
          </div>
        </div>

        <!-- History Table -->
        <div class="card">
          <div class="card-header">
            <div class="card-title-wrap">
              <span style="color:#15803d;display:inline-flex;width:18px;height:18px;">${window.Icons.clock}</span>
              <h2 class="card-title">Riwayat Pemindaian AI Kampus</h2>
            </div>
          </div>
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>ID Scan</th>
                  <th>Perangkat</th>
                  <th>Kategori</th>
                  <th>Tingkat Bahaya</th>
                  <th>Skor AI</th>
                  <th>Est. Berat</th>
                  <th>Tanggal</th>
                </tr>
              </thead>
              <tbody>
                ${state.aiHistory.map((h) => `
                  <tr>
                    <td style="font-weight:700;">${h.id}</td>
                    <td>${h.item}</td>
                    <td><span class="badge badge-blue">${h.category}</span></td>
                    <td>${h.hazard}</td>
                    <td style="font-weight:700;color:#15803d;">${h.confidence}</td>
                    <td>${h.estWeight}</td>
                    <td style="color:#586c60;">${h.date}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    },

    bind() {
      const browseBtn = document.getElementById('ai-browse-btn');
      const fileInput = document.getElementById('ai-file-input');
      const dropzone = document.getElementById('ai-dropzone');
      const previewBox = document.getElementById('ai-preview-box');
      const previewImg = document.getElementById('ai-preview-img');

      function runScan(preset, labelOverride) {
        const scanBox = document.getElementById('ai-scanning-box');
        const scanBar = document.getElementById('ai-scan-bar');
        const scanPct = document.getElementById('ai-scan-pct');
        if (!scanBox) return;

        scanBox.style.display = 'block';
        let pct = 15;
        scanBar.style.width = pct + '%';
        scanPct.textContent = pct + '%';

        const timer = setInterval(() => {
          pct += 25;
          if (pct >= 100) {
            clearInterval(timer);
            scanBar.style.width = '100%';
            scanPct.textContent = '100%';
            currentResult = Object.assign({}, preset);
            if (labelOverride) currentResult.item = labelOverride;

            window.GreenCampusStore.addAiRecord({
              id: `AI-${Math.floor(893 + Math.random() * 90)}`,
              item: currentResult.item,
              category: currentResult.category,
              hazard: currentResult.hazard.split('(')[0].trim(),
              confidence: currentResult.confidence,
              estWeight: `${currentResult.estWeight} kg`,
              date: 'Hari Ini'
            });

            window.AppUI.toast(`AI mendeteksi: ${currentResult.item}`);
            window.AppUI.renderCurrentPage();
          } else {
            scanBar.style.width = pct + '%';
            scanPct.textContent = pct + '%';
          }
        }, 140);
      }

      if (browseBtn && fileInput) {
        browseBtn.addEventListener('click', () => fileInput.click());
      }

      if (fileInput) {
        fileInput.addEventListener('change', () => {
          const file = fileInput.files && fileInput.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = (e) => {
            if (previewBox && previewImg) {
              previewImg.src = e.target.result;
              previewBox.style.display = 'block';
            }
            const detected = detectPresetFromName(file.name);
            runScan(detected, `${detected.item} (${file.name})`);
          };
          reader.readAsDataURL(file);
        });
      }

      if (dropzone) {
        dropzone.addEventListener('dragover', (e) => {
          e.preventDefault();
          dropzone.classList.add('dragover');
        });
        dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
        dropzone.addEventListener('drop', (e) => {
          e.preventDefault();
          dropzone.classList.remove('dragover');
          const file = e.dataTransfer.files && e.dataTransfer.files[0];
          if (file) {
            const detected = detectPresetFromName(file.name);
            runScan(detected, `${detected.item} (${file.name})`);
          }
        });
      }

      document.querySelectorAll('.ai-sample-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const preset = AI_PRESETS[btn.dataset.sample] || AI_PRESETS.monitor;
          runScan(preset);
        });
      });

      const toReportBtn = document.getElementById('btn-ai-to-report');
      if (toReportBtn) {
        toReportBtn.addEventListener('click', () => {
          window.GreenCampusStore.setPendingPrefill({
            device: currentResult.item,
            category: currentResult.category,
            weight: currentResult.estWeight,
            notes: `Hasil AI (${currentResult.confidence}): ${currentResult.recommendation}`
          });
          window.AppUI.navigate('lapor');
        });
      }
    }
  };
})();

