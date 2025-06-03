import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL, handleApiError } from '../../config/api';
import { formatDate } from '../../utils/formatDate';

// Menginline fungsi formatTime karena tidak ada file terpisah yang disediakan
// Output akan menjadi "HH:MM" (misal: 09:30)
const formatTime = (isoString) => {
  if (!isoString) return ''; // Mengembalikan string kosong jika input tidak ada
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return '';
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}.${minutes} WIB`; // Menambahkan WIB secara manual agar sesuai screenshot
};

const HistoryPage = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const scansPerPage = 6; // Menampilkan 6 item per halaman sesuai screenshot

  useEffect(() => {
    fetchScans();
  }, []);

  const fetchScans = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('Anda harus login untuk melihat riwayat klasifikasi. Silakan login terlebih dahulu.');
        setLoading(false);
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token otentikasi tidak ditemukan. Silakan login kembali.');
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}/scans/${userId}`, {
        timeout: 10000,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const sortedScans = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setScans(sortedScans);
    } catch (err) {
      console.error("Failed to fetch scans:", err);
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  // Logic untuk paginasi
  const indexOfLastScan = currentPage * scansPerPage;
  const indexOfFirstScan = indexOfLastScan - scansPerPage;
  const currentScans = scans.slice(indexOfFirstScan, indexOfLastScan);
  const totalPages = Math.ceil(scans.length / scansPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Fungsi untuk mendapatkan poin - Disesuaikan agar selalu mengembalikan 5
  const getPointsForClassification = (classification) => {
    return 5; // Setiap klasifikasi bernilai 5 poin
  };

  const getWasteIcon = (classification) => {
    switch (classification) {
      case 'Plastik': return (
        <svg className="w-8 h-8 text-green-700" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 11v-1c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v1H2v10h20V11h-6zm-4 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm-6-8h4v-1c0-.55.45-1 1-1h2c.55 0 1 .45 1 1v1h4v-1c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v1H6z" />
        </svg>
      );
      case 'Kertas': return (
        <svg className="w-8 h-8 text-green-700" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
        </svg>
      );
      case 'Kaca': return (
        <svg className="w-8 h-8 text-green-700" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1 16H4c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1zm-8-7l-4 4V8l4 4zm-4 4h8V8h-8z" />
        </svg>
      );
      case 'Baterai': return (
        <svg className="w-8 h-8 text-green-700" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.34C7 21.4 7.6 22 8.33 22h7.34c.73 0 1.33-.6 1.33-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
        </svg>
      );
      case 'Sampah Organik': return (
        <svg className="w-8 h-8 text-green-700" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /> {/* Placeholder for organic */}
        </svg>
      );
      case 'Kardus': return (
        <svg className="w-8 h-8 text-green-700" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 6h-6V4h-4v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM4 20V8h16l.01 12H4zM6 10h12v2H6zm0 4h12v2H6z"/>
        </svg>
      );
      case 'Pakaian': return (
        <svg className="w-8 h-8 text-green-700" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2V6h-2v4h-2v4h4v4h-2v2h4v-2h2v-4zM2 16h8v-2H2v2z" />
        </svg>
      );
      case 'Sampah Medis': return (
        <svg className="w-8 h-8 text-green-700" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
      );
      case 'Logam': return (
        <svg className="w-8 h-8 text-green-700" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 6V4h-4v2H8v14h8V6h-2zM12 20c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
        </svg>
      );
      case 'Sepatu': return (
        <svg className="w-8 h-8 text-green-700" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21.5 8.9c-.3-.3-.7-.5-1.1-.5H18c-.8 0-1.5.7-1.5 1.5v1.8c0 .2.1.4.3.4s.4-.1.4-.3V10.5c0-.2.2-.4.4-.4h1.5c.6 0 1.1.5 1.1 1.1v2.1c0 .2.1.4.3.4s.4-.1.4-.3V12c.1-.4.2-.8.2-1.2v-.6c0-.8-.7-1.5-1.5-1.5zM20 18H4c-1.1 0-2 .9-2 2v2h18v-2c0-1.1-.9-2-2-2zM15 15V8h-3V5H9c-1.1 0-2 .9-2 2v8c0 1.1-.9 2-2 2H4c-1.1 0-2 .9-2 2v2h15v-4z"/>
        </svg>
      );
      default: return (
        <svg className="w-8 h-8 text-green-700" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1C5.93 1 1 5.93 1 12s4.93 11 11 11 11-4.93 11-11S18.07 1 12 1zm0 20c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z"/>
          <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
        </svg>
      ); // Default/fallback icon
    }
  };


  // Hitung total poin dari semua scan
  const totalPoints = scans.reduce((sum, scan) => sum + getPointsForClassification(scan.classification), 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#2C6B3F]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 mt-24">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
          <button
            onClick={fetchScans}
            className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  const totalScansCount = scans.length;
  const totalActivitiesCount = scans.length;

  return (
    <div className="font-nunito bg-gray-50 text-[#2C6B3F] pt-28 pb-8 px-4 md:px-8 lg:px-12"> {/* Background gray-50 for overall page */}
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-gray-800">Riwayat Aktivitas</h1>
        <p className="text-lg text-gray-600">Lihat riwayat aktivitas daur ulang dan transaksi poin Anda</p>
      </div>

      {/* Filter and Search Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4
                   bg-green-50 border border-green-200 rounded-lg p-4 shadow-sm"> {/* Added green background */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <select
            className="block w-full sm:w-40 p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2C6B3F]/50 bg-white text-gray-700"
            defaultValue="all"
          >
            <option value="all">Semua Waktu</option>
            <option value="today">Hari Ini</option>
            <option value="week">Minggu Ini</option>
            <option value="month">Bulan Ini</option>
            <option value="year">Tahun Ini</option>
          </select>
          <select
            className="block w-full sm:w-40 p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2C6B3F]/50 bg-white text-gray-700"
            defaultValue="all"
          >
            <option value="all">Semua Kategori</option>
            <option value="plastic">Plastik</option>
            <option value="paper">Kertas</option>
          </select>
        </div>
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Cari aktivitas..."
            className="w-full md:w-64 pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2C6B3F]/50 bg-white text-gray-700"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
        </div>
      </div>

      {/* Summary Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 flex items-center">
          <div className="flex items-center gap-4">
            <span className="text-5xl font-extrabold text-[#2C6B3F]">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            </span>
            <div>
              <span className="text-5xl font-extrabold text-[#2C6B3F]">{totalPoints}</span>
              <p className="text-xl font-medium text-gray-500">Total Poin</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 flex items-center">
          <div className="flex items-center gap-4">
            <span className="text-5xl font-extrabold text-[#2C6B3F]">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
            </span>
            <div>
              <span className="text-5xl font-extrabold text-[#2C6B3F]">{totalActivitiesCount}</span>
              <p className="text-xl font-medium text-gray-500">Total Aktivitas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scan History List */}
      {scans.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-200">
          <p className="text-gray-600 text-lg">Belum ada riwayat klasifikasi untuk akun ini.</p>
          <p className="text-gray-500 text-sm mt-2">Silakan lakukan klasifikasi terlebih dahulu untuk melihat riwayat Anda di sini.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {currentScans.map((scan) => (
              <div
                key={scan.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 relative min-h-[120px]"
              >
                <div className="flex items-center gap-4">
                  {getWasteIcon(scan.classification)} {/* Ikon sesuai jenis sampah */}
                  <div>
                    <h3 className="font-bold text-xl capitalize text-gray-800">{scan.classification}</h3>
                    <p className="text-sm text-gray-600">
                        {/* Menggunakan formatDate untuk tanggal, dan formatTime untuk waktu */}
                        {formatDate(scan.timestamp).split('pukul')[0].trim()} • {formatTime(scan.timestamp)}
                    </p>
                  </div>
                  <span className="absolute top-5 right-5 bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded">Selesai</span>
                </div>
                <p className="text-base text-gray-600 mt-2">
                  <span className="font-semibold">Poin:</span> <span className="text-green-600">+{getPointsForClassification(scan.classification)}</span>
                </p>
                <button className="absolute bottom-5 right-5 text-[#2C6B3F] hover:text-[#1F4D2E] text-sm font-semibold flex items-center gap-1">
                  Lihat Gambar <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mb-8">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === index + 1
                      ? 'bg-[#2C6B3F] text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } transition`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* About Recycle Section */}
      <div className="bg-green-50 bg-opacity-70 border border-green-200 rounded-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-5 text-[#2C6B3F]">Tentang Daur Ulang</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cara Mendapatkan Poin */}
          <div>
            <h3 className="font-semibold text-xl mb-3 text-gray-700">Cara Mendapatkan Poin</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Daur ulang plastik</li>
              <li>Daur ulang botol kaca</li>
              <li>Daur ulang kertas</li>
              <li>Daur ulang logam</li>
              <li>Daur ulang organik</li>
            </ul>
          </div>
          {/* Penukaran Poin */}
          <div>
            <h3 className="font-semibold text-xl mb-3 text-gray-700">Penukaran Poin</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>100 poin: Voucher Belanja Rp 10.000</li>
              <li>500 poin: Voucher Belanja Rp 50.000</li>
              <li>1000 poin: Voucher Belanja Rp 100.000</li>
              <li>2500 poin: Voucher Belanja Rp 250.000</li>
              <li>5000 poin: Donasi Penanaman Lingkungan</li>
              <li>Selengkapnya: Dapatkan informasi dari program lingkungan</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;