import React from 'react';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { toast } from 'react-toastify';

const PredictionResults = ({ predictions, imageUrl }) => {
  // Fungsi untuk mendapatkan data detail berdasarkan jenis sampah
  const getWasteDetails = (className) => {
    switch (className) {
      case 'Baterai': // battery
        return {
          recommendation: 'Buang di tempat khusus limbah B3 atau daur ulang di fasilitas khusus baterai.',
          environmentalImpact: 'Baterai mengandung bahan kimia berbahaya yang dapat mencemari tanah dan air jika tidak dibuang dengan benar.',
          sortingMethod: 'Jangan campurkan dengan sampah rumah tangga. Kumpulkan dan buang di tempat sampah B3 atau drop-off baterai.',
          tpaLocation: {
            name: 'Pusat Daur Ulang Baterai',
            address: 'Jl. Kimia Industri No. 50',
            distance: '7.0 km dari lokasi Anda',
          },
          pointsEarned: 10,
        };
      case 'Sampah Organik': // biological
        return {
          recommendation: 'Komposkan di rumah atau buang di tempat sampah organik.',
          environmentalImpact: 'Sampah organik yang membusuk di TPA menghasilkan gas metana, gas rumah kaca yang kuat. Pengomposan mengurangi emisi ini.',
          sortingMethod: 'Pisahkan sisa makanan, daun, dan ranting. Hindari bahan anorganik.',
          tpaLocation: {
            name: 'Pusat Pengomposan Hijau Mandiri',
            address: 'Jl. Agrikultura No. 10',
            distance: '4.5 km dari lokasi Anda',
          },
          pointsEarned: 5,
        };
      case 'Kardus': // cardboard
        return {
          recommendation: 'Daur ulang di fasilitas daur ulang kertas/kardus.',
          environmentalImpact: 'Daur ulang kardus menghemat energi, air, dan mengurangi penebangan pohon.',
          sortingMethod: 'Pastikan kardus bersih dan kering. Lipat atau pipihkan untuk menghemat ruang.',
          tpaLocation: {
            name: 'Sentra Daur Ulang Kertas & Kardus',
            address: 'Jl. Industri Daur Ulang No. 20',
            distance: '3.8 km dari lokasi Anda',
          },
          pointsEarned: 2,
        };
      case 'Pakaian': // clothes
        return {
          recommendation: 'Donasikan ke organisasi amal, daur ulang tekstil, atau olah menjadi kain lap.',
          environmentalImpact: 'Industri pakaian memiliki dampak lingkungan yang besar. Donasi dan daur ulang mengurangi limbah tekstil.',
          sortingMethod: 'Pisahkan pakaian yang masih layak pakai untuk donasi. Pakaian rusak bisa didaur ulang menjadi bahan lain.',
          tpaLocation: {
            name: 'Bank Pakaian Harapan',
            address: 'Jl. Donasi Kebaikan No. 30',
            distance: '6.2 km dari lokasi Anda',
          },
          pointsEarned: 4,
        };
      case 'Kaca': // glass
        return {
          recommendation: 'Daur ulang di tempat penampungan kaca.',
          environmentalImpact: 'Kaca membutuhkan waktu jutaan tahun untuk terurai. Daur ulang menghemat energi dan mengurangi kebutuhan bahan baku baru.',
          sortingMethod: 'Pisahkan botol dan wadah kaca berdasarkan warna (bening, hijau, coklat). Pastikan bersih dari sisa makanan.',
          tpaLocation: {
            name: 'Sentra Daur Ulang Kaca Sejahtera',
            address: 'Jl. Kaca Bersih No. 78',
            distance: '1.8 km dari lokasi Anda',
          },
          pointsEarned: 4,
        };
      case 'Sampah Medis': // medical
        return {
          recommendation: 'Buang di tempat khusus limbah medis. Jangan campurkan dengan sampah rumah tangga.',
          environmentalImpact: 'Limbah medis mengandung risiko infeksi dan bahan berbahaya. Pembuangan yang tidak tepat dapat menyebabkan penyebaran penyakit.',
          sortingMethod: 'Gunakan wadah khusus anti-tusuk untuk jarum dan benda tajam. Konsultasikan dengan fasilitas kesehatan setempat untuk pembuangan yang benar.',
          tpaLocation: {
            name: 'Fasilitas Pengolahan Limbah Medis',
            address: 'Jl. Kesehatan Bersama No. 5',
            distance: '9.5 km dari lokasi Anda',
          },
          pointsEarned: 15,
        };
      case 'Logam': // metal
        return {
          recommendation: 'Daur ulang di fasilitas daur ulang logam.',
          environmentalImpact: 'Daur ulang logam menghemat energi yang signifikan dibandingkan produksi dari bahan baku baru, serta mengurangi polusi.',
          sortingMethod: 'Pisahkan kaleng minuman, kaleng makanan, dan benda logam lainnya. Pastikan bersih dan kering.',
          tpaLocation: {
            name: 'Gudang Daur Ulang Logam Baja',
            address: 'Jl. Logam Jaya No. 15',
            distance: '4.1 km dari lokasi Anda',
          },
          pointsEarned: 3,
        };
      case 'Kertas': // paper
        return {
          recommendation: 'Daur ulang kertas di fasilitas daur ulang terdekat.',
          environmentalImpact: 'Produksi kertas membutuhkan banyak pohon dan air. Daur ulang kertas mengurangi penebangan hutan dan polusi air.',
          sortingMethod: 'Pisahkan kertas bersih dan kering. Hindari kertas yang berminyak atau dilapisi plastik.',
          tpaLocation: {
            name: 'Pusat Daur Ulang Kertas Jaya',
            address: 'Jl. Pemilahan No. 45',
            distance: '3.1 km dari lokasi Anda',
          },
          pointsEarned: 2,
        };
      case 'Plastik': // plastic
        return {
          recommendation: 'Daur ulang di tempat pembuangan khusus plastik.',
          environmentalImpact: 'Sampah plastik membutuhkan waktu hingga 450 tahun untuk terurai di alam. Dengan mendaur ulang, Anda membantu mengurangi polusi tanah dan air.',
          sortingMethod: 'Pisahkan plastik dari sampah lain dan pastikan plastik bersih serta kering sebelum didaur ulang.',
          tpaLocation: {
            name: 'Bank Sampah Berseri',
            address: 'Jl. Raya Pembuangan No. 123',
            distance: '2.5 km dari lokasi Anda',
          },
          pointsEarned: 3,
        };
      case 'Sepatu': // shoes
        return {
          recommendation: 'Donasikan jika masih layak pakai, atau daur ulang di fasilitas khusus sepatu/karet.',
          environmentalImpact: 'Sepatu sulit terurai dan seringkali mengandung berbagai bahan. Daur ulang dapat mengurangi limbah tekstil dan karet.',
          sortingMethod: 'Pastikan sepatu bersih. Jika masih layak, donasikan. Jika tidak, cari fasilitas daur ulang khusus.',
          tpaLocation: {
            name: 'Pusat Daur Ulang Tekstil & Karet',
            address: 'Jl. Solusi Limbah No. 8',
            distance: '5.5 km dari lokasi Anda',
          },
          pointsEarned: 6,
        };
      default: // Fallback for unknown categories
        return {
          recommendation: 'Daur ulang sesuai kategori sampah umum atau buang pada tempatnya.',
          environmentalImpact: 'Dampak lingkungan bervariasi. Pengelolaan yang tepat sangat penting untuk mengurangi polusi.',
          sortingMethod: 'Lakukan pemilahan sesuai panduan umum atau buang pada tempat sampah kategori yang sesuai.',
          tpaLocation: {
            name: 'TPA Umum Maju Bersama',
            address: 'Jl. Lingkungan Hijau No. 10',
            distance: '5.0 km dari lokasi Anda',
          },
          pointsEarned: 1,
        };
    }
  };

  if (!predictions || predictions.length === 0) {
    return (
      <div className="relative w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-gray-400">
          <svg className="w-20 h-20 mb-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          <p className="text-center text-gray-500">Belum ada hasil pemindaian</p>
          <p className="text-center text-gray-400 text-sm mt-1">Tekan tombol "Scan Sampah" untuk mulai memindai</p>
        </div>
      </div>
    );
  }

  const topPrediction = predictions[0]; // Asumsi selalu ada prediksi teratas
  const details = getWasteDetails(topPrediction.className);

  return (
    <div className="flex flex-col gap-4 h-full"> {/* Parent div for sections */}
      {/* Hasil Pemindaian Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Hasil Pemindaian</h3>
        <div className="grid grid-cols-2 gap-y-2 text-gray-600">
          <span className="font-medium">Jenis Sampah:</span>
          <span className="font-semibold text-right text-gray-800">{topPrediction.className}</span>

          <span className="font-medium">Akurasi:</span>
          <div className="flex items-center justify-end gap-2">
            <span className="text-green-600 font-semibold">
              {(topPrediction.probability * 100).toFixed(0)}%
            </span>
            <div className="w-24 bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: `${topPrediction.probability * 100}%` }}
              ></div>
            </div>
          </div>

          <span className="font-medium">Poin:</span>
          <span className="font-semibold text-right text-green-600">+{details.pointsEarned}</span>
        </div>
      </div>

      {/* Rekomendasi Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Rekomendasi:</h3>
        <p className="text-gray-600">
          {details.recommendation}
        </p>
      </div>

      {/* Dampak Lingkungan Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Dampak Lingkungan</h3>
        <p className="text-gray-600">
          {details.environmentalImpact}
        </p>
      </div>

      {/* Cara Pemilahan Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Cara Pemilahan</h3>
        <p className="text-gray-600 mb-4">
          {details.sortingMethod}
        </p>
        <button className="w-full bg-[#2C6B3F] hover:bg-[#1F4D2E] text-white font-bold py-3 px-4 rounded-lg transition">
          Lihat Selengkapnya
        </button>
      </div>

      {/* Lokasi TPA Terdekat Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Lokasi TPA Terdekat:</h3>
        <div className="flex justify-between items-center text-gray-600">
          <div>
            <p className="font-semibold">{details.tpaLocation.name}</p>
            <p className="text-sm">{details.tpaLocation.address}</p>
            <p className="text-sm text-gray-500">{details.tpaLocation.distance}</p>
          </div>
          <button className="bg-[#2C6B3F] hover:bg-[#1F4D2E] text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition">
            Arah
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2c-.55 0-1 .45-1 1v7c0 .55.45 1 1 1s1-.45 1-1V3c0-.55-.45-1-1-1zm6 17v-2c0-2.76-2.24-5-5-5s-5 2.24-5 5v2h16v-2c0-2.66-5.33-4-8-4zm-5 0c-.55 0-1-.45-1-1v-1c0-.55-.45-1-1-1s-1 .45-1 1v1c0 .55-.45 1-1 1h4zm0-14c-3.87 0-7 3.13-7 7s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PredictionResults;