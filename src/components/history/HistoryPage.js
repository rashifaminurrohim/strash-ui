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
        <img
            src="/images/icons/Plastic.svg"
            alt="Sampah Plastik Icon"
            className="w-8 h-8"
        />
      );
      case 'Kertas': return (
        <img
            src="/images/icons/Paper.svg"
            alt="Sampah Kertas Icon"
            className="w-8 h-8"
        />
      );
      case 'Kaca': return (
        <img
            src="/images/icons/Glass.svg"
            alt="Sampah Kaca Icon"
            className="w-8 h-8"
        />
      );
      case 'Baterai': return (
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="38" viewBox="0 0 48 48">
          <path fill="none" stroke="#2C6B3F" stroke-linecap="round" stroke-linejoin="round" d="M20.505 4.5h6.67a1 1 0 0 1 1 1v3h4.63a2 2 0 0 1 2 2v31a2 2 0 0 1-2 2h-17.61a2 2 0 0 1-2-2v-31a2 2 0 0 1 2-2h4.31v-3a1 1 0 0 1 1-1m-1 4h8.67" stroke-width="2" />
          <path fill="none" stroke="#2C6B3F" stroke-linecap="round" stroke-linejoin="round" d="M25.868 17.5L20 26h8l-5.868 8.5" stroke-width="2" />
        </svg>
      );
      case 'Sampah Organik': return (
        <img
            src="/images/icons/Organic.svg"
            alt="Sampah Organik Icon"
            className="w-8 h-8"
        />
      );
      case 'Kardus': return (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16">
          <path fill="#2C6B3F" d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5L8 5.961L14.154 3.5zm3.25 1.7l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z" />
        </svg>
      );
      case 'Pakaian': return (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16">
          <path fill="#2C6B3F" d="M8 3a1 1 0 0 0-.943.667a.5.5 0 0 1-.942-.334a2 2 0 1 1 3.22 2.157l-.041.037c-.22.197-.419.374-.57.566c-.16.198-.223.359-.223.503c0 .219.12.42.313.524L14.16 10a1.596 1.596 0 0 1-.757 3H2.595a1.595 1.595 0 0 1-.755-3l4.423-2.38a.5.5 0 0 1 .474.88l-4.424 2.38A.595.595 0 0 0 2.595 12h10.81a.596.596 0 0 0 .282-1.12L8.34 8a1.6 1.6 0 0 1-.84-1.404c0-.462.212-.839.44-1.126c.208-.261.468-.493.674-.677l.054-.048A1 1 0 0 0 8 3" />
        </svg>
      );
      case 'Sampah Medis': return (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 14 14">
          <path fill="none" stroke="#2C6B3F" stroke-linecap="round" stroke-linejoin="round" d="M7 3L2.42 7.49a2 2 0 0 0 0 2.83l1.26 1.26a2 2 0 0 0 2.83 0L11 7M10.5.5l3 3M9 5l3-3m-8.95 8.95L.5 13.5m5-12l7 7" stroke-width="0.7" />
        </svg>
      );
      case 'Logam': return (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <path fill="#2C6B3F" d="M7.5 11h9.1c.3 0 .5-.3.4-.6l-1-6c0-.2-.3-.4-.5-.4h-7c-.2 0-.5.2-.5.4l-1 6v.1c0 .3.2.5.5.5m1.4-6h6.2l.8 5H8.1zM22 13.4c0-.2-.2-.4-.5-.4h-7c-.2 0-.5.2-.5.4l-1 6v.1c0 .3.2.5.5.5h9.1c.3 0 .5-.3.4-.6zM14.1 19l.8-5h6.2l.8 5zm-4.6-6h-7c-.2 0-.5.2-.5.4l-1 6v.1c0 .3.2.5.5.5h9.1c.3 0 .5-.3.4-.6l-1-6c0-.2-.3-.4-.5-.4m-7.4 6l.8-5h6.2l.8 5z" />
        </svg>
      );
      case 'Sepatu': return (
        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24">
          <g fill="none" stroke="#2C6B3F" stroke-linecap="round" stroke-linejoin="round" stroke-width="1">
            <path d="M4 6h5.426a1 1 0 0 1 .863.496l1.064 1.823a3 3 0 0 0 1.896 1.407l4.677 1.114A4 4 0 0 1 21 14.73V17a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1m10 7l1-2" />
            <path d="M8 18v-1a4 4 0 0 0-4-4H3m7-1l1.5-3" />
          </g>
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
    <div className="font-nunito w-full text-[#2C6B3F] pt-12 pb-8 px-4 md:px-8 lg:px-12"> {/* Background gray-50 for overall page */}
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Riwayat Aktivitas</h1>
        <p className="text-lg ">Lihat riwayat aktivitas daur ulang dan transaksi poin Anda</p>
      </div>

      {/* Filter and Search Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4
                   bg-[#E8F5E9] rounded-lg p-4 shadow-sm"> {/* Added green background */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <select
            className="block w-full sm:w-40 p-2.5 border border-[#2C6B3F] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2C6B3F]/50 bg-white"
            defaultValue="all"
          >
            <option value="all">Semua Waktu</option>
            <option value="today">Hari Ini</option>
            <option value="week">Minggu Ini</option>
            <option value="month">Bulan Ini</option>
            <option value="year">Tahun Ini</option>
          </select>
          <select
            className="block w-full sm:w-40 p-2.5 border border-[#2C6B3F] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2C6B3F]/50 bg-white"
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
            <span
                className="flex items-center justify-center h-16 w-16 rounded-full"
                style={{ background: "#E8F5E9" }}
              >
            <img
                    src="/images/icons/Star-2.svg"
                    alt="Route Icon"
                    className="w-7 h-7"
            />
              </span>
            <div>
              <span className="text-3xl font-extrabold leading-tight">{totalPoints}</span>
              <p className="text-base font-semibold mt-1">Total Poin</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 flex items-center">
          <div className="flex items-center gap-4">
            <span
                className="flex items-center justify-center h-16 w-16 rounded-full"
                style={{ background: "#E8F5E9" }}
                >
              <img
                      src="/images/icons/Task.svg"
                      alt="Route Icon"
                      className="w-7 h-7"
              />
            </span>
            <div>
              <span className="text-3xl font-extrabold leading-tight">{totalActivitiesCount}</span>
              <p className="text-base font-semibold mt-1">Total Aktivitas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scan History List */}
      {scans.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-200 mb-12">
          <p className="text-lg">Belum ada riwayat klasifikasi untuk akun ini.</p>
          <p className="text-sm mt-2 opacity-75">Silakan lakukan klasifikasi terlebih dahulu untuk melihat riwayat Anda di sini.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {currentScans.map((scan) => (
              <article
                key={scan.id}
                className="bg-white border border-gray-200 rounded-xl flex flex-col shadow-sm overflow-hidden"
              >
                <div className="flex flex-row items-start gap-4 p-6 pb-0 flex-1">
                  <span
                    className="flex items-center justify-center h-16 w-16 rounded-lg"
                    style={{ background: "#E8F5E9" }}
                  >
                    {getWasteIcon(scan.classification)} {/* Ikon sesuai jenis sampah */}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-primary font-bold text-lg truncate">
                        {scan.classification}
                      </span>
                      <span className="bg-[#E8F5E9] text-primary text-xs font-bold rounded-lg px-3 py-1 ml-auto">
                        Selesai
                      </span>
                    </div>
                    <div className="text-primary text-sm font-medium opacity-70 mb-2 truncate">
                      {formatDate(scan.timestamp).split('pukul')[0].trim()} • {formatTime(scan.timestamp)}
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src="/images/icons/Star-2.svg"
                        alt="Poin"
                        className="h-5 w-5"
                      />
                      <span className="text-primary font-semibold text-base">
                        {getPointsForClassification(scan.classification)} Poin
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-[#F5F6F7] w-full px-6 py-3 flex justify-end items-center mt-6">
                  <button className="text-primary font-semibold text-sm flex items-center gap-1 hover:font-bold">
                    Lihat Gambar
                    <img
                      src="/images/icons/Arrow-Right-3.svg"
                      alt="Lihat"
                      className="h-3 w-3"
                    />
                  </button>
                </div>
              </article>
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
      <div className="bg-[#E8F5E9] bg-opacity-70 rounded-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-5 text-[#2C6B3F]">Tentang Daur Ulang</h2>
        <p className="text-base mb-6">
            Poin yang Anda peroleh dari aktivitas daur ulang dapat ditukarkan
            dengan berbagai hadiah menarik atau donasi untuk program lingkungan.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cara Mendapatkan Poin */}
          <div className='bg-white rounded-xl border border-[#2C6B3F] p-6 flex flex-col gap-2'>
            <div className="flex items-center gap-3 mb-2">
                <img
                  src="/images/icons/Recycle-3.svg"
                  alt="Poin"
                  className="h-6 w-6"
                />
                <span className="font-bold text-lg">
                  <h3>
                    Cara Mendapatkan Poin
                  </h3>
                </span>
              </div>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Daur ulang plastik</li>
              <li>Daur ulang botol kaca</li>
              <li>Daur ulang kertas</li>
              <li>Daur ulang logam</li>
              <li>Daur ulang organik</li>
            </ul>
          </div>
          {/* Penukaran Poin */}
          <div className='bg-white rounded-xl border border-[#2C6B3F] p-6 flex flex-col gap-2'>
            <div className="flex items-center gap-3 mb-2">
                <img
                  src="/images/icons/Gift.svg"
                  alt="Poin"
                  className="h-6 w-6"
                />
                <span className="font-bold text-lg">
                  <h3>
                    Penukaran Poin
                  </h3>
                </span>
              </div>
            <ul className="list-disc list-inside space-y-2 pl-2">
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