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
          pointsEarned: 5,
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
          pointsEarned: 5,
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
          pointsEarned: 5,
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
          pointsEarned: 5,
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
          pointsEarned: 5,
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
          pointsEarned: 5,
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
          pointsEarned: 5,
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
          pointsEarned: 5,
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
          pointsEarned: 5,
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
          pointsEarned: 5,
        };
    }
  };

  if (!predictions || predictions.length === 0) {
    return (
      <div className="relative w-full h-full  rounded-lg flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-gray-400">
          <img
              src="/images/icons/Camera.svg"
              alt="Camera Icon"
              className="w-16 h-16 mb-4 opacity-50"
            />
          <p className="text-sm font-semibold">Belum ada hasil pemindaian</p>
          <p className="text-xs text-gray-600 mt-1">Tekan tombol "Scan Sampah" untuk mulai memindai</p>
        </div>
      </div>
    );
  }

  const topPrediction = predictions[0]; // Asumsi selalu ada prediksi teratas
  const details = getWasteDetails(topPrediction.className);

  return (
    <div className="flex flex-col gap-4 h-full text-[#2C6B3F]"> {/* Parent div for sections */}
      {/* Hasil Pemindaian Section */}
      <div className="bg-[#E8F5E9] rounded-lg p-4 shadow-sm">
        <h3 className="text-xl font-semibold mb-3 ">Hasil Pemindaian</h3>
        <div className="grid grid-cols-2 gap-y-2 ">
          <span className="font-medium">Jenis Sampah:</span>
          <span className="font-semibold text-right">{topPrediction.className}</span>

          <span className="font-medium">Akurasi:</span>
          <div className="flex items-center justify-end gap-2">
            <span className="font-semibold">
              {(topPrediction.probability * 100).toFixed(0)}%
            </span>
            <div className="w-24 bg-white rounded-full h-2.5">
              <div
                className="bg-[#2C6B3F] h-2.5 rounded-full"
                style={{ width: `${topPrediction.probability * 100}%` }}
              ></div>
            </div>
          </div>

          <span className="font-medium">Poin:</span>
          <span className="font-semibold text-right text-[#2C6B3F]">+{details.pointsEarned}</span>

        </div>
          <hr className='my-3'/>
        <h3 className="text-xl font-semibold mb-3">Rekomendasi:</h3>
        <p>
          {details.recommendation}
        </p>
      </div>

      {/* Dampak Lingkungan Section */}
      <div className="bg-[#E8F5E9] rounded-lg p-4 shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold mb-3 ">Dampak Lingkungan</h3>
        <p>
          {details.environmentalImpact}
        </p>
      </div>

      {/* Cara Pemilahan Section */}
      <div className="bg-[#E8F5E9] rounded-lg p-4 shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold mb-3">Cara Pemilahan</h3>
        <p className="mb-4">
          {details.sortingMethod}
        </p>
        <button className="bg-[#2C6B3F] mt-2 text-white text-sm font-semibold py-2 px-4 rounded-lg w-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition">
          Lihat Selengkapnya
        </button>
      </div>

      {/* Lokasi TPA Terdekat Section */}
      <div className="bg-[#E8F5E9] rounded-lg p-4 shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold mb-3 ">Lokasi TPA Terdekat:</h3>
        <div className="flex justify-between items-center ">
          <div>
            <p className="font-semibold">{details.tpaLocation.name}</p>
            <p className="text-sm">{details.tpaLocation.address}</p>
            <p className="text-sm ">{details.tpaLocation.distance}</p>
          </div>
          <button className="bg-[#2C6B3F] text-white text-sm font-semibold flex items-center justify-center self-end gap-1 px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition">
            Arah{" "}
            <img
              src="/images/icons/Route-2.svg"
              alt="Route Icon"
              className="w-4 h-4"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PredictionResults;