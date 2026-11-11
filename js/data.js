/**
 * Centralized Data Store for Universitas Bandar Lampung (UBL) Green Campus
 * Persists demo updates in localStorage so all 7 components stay synchronized.
 */
(function () {
  const STORAGE_KEY = 'ubl_green_campus_store_v1';

  const DEFAULT_DATA = {
    stats: {
      totalKg: 1250,
      totalTrend: 12,
      monthlyReports: 320,
      reportsTrend: 8,
      completedPickups: 280,
      pickupsTrend: 10,
      co2Saved: 620,
      co2Trend: 15
    },
    monthlyTrends: [
      { month: 'Jan', collected: 330, recycled: 180 },
      { month: 'Feb', collected: 480, recycled: 300 },
      { month: 'Mar', collected: 625, recycled: 420 },
      { month: 'Apr', collected: 710, recycled: 515 },
      { month: 'Mei', collected: 800, recycled: 605 },
      { month: 'Jun', collected: 895, recycled: 675 }
    ],
    yearlyTrends: [
      { month: 'Jul', collected: 210, recycled: 140 },
      { month: 'Agu', collected: 260, recycled: 175 },
      { month: 'Sep', collected: 295, recycled: 205 },
      { month: 'Okt', collected: 340, recycled: 240 },
      { month: 'Nov', collected: 390, recycled: 270 },
      { month: 'Des', collected: 410, recycled: 295 },
      { month: 'Jan', collected: 330, recycled: 180 },
      { month: 'Feb', collected: 480, recycled: 300 },
      { month: 'Mar', collected: 625, recycled: 420 },
      { month: 'Apr', collected: 710, recycled: 515 },
      { month: 'Mei', collected: 800, recycled: 605 },
      { month: 'Jun', collected: 895, recycled: 675 }
    ],
    categories: [
      { name: 'Komputer', percent: 35, kg: 438, color: '#3b82f6' },
      { name: 'Printer', percent: 30, kg: 375, color: '#22a05b' },
      { name: 'Baterai', percent: 20, kg: 250, color: '#f59e0b' },
      { name: 'Perangkat Jaringan', percent: 15, kg: 187, color: '#8b5cf6' }
    ],
    buildingStats: [
      { building: 'Gedung A (Pascasarjana)', kg: 310, reports: 78 },
      { building: 'Gedung C (Fakultas Teknik)', kg: 395, reports: 94 },
      { building: 'Lab Komputer Terpadu', kg: 285, reports: 72 },
      { building: 'Gedung B (Rektorat)', kg: 145, reports: 44 },
      { building: 'Perpustakaan Pusat UBL', kg: 115, reports: 32 }
    ],
    reports: [
      {
        id: 'EW-UBL-2025-104',
        device: 'Printer LaserJet Rusak (3 Unit)',
        category: 'Printer',
        building: 'Gedung A (Pascasarjana)',
        weight: 14.5,
        reporter: 'Rizky Pratama',
        role: 'Mahasiswa Teknik Informatika',
        date: '10 Jun 2025, 09:45',
        status: 'Dalam Perjalanan',
        stepIndex: 2,
        aiConfidence: '96.4%',
        hazard: 'Sedang (Toner & PCB)',
        notes: 'Cartridge sudah dilepas, siap diangkut dari lobi lantai 1.'
      },
      {
        id: 'EW-UBL-2025-103',
        device: 'PC Desktop & Monitor LCD Lab',
        category: 'Komputer',
        building: 'Lab Komputer Terpadu',
        weight: 28.0,
        reporter: 'Dr. Hendra Wijaya',
        role: 'Dosen Fakultas Ilmu Komputer',
        date: '09 Jun 2025, 16:20',
        status: 'Selesai',
        stepIndex: 3,
        aiConfidence: '98.1%',
        hazard: 'Sedang (Kaca LCD & Timbal)',
        notes: 'Unit upgrade laboratorium semester genap.'
      },
      {
        id: 'EW-UBL-2025-102',
        device: 'Baterai UPS & Laptop Bekas',
        category: 'Baterai',
        building: 'Gedung C (Fakultas Teknik)',
        weight: 8.2,
        reporter: 'Nadia Safitri',
        role: 'Mahasiswa Teknik Elektro',
        date: '09 Jun 2025, 14:10',
        status: 'Selesai',
        stepIndex: 3,
        aiConfidence: '94.7%',
        hazard: 'Tinggi (Limbah B3 Lithium)',
        notes: 'Disimpan dalam kotak tahan panas ruang teknisi.'
      },
      {
        id: 'EW-UBL-2025-101',
        device: 'Switch Cisco & Router Wi-Fi Kampus',
        category: 'Perangkat Jaringan',
        building: 'Gedung B (Rektorat)',
        weight: 6.4,
        reporter: 'Budi Santoso',
        role: 'Staf IT UBL',
        date: '08 Jun 2025, 11:05',
        status: 'Dalam Proses Penjadwalan',
        stepIndex: 1,
        aiConfidence: '95.2%',
        hazard: 'Rendah (PCB & Aluminium)',
        notes: 'Menunggu jadwal armada EV siang.'
      }
    ],
    pickups: [
      {
        id: 'PKP-UBL-401',
        reportId: 'EW-UBL-2025-104',
        title: 'Printer LaserJet — Gedung A',
        building: 'Gedung A (Pascasarjana)',
        scheduleDate: '10 Jun 2025',
        timeSlot: '11:30 - 12:30 WIB',
        driver: 'Armada EV-01 (Pak Agus)',
        weight: 14.5,
        stepIndex: 2,
        timeline: [
          { label: 'Laporan Diterima', time: '10 Jun 2025, 09:15', done: true },
          { label: 'Dalam Proses Penjadwalan', time: '10 Jun 2025, 10:00', done: true },
          { label: 'Dalam Perjalanan', time: '10 Jun 2025, 11:30', done: true },
          { label: 'Selesai', time: '-', done: false }
        ]
      },
      {
        id: 'PKP-UBL-400',
        reportId: 'EW-UBL-2025-101',
        title: 'Switch & Router — Gedung B',
        building: 'Gedung B (Rektorat)',
        scheduleDate: '11 Jun 2025',
        timeSlot: '09:00 - 10:00 WIB',
        driver: 'Armada EV-02 (Pak Dedi)',
        weight: 6.4,
        stepIndex: 1,
        timeline: [
          { label: 'Laporan Diterima', time: '08 Jun 2025, 11:05', done: true },
          { label: 'Dalam Proses Penjadwalan', time: '09 Jun 2025, 08:30', done: true },
          { label: 'Dalam Perjalanan', time: '-', done: false },
          { label: 'Selesai', time: '-', done: false }
        ]
      },
      {
        id: 'PKP-UBL-399',
        reportId: 'EW-UBL-2025-103',
        title: 'PC & Monitor Lab — Lab Terpadu',
        building: 'Lab Komputer Terpadu',
        scheduleDate: '09 Jun 2025',
        timeSlot: '15:00 - 16:30 WIB',
        driver: 'Armada EV-01 (Pak Agus)',
        weight: 28.0,
        stepIndex: 3,
        timeline: [
          { label: 'Laporan Diterima', time: '09 Jun 2025, 10:15', done: true },
          { label: 'Dalam Proses Penjadwalan', time: '09 Jun 2025, 12:00', done: true },
          { label: 'Dalam Perjalanan', time: '09 Jun 2025, 15:10', done: true },
          { label: 'Selesai', time: '09 Jun 2025, 16:20', done: true }
        ]
      }
    ],
    activities: [
      {
        type: 'report',
        text: 'Laporan baru: Printer di Gedung A',
        time: '10 Jun 2025, 09:45'
      },
      {
        type: 'pickup',
        text: 'Penjemputan selesai: 5 kg E-Waste',
        time: '09 Jun 2025, 16:20'
      },
      {
        type: 'recycle',
        text: 'E-Waste berhasil didaur ulang',
        time: '09 Jun 2025, 14:10'
      },
      {
        type: 'ai',
        text: 'Klasifikasi AI: Baterai UPS (94.7% akurat)',
        time: '09 Jun 2025, 13:05'
      }
    ],
    notifications: [
      {
        id: 'n1',
        title: 'Armada EV-01 sedang menuju Gedung A',
        desc: 'Estimasi tiba 10 menit untuk jemput Printer LaserJet.',
        time: 'Baru saja',
        unread: true
      },
      {
        id: 'n2',
        title: 'Klasifikasi AI terverifikasi',
        desc: 'Laporan EW-UBL-2025-102 dikategorikan sebagai Limbah B3 Baterai.',
        time: '2 jam lalu',
        unread: true
      }
    ],
    aiHistory: [
      {
        id: 'AI-892',
        item: 'Monitor LCD Dell 22"',
        category: 'Komputer',
        hazard: 'Sedang (Layar LCD)',
        confidence: '97.4%',
        estWeight: '4.8 kg',
        date: '10 Jun 2025'
      },
      {
        id: 'AI-891',
        item: 'Printer Epson L3110',
        category: 'Printer',
        hazard: 'Rendah-Sedang',
        confidence: '96.1%',
        estWeight: '3.9 kg',
        date: '10 Jun 2025'
      },
      {
        id: 'AI-890',
        item: 'Baterai Lithium-Ion 6-Cell',
        category: 'Baterai',
        hazard: 'Tinggi (B3)',
        confidence: '98.3%',
        estWeight: '0.6 kg',
        date: '09 Jun 2025'
      }
    ],
    settings: {
      userName: 'Ananda Putri',
      role: 'Mahasiswa',
      nimOrId: '2211010045',
      faculty: 'Fakultas Ilmu Komputer — UBL',
      email: 'ananda.2211010045@ubl.ac.id',
      notifEmail: true,
      notifPickup: true,
      notifWeeklyDigest: false,
      aiThreshold: 85,
      autoScheduleHeavy: true,
      campusLocation: 'Kampus Drs. H. RM. Barusman (Kampus A UBL)'
    },
    pendingPrefill: null
  };

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return clone(DEFAULT_DATA);
      const parsed = JSON.parse(raw);
      return Object.assign(clone(DEFAULT_DATA), parsed);
    } catch (e) {
      return clone(DEFAULT_DATA);
    }
  }

  let state = load();

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // ignore storage quota errors
    }
  }

  function formatNow() {
    const d = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const day = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${day} ${months[d.getMonth()]} ${d.getFullYear()}, ${hh}:${mm}`;
  }

  window.GreenCampusStore = {
    getState() {
      return state;
    },
    save,
    resetDemo() {
      state = clone(DEFAULT_DATA);
      save();
      return state;
    },
    addReport(payload) {
      const num = 105 + state.reports.length;
      const reportId = `EW-UBL-2025-${num}`;
      const nowStr = formatNow();
      const weightVal = parseFloat(payload.weight) || 2.5;

      const newReport = {
        id: reportId,
        device: payload.device,
        category: payload.category,
        building: payload.building,
        weight: weightVal,
        reporter: payload.reporter || state.settings.userName,
        role: payload.role || state.settings.role,
        date: nowStr,
        status: 'Laporan Diterima',
        stepIndex: 0,
        aiConfidence: payload.aiConfidence || '95.8%',
        hazard: payload.hazard || 'Sedang (Komponen Elektronik)',
        notes: payload.notes || '-'
      };

      state.reports.unshift(newReport);
      state.stats.totalKg = Math.round(state.stats.totalKg + weightVal);
      state.stats.monthlyReports += 1;
      state.stats.co2Saved = Math.round(state.stats.co2Saved + weightVal * 0.5);

      state.pickups.unshift({
        id: `PKP-UBL-${402 + state.pickups.length}`,
        reportId,
        title: `${payload.device} — ${payload.building.split('(')[0].trim()}`,
        building: payload.building,
        scheduleDate: 'Hari Ini',
        timeSlot: 'Menunggu Jadwal',
        driver: 'Armada EV-01 (Menunggu)',
        weight: weightVal,
        stepIndex: 0,
        timeline: [
          { label: 'Laporan Diterima', time: nowStr, done: true },
          { label: 'Dalam Proses Penjadwalan', time: '-', done: false },
          { label: 'Dalam Perjalanan', time: '-', done: false },
          { label: 'Selesai', time: '-', done: false }
        ]
      });

      state.activities.unshift({
        type: 'report',
        text: `Laporan baru: ${payload.category} di ${payload.building.split('(')[0].trim()}`,
        time: nowStr
      });

      state.notifications.unshift({
        id: `n-${Date.now()}`,
        title: `Laporan ${reportId} berhasil dibuat`,
        desc: `${payload.device} (${weightVal} kg) masuk antrean penjemputan.`,
        time: 'Baru saja',
        unread: true
      });

      save();
      return newReport;
    },
    advancePickup(pickupId) {
      const p = state.pickups.find((x) => x.id === pickupId);
      if (!p || p.stepIndex >= 3) return null;
      p.stepIndex += 1;
      const nowStr = formatNow();
      p.timeline[p.stepIndex].done = true;
      p.timeline[p.stepIndex].time = nowStr;

      const labels = ['Laporan Diterima', 'Dalam Proses Penjadwalan', 'Dalam Perjalanan', 'Selesai'];
      const linkedReport = state.reports.find((r) => r.id === p.reportId);
      if (linkedReport) {
        linkedReport.stepIndex = p.stepIndex;
        linkedReport.status = labels[p.stepIndex];
      }

      if (p.stepIndex === 3) {
        state.stats.completedPickups += 1;
        state.activities.unshift({
          type: 'pickup',
          text: `Penjemputan selesai: ${p.weight} kg E-Waste`,
          time: nowStr
        });
      }
      save();
      return p;
    },
    schedulePickup(payload) {
      const nowStr = formatNow();
      const existing = state.pickups.find((p) => p.reportId === payload.reportId);
      if (existing) {
        existing.scheduleDate = payload.scheduleDate;
        existing.timeSlot = payload.timeSlot;
        existing.driver = payload.driver;
        if (existing.stepIndex < 1) {
          existing.stepIndex = 1;
          existing.timeline[1].done = true;
          existing.timeline[1].time = nowStr;
        }
        const rep = state.reports.find((r) => r.id === existing.reportId);
        if (rep && rep.stepIndex < 1) {
          rep.stepIndex = 1;
          rep.status = 'Dalam Proses Penjadwalan';
        }
        save();
        return existing;
      }

      const newPickup = {
        id: `PKP-UBL-${402 + state.pickups.length}`,
        reportId: payload.reportId || 'EW-UBL-MANUAL',
        title: payload.title,
        building: payload.building,
        scheduleDate: payload.scheduleDate,
        timeSlot: payload.timeSlot,
        driver: payload.driver,
        weight: parseFloat(payload.weight) || 5,
        stepIndex: 1,
        timeline: [
          { label: 'Laporan Diterima', time: nowStr, done: true },
          { label: 'Dalam Proses Penjadwalan', time: nowStr, done: true },
          { label: 'Dalam Perjalanan', time: '-', done: false },
          { label: 'Selesai', time: '-', done: false }
        ]
      };
      state.pickups.unshift(newPickup);
      state.activities.unshift({
        type: 'pickup',
        text: `Penjadwalan baru di ${payload.building.split('(')[0].trim()}`,
        time: nowStr
      });
      save();
      return newPickup;
    },
    addAiRecord(record) {
      state.aiHistory.unshift(record);
      state.activities.unshift({
        type: 'ai',
        text: `Klasifikasi AI: ${record.item} (${record.confidence})`,
        time: formatNow()
      });
      save();
    },
    markNotificationsRead() {
      state.notifications.forEach((n) => { n.unread = false; });
      save();
    },
    updateSettings(partial) {
      state.settings = Object.assign({}, state.settings, partial);
      save();
    },
    setPendingPrefill(prefill) {
      state.pendingPrefill = prefill;
    },
    consumePendingPrefill() {
      const val = state.pendingPrefill;
      state.pendingPrefill = null;
      return val;
    }
  };
})();

