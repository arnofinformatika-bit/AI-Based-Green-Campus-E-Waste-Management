/**
 * Core Application Shell, Router, SVG Icons, and Chart Helpers
 * Universitas Bandar Lampung — Green Campus E-Waste Management
 */
(function () {
  window.AppComponents = window.AppComponents || {};

  // Crisp inline SVG icon set (works 100% offline)
  window.Icons = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5L12 3l9 7.5"/><path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10"/><path d="M9 21v-6h6v6"/></svg>',
    report: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>',
    ai: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/><path d="M9.5 14l1.5-4 1.5 4M9.9 13h2.2M14.5 10v4"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
    track: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
    arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    recycle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/><path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/><path d="m14 16-3 3 3 3"/><path d="M8.293 13.596 7.196 9.5 3.1 10.598"/><path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"/><path d="m13.378 9.633 4.096 1.098 1.097-4.096"/></svg>',
    monitor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>',
    pie: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><polyline points="20 6 9 17 4 12"/></svg>',
    upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>'
  };

  window.AppCharts = {
    renderLineChart(data, height = 205) {
      const width = 460;
      const padL = 40;
      const padR = 16;
      const padT = 16;
      const padB = 28;
      const plotW = width - padL - padR;
      const plotH = height - padT - padB;
      const maxVal = 1000;

      const xAt = (i) => padL + (i / Math.max(1, data.length - 1)) * plotW;
      const yAt = (v) => padT + plotH - (Math.min(v, maxVal) / maxVal) * plotH;

      function smoothPath(points) {
        if (!points.length) return '';
        let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
        for (let i = 0; i < points.length - 1; i++) {
          const p0 = points[i];
          const p1 = points[i + 1];
          const cx = ((p0.x + p1.x) / 2).toFixed(1);
          d += ` C ${cx} ${p0.y.toFixed(1)}, ${cx} ${p1.y.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
        }
        return d;
      }

      const ptsCollected = data.map((d, i) => ({ x: xAt(i), y: yAt(d.collected), val: d.collected, label: d.month }));
      const ptsRecycled = data.map((d, i) => ({ x: xAt(i), y: yAt(d.recycled), val: d.recycled, label: d.month }));

      const yTicks = [0, 250, 500, 750, 1000];
      const gridLines = yTicks.map((t) => {
        const y = yAt(t).toFixed(1);
        return `
          <line x1="${padL}" y1="${y}" x2="${width - padR}" y2="${y}" stroke="#edf3ef" stroke-width="1" />
          <text x="${padL - 8}" y="${Number(y) + 4}" text-anchor="end" font-size="10.5" fill="#7c8f83">${t === 1000 ? '1.000' : t}</text>
        `;
      }).join('');

      const xLabels = data.map((d, i) => {
        return `<text x="${xAt(i).toFixed(1)}" y="${height - 6}" text-anchor="middle" font-size="11" fill="#6f8377">${d.month}</text>`;
      }).join('');

      const areaCollected = `${smoothPath(ptsCollected)} L ${ptsCollected[ptsCollected.length - 1].x.toFixed(1)} ${padT + plotH} L ${ptsCollected[0].x.toFixed(1)} ${padT + plotH} Z`;

      const dotsCollected = ptsCollected.map((p) =>
        `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4" fill="#15633a" stroke="#ffffff" stroke-width="1.5"><title>${p.label}: ${p.val} kg Terkumpul</title></circle>`
      ).join('');
      const dotsRecycled = ptsRecycled.map((p) =>
        `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4" fill="#ffffff" stroke="#34a867" stroke-width="2"><title>${p.label}: ${p.val} kg Didaur Ulang</title></circle>`
      ).join('');

      return `
        <svg viewBox="0 0 ${width} ${height}" width="100%" height="${height}" style="overflow:hidden; display:block; max-width:100%; height:auto;">
          <defs>
            <linearGradient id="areaGreenGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#22a05b" stop-opacity="0.16"/>
              <stop offset="100%" stop-color="#22a05b" stop-opacity="0.0"/>
            </linearGradient>
          </defs>
          ${gridLines}
          <path d="${areaCollected}" fill="url(#areaGreenGrad)" />
          <path d="${smoothPath(ptsCollected)}" fill="none" stroke="#15633a" stroke-width="2.6" stroke-linecap="round" />
          <path d="${smoothPath(ptsRecycled)}" fill="none" stroke="#44b777" stroke-width="2.4" stroke-linecap="round" />
          ${dotsCollected}
          ${dotsRecycled}
          ${xLabels}
        </svg>
      `;
    },

    renderDonutChart(categories, totalKg) {
      const size = 158;
      const cx = size / 2;
      const cy = size / 2;
      const r = 56;
      const circ = 2 * Math.PI * r;
      let offset = 0;

      const segments = categories.map((cat) => {
        const dash = (cat.percent / 100) * circ;
        const gap = circ - dash;
        const seg = `
          <circle
            cx="${cx}" cy="${cy}" r="${r}"
            fill="transparent"
            stroke="${cat.color}"
            stroke-width="24"
            stroke-dasharray="${Math.max(0, dash - 2.2).toFixed(2)} ${(gap + 2.2).toFixed(2)}"
            stroke-dashoffset="${(-offset).toFixed(2)}"
            transform="rotate(-90 ${cx} ${cy})"
          ><title>${cat.name}: ${cat.percent}% (${cat.kg} kg)</title></circle>
        `;
        offset += dash;
        return seg;
      }).join('');

      return `
        <div class="donut-chart-box">
          <svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
            <circle cx="${cx}" cy="${cy}" r="${r}" fill="transparent" stroke="#eef3ef" stroke-width="24" />
            ${segments}
          </svg>
          <div class="donut-center">
            <div class="donut-center-val">${Number(totalKg).toLocaleString('id-ID')} kg</div>
            <div class="donut-center-sub">Total</div>
          </div>
        </div>
      `;
    }
  };

  window.AppUI = {
    currentPage: 'dashboard',

    navigate(pageId) {
      this.currentPage = pageId;
      document.querySelectorAll('.nav-item, .top-tab-pill, .sheet-tab-item').forEach((btn) => {
        const isActive = btn.dataset.page === pageId;
        btn.classList.toggle('active', isActive);
        if (isActive && btn.classList.contains('top-tab-pill') && btn.scrollIntoView) {
          btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      });

      const morePages = ['penjemputan', 'analitik', 'pengaturan'];
      document.querySelectorAll('.bottom-tab-item[data-page]').forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.page === pageId);
      });
      const moreBtn = document.getElementById('bottom-more-btn');
      if (moreBtn) {
        moreBtn.classList.toggle('active', morePages.includes(pageId));
      }

      this.closeMobileSidebar();
      this.closeMoreSheet();
      this.renderCurrentPage();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    closeMoreSheet() {
      const sheet = document.getElementById('mobile-more-sheet');
      const backdrop = document.getElementById('mobile-more-backdrop');
      if (sheet) sheet.classList.remove('open');
      if (backdrop) backdrop.classList.remove('open');
    },

    renderCurrentPage() {
      const container = document.getElementById('page-content');
      if (!container) return;
      const map = {
        dashboard: window.AppComponents.dashboard,
        lapor: window.AppComponents.lapor,
        klasifikasi: window.AppComponents.klasifikasi,
        penjemputan: window.AppComponents.penjemputan,
        pelacakan: window.AppComponents.pelacakan,
        analitik: window.AppComponents.analitik,
        pengaturan: window.AppComponents.pengaturan
      };
      const comp = map[this.currentPage] || map.dashboard;
      if (comp && typeof comp.render === 'function') {
        container.innerHTML = comp.render();
        if (typeof comp.bind === 'function') {
          comp.bind();
        }
      }
    },

    toast(message) {
      const wrap = document.getElementById('toast-container');
      if (!wrap) return;
      const el = document.createElement('div');
      el.className = 'toast';
      el.innerHTML = `<span style="color:#6ee7a8;display:inline-flex;">${window.Icons.check}</span><span>${message}</span>`;
      wrap.appendChild(el);
      setTimeout(() => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(8px)';
        el.style.transition = 'all 0.2s ease';
        setTimeout(() => el.remove(), 220);
      }, 3000);
    },

    closeMobileSidebar() {
      const sb = document.getElementById('sidebar');
      const ov = document.getElementById('sidebar-overlay');
      if (sb) sb.classList.remove('open');
      if (ov) ov.classList.remove('open');
    },

    updateHeaderMeta() {
      const state = window.GreenCampusStore.getState();
      const unread = state.notifications.filter((n) => n.unread).length;
      const badge = document.getElementById('notif-badge');
      if (badge) {
        badge.textContent = unread;
        badge.style.display = unread > 0 ? 'flex' : 'none';
      }
      const roleLabel = document.getElementById('header-role-label');
      const avatarLabel = document.getElementById('header-avatar-initials');
      if (roleLabel) roleLabel.textContent = state.settings.role;
      if (avatarLabel) {
        const parts = (state.settings.userName || 'UBL').trim().split(' ');
        avatarLabel.textContent = parts.slice(0, 2).map((p) => p[0]).join('').toUpperCase();
      }
    },

    statusBadge(status) {
      if (status === 'Selesai') return `<span class="badge badge-green">Selesai</span>`;
      if (status === 'Dalam Perjalanan') return `<span class="badge badge-orange">Dalam Perjalanan</span>`;
      if (status === 'Dalam Proses Penjadwalan') return `<span class="badge badge-blue">Penjadwalan</span>`;
      return `<span class="badge badge-purple">${status}</span>`;
    }
  };

  function initHeaderInteractions() {
    const notifBtn = document.getElementById('notif-btn');
    const notifPanel = document.getElementById('notif-panel');
    const profileBtn = document.getElementById('profile-btn');
    const profilePanel = document.getElementById('profile-panel');
    const searchInput = document.getElementById('global-search-input');
    const searchPop = document.getElementById('search-results-popover');

    function renderNotifs() {
      const state = window.GreenCampusStore.getState();
      const list = document.getElementById('notif-list');
      if (!list) return;
      list.innerHTML = state.notifications.slice(0, 5).map((n) => `
        <div class="notif-item ${n.unread ? 'unread' : ''}">
          <div style="font-weight:700;color:#14281d;">${n.title}</div>
          <div style="color:#586c60;margin-top:2px;">${n.desc}</div>
          <div style="font-size:11px;color:#84968b;margin-top:3px;">${n.time}</div>
        </div>
      `).join('');
    }

    if (notifBtn && notifPanel) {
      notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        profilePanel && profilePanel.classList.remove('open');
        renderNotifs();
        notifPanel.classList.toggle('open');
      });
    }

    const markAllBtn = document.getElementById('mark-all-read');
    if (markAllBtn) {
      markAllBtn.addEventListener('click', () => {
        window.GreenCampusStore.markNotificationsRead();
        window.AppUI.updateHeaderMeta();
        renderNotifs();
        window.AppUI.toast('Semua notifikasi ditandai sudah dibaca');
      });
    }

    if (profileBtn && profilePanel) {
      profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notifPanel && notifPanel.classList.remove('open');
        profilePanel.classList.toggle('open');
      });
    }

    document.querySelectorAll('.role-switch-opt').forEach((btn) => {
      btn.addEventListener('click', () => {
        const newRole = btn.dataset.role;
        window.GreenCampusStore.updateSettings({ role: newRole });
        window.AppUI.updateHeaderMeta();
        profilePanel && profilePanel.classList.remove('open');
        window.AppUI.toast(`Peran diubah menjadi ${newRole}`);
        if (window.AppUI.currentPage === 'pengaturan') {
          window.AppUI.renderCurrentPage();
        }
      });
    });

    if (searchInput && searchPop) {
      searchInput.addEventListener('input', () => {
        const q = searchInput.value.trim().toLowerCase();
        if (!q) {
          searchPop.classList.remove('open');
          return;
        }
        const state = window.GreenCampusStore.getState();
        const matches = [];
        state.reports.forEach((r) => {
          if (r.id.toLowerCase().includes(q) || r.device.toLowerCase().includes(q) || r.building.toLowerCase().includes(q)) {
            matches.push({ label: `${r.id} — ${r.device}`, sub: r.building, page: 'pelacakan' });
          }
        });
        const pages = [
          { label: 'Lapor E-Waste Baru', sub: 'Halaman Pelaporan', page: 'lapor' },
          { label: 'Klasifikasi AI Sampah Elektronik', sub: 'Scanner AI Vision', page: 'klasifikasi' },
          { label: 'Jadwalkan Penjemputan Kampus', sub: 'Armada EV UBL', page: 'penjemputan' },
          { label: 'Dashboard Analitik & Ekspor CSV', sub: 'Statistik Kampus', page: 'analitik' },
          { label: 'Pengaturan Akun & Sistem', sub: 'Preferensi UBL', page: 'pengaturan' }
        ];
        pages.forEach((p) => {
          if (p.label.toLowerCase().includes(q) || p.sub.toLowerCase().includes(q)) {
            matches.push(p);
          }
        });

        searchPop.innerHTML = matches.length
          ? matches.slice(0, 6).map((m) => `
              <div class="search-result-item" data-page="${m.page}">
                <span style="font-weight:600;">${m.label}</span>
                <span style="font-size:11.5px;color:#586c60;">${m.sub}</span>
              </div>
            `).join('')
          : '<div style="padding:10px 12px;font-size:12.5px;color:#84968b;">Tidak ada hasil untuk "' + q + '"</div>';

        searchPop.classList.add('open');
        searchPop.querySelectorAll('.search-result-item').forEach((item) => {
          item.addEventListener('click', () => {
            searchPop.classList.remove('open');
            searchInput.value = '';
            window.AppUI.navigate(item.dataset.page);
          });
        });
      });
    }

    document.addEventListener('click', () => {
      notifPanel && notifPanel.classList.remove('open');
      profilePanel && profilePanel.classList.remove('open');
      searchPop && searchPop.classList.remove('open');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-item, .top-tab-pill, .bottom-tab-item[data-page], .sheet-tab-item').forEach((btn) => {
      btn.addEventListener('click', () => window.AppUI.navigate(btn.dataset.page));
    });

    const moreBtn = document.getElementById('bottom-more-btn');
    const moreSheet = document.getElementById('mobile-more-sheet');
    const moreBackdrop = document.getElementById('mobile-more-backdrop');
    if (moreBtn && moreSheet && moreBackdrop) {
      moreBtn.addEventListener('click', () => {
        moreSheet.classList.toggle('open');
        moreBackdrop.classList.toggle('open');
      });
      moreBackdrop.addEventListener('click', () => window.AppUI.closeMoreSheet());
    }

    const mobileBtn = document.getElementById('mobile-menu-btn');
    const overlay = document.getElementById('sidebar-overlay');
    const sidebar = document.getElementById('sidebar');
    if (mobileBtn && sidebar && overlay) {
      mobileBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('open');
      });
      overlay.addEventListener('click', () => window.AppUI.closeMobileSidebar());
    }

    initHeaderInteractions();
    window.AppUI.updateHeaderMeta();
    window.AppUI.renderCurrentPage();
  });
})();

