import { useState } from 'react';

export default function App() {
  // State Kalkulator
  const [jarakBulanan, setJarakBulanan] = useState(1000); // Default 1.000 km/bulan (12.000 km/tahun)
  const [tipeEV, setTipeEV] = useState('Aira EV');
  const [opsiTarifListrik, setOpsiTarifListrik] = useState('1444.70');
  const [profilBBM, setProfilBBM] = useState('LCGC');
  const [hitungPajakServis, setHitungPajakServis] = useState(true);
  const [tampilkanPricelist, setTampilkanPricelist] = useState(false);
  const [kategoriAktif, setKategoriAktif] = useState('Semua');

  // Data Spesifikasi Wuling EV sesuai Brosur (Gambar 1-4)
  const dataEV = {
    'Aira EV': {
      nama: 'Wuling Aira EV (Standard Range)',
      bateraiKwh: 16.2,
      jarakTempuhKm: 205,
      info: '16,2 kWh | Klaim 205 km (Cocok vs LCGC 4-Seater)'
    },
    'Eksion EV': {
      nama: 'Wuling Eksion EV',
      bateraiKwh: 69.1,
      jarakTempuhKm: 530,
      info: '69,10 kWh | Jarak hingga 530 km CLTC'
    },
    'Darion EV': {
      nama: 'Wuling Darion EV (7-Seater)',
      bateraiKwh: 69.0,
      jarakTempuhKm: 540,
      info: '7-Seater Nyaman | 540 km Sekali Cas (~Rp 100 Ribuan)'
    },
    'Binguo EV': {
      nama: 'New Binguo EV (MY26)',
      bateraiKwh: 31.9,
      jarakTempuhKm: 333,
      info: '31,9 kWh | 333 km | Promo Spesial MY26 Interior Baru'
    },
    'Air EV': {
      nama: 'New Air EV (200 - 300 km)',
      bateraiKwh: 17.3,
      jarakTempuhKm: 200,
      info: '17,3 kWh | 200 km | Compact & Lincah di Perkotaan'
    },
    'Cloud EV': {
      nama: 'New Cloud EV (360 - 460 km)',
      bateraiKwh: 50.6,
      jarakTempuhKm: 460,
      info: '50,6 kWh | 460 km | Kabin Mewah Setara Sofa Rumah'
    }
  };

  // Data Pembanding BBM / Diesel sesuai Brosur (Gambar 2 & 4)
  const dataPembanding = {
    'LCGC': {
      nama: 'LCGC 4-Seater (Pertalite)',
      hargaPerLiter: 10000,
      konsumsiKmPerLiter: 19.6,
      keterangan: 'Konsumsi 19,60 km/l | BBM Rp10.000/liter'
    },
    'BENSIN': {
      nama: 'Mobil Bensin (Pertamax)',
      hargaPerLiter: 15950,
      konsumsiKmPerLiter: 12,
      keterangan: 'Konsumsi 12 km/l | Pertamax Rp15.950/liter'
    },
    'DIESEL': {
      nama: 'Mobil Diesel (Pertamina Dex)',
      hargaPerLiter: 25200,
      konsumsiKmPerLiter: 14,
      keterangan: 'Konsumsi 14 km/l | Pertamina Dex Rp25.200/liter'
    }
  };

  // Data Pricelist November Wuling Arista Lampung (Gambar 5 & 6)
  const pricelistData = [
    {
      kategori: 'NEW BINGUO EV',
      highlightPromo: true,
      items: [
        { tipe: 'NEW BINGUO EV LITE MY26 (Interior Baru)', hargaNormal: 'Rp 301.500.000', harga: 'Rp 274.500.000', promo: true },
        { tipe: 'NEW BINGUO EV PRO MY26 (Interior Baru)', hargaNormal: 'Rp 331.500.000', harga: 'Rp 304.500.000', promo: true },
        { tipe: 'NEW BINGUO EV LITE', harga: 'Rp 330.400.000' },
        { tipe: 'NEW BINGUO EV PRO', harga: 'Rp 375.500.000' },
      ]
    },
    {
      kategori: 'AIRA EV',
      items: [
        { tipe: 'AIRA EV STDRT', harga: 'Rp 168.500.000' },
        { tipe: 'AIRA EV STDRT + HC', harga: 'Rp 177.000.000' },
        { tipe: 'AIRA EV STDRT + HC FULLPACK', harga: 'Rp 183.500.000' },
        { tipe: 'AIRA EV PRO', harga: 'Rp 188.500.000' },
        { tipe: 'AIRA EV PRO + HC', harga: 'Rp 197.000.000' },
        { tipe: 'AIRA EV PRO + HC FULLPACK', harga: 'Rp 203.500.000' },
      ]
    },
    {
      kategori: 'EKSION',
      items: [
        { tipe: 'EKSION EV CE (NON HC)', harga: 'Rp 416.800.000' },
        { tipe: 'EKSION EV EX (NON HC)', harga: 'Rp 486.800.000' },
        { tipe: 'EKSION PHEV CE', harga: 'Rp 474.000.000' },
        { tipe: 'EKSION PHEV EX', harga: 'Rp 524.000.000' },
      ]
    },
    {
      kategori: 'DARION',
      items: [
        { tipe: 'DARION EV CE 480 + HC FULLPACK', harga: 'Rp 417.800.000' },
        { tipe: 'DARION EV CE + HC FULLPACK', harga: 'Rp 427.800.000' },
        { tipe: 'DARION EV EX + HC FULLPACK', harga: 'Rp 487.800.000' },
        { tipe: 'DARION PHEV CE', harga: 'Rp 462.000.000' },
        { tipe: 'DARION PHEV EX', harga: 'Rp 512.000.000' },
      ]
    },
    {
      kategori: 'NEW AIR EV',
      items: [
        { tipe: 'NEW AIR EV 200', harga: 'Rp 246.000.000' },
        { tipe: 'NEW AIR EV LITE', harga: 'Rp 282.900.000' },
        { tipe: 'NEW AIR EV PRO', harga: 'Rp 340.100.000' },
      ]
    },
    {
      kategori: 'CLOUD EV',
      items: [
        { tipe: 'NEW CLOUD EV LITE 360', harga: 'Rp 310.500.000' },
        { tipe: 'NEW CLOUD EV PRO 360', harga: 'Rp 350.500.000' },
        { tipe: 'NEW CLOUD EV LITE', harga: 'Rp 428.200.000' },
        { tipe: 'NEW CLOUD EV PRO', harga: 'Rp 456.200.000' },
      ]
    },
    {
      kategori: 'NEW ALVEZ',
      items: [
        { tipe: 'NEW ALVEZ CE MT', harga: 'Rp 261.000.000' },
        { tipe: 'NEW ALVEZ CE CVT', harga: 'Rp 307.200.000' },
        { tipe: 'NEW ALVEZ EX CVT', harga: 'Rp 347.400.000' },
      ]
    },
    {
      kategori: 'NEW CONFERO',
      items: [
        { tipe: 'NEW CONFERO DB', harga: 'Rp 230.800.000' },
        { tipe: 'NEW CONFERO S C', harga: 'Rp 252.600.000' },
      ]
    },
    {
      kategori: 'MITRA EV',
      items: [
        { tipe: 'MITRA EV BV 300', harga: 'Rp 347.000.000' },
        { tipe: 'MITRA EV BV 400', harga: 'Rp 377.000.000' },
        { tipe: 'MITRA EV MINI BUS 300', harga: 'Rp 366.500.000' },
        { tipe: 'MITRA EV MINI BUS 400', harga: 'Rp 397.000.000' },
      ]
    },
    {
      kategori: 'FORMO',
      items: [
        { tipe: 'FORMO BLIND VAN', harga: 'Rp 200.600.000' },
        { tipe: 'FORMO S', harga: 'Rp 226.200.000' },
        { tipe: 'FORMO MAX STD', harga: 'Rp 214.800.000' },
        { tipe: 'FORMO MAX AC', harga: 'Rp 222.800.000' },
      ]
    }
  ];

  // Kalkulasi Energi
  const evTerpilih = dataEV[tipeEV];
  const bbmTerpilih = dataPembanding[profilBBM];
  const tarifKwh = parseFloat(opsiTarifListrik);

  // 1. Biaya EV
  const biayaSekaliCas = evTerpilih.bateraiKwh * tarifKwh;
  const biayaEvPerKm = biayaSekaliCas / evTerpilih.jarakTempuhKm;
  const biayaEvBulanan = biayaEvPerKm * jarakBulanan;
  const biayaEvTahunan = biayaEvBulanan * 12;

  // 2. Biaya BBM / Diesel
  const biayaBbmPerKm = bbmTerpilih.hargaPerLiter / bbmTerpilih.konsumsiKmPerLiter;
  const biayaBbmBulanan = biayaBbmPerKm * jarakBulanan;
  const biayaBbmTahunan = biayaBbmBulanan * 12;

  // 3. Pajak & Servis Tahunan (Sesuai Gambar 1: Eksion EV vs Mobil Bensin)
  const pajakServisBbmTahunan = hitungPajakServis ? (3000000 + 2000000) : 0; // Pajak 3jt + Servis 2jt
  const pajakServisEvTahunan = hitungPajakServis ? (150000 + 400000) : 0;   // Pajak 150rb + Servis 400rb

  const totalPengeluaranBbmTahun = biayaBbmTahunan + pajakServisBbmTahunan;
  const totalPengeluaranEvTahun = biayaEvTahunan + pajakServisEvTahunan;

  const hematEnergiBulanan = biayaBbmBulanan - biayaEvBulanan;
  const hematTotalTahunan = totalPengeluaranBbmTahun - totalPengeluaranEvTahun;
  const hematLimaTahun = hematTotalTahunan * 5;
  const persentaseHemat = ((totalPengeluaranBbmTahun - totalPengeluaranEvTahun) / totalPengeluaranBbmTahun) * 100;

  // Format Rupiah
  const formatRp = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(angka);
  };

  // Generate Pesan WhatsApp
  const pesanWA = `Halo Mas Farrel (Wuling Arista Lampung), saya baru mencoba simulasi Kalkulator Penghematan & Pricelist Wuling.

*Hasil Simulasi Saya:*
- Mobil Pilihan: *${evTerpilih.nama}*
- Pemakaian: ${jarakBulanan.toLocaleString('id-ID')} km/bulan (${(jarakBulanan * 12).toLocaleString('id-ID')} km/tahun)
- Estimasi Penghematan: *${formatRp(hematTotalTahunan)} / tahun* (Hemat ${persentaseHemat.toFixed(1)}%)

Boleh minta info promo DP ringan, simulasi kredit, atau diskon terbaru bulan November untuk unit ini?`;

  const urlWA = `https://wa.me/6285768390480?text=${encodeURIComponent(pesanWA)}`;

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 font-sans text-slate-800">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* KARTU UTAMA KALKULATOR */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-800 via-blue-700 to-cyan-600 p-6 text-white text-center">
            <span className="inline-block bg-white/20 text-xs font-bold px-3 py-1 rounded-full mb-2 tracking-wider uppercase">
              Wuling Arista Lampung • Jl. ZA Pagar Alam No.99
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold mb-1">
              Simulasi Biaya Energi & Penghematan EV
            </h1>
            <p className="text-blue-100 text-sm">
              Bandingkan pengeluaran Bensin/Diesel Anda dengan lini Wuling EV terbaru
            </p>
          </div>

          <div className="p-6 space-y-6">
            
            {/* Pilih Mobil Wuling EV & Kendaraan Saat Ini */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-100">
                <label className="block text-xs font-bold uppercase text-blue-800 mb-2">
                  1. Pilih Mobil Wuling EV
                </label>
                <select
                  value={tipeEV}
                  onChange={(e) => setTipeEV(e.target.value)}
                  className="w-full p-2.5 bg-white border border-blue-300 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {Object.keys(dataEV).map((key) => (
                    <option key={key} value={key}>{dataEV[key].nama}</option>
                  ))}
                </select>
                <p className="text-xs text-blue-600 mt-2 font-medium">
                  ⚡ {evTerpilih.info}
                </p>
              </div>

              <div className="bg-red-50/60 p-4 rounded-xl border border-red-100">
                <label className="block text-xs font-bold uppercase text-red-800 mb-2">
                  2. Bandingkan Dengan Mobil BBM
                </label>
                <select
                  value={profilBBM}
                  onChange={(e) => setProfilBBM(e.target.value)}
                  className="w-full p-2.5 bg-white border border-red-300 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-red-500 outline-none"
                >
                  {Object.keys(dataPembanding).map((key) => (
                    <option key={key} value={key}>{dataPembanding[key].nama}</option>
                  ))}
                </select>
                <p className="text-xs text-red-600 mt-2 font-medium">
                  ⛽ {bbmTerpilih.keterangan}
                </p>
              </div>
            </div>

            {/* Slider Jarak Tempuh & Opsi Tarif Cas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <label className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                  <span>Jarak Tempuh per Bulan</span>
                  <span className="text-blue-700">{jarakBulanan.toLocaleString('id-ID')} KM / bln</span>
                </label>
                <input
                  type="range"
                  min="500"
                  max="3000"
                  step="100"
                  value={jarakBulanan}
                  onChange={(e) => setJarakBulanan(Number(e.target.value))}
                  className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>12.000 km/thn (1.000/bln)</span>
                  <button 
                    type="button"
                    onClick={() => setJarakBulanan(1500)}
                    className="text-blue-600 underline font-medium"
                  >
                    Set 18.000 km/thn
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                  3. Lokasi & Tarif Pengisian Daya
                </label>
                <select
                  value={opsiTarifListrik}
                  onChange={(e) => setOpsiTarifListrik(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="1444.70">Cas di Rumah (Rp 1.444,70 / kWh)</option>
                  <option value="1700">Cas di Rumah 6600W (Rp 1.700 / kWh)</option>
                  <option value="2466.78">Cas di SPKLU (Rp 2.466,78 / kWh)</option>
                </select>
              </div>
            </div>

            {/* Toggle Pajak & Servis Tahunan (Sesuai Brosur Gambar 1) */}
            <div className="flex items-center justify-between bg-amber-50 border border-amber-200 px-4 py-3 rounded-xl">
              <div>
                <p className="text-sm font-bold text-amber-900">
                  Sertakan Komponen Pajak & Servis Tahunan?
                </p>
                <p className="text-xs text-amber-700">
                  Bensin: Pajak ±Rp3jt & Servis ±Rp2jt/thn | Wuling EV: Pajak ±Rp150rb & Servis ±Rp400rb/thn
                </p>
              </div>
              <input
                type="checkbox"
                checked={hitungPajakServis}
                onChange={(e) => setHitungPajakServis(e.target.checked)}
                className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
              />
            </div>

            {/* Hasil Perbandingan Detail */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Kolom EV */}
              <div className="bg-emerald-50/70 border-2 border-emerald-500 rounded-xl p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-extrabold uppercase tracking-wider bg-emerald-600 text-white px-2.5 py-0.5 rounded">
                    ⚡ {evTerpilih.nama}
                  </span>
                  <span className="text-xs font-bold text-emerald-700">
                    {formatRp(biayaEvPerKm)} / km
                  </span>
                </div>
                <div className="text-xs text-slate-600 space-y-1 pt-2">
                  <div className="flex justify-between">
                    <span>Biaya 1x Cas Penuh ({evTerpilih.bateraiKwh} kWh):</span>
                    <span className="font-semibold text-slate-800">{formatRp(biayaSekaliCas)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Biaya Energi / bulan:</span>
                    <span className="font-semibold text-slate-800">{formatRp(biayaEvBulanan)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Biaya Energi / tahun:</span>
                    <span className="font-semibold text-slate-800">{formatRp(biayaEvTahunan)}</span>
                  </div>
                  {hitungPajakServis && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Pajak (Rp150rb) + Servis (Rp400rb):</span>
                      <span className="font-semibold">{formatRp(pajakServisEvTahunan)}</span>
                    </div>
                  )}
                </div>
                <div className="border-t border-emerald-200 pt-2 flex justify-between items-center">
                  <span className="text-xs font-bold text-emerald-900">Total / Tahun:</span>
                  <span className="text-lg font-extrabold text-emerald-700">{formatRp(totalPengeluaranEvTahun)}</span>
                </div>
              </div>

              {/* Kolom BBM */}
              <div className="bg-rose-50/70 border border-rose-300 rounded-xl p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-extrabold uppercase tracking-wider bg-rose-600 text-white px-2.5 py-0.5 rounded">
                    ⛽ {bbmTerpilih.nama}
                  </span>
                  <span className="text-xs font-bold text-rose-700">
                    {formatRp(biayaBbmPerKm)} / km
                  </span>
                </div>
                <div className="text-xs text-slate-600 space-y-1 pt-2">
                  <div className="flex justify-between">
                    <span>Konsumsi Rata-rata:</span>
                    <span className="font-semibold text-slate-800">{bbmTerpilih.konsumsiKmPerLiter} km/liter</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Biaya BBM / bulan:</span>
                    <span className="font-semibold text-slate-800">{formatRp(biayaBbmBulanan)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Biaya BBM / tahun:</span>
                    <span className="font-semibold text-slate-800">{formatRp(biayaBbmTahunan)}</span>
                  </div>
                  {hitungPajakServis && (
                    <div className="flex justify-between text-rose-700">
                      <span>Pajak (Rp3jt) + Servis (Rp2jt):</span>
                      <span className="font-semibold">{formatRp(pajakServisBbmTahunan)}</span>
                    </div>
                  )}
                </div>
                <div className="border-t border-rose-200 pt-2 flex justify-between items-center">
                  <span className="text-xs font-bold text-rose-900">Total / Tahun:</span>
                  <span className="text-lg font-extrabold text-rose-600">{formatRp(totalPengeluaranBbmTahun)}</span>
                </div>
              </div>
            </div>

            {/* Banner Total Penghematan */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl p-5 shadow-lg">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold bg-white/20 px-2.5 py-1 rounded-full">
                    Potensi Hemat {persentaseHemat.toFixed(1)}% Lebih Rendah
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
                    {formatRp(hematTotalTahunan)} <span className="text-lg font-normal">/ tahun</span>
                  </h2>
                  <p className="text-emerald-100 text-xs mt-1">
                    Hemat Bulanan: <strong>{formatRp(hematEnergiBulanan)}</strong> • Dalam 5 Tahun Hemat: <strong>{formatRp(hematLimaTahun)}</strong>
                  </p>
                </div>
                <a
                  href={urlWA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto bg-white text-emerald-700 hover:bg-emerald-50 font-extrabold py-3.5 px-6 rounded-xl shadow-md transition-all active:scale-95 text-sm whitespace-nowrap text-center"
                >
                  📲 Klaim Promo & Hitung Kredit
                </a>
              </div>
            </div>

            {/* Tombol Buka/Tutup Pricelist November */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setTampilkanPricelist(!tampilkanPricelist)}
                className="w-full bg-blue-900 hover:bg-blue-950 text-white font-bold py-3.5 px-6 rounded-xl shadow transition-all flex justify-center items-center gap-2 text-sm"
              >
                <span>📋 {tampilkanPricelist ? 'Sembunyikan' : 'Lihat'} Pricelist Wuling Terbaru (November) & Promo Binguo MY26</span>
                <span>{tampilkanPricelist ? '▲' : '▼'}</span>
              </button>
            </div>

          </div>
        </div>

        {/* SECTION PRICELIST NOVEMBER & PROMO BINGUO MY26 (Muncul Saat Tombol Ditekan) */}
        {tampilkanPricelist && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 animate-fadeIn space-y-6 p-6">
            
            {/* Highlight Banner: Promo Spesial Binguo MY26 Interior Baru (Gambar 6) */}
            <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-2 border-amber-400 rounded-2xl p-5 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4">
                <div>
                  <span className="bg-red-600 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    🔥 Promo Spesial November • NEW MY26
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-2">
                    BINGUO MY26 INTERIOR BARU — Lebih Nyaman, Praktis & Stylish!
                  </h3>
                  <p className="text-xs text-slate-600">
                    Eksterior tetap ikonik, makin sempurna di dalam dengan upgrade fitur & diskon khusus OTR Lampung:
                  </p>
                </div>
              </div>

              {/* Detail Upgrade Interior Baru Binguo MY26 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-xs">
                <div className="bg-white p-3.5 rounded-xl border border-amber-200 space-y-1.5">
                  <span className="font-extrabold text-amber-800 text-sm">✨ NEW BINGUO LITE MY26</span>
                  <ul className="list-disc list-inside text-slate-700 space-y-1">
                    <li><strong>Transmisi Baru:</strong> Kini berada di samping kiri setir</li>
                    <li><strong>Console Tengah Baru:</strong> Terletak di tengah antar jok pengemudi & samping</li>
                    <li><strong>Jok Baru:</strong> Bahan kain warna <em>Mocca Latte</em> + Motif Batik Wuling</li>
                    <li><strong>Velg:</strong> Tetap menggunakan velg standar</li>
                  </ul>
                  <div className="pt-2 border-t border-slate-100 flex justify-between items-baseline">
                    <span className="text-slate-400 line-through">Rp 301.500.000</span>
                    <span className="text-lg font-extrabold text-emerald-700">Rp 274.500.000</span>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-amber-200 space-y-1.5">
                  <span className="font-extrabold text-amber-800 text-sm">🌟 NEW BINGUO PRO MY26</span>
                  <ul className="list-disc list-inside text-slate-700 space-y-1">
                    <li><strong>Fitur Lengkap:</strong> <em>Wireless Charging 50W</em> + Console tengah baru</li>
                    <li><strong>Transmisi Baru:</strong> Tuas transmisi praktis di samping kiri setir</li>
                    <li><strong>Jok Baru:</strong> Bahan <em>synthetic</em> warna <em>Caramel Latte</em> + Motif Batik Wuling</li>
                    <li><strong>Velg Baru:</strong> Kini sudah menggunakan <strong>Velg Alloy (Velg Racing)</strong></li>
                  </ul>
                  <div className="pt-2 border-t border-slate-100 flex justify-between items-baseline">
                    <span className="text-slate-400 line-through">Rp 331.500.000</span>
                    <span className="text-lg font-extrabold text-emerald-700">Rp 304.500.000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Daftar Harga OTR Lengkap (Gambar 5) */}
            <div>
              <div className="text-center mb-4">
                <h3 className="text-xl font-extrabold text-blue-900">
                  DAFTAR HARGA OTR WULING ARISTA LAMPUNG (NOVEMBER)
                </h3>
                <p className="text-xs text-slate-500">
                  PT Arista Jaya Lestari • Jl. ZA Pagar Alam No.99, Rajabasa, Bandar Lampung
                </p>
              </div>

              {/* Filter Kategori */}
              <div className="flex flex-wrap gap-1.5 justify-center mb-5">
                {['Semua', ...pricelistData.map(d => d.kategori)].map((kat) => (
                  <button
                    key={kat}
                    onClick={() => setKategoriAktif(kat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      kategoriAktif === kat
                        ? 'bg-blue-700 text-white shadow'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {kat}
                  </button>
                ))}
              </div>

              {/* Grid Tabel Pricelist */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pricelistData
                  .filter(grup => kategoriAktif === 'Semua' || grup.kategori === kategoriAktif)
                  .map((grup) => (
                    <div
                      key={grup.kategori}
                      className={`rounded-xl border overflow-hidden ${
                        grup.highlightPromo ? 'border-amber-400 bg-amber-50/20' : 'border-slate-200 bg-slate-50/50'
                      }`}
                    >
                      <div className="bg-blue-800 text-white px-4 py-2 font-extrabold text-sm flex justify-between items-center">
                        <span>{grup.kategori}</span>
                        {grup.highlightPromo && (
                          <span className="bg-amber-400 text-slate-900 text-[10px] px-2 py-0.5 rounded font-extrabold">
                            DISKON MY26
                          </span>
                        )}
                      </div>
                      <div className="divide-y divide-slate-200 p-3">
                        {grup.items.map((item, idx) => (
                          <div key={idx} className="py-2 flex justify-between items-center text-xs">
                            <span className="font-semibold text-slate-700 pr-2">{item.tipe}</span>
                            <div className="text-right whitespace-nowrap">
                              {item.promo ? (
                                <>
                                  <span className="text-[11px] text-slate-400 line-through block">
                                    {item.hargaNormal}
                                  </span>
                                  <span className="font-extrabold text-emerald-700 text-sm">
                                    {item.harga}
                                  </span>
                                </>
                              ) : (
                                <span className="font-bold text-slate-900">{item.harga}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}