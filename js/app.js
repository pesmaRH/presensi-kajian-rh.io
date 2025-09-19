// ---------- Utility ----------

function getData(key, fallback) {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  } else if (fallback) {
    return fallback;
  }
  return [];
}

function setData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function showNotif(msg, color = "#22c55e", target = "dashboardNotif") {
  const box = document.getElementById(target);
  if (box) {
    box.style.color = color;
    box.textContent = msg;
    setTimeout(() => { box.textContent = ""; }, 2500);
  }
}

// ---------- Login ----------
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').onsubmit = function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const adminList = getData('admin', [
      { "id": 1, "username": "adminrh", "password": "cintaquran" },
      { "id": 2, "username": "pesmarh", "password": "rhmantab" }
    ]);
    const found = adminList.find(a => a.username === username && a.password === password);
    if (found) {
      sessionStorage.setItem('isAdmin', 'true');
      sessionStorage.setItem('adminUser', found.username);
      location.href = "dashboard.html";
    } else {
      showNotif("Login gagal. Username/password salah.", "#b91c1c", "loginMessage");
    }
  };
}

// ---------- Logout ----------
function logout() {
  sessionStorage.removeItem('isAdmin');
  sessionStorage.removeItem('adminUser');
  location.href = "login.html";
}

// ---------- Reset Data (Dev) ----------
if (document.getElementById('resetDataBtn')) {
  document.getElementById('resetDataBtn').onclick = function() {
    if (confirm("Yakin reset SEMUA data?")) {
      localStorage.clear();
      showNotif("Semua data berhasil di-reset.", "#b91c1c");
      setTimeout(() => location.reload(), 1000);
    }
  }
}

// ---------- CRUD Admin ----------
if (location.pathname.endsWith('admin.html')) {
  if (sessionStorage.getItem('isAdmin') !== 'true') location.href = 'login.html';
  const adminListDiv = document.getElementById('adminList');
  function renderAdminList() {
    const adminList = getData('admin', [
      { "id": 1, "username": "adminrh", "password": "cintaquran" },
      { "id": 2, "username": "pesmarh", "password": "rhmantab" }
    ]);
    const currentUser = sessionStorage.getItem('adminUser');
    adminListDiv.innerHTML = '<table><tr><th>ID</th><th>Username</th><th>Aksi</th></tr>' +
      adminList.map(a => `<tr>
        <td>${a.id}</td>
        <td>${a.username}</td>
        <td>
          <button onclick="deleteAdmin(${a.id},'${a.username}')" ${a.username===currentUser ? 'disabled title="Tidak bisa hapus admin yang sedang login"' : ''}>Hapus</button>
        </td>
      </tr>`).join('') + '</table>';
  }
  window.deleteAdmin = function(id, uname) {
    const currentUser = sessionStorage.getItem('adminUser');
    if (uname === currentUser) {
      showNotif("Tidak bisa hapus admin yang sedang login.", "#b91c1c");
      return;
    }
    let adminList = getData('admin', []);
    adminList = adminList.filter(a => a.id !== id);
    setData('admin', adminList);
    renderAdminList();
    showNotif("Admin berhasil dihapus.");
  }
  document.getElementById('addAdminForm').onsubmit = function(e) {
    e.preventDefault();
    const username = document.getElementById('newAdminUsername').value.trim();
    const password = document.getElementById('newAdminPassword').value.trim();
    let adminList = getData('admin', []);
    if (!username || !password) {
      showNotif("Username & password wajib diisi.", "#b91c1c");
      return;
    }
    if (adminList.some(a=>a.username===username)) {
      showNotif("Username admin sudah ada.", "#b91c1c");
      return;
    }
    const id = adminList.length ? Math.max(...adminList.map(a=>a.id))+1 : 1;
    adminList.push({ id, username, password });
    setData('admin', adminList);
    renderAdminList();
    showNotif("Admin berhasil ditambah.");
    e.target.reset();
  }
  renderAdminList();
}

// ---------- CRUD Jamaah ----------
if (location.pathname.endsWith('jamaah.html')) {
  if (sessionStorage.getItem('isAdmin') !== 'true') location.href = 'login.html';
  const jamaahListDiv = document.getElementById('jamaahList');
  function renderJamaahList() {
    const jamaahList = getData('jamaah', []);
    jamaahListDiv.innerHTML = '<table><tr><th>ID Jamaah</th><th>Nama</th><th>Aksi</th></tr>' +
      jamaahList.map(j => `<tr>
        <td>${j.id}</td>
        <td>${j.nama}</td>
        <td><button onclick="deleteJamaah('${j.id}')">Hapus</button></td>
      </tr>`).join('') + '</table>';
  }
  window.deleteJamaah = function(id) {
    let jamaahList = getData('jamaah', []);
    jamaahList = jamaahList.filter(j => j.id !== id);
    setData('jamaah', jamaahList);
    renderJamaahList();
    showNotif("Jamaah berhasil dihapus.");
  }
  document.getElementById('addJamaahForm').onsubmit = function(e) {
    e.preventDefault();
    const nama = document.getElementById('jamaahNama').value.trim();
    const id = document.getElementById('jamaahID').value.trim();
    let jamaahList = getData('jamaah', []);
    if (!id || !nama) {
      showNotif("ID & nama jamaah wajib diisi.", "#b91c1c");
      return;
    }
    if (jamaahList.some(j=>j.id===id)) {
      showNotif("ID Jamaah sudah ada.", "#b91c1c");
      return;
    }
    jamaahList.push({ id, nama });
    setData('jamaah', jamaahList);
    renderJamaahList();
    showNotif("Jamaah berhasil ditambah.");
    e.target.reset();
  }
  renderJamaahList();
}

// ---------- CRUD Kajian + QR ----------
if (location.pathname.endsWith('kajian.html')) {
  if (sessionStorage.getItem('isAdmin') !== 'true') location.href = 'login.html';
  const kajianListDiv = document.getElementById('kajianList');
  function renderKajianList() {
    const kajianList = getData('kajian', []);
    kajianListDiv.innerHTML = '<table><tr><th>ID</th><th>Judul</th><th>Tanggal</th><th>Jam</th><th>QR</th><th>Aksi</th></tr>' +
      kajianList.map(k => `<tr>
        <td>${k.id}</td>
        <td>${k.judul}</td>
        <td>${k.tanggal}</td>
        <td>${k.jam_mulai} - ${k.jam_selesai}</td>
        <td><button onclick="generateQR(${k.id},'${k.judul}')">QR</button></td>
        <td><button onclick="deleteKajian(${k.id})">Hapus</button></td>
      </tr>`).join('') + '</table>';
  }
  window.generateQR = function(id, judul) {
    const qrContainer = document.getElementById('qrContainer');
    qrContainer.innerHTML = `<h3>QR untuk Kajian "${judul}"</h3><div id="qr"></div><p>Kode: ${id}</p>`;
    new QRCode(document.getElementById("qr"), {
      text: location.origin + "/presensi.html?id=" + id,
      width: 200,
      height: 200
    });
  }
  window.deleteKajian = function(id) {
    let kajianList = getData('kajian', []);
    kajianList = kajianList.filter(k => k.id !== id);
    setData('kajian', kajianList);
    renderKajianList();
    showNotif("Kajian berhasil dihapus.");
  }
  document.getElementById('addKajianForm').onsubmit = function(e) {
    e.preventDefault();
    const judul = document.getElementById('judulKajian').value.trim();
    const tanggal = document.getElementById('tanggalKajian').value;
    const jam_mulai = document.getElementById('jamMulai').value;
    const jam_selesai = document.getElementById('jamSelesai').value;
    let kajianList = getData('kajian', []);
    if (!judul || !tanggal || !jam_mulai || !jam_selesai) {
      showNotif("Semua field kajian wajib diisi.", "#b91c1c");
      return;
    }
    if (jam_selesai <= jam_mulai) {
      showNotif("Jam selesai harus setelah jam mulai!", "#b91c1c");
      return;
    }
    const id = kajianList.length ? Math.max(...kajianList.map(k=>k.id))+1 : 1;
    kajianList.push({ id, judul, tanggal, jam_mulai, jam_selesai });
    setData('kajian', kajianList);
    renderKajianList();
    showNotif("Kajian berhasil ditambah.");
    e.target.reset();
  }
  renderKajianList();
}

// ---------- Rekap + Export CSV ----------
if (location.pathname.endsWith('rekap.html')) {
  if (sessionStorage.getItem('isAdmin') !== 'true') location.href = 'login.html';
  const kajianSelect = document.getElementById('rekapKajianSelect');
  const rekapTable = document.getElementById('rekapTable');
  function loadKajianOptions() {
    const kajianList = getData('kajian', []);
    kajianSelect.innerHTML = kajianList.map(k => `<option value="${k.id}">${k.judul} (${k.tanggal})</option>`).join('');
    showRekap();
  }
  kajianSelect.onchange = showRekap;
  function showRekap() {
    const presensiList = getData('presensi', []);
    const kajianId = +kajianSelect.value;
    rekapTable.innerHTML = `<tr><th>No</th><th>Waktu Presensi</th></tr>` +
      presensiList
        .filter(p => p.kajian_id === kajianId)
        .map((p, i) => `<tr>
          <td>${i+1}</td>
          <td>${p.waktu}</td>
        </tr>`).join('');
  }
  document.getElementById('downloadCSV').onclick = function() {
    const presensiList = getData('presensi', []);
    const kajianId = +kajianSelect.value;
    const filtered = presensiList.filter(p => p.kajian_id === kajianId);
    let csv = 'No,Waktu Presensi\n';
    filtered.forEach((p, i) => {
      csv += `"${i+1}","${p.waktu}"\n`;
    });
    const blob = new Blob([csv], {type: "text/csv"});
    saveAs(blob, "rekap_kajian_"+kajianId+".csv");
  }
  loadKajianOptions();
}

// ---------- Presensi Jamaah ----------
if (location.pathname.endsWith('presensi.html')) {
  const urlParams = new URLSearchParams(location.search);
  const id_kajian = urlParams.get('id');
  if (id_kajian) {
    document.getElementById('inputKode').value = id_kajian;
    document.getElementById('inputKode').setAttribute('readonly', true);
  }
  document.getElementById('presensiForm').onsubmit = function(e) {
    e.preventDefault();
    const kode = document.getElementById('inputKode').value;
    const kajianList = getData('kajian', []);
    const kajian = kajianList.find(k=>String(k.id)===kode);
    if (!kajian) {
      showNotif('⚠️ Kode kajian tidak ditemukan.', "#b91c1c", "presensiResult");
      return;
    }
    const now = new Date();
    const dateNow = now.toISOString().slice(0,10);
    if (kajian.tanggal !== dateNow) {
      showNotif('⏰ Waktu presensi sudah berakhir (tanggal tidak sesuai).', "#b91c1c", "presensiResult");
      return;
    }
    const jamMulai = kajian.jam_mulai;
    const jamSelesai = kajian.jam_selesai;
    const jamSekarang = now.toTimeString().slice(0,5);
    if (jamSekarang < jamMulai || jamSekarang > jamSelesai) {
      showNotif('⏰ Waktu presensi sudah berakhir.', "#b91c1c", "presensiResult");
      return;
    }
    let presensiList = getData('presensi', []);
    presensiList.push({
      kajian_id: +kode,
      waktu: now.toLocaleString()
    });
    setData('presensi', presensiList);
    showNotif('✅ Presensi berhasil, terima kasih telah hadir.', "#22c55e", "presensiResult");
    document.getElementById('presensiForm').querySelector('button').disabled = true;
  }
}
