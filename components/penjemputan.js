/**
 * Component: Penjemputan E-Waste
 * Penjadwalan armada EV Green Campus Universitas Bandar Lampung
 */
(function () {
  window.AppComponents = window.AppComponents || {};

  window.AppComponents.penjemputan = {
    render() {
      const state = window.GreenCampusStore.getState();

      return `
        <div class="page-header-bar">
          <div>
            <h1 class="page-heading">Jadwalkan Penjemputan E-Waste</h1>
            <p class="page-subheading">Atur jadwal penjemputan limbah elektronik oleh armada kendaraan listrik kampus UBL.</p>
          </div>
          <span class="badge badge-green">2 Armada EV Siaga di Kampus</span>
        </div>

        <div class="grid-2 responsive-split-pickup">
          <!-- Schedule Form -->
          <div class="card">
            <div class="card-header">
              <div class="card-title-wrap">
                <span style="color:#15803d;display:inline-flex;width:18px;height:18px;">${window.Icons.truck}</span>
                <h2 class="card-title">Buat Jadwal Penjemputan</h2>
              </div>
            </div>

            <form id="pickup-form" class="form-grid">
              <div class="form-group full">
                <label class="form-label" for="pkp-report">Pilih Laporan Terkait (Opsional)</label>
                <select id="pkp-report" class="form-control">
                  <option value="">-- Buat Penjemputan Langsung --</option>
                  ${state.reports.filter((r) => r.stepIndex < 3).map((r) => `
                    <option value="${r.id}">${r.id} — ${r.device} (${r.building.split('(')[0].trim()})</option>
                  `).join('')}
                </select>
              </div>

              <div class="form-group full">
                <label class="form-label" for="pkp-title">Deskripsi Barang</label>
                <input id="pkp-title" class="form-control" type="text" required placeholder="Contoh: CPU Bekas & Kabel Lab Informatika" />
              </div>

              <div class="form-group full">
                <label class="form-label" for="pkp-building">Titik Jemput Gedung UBL</label>
                <select id="pkp-building" class="form-control">
                  <option>Gedung A (Pascasarjana UBL)</option>
                  <option>Gedung B (Rektorat & Administrasi)</option>
                  <option>Gedung C (Fakultas Teknik)</option>
                  <option>Gedung D (Fakultas Ekonomi & Bisnis)</option>
                  <option>Lab Komputer Terpadu UBL</option>
                  <option>Perpustakaan Pusat UBL</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="pkp-date">Tanggal Penjemputan</label>
                <input id="pkp-date" class="form-control" type="date" required value="2025-06-11" />
              </div>

              <div class="form-group">
                <label class="form-label" for="pkp-slot">Sesi Waktu</label>
                <select id="pkp-slot" class="form-control">
                  <option>09:00 - 10:30 WIB</option>
                  <option>11:00 - 12:30 WIB</option>
                  <option>13:30 - 15:00 WIB</option>
                  <option>15:30 - 17:00 WIB</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="pkp-driver">Pilih Armada EV</label>
                <select id="pkp-driver" class="form-control">
                  <option>Armada EV-01 (Pak Agus)</option>
                  <option>Armada EV-02 (Pak Dedi)</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="pkp-weight">Estimasi Berat (kg)</label>
                <input id="pkp-weight" class="form-control" type="number" step="0.5" min="1" value="6.0" />
              </div>

              <div class="form-group full" style="margin-top:4px;">
                <button type="submit" class="btn btn-primary" style="width:100%;">
                  <span>Konfirmasi Jadwal Penjemputan</span>
                  ${window.Icons.arrowRight}
                </button>
              </div>
            </form>
          </div>

          <!-- Active Queue -->
          <div class="card">
            <div class="card-header">
              <div class="card-title-wrap">
                <span style="color:#15803d;display:inline-flex;width:18px;height:18px;">${window.Icons.clock}</span>
                <h2 class="card-title">Antrean Penjemputan Kampus</h2>
              </div>
              <span class="badge badge-blue">${state.pickups.length} Jadwal</span>
            </div>

            <div class="table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Kode & Item</th>
                    <th>Jadwal & Armada</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  ${state.pickups.map((p) => {
                    const labels = ['Laporan Diterima', 'Dalam Proses Penjadwalan', 'Dalam Perjalanan', 'Selesai'];
                    const st = labels[p.stepIndex] || 'Selesai';
                    return `
                      <tr>
                        <td>
                          <div style="font-weight:700;font-size:12.5px;">${p.id}</div>
                          <div style="font-size:12.5px;color:#354d3f;">${p.title}</div>
                          <div style="font-size:11.5px;color:#84968b;">${p.weight} kg</div>
                        </td>
                        <td>
                          <div style="font-size:12.5px;font-weight:600;">${p.scheduleDate} • ${p.timeSlot}</div>
                          <div style="font-size:12px;color:#586c60;">${p.driver}</div>
                        </td>
                        <td>${window.AppUI.statusBadge(st)}</td>
                        <td>
                          ${p.stepIndex < 3
                            ? `<button class="btn btn-secondary btn-sm advance-pickup-btn" data-id="${p.id}">Majukan Tahap</button>`
                            : '<span style="font-size:12px;color:#15803d;font-weight:700;">Tuntas ✓</span>'}
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    },

    bind() {
      const reportSelect = document.getElementById('pkp-report');
      const titleInput = document.getElementById('pkp-title');
      const weightInput = document.getElementById('pkp-weight');

      if (reportSelect) {
        reportSelect.addEventListener('change', () => {
          const state = window.GreenCampusStore.getState();
          const rep = state.reports.find((r) => r.id === reportSelect.value);
          if (rep) {
            if (titleInput) titleInput.value = rep.device;
            if (weightInput) weightInput.value = rep.weight;
          }
        });
      }

      const form = document.getElementById('pickup-form');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const p = window.GreenCampusStore.schedulePickup({
            reportId: reportSelect ? reportSelect.value : '',
            title: titleInput.value.trim(),
            building: document.getElementById('pkp-building').value,
            scheduleDate: document.getElementById('pkp-date').value,
            timeSlot: document.getElementById('pkp-slot').value,
            driver: document.getElementById('pkp-driver').value,
            weight: weightInput.value
          });
          window.AppUI.toast(`Jadwal ${p.id} berhasil disimpan!`);
          window.AppUI.renderCurrentPage();
        });
      }

      document.querySelectorAll('.advance-pickup-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          window.GreenCampusStore.advancePickup(btn.dataset.id);
          window.AppUI.toast('Status penjemputan diperbarui!');
          window.AppUI.renderCurrentPage();
        });
      });
    }
  };
})();

