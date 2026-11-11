/**
 * Component: Dashboard Utama
 * Universitas Bandar Lampung — Green Campus E-Waste Management
 */
(function () {
  window.AppComponents = window.AppComponents || {};

  function activityBadge(type) {
    if (type === 'report') {
      return `<div class="activity-icon" style="background:#e6f0fd;color:#2563eb;">${window.Icons.report}</div>`;
    }
    if (type === 'pickup') {
      return `<div class="activity-icon" style="background:#e3f5ea;color:#16a34a;">${window.Icons.check}</div>`;
    }
    if (type === 'ai') {
      return `<div class="activity-icon" style="background:#fef0e1;color:#d97706;">${window.Icons.ai}</div>`;
    }
    return `<div class="activity-icon" style="background:#efeafe;color:#7c3aed;">${window.Icons.recycle}</div>`;
  }

  window.AppComponents.dashboard = {
    render() {
      const state = window.GreenCampusStore.getState();
      const { stats, monthlyTrends, categories, pickups, activities } = state;
      const activePickup = pickups[0] || { timeline: [] };

      return `
        <!-- Hero Banner -->
        <section class="hero-banner">
          <div class="hero-text">
            <div class="hero-campus-pill">
              <span>🌿</span>
              <span>Universitas Bandar Lampung • Green Campus</span>
            </div>
            <h1 class="hero-title">AI-Based<br/>Green Campus<br/>E-Waste Management</h1>
            <p class="hero-desc">Kelola limbah elektronik di lingkungan Universitas Bandar Lampung dengan lebih cerdas, untuk kampus yang lebih hijau dan berkelanjutan.</p>
            <button class="btn btn-primary" data-nav="lapor">
              <span>Mulai Sekarang</span>
              ${window.Icons.arrowRight}
            </button>
          </div>
          <div class="hero-visual">
            <img src="assets/hero-campus.svg" alt="Ilustrasi Kampus Hijau UBL dan Pengelolaan E-Waste" onerror="this.style.display='none'" />
          </div>
        </section>

        <!-- 4 Quick Actions -->
        <section class="grid-4">
          <button class="quick-action-card" data-nav="lapor">
            <div class="quick-action-left">
              <div class="quick-icon-box" style="background:#e6f6ec;color:#166534;">${window.Icons.report}</div>
              <div class="quick-title">Lapor<br/>E-Waste</div>
            </div>
            <span class="quick-arrow">${window.Icons.arrowRight}</span>
          </button>

          <button class="quick-action-card" data-nav="klasifikasi">
            <div class="quick-action-left">
              <div class="quick-icon-box" style="background:#e8f1fc;color:#1d4ed8;">${window.Icons.ai}</div>
              <div class="quick-title">Klasifikasi<br/>Dengan AI</div>
            </div>
            <span class="quick-arrow">${window.Icons.arrowRight}</span>
          </button>

          <button class="quick-action-card" data-nav="penjemputan">
            <div class="quick-action-left">
              <div class="quick-icon-box" style="background:#e7f5ec;color:#15803d;">${window.Icons.truck}</div>
              <div class="quick-title">Jadwalkan<br/>Penjemputan</div>
            </div>
            <span class="quick-arrow">${window.Icons.arrowRight}</span>
          </button>

          <button class="quick-action-card" data-nav="pelacakan">
            <div class="quick-action-left">
              <div class="quick-icon-box" style="background:#eaf5ef;color:#134e32;">${window.Icons.track}</div>
              <div class="quick-title">Lacak<br/>Pengambilan</div>
            </div>
            <span class="quick-arrow">${window.Icons.arrowRight}</span>
          </button>
        </section>

        <!-- 4 KPI Cards -->
        <section class="grid-4">
          <div class="stat-card mint">
            <div class="stat-icon" style="color:#15803d;">${window.Icons.recycle}</div>
            <div class="stat-body">
              <div class="stat-label">Total E-Waste Terkumpul</div>
              <div class="stat-value-row">
                <div class="stat-value">${stats.totalKg.toLocaleString('id-ID')} <span class="unit">kg</span></div>
                <span class="stat-trend">↑ ${stats.totalTrend}%</span>
              </div>
            </div>
          </div>

          <div class="stat-card blue">
            <div class="stat-icon" style="color:#1d4ed8;">${window.Icons.monitor}</div>
            <div class="stat-body">
              <div class="stat-label">Laporan Bulan Ini</div>
              <div class="stat-value-row">
                <div class="stat-value">${stats.monthlyReports} <span class="unit">Laporan</span></div>
                <span class="stat-trend">↑ ${stats.reportsTrend}%</span>
              </div>
            </div>
          </div>

          <div class="stat-card orange">
            <div class="stat-icon" style="color:#ea580c;">${window.Icons.truck}</div>
            <div class="stat-body">
              <div class="stat-label">Penjemputan Selesai</div>
              <div class="stat-value-row">
                <div class="stat-value">${stats.completedPickups} <span class="unit">Pickup</span></div>
                <span class="stat-trend">↑ ${stats.pickupsTrend}%</span>
              </div>
            </div>
          </div>

          <div class="stat-card purple">
            <div class="stat-icon" style="color:#166534;">${window.Icons.leaf}</div>
            <div class="stat-body">
              <div class="stat-label">Emisi CO₂ Terselamatkan</div>
              <div class="stat-value-row">
                <div class="stat-value">${stats.co2Saved} <span class="unit">kg CO₂</span></div>
                <span class="stat-trend">↑ ${stats.co2Trend}%</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Middle Analytics & Status Grid -->
        <section class="grid-3">
          <!-- Line Chart Card -->
          <div class="card">
            <div class="card-header">
              <div class="card-title-wrap">
                <span style="color:#15803d;display:inline-flex;width:18px;height:18px;">${window.Icons.chart}</span>
                <h2 class="card-title">Grafik Pengelolaan E-Waste</h2>
              </div>
              <div class="chart-legend-inline">
                <span><span class="legend-dot" style="background:#15633a;"></span>Terkumpul</span>
                <span><span class="legend-dot" style="background:#44b777;"></span>Didaur Ulang</span>
              </div>
            </div>
            <div>
              ${window.AppCharts.renderLineChart(monthlyTrends, 200)}
            </div>
          </div>

          <!-- Donut Chart Card -->
          <div class="card">
            <div class="card-header">
              <div class="card-title-wrap">
                <span style="color:#15803d;display:inline-flex;width:18px;height:18px;">${window.Icons.pie}</span>
                <h2 class="card-title">Klasifikasi Limbah</h2>
              </div>
            </div>
            <div class="donut-wrap">
              ${window.AppCharts.renderDonutChart(categories, stats.totalKg)}
              <div class="donut-legend">
                ${categories.map((c) => `
                  <div class="donut-legend-row">
                    <div class="donut-legend-left">
                      <span class="legend-dot" style="background:${c.color};margin-right:0;"></span>
                      <span>${c.name}</span>
                    </div>
                    <span class="donut-legend-pct">${c.percent}%</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Pickup Status Card -->
          <div class="card">
            <div class="card-header">
              <div class="card-title-wrap">
                <span style="color:#15803d;display:inline-flex;width:18px;height:18px;">${window.Icons.track}</span>
                <h2 class="card-title">Status Penjemputan</h2>
              </div>
              <button class="link-btn" data-nav="pelacakan">Lihat Semua ${window.Icons.arrowRight}</button>
            </div>

            <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:10px;">
              <div class="timeline" style="flex:1;">
                ${activePickup.timeline.map((step, idx) => `
                  <div class="timeline-step ${step.done ? 'done' : ''} ${idx === activePickup.stepIndex ? 'active' : ''}">
                    <div class="step-dot">${step.done ? window.Icons.check : ''}</div>
                    <div class="step-content">
                      <div class="step-title">${step.label}</div>
                      <div class="step-time">${step.time}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
              <div style="padding:8px 10px;background:#eaf6ee;border-radius:12px;color:#15633a;display:flex;align-items:center;justify-content:center;" title="${activePickup.driver || 'Armada EV UBL'}">
                <span style="width:26px;height:26px;display:inline-flex;">${window.Icons.truck}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Bottom CTA + Latest Activity -->
        <section class="grid-2">
          <div class="cta-banner">
            <div class="cta-left">
              <img class="cta-mascot" src="assets/eco-robot.png" alt="Maskot Eco Robot UBL" onerror="this.style.display='none'" />
              <div>
                <h3 class="cta-title">Mari wujudkan kampus hijau bersama!</h3>
                <p class="cta-desc">Laporkan limbah elektronik Anda dan bantu Universitas Bandar Lampung menjaga lingkungan kampus tetap bersih.</p>
              </div>
            </div>
            <button class="btn btn-primary" data-nav="lapor" style="white-space:nowrap;">
              <span>Lapor Sekarang</span>
              ${window.Icons.arrowRight}
            </button>
          </div>

          <div class="card">
            <div class="card-header" style="margin-bottom:10px;">
              <div class="card-title-wrap">
                <span style="color:#15803d;display:inline-flex;width:18px;height:18px;">${window.Icons.clock}</span>
                <h2 class="card-title">Aktivitas Terbaru</h2>
              </div>
              <button class="link-btn" data-nav="pelacakan">Lihat Semua ${window.Icons.arrowRight}</button>
            </div>
            <div class="activity-list">
              ${activities.slice(0, 3).map((act) => `
                <div class="activity-item">
                  <div class="activity-left">
                    ${activityBadge(act.type)}
                    <span class="activity-text">${act.text}</span>
                  </div>
                  <span class="activity-time">${act.time}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </section>
      `;
    },

    bind() {
      document.querySelectorAll('[data-nav]').forEach((el) => {
        el.addEventListener('click', () => {
          window.AppUI.navigate(el.dataset.nav);
        });
      });
    }
  };
})();

