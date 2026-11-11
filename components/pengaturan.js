/**
 * Component: Pengaturan
 * Konfigurasi profil civitas UBL, notifikasi, dan parameter AI Green Campus
 */
(function () {
  window.AppComponents = window.AppComponents || {};

  window.AppComponents.pengaturan = {
    render() {
      const { settings } = window.GreenCampusStore.getState();

      return `
        <div class="page-header-bar">
          <div>
            <h1 class="page-heading">Pengaturan Akun & Sistem</h1>
            <p class="page-subheading">Kelola profil civitas akademika Universitas Bandar Lampung, notifikasi, dan preferensi AI.</p>
          </div>
          <button class="btn btn-secondary btn-sm" id="btn-reset-demo">Reset Data Demo</button>
        </div>

        <form id="settings-form" class="grid-equal-2" style="align-items:start;">
          <!-- Profile Settings -->
          <div class="card">
            <div class="card-header">
              <div class="card-title-wrap">
                <span style="color:#15803d;display:inline-flex;width:18px;height:18px;">${window.Icons.settings}</span>
                <h2 class="card-title">Profil Civitas UBL</h2>
              </div>
            </div>

            <div class="form-grid">
              <div class="form-group full">
                <label class="form-label" for="set-name">Nama Lengkap</label>
                <input id="set-name" class="form-control" type="text" required value="${settings.userName}" />
              </div>

              <div class="form-group">
                <label class="form-label" for="set-role">Peran Kampus</label>
                <select id="set-role" class="form-control">
                  ${['Mahasiswa', 'Dosen / Staf', 'Admin Green Campus'].map((r) => `
                    <option value="${r}" ${settings.role === r ? 'selected' : ''}>${r}</option>
                  `).join('')}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="set-nim">NIM / NIDN / NIP</label>
                <input id="set-nim" class="form-control" type="text" value="${settings.nimOrId}" />
              </div>

              <div class="form-group full">
                <label class="form-label" for="set-faculty">Fakultas / Unit Kerja</label>
                <input id="set-faculty" class="form-control" type="text" value="${settings.faculty}" />
              </div>

              <div class="form-group full">
                <label class="form-label" for="set-email">Email Institusi (@ubl.ac.id)</label>
                <input id="set-email" class="form-control" type="email" value="${settings.email}" />
              </div>

              <div class="form-group full">
                <label class="form-label" for="set-campus">Area Kampus Utama</label>
                <select id="set-campus" class="form-control">
                  ${[
                    'Kampus Drs. H. RM. Barusman (Kampus A UBL)',
                    'Kampus Pascasarjana (Kampus B UBL)',
                    'Laboratorium Terpadu Teknik & Sains UBL'
                  ].map((c) => `<option value="${c}" ${settings.campusLocation === c ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
              </div>
            </div>
          </div>

          <!-- Notification & AI Preferences -->
          <div style="display:flex;flex-direction:column;gap:16px;">
            <div class="card">
              <div class="card-header">
                <div class="card-title-wrap">
                  <span style="color:#15803d;display:inline-flex;width:18px;height:18px;">${window.Icons.bell}</span>
                  <h2 class="card-title">Preferensi Notifikasi</h2>
                </div>
              </div>

              <div style="display:flex;flex-direction:column;gap:14px;">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
                  <div>
                    <div style="font-size:13.5px;font-weight:700;">Notifikasi Status Penjemputan</div>
                    <div style="font-size:12px;color:#586c60;">Beritahu saat armada EV berangkat menuju gedung Anda.</div>
                  </div>
                  <label class="switch">
                    <input type="checkbox" id="set-notif-pickup" ${settings.notifPickup ? 'checked' : ''} />
                    <span class="slider"></span>
                  </label>
                </div>

                <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
                  <div>
                    <div style="font-size:13.5px;font-weight:700;">Laporan Ringkasan ke Email UBL</div>
                    <div style="font-size:12px;color:#586c60;">Kirim bukti serah terima e-waste & sertifikat CO₂.</div>
                  </div>
                  <label class="switch">
                    <input type="checkbox" id="set-notif-email" ${settings.notifEmail ? 'checked' : ''} />
                    <span class="slider"></span>
                  </label>
                </div>

                <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
                  <div>
                    <div style="font-size:13.5px;font-weight:700;">Buletin Mingguan Green Campus</div>
                    <div style="font-size:12px;color:#586c60;">Update peringkat fakultas terbersih di UBL.</div>
                  </div>
                  <label class="switch">
                    <input type="checkbox" id="set-notif-digest" ${settings.notifWeeklyDigest ? 'checked' : ''} />
                    <span class="slider"></span>
                  </label>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-header">
                <div class="card-title-wrap">
                  <span style="color:#1d4ed8;display:inline-flex;width:18px;height:18px;">${window.Icons.ai}</span>
                  <h2 class="card-title">Konfigurasi AI & Otomasi</h2>
                </div>
              </div>

              <div class="form-group" style="margin-bottom:14px;">
                <label class="form-label" for="set-ai-threshold">Ambang Keyakinan Klasifikasi AI: <strong id="ai-thresh-val">${settings.aiThreshold}%</strong></label>
                <input id="set-ai-threshold" type="range" min="70" max="98" value="${settings.aiThreshold}" style="accent-color:#1b7346;" />
              </div>

              <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:16px;">
                <div>
                  <div style="font-size:13.5px;font-weight:700;">Auto-Jadwal untuk Beban &gt; 10 kg</div>
                  <div style="font-size:12px;color:#586c60;">Otomatis prioritaskan armada EV besar.</div>
                </div>
                <label class="switch">
                  <input type="checkbox" id="set-auto-heavy" ${settings.autoScheduleHeavy ? 'checked' : ''} />
                  <span class="slider"></span>
                </label>
              </div>

              <button type="submit" class="btn btn-primary" style="width:100%;">
                <span>Simpan Semua Pengaturan</span>
                ${window.Icons.check}
              </button>
            </div>
          </div>
        </form>
      `;
    },

    bind() {
      const range = document.getElementById('set-ai-threshold');
      const rangeVal = document.getElementById('ai-thresh-val');
      if (range && rangeVal) {
        range.addEventListener('input', () => {
          rangeVal.textContent = range.value + '%';
        });
      }

      const form = document.getElementById('settings-form');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          window.GreenCampusStore.updateSettings({
            userName: document.getElementById('set-name').value.trim(),
            role: document.getElementById('set-role').value,
            nimOrId: document.getElementById('set-nim').value.trim(),
            faculty: document.getElementById('set-faculty').value.trim(),
            email: document.getElementById('set-email').value.trim(),
            campusLocation: document.getElementById('set-campus').value,
            notifPickup: document.getElementById('set-notif-pickup').checked,
            notifEmail: document.getElementById('set-notif-email').checked,
            notifWeeklyDigest: document.getElementById('set-notif-digest').checked,
            aiThreshold: Number(document.getElementById('set-ai-threshold').value),
            autoScheduleHeavy: document.getElementById('set-auto-heavy').checked
          });
          window.AppUI.updateHeaderMeta();
          window.AppUI.toast('Pengaturan berhasil disimpan!');
        });
      }

      const resetBtn = document.getElementById('btn-reset-demo');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          window.GreenCampusStore.resetDemo();
          window.AppUI.updateHeaderMeta();
          window.AppUI.toast('Data demo dikembalikan ke kondisi awal.');
          window.AppUI.renderCurrentPage();
        });
      }
    }
  };
})();

