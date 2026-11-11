/**
 * Component: Lapor E-Waste
 * Form pelaporan limbah elektronik civitas akademika Universitas Bandar Lampung
 */
(function () {
  window.AppComponents = window.AppComponents || {};

  const UBL_BUILDINGS = [
    'Gedung A (Pascasarjana UBL)',
    'Gedung B (Rektorat & Administrasi)',
    'Gedung C (Fakultas Teknik)',
    'Gedung D (Fakultas Ekonomi & Bisnis)',
    'Lab Komputer Terpadu UBL',
    'Perpustakaan Pusat UBL',
    'Student Center & GSG UBL'
  ];

  window.AppComponents.lapor = {
    render() {
      const state = window.GreenCampusStore.getState();
      const prefill = window.GreenCampusStore.consumePendingPrefill();

      return `
        <div class="page-header-bar">
          <div>
            <h1 class="page-heading">Lapor E-Waste Kampus</h1>
            <p class="page-subheading">Laporkan perangkat elektronik rusak atau tidak terpakai di lingkungan Universitas Bandar Lampung.</p>
          </div>
          <button class="btn btn-secondary btn-sm" id="btn-to-ai">
            ${window.Icons.ai}
            <span>Gunakan Scanner AI Dulu</span>
          </button>
        </div>

        <div class="grid-2 responsive-split-aside">
          <!-- Form Card -->
          <div class="card">
            <div class="card-header">
              <div class="card-title-wrap">
                <span style="color:#15803d;display:inline-flex;width:18px;height:18px;">${window.Icons.report}</span>
                <h2 class="card-title">Formulir Pelaporan Limbah Elektronik</h2>
              </div>
              ${prefill ? '<span class="badge badge-green">Diisi dari Klasifikasi AI</span>' : ''}
            </div>

            <form id="lapor-form" class="form-grid">
              <div class="form-group">
                <label class="form-label" for="rep-name">Nama Pelapor</label>
                <input id="rep-name" class="form-control" type="text" required value="${state.settings.userName}" />
              </div>

              <div class="form-group">
                <label class="form-label" for="rep-role">Status / Unit UBL</label>
                <input id="rep-role" class="form-control" type="text" required value="${state.settings.role} — ${state.settings.faculty}" />
              </div>

              <div class="form-group full">
                <label class="form-label" for="rep-device">Nama & Jumlah Perangkat</label>
                <input id="rep-device" class="form-control" type="text" required placeholder="Contoh: Monitor LCD Dell 22 inci (2 Unit)" value="${prefill ? prefill.device : ''}" />
              </div>

              <div class="form-group">
                <label class="form-label" for="rep-category">Kategori E-Waste</label>
                <select id="rep-category" class="form-control">
                  ${['Komputer', 'Printer', 'Baterai', 'Perangkat Jaringan'].map((cat) => `
                    <option value="${cat}" ${prefill && prefill.category === cat ? 'selected' : ''}>${cat}</option>
                  `).join('')}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="rep-weight">Perkiraan Berat (kg)</label>
                <input id="rep-weight" class="form-control" type="number" step="0.1" min="0.2" required value="${prefill ? prefill.weight : '4.5'}" />
              </div>

              <div class="form-group full">
                <label class="form-label" for="rep-building">Lokasi Gedung Kampus UBL</label>
                <select id="rep-building" class="form-control">
                  ${UBL_BUILDINGS.map((b) => `<option value="${b}">${b}</option>`).join('')}
                </select>
              </div>

              <div class="form-group full">
                <label class="form-label" for="rep-photo">Foto Perangkat (Opsional)</label>
                <input id="rep-photo" class="form-control" type="file" accept="image/*" />
                <div id="rep-photo-preview" style="display:none;margin-top:8px;">
                  <img id="rep-photo-img" alt="Preview E-Waste" style="max-height:130px;border-radius:10px;border:1px solid #d5e2da;" />
                </div>
              </div>

              <div class="form-group full">
                <label class="form-label" for="rep-notes">Catatan Kondisi / Titik Jemput</label>
                <textarea id="rep-notes" class="form-control" placeholder="Misal: Ditempatkan di dekat pos satpam Gedung C lantai 1...">${prefill ? prefill.notes : ''}</textarea>
              </div>

              <div class="form-group full" style="flex-direction:row;justify-content:flex-end;gap:10px;margin-top:4px;">
                <button type="reset" class="btn btn-secondary">Reset</button>
                <button type="submit" class="btn btn-primary">
                  <span>Kirim Laporan E-Waste</span>
                  ${window.Icons.arrowRight}
                </button>
              </div>
            </form>
          </div>

          <!-- Recent Reports Table Card -->
          <div class="card">
            <div class="card-header">
              <div class="card-title-wrap">
                <span style="color:#15803d;display:inline-flex;width:18px;height:18px;">${window.Icons.clock}</span>
                <h2 class="card-title">Riwayat Laporan Terbaru</h2>
              </div>
              <span class="badge badge-green">${state.reports.length} Total</span>
            </div>

            <div class="table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>ID & Perangkat</th>
                    <th>Lokasi</th>
                    <th>Berat</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${state.reports.slice(0, 6).map((r) => `
                    <tr>
                      <td>
                        <div style="font-weight:700;font-size:12.5px;">${r.id}</div>
                        <div style="color:#586c60;font-size:12px;">${r.device}</div>
                      </td>
                      <td style="font-size:12.5px;">${r.building.split('(')[0].trim()}</td>
                      <td style="font-weight:700;">${r.weight} kg</td>
                      <td>${window.AppUI.statusBadge(r.status)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    },

    bind() {
      const toAiBtn = document.getElementById('btn-to-ai');
      if (toAiBtn) {
        toAiBtn.addEventListener('click', () => window.AppUI.navigate('klasifikasi'));
      }

      const photoInput = document.getElementById('rep-photo');
      const previewWrap = document.getElementById('rep-photo-preview');
      const previewImg = document.getElementById('rep-photo-img');
      if (photoInput && previewWrap && previewImg) {
        photoInput.addEventListener('change', () => {
          const file = photoInput.files && photoInput.files[0];
          if (!file) {
            previewWrap.style.display = 'none';
            return;
          }
          const reader = new FileReader();
          reader.onload = (ev) => {
            previewImg.src = ev.target.result;
            previewWrap.style.display = 'block';
          };
          reader.readAsDataURL(file);
        });
      }

      const form = document.getElementById('lapor-form');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const newRep = window.GreenCampusStore.addReport({
            reporter: document.getElementById('rep-name').value.trim(),
            role: document.getElementById('rep-role').value.trim(),
            device: document.getElementById('rep-device').value.trim(),
            category: document.getElementById('rep-category').value,
            weight: document.getElementById('rep-weight').value,
            building: document.getElementById('rep-building').value,
            notes: document.getElementById('rep-notes').value.trim()
          });
          window.AppUI.updateHeaderMeta();
          window.AppUI.toast(`Laporan ${newRep.id} berhasil dikirim!`);
          window.AppUI.renderCurrentPage();
        });
      }
    }
  };
})();

