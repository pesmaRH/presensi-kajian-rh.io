# QR Attendance App with JSON Storage

Aplikasi presensi kajian berbasis QR code.  
Tanpa backend/database, semua data CRUD disimpan SEMENTARA di localStorage browser (karena keterbatasan GitHub Pages).

---

## 📂 Struktur Folder

```
index.html
login.html
dashboard.html
admin.html
jamaah.html
kajian.html
rekap.html
presensi.html
/css/style.css
/js/app.js
/data/admin.json
/data/jamaah.json
/data/kajian.json
/data/presensi.json
/js/qrcode.min.js
/js/FileSaver.min.js
```

---

## 🚀 Cara Pakai & Testing

1. **Upload semua file ke repo ini.**
2. **Aktifkan GitHub Pages:**  
   - Settings → Pages → Source: `main` branch, `/ (root)`.
   - Tunggu beberapa menit.
   - Akses: `https://pesmaRH.github.io/presensi-kajian-rh.io/`

3. **Login Admin**  
   - Username: `adminrh`  
   - Password: `cintaquran`  
   - (atau)  
   - Username: `pesmarh`  
   - Password: `rhmantab`

---

## 💻 Fitur & Validasi

- **Admin:**  
  - CRUD Admin  
  - CRUD Jamaah  
  - CRUD Kajian (+generate QR)  
  - Rekap Presensi (Export CSV)
- **Jamaah:**  
  - Presensi dengan scan QR / input kode manual
- **Validasi:**  
  - Tidak bisa presensi dua kali untuk kajian yang sama
  - Presensi hanya pada jam & tanggal yang ditentukan
  - Notifikasi sukses/gagal/expired

---

## ⚠️ Catatan Penting

- **Data TIDAK TERSIMPAN di file JSON** di GitHub Pages (hanya localStorage browser).
- Untuk reset data, clear localStorage (bisa lewat DevTools).
- Untuk produksi (data benar-benar tersimpan), butuh backend API.

---

## 🐞 Bug Potensial & Saran Perbaikan

- Admin bisa hapus diri sendiri (sebaiknya dicegah)
- Tidak ada fitur edit (admin/jamaah/kajian)
- Tidak ada validasi jam_selesai > jam_mulai saat tambah kajian
- Data presensi tidak ikut update jika data master berubah
- Notifikasi CRUD belum muncul di semua aksi (bisa ditambahkan toast/modal)
- Tidak ada fitur reset data/testing (disarankan tambahkan)
- Jika ingin data persist, harus pakai backend

---

## 📦 Library Eksternal

- `js/qrcode.min.js`  
  [Download dari CDN](https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js)
- `js/FileSaver.min.js`  
  [Download dari CDN](https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js)

---

## 🧪 Pengujian Manual (Checklist)

- [x] Login admin dengan dua user default
- [x] CRUD admin, jamaah, kajian berjalan
- [x] Generate QR & presensi berjalan
- [x] Validasi presensi (waktu, duplikasi, expired)
- [x] Rekap & Export CSV berjalan

---

**Kontribusi, saran, dan issue bug sangat diterima.**

---
