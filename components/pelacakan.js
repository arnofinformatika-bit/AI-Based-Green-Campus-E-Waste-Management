/**
 * Component: Pelacakan Pengambilan E-Waste
 * Pelacakan status real-time penjemputan & daur ulang per tiket laporan UBL
 */
(function () {
  window.AppComponents = window.AppComponents || {};

  let selectedPickupId = null;

  window.AppComponents.pelacakan = {
    render() {
      const state = window.GreenCampusStore.getState();
      const pickups = state.pickups;
      if (!selectedPickupId || !pickups.some((p) => p.id === selectedPickupId)) {
        selectedPickupId = pickups[0] ? pickups[0].id : null;
      }
      const active = pickups.find((p) => p.id === selectedPickupId) || pickups[0];
      const stepNames = ['Laporan Diterima', 'Dalam Proses Penjadwalan', 'Dalam Perjalanan', 'Selesai'];

      return `
        <div class="page-header-bar">
          <div>
            <h1 class="page-heading">Pelacakan Pengambilan E-Waste</h1>
            <p class="page-subheading">Pantau posisi armada penjemputan dan status pemrosesan limbah elektronik secara transparan.</p>
          </div>
          <div class="track-filter-wrap">
            <input id="track-filter" class="form-control filter-input-responsive" type="text" placeholder="Cari ID tiket atau gedung..." />
          </div>
        </div>

        <div class="grid-2 responsive-split-track">
          <!-- Ticket List -->
          <div class="card">
            <div class="card-header">
              <div class="card-title-wrap">
                <span style="color:#15803d;display:inline-flex;width:18px;height:18px;">${window.Icons.track}</span>
                <h2 class="card-title">Daftar Tiket Pengambilan</h2>
              </div>
              <span class="badge badge-green">${pickups.length} Tiket</span>
            </div>

            <div id="track-list" style="display:flex;flex-direction:column;gap:10px;">
              ${pickups.map((p) => {
                const isSelected = active && p.id === active.id;
                const statusLabel = stepNames[p.stepIndex] || 'Selesai';
                return `
                  <div class="track-ticket-item" data-id="${p.id}" data-search="${(p.id + ' ' + p.reportId + ' ' + p.title + ' ' + p.building).toLowerCase()}" style="padding:13px 15px;border-radius:13px;border:1.5px solid ${isSelected ? '#1b7346' : '#e4ece6'};background:${isSelected ? '#f2faf5' : '#ffffff'};cursor:pointer;transition:all 0.15s;">
                    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px 8px;margin-bottom:4px;">
                      <span style="font-weight:800;font-size:13px;color:#143624;">${p.id} • ${p.reportId}</span>
                      ${window.AppUI.statusBadge(statusLabel)}
                    </div>
                    <div style="font-size:13.5px;font-weight:700;color:#14281d;">${p.title}</div>
                    <div style="font-size:12px;color:#586c60;margin-top:3px;">${p.building} • ${p.weight} kg</div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Active Ticket Detail & Stepper -->
          ${active ? `
            <div class="card">
              <div class="card-header">
                <div>
                  <div style="font-size:12px;font-weight:700;color:#15803d;">DETAIL PELACAKAN TIKET</div>
                  <h2 class="card-title" style="font-size:18px;margin-top:2px;">${active.title}</h2>
                </div>
                ${active.stepIndex < 3
                  ? `<button class="btn btn-primary btn-sm" id="btn-sim-advance" data-id="${active.id}">Majukan Status ${window.Icons.arrowRight}</button>`
                  : `<span class="badge badge-green">Daur Ulang Terverifikasi</span>`}
              </div>

              <div class="ticket-meta-grid">
                <div>
                  <div style="font-size:11.5px;color:#586c60;">Kode Tiket</div>
                  <div style="font-size:13px;font-weight:700;">${active.id}</div>
                </div>
                <div>
                  <div style="font-size:11.5px;color:#586c60;">Armada EV</div>
                  <div style="font-size:13px;font-weight:700;">${active.driver}</div>
                </div>
                <div>
                  <div style="font-size:11.5px;color:#586c60;">Jadwal</div>
                  <div style="font-size:13px;font-weight:700;">${active.scheduleDate}</div>
                </div>
              </div>

              <div class="timeline" style="margin-bottom:18px;">
                ${active.timeline.map((step, idx) => `
                  <div class="timeline-step ${step.done ? 'done' : ''} ${idx === active.stepIndex ? 'active' : ''}">
                    <div class="step-dot">${step.done ? window.Icons.check : ''}</div>
                    <div class="step-content">
                      <div class="step-title">${step.label}</div>
                      <div class="step-time">${step.time !== '-' ? step.time : 'Menunggu proses berikutnya'}</div>
                    </div>
                  </div>
                `).join('')}
              </div>

              <div style="padding:12px 14px;border-radius:12px;background:#f8fbf9;border:1px solid #e4ece6;display:flex;align-items:center;justify-content:space-between;gap:12px;">
                <div style="display:flex;align-items:center;gap:10px;">
                  <span style="width:36px;height:36px;border-radius:10px;background:#e6f6ec;color:#15803d;display:flex;align-items:center;justify-content:center;">${window.Icons.truck}</span>
                  <div>
                    <div style="font-size:13px;font-weight:700;">Lokasi Kampus: ${active.building}</div>
                    <div style="font-size:12px;color:#586c60;">Estimasi emisi terselamatkan: ${(active.weight * 0.5).toFixed(1)} kg CO₂</div>
                  </div>
                </div>
              </div>
            </div>
          ` : ''}
        </div>
      `;
    },

    bind() {
      document.querySelectorAll('.track-ticket-item').forEach((item) => {
        item.addEventListener('click', () => {
          selectedPickupId = item.dataset.id;
          window.AppUI.renderCurrentPage();
        });
      });

      const filterInput = document.getElementById('track-filter');
      if (filterInput) {
        filterInput.addEventListener('input', () => {
          const q = filterInput.value.trim().toLowerCase();
          document.querySelectorAll('.track-ticket-item').forEach((el) => {
            el.style.display = el.dataset.search.includes(q) ? 'block' : 'none';
          });
        });
      }

      const simBtn = document.getElementById('btn-sim-advance');
      if (simBtn) {
        simBtn.addEventListener('click', () => {
          window.GreenCampusStore.advancePickup(simBtn.dataset.id);
          window.AppUI.toast('Tahap pelacakan dimajukan!');
          window.AppUI.renderCurrentPage();
        });
      }
    }
  };
})();

