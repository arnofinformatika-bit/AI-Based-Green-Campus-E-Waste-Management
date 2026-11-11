/**
 * Component: Dashboard Analitik
 * Analisis performa Green Campus & ekspor laporan Universitas Bandar Lampung
 */
(function () {
  window.AppComponents = window.AppComponents || {};

  let selectedRange = '6m';

  window.AppComponents.analitik = {
    render() {
      const state = window.GreenCampusStore.getState();
      const trendData = selectedRange === '12m' ? state.yearlyTrends : state.monthlyTrends;
      const totalCollected = trendData.reduce((acc, x) => acc + x.collected, 0);
      const totalRecycled = trendData.reduce((acc, x) => acc + x.recycled, 0);
      const recycleRate = totalCollected ? ((totalRecycled / totalCollected) * 100).toFixed(1) : '0';
      const maxBuildingKg = Math.max(...state.buildingStats.map((b) => b.kg), 1);

      return `
        <div class="page-header-bar">
          <div>
            <h1 class="page-heading">Dashboard Analitik Green Campus</h1>
            <p class="page-subheading">Evaluasi dampak lingkungan, performa daur ulang per gedung UBL, dan laporan berkelanjutan.</p>
          </div>
          <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
            <select id="analytics-range" class="form-control" style="width:185px;">
              <option value="6m" ${selectedRange === '6m' ? 'selected' : ''}>6 Bulan Terakhir</option>
              <option value="12m" ${selectedRange === '12m' ? 'selected' : ''}>12 Bulan (1 Tahun)</option>
            </select>
            <button class="btn btn-primary btn-sm" id="btn-export-csv">
              ${window.Icons.download}
              <span>Ekspor Laporan CSV</span>
            </button>
          </div>
        </div>

        <!-- 4 Environmental Metrics -->
        <section class="grid-4">
          <div class="stat-card mint">
            <div class="stat-icon" style="color:#15803d;">${window.Icons.recycle}</div>
            <div class="stat-body">
              <div class="stat-label">Tingkat Daur Ulang</div>
              <div class="stat-value-row">
                <div class="stat-value">${recycleRate}<span class="unit">%</span></div>
                <span class="stat-trend">Target 75%</span>
              </div>
            </div>
          </div>

          <div class="stat-card blue">
            <div class="stat-icon" style="color:#1d4ed8;">${window.Icons.chart}</div>
            <div class="stat-body">
              <div class="stat-label">Volume Periode Ini</div>
              <div class="stat-value-row">
                <div class="stat-value">${totalCollected.toLocaleString('id-ID')} <span class="unit">kg</span></div>
                <span class="stat-trend">↑ 14%</span>
              </div>
            </div>
          </div>

          <div class="stat-card orange">
            <div class="stat-icon" style="color:#ea580c;">${window.Icons.clock}</div>
            <div class="stat-body">
              <div class="stat-label">Rata-rata Respon Jemput</div>
              <div class="stat-value-row">
                <div class="stat-value">1,8 <span class="unit">Jam</span></div>
                <span class="stat-trend">Cepat</span>
              </div>
            </div>
          </div>

          <div class="stat-card purple">
            <div class="stat-icon" style="color:#166534;">${window.Icons.leaf}</div>
            <div class="stat-body">
              <div class="stat-label">Skor UI GreenMetric UBL</div>
              <div class="stat-value-row">
                <div class="stat-value">92,4 <span class="unit">Poin</span></div>
                <span class="stat-trend">↑ +4.2</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Charts Grid -->
        <section class="grid-equal-2">
          <div class="card">
            <div class="card-header">
              <div class="card-title-wrap">
                <span style="color:#15803d;display:inline-flex;width:18px;height:18px;">${window.Icons.chart}</span>
                <h2 class="card-title">Tren Pengumpulan vs Daur Ulang</h2>
              </div>
              <div class="chart-legend-inline">
                <span><span class="legend-dot" style="background:#15633a;"></span>Terkumpul</span>
                <span><span class="legend-dot" style="background:#44b777;"></span>Didaur Ulang</span>
              </div>
            </div>
            ${window.AppCharts.renderLineChart(trendData, 230)}
          </div>

          <div class="card">
            <div class="card-header">
              <div class="card-title-wrap">
                <span style="color:#15803d;display:inline-flex;width:18px;height:18px;">${window.Icons.track}</span>
                <h2 class="card-title">Kontribusi E-Waste per Gedung UBL</h2>
              </div>
            </div>
            <div style="display:flex;flex-direction:column;gap:14px;">
              ${state.buildingStats.map((b) => {
                const pct = Math.round((b.kg / maxBuildingKg) * 100);
                return `
                  <div>
                    <div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700;margin-bottom:5px;">
                      <span>${b.building}</span>
                      <span style="color:#15803d;">${b.kg} kg (${b.reports} laporan)</span>
                    </div>
                    <div class="progress-bar-track">
                      <div class="progress-bar-fill" style="width:${pct}%;"></div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </section>

        <!-- Material Recovery Breakdown -->
        <div class="card">
          <div class="card-header">
            <div class="card-title-wrap">
              <span style="color:#15803d;display:inline-flex;width:18px;height:18px;">${window.Icons.pie}</span>
              <h2 class="card-title">Rekap Pemulihan Material Berharga & Pengurangan Limbah B3</h2>
            </div>
          </div>
          <div class="grid-4">
            <div style="padding:14px;border-radius:14px;background:#f5faf7;border:1px solid #d7ebde;">
              <div style="font-size:12px;color:#586c60;font-weight:600;">Logam Tembaga & Aluminium</div>
              <div style="font-size:20px;font-weight:800;color:#143624;margin-top:4px;">342 kg</div>
              <div style="font-size:11.5px;color:#15803d;margin-top:2px;">Dilebur ulang mitra resmi</div>
            </div>
            <div style="padding:14px;border-radius:14px;background:#f4f8fe;border:1px solid #d9e6fa;">
              <div style="font-size:12px;color:#586c60;font-weight:600;">Plastik Polimer ABS</div>
              <div style="font-size:20px;font-weight:800;color:#1e3a8a;margin-top:4px;">418 kg</div>
              <div style="font-size:11.5px;color:#2563eb;margin-top:2px;">Dicacah jadi bijih plastik</div>
            </div>
            <div style="padding:14px;border-radius:14px;background:#fff8f1;border:1px solid #fae3c6;">
              <div style="font-size:12px;color:#586c60;font-weight:600;">Papan Sirkuit (PCB)</div>
              <div style="font-size:20px;font-weight:800;color:#9a3412;margin-top:4px;">164 kg</div>
              <div style="font-size:11.5px;color:#d97706;margin-top:2px;">Ekstraksi logam mulia aman</div>
            </div>
            <div style="padding:14px;border-radius:14px;background:#f8f5fe;border:1px solid #e4dbfb;">
              <div style="font-size:12px;color:#586c60;font-weight:600;">Limbah B3 Baterai Terisolasi</div>
              <div style="font-size:20px;font-weight:800;color:#5b21b6;margin-top:4px;">250 kg</div>
              <div style="font-size:11.5px;color:#7c3aed;margin-top:2px;">100% bebas pencemaran tanah</div>
            </div>
          </div>
        </div>
      `;
    },

    bind() {
      const rangeSel = document.getElementById('analytics-range');
      if (rangeSel) {
        rangeSel.addEventListener('change', () => {
          selectedRange = rangeSel.value;
          window.AppUI.renderCurrentPage();
        });
      }

      const exportBtn = document.getElementById('btn-export-csv');
      if (exportBtn) {
        exportBtn.addEventListener('click', () => {
          const state = window.GreenCampusStore.getState();
          const rows = [
            ['ID Laporan', 'Perangkat', 'Kategori', 'Gedung UBL', 'Berat (kg)', 'Status', 'Tanggal'],
            ...state.reports.map((r) => [
              r.id,
              `"${r.device.replace(/"/g, '""')}"`,
              r.category,
              `"${r.building}"`,
              r.weight,
              r.status,
              `"${r.date}"`
            ])
          ];
          const csv = rows.map((row) => row.join(',')).join('\n');
          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'laporan-ewaste-ubl-green-campus.csv';
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
          window.AppUI.toast('Laporan CSV UBL Green Campus berhasil diunduh!');
        });
      }
    }
  };
})();

