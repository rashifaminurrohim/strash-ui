import React, { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import axios from 'axios';
import { toast } from 'react-toastify';
import CameraView from './CameraView';
import ImageUpload from './ImageUpload';
import PredictionResults from './PredictionResults';
import { API_URL, handleApiError } from '../../config/api'; // Pastikan path ini benar

const WASTE_CATEGORIES = {
  battery: 'Baterai',
  biological: 'Sampah Organik',
  cardboard: 'Kardus',
  clothes: 'Pakaian',
  glass: 'Kaca',
  medical: 'Sampah Medis',
  metal: 'Logam',
  paper: 'Kertas',
  plastic: 'Plastik',
  shoes: 'Sepatu',
};

const WasteClassifier = () => {
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [capturedImageSrc, setCapturedImageSrc] = useState(null);

  const cameraRef = useRef(null);
  const fileUploadRef = useRef(null);

  // Efek untuk memuat model AI saat komponen dipasang
  useEffect(() => {
    console.log('WasteClassifier: Component mounted, loading model...');
    loadModel();

    // Fungsi cleanup saat komponen dilepas
    return () => {
      console.log(
        'WasteClassifier: Component unmounting, disposing model and stopping camera...'
      );
      if (model) {
        model.dispose();
      }
      if (cameraRef.current) {
        cameraRef.current.stop(); // Pastikan kamera berhenti saat komponen dilepas
      }
    };
  }, []); // Dependensi kosong agar hanya berjalan sekali saat mount/unmount

  // Efek untuk memulai kamera saat komponen dipasang atau jika capturedImageSrc direset menjadi null
  useEffect(() => {
    // Hanya mulai kamera jika tidak ada gambar yang ditangkap dan komponen sudah dimuat
    if (!capturedImageSrc && cameraRef.current) {
      console.log('WasteClassifier: Starting camera due to no captured image.');
      cameraRef.current.start();
    } else if (capturedImageSrc) {
      // Jika ada gambar, pastikan kamera berhenti (misalnya setelah capture)
      if (cameraRef.current) {
        console.log('WasteClassifier: Captured image exists, stopping camera.');
        cameraRef.current.stop();
      }
    }
  }, [capturedImageSrc]); // Bergantung pada capturedImageSrc

  const loadModel = async () => {
    try {
      setIsLoading(true);
      setError(null);

      await tf.setBackend('cpu');
      await tf.ready();

      const loadedModel = await tf.loadGraphModel('/model_tfjs/model.json');
      setModel(loadedModel);
      toast.success('Model AI berhasil dimuat!', { autoClose: 1500 });
      console.log('Model AI loaded successfully.');
    } catch (err) {
      console.error('Error loading model:', err);
      setError(
        'Gagal memuat model. Silakan refresh halaman atau coba lagi nanti.'
      );
      toast.error('Gagal memuat model AI.');
    } finally {
      setIsLoading(false);
    }
  };

  const translateCategory = className => {
    return WASTE_CATEGORIES[className] || className;
  };

  const preprocessImage = async imageElement => {
    const tensor = tf.browser
      .fromPixels(imageElement)
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .expandDims();
    const normalized = tensor.div(255.0);
    return normalized;
  };

  const saveClassification = async (classification, confidence) => {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      if (!userId || !token) {
        console.log('User belum login, hasil klasifikasi tidak disimpan');
        return;
      }

      const response = await axios.post(
        `${API_URL}/scans`,
        {
          userId,
          classification,
          confidence,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.pointsAdded) {
        toast.success(
          `Anda mendapatkan ${response.data.pointsAdded} poin! 🎉`,
          {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'colored',
          }
        );
      }
    } catch (err) {
      console.error('Gagal menyimpan hasil klasifikasi:', err);
    }
  };

  const classifyImage = async imageElement => {
    try {
      setIsLoading(true);
      setError(null);
      setPredictions([]);
      setCapturedImageSrc(imageElement.src); // Simpan src gambar untuk ditampilkan

      if (!model) {
        throw new Error(
          'Model AI belum dimuat. Mohon tunggu atau refresh halaman.'
        );
      }

      const preprocessedImage = await preprocessImage(imageElement);
      const predictionsTensor = await model.executeAsync(preprocessedImage);
      const predictionData = await predictionsTensor.data();

      predictionsTensor.dispose();

      const classNames = [
        'battery',
        'biological',
        'cardboard',
        'clothes',
        'glass',
        'medical',
        'metal',
        'paper',
        'plastic',
        'shoes',
      ];

      const results = classNames
        .map((name, index) => ({
          className: translateCategory(name),
          probability: predictionData[index],
        }))
        .sort((a, b) => b.probability - a.probability);

      setPredictions(results);

      preprocessedImage.dispose();

      if (results.length > 0) {
        await saveClassification(results[0].className, results[0].probability);
      }
    } catch (err) {
      if (err.response) {
        setError(handleApiError(err));
      } else {
        setError(
          err.message || 'Terjadi kesalahan saat mengklasifikasikan gambar.'
        );
      }
      console.error(err);
      toast.error('Gagal mengklasifikasikan sampah. Coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleScanClick = () => {
    if (cameraRef.current) {
      console.log('WasteClassifier: Triggering camera capture.');
      cameraRef.current.capture();
    } else {
      setError('Kamera tidak aktif atau tidak tersedia untuk memindai.');
      toast.error('Kamera tidak aktif. Harap buka kamera terlebih dahulu.');
    }
  };

  const handleGalleryClick = () => {
    if (fileUploadRef.current) {
      console.log('WasteClassifier: Triggering file select from gallery.');
      fileUploadRef.current.triggerFileSelect();
      // Hentikan kamera jika aktif saat membuka galeri
      if (cameraRef.current) {
        console.log('WasteClassifier: Stopping camera for gallery upload.');
        cameraRef.current.stop();
      }
      setCapturedImageSrc(null); // Hapus gambar yang ditampilkan saat membuka galeri
      setPredictions([]); // Hapus prediksi sebelumnya
    }
  };

  const handleFlashToggle = () => {
    toast.info(
      'Fitur flash belum tersedia atau tidak didukung di browser ini.'
    );
  };

  return (
    <div className="container mx-auto p-4 md:p-8 lg:p-12 min-h-screen bg-white text-[#2C6B3F] font-nunito flex flex-col">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        Klasifikasi Sampah
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 flex-grow">
        <div className="flex-1 flex flex-col items-center gap-4">
          <div className="w-full relative flex-grow min-h-[300px] lg:min-h-[400px]">
            {capturedImageSrc ? (
              <div className="relative w-full h-full bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src={capturedImageSrc}
                  alt="Gambar Hasil Pindai"
                  className="w-full h-full object-contain"
                />
                {/* Tombol untuk menghapus gambar dan kembali ke kamera */}
                <button
                  onClick={() => {
                    setCapturedImageSrc(null);
                    setPredictions([]);
                    if (cameraRef.current) {
                      cameraRef.current.start(); // Mulai kembali kamera
                    }
                  }}
                  className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition"
                  title="Hapus gambar dan kembali ke kamera"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                </button>
              </div>
            ) : (
              <CameraView ref={cameraRef} onCapture={classifyImage} />
            )}
            <div className="absolute top-4 left-4 bg-yellow-400 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Siap
            </div>
          </div>

          <div className="w-full flex justify-center gap-4 mt-4">
            <button
              onClick={handleFlashToggle}
              className="flex-1 max-w-[150px] bg-[#2C6B3F] hover:bg-[#1F4D2E] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 2v11h3v9l7-12h-4l4-8z" />
              </svg>
              Flash
            </button>
            <button
              onClick={handleScanClick}
              className="flex-1 max-w-[150px] bg-[#2C6B3F] hover:bg-[#1F4D2E] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              Scan Sampah
            </button>
            <button
              onClick={handleGalleryClick}
              className="flex-1 max-w-[150px] bg-[#2C6B3F] hover:bg-[#1F4D2E] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 5h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
              </svg>
              Galeri
            </button>
          </div>

          <div className="bg-green-100 border border-green-300 text-green-800 p-4 rounded-xl w-full mt-4">
            <h3 className="font-semibold text-lg mb-2">Tips Pemindaian:</h3>
            <ul className="list-none space-y-2">
              <li className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Pastikan sampah berada dalam kotak pemindaian
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Hindari cahaya yang terlalu terang atau terlalu gelap
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Tahan kamera dengan stabil selama pemindaian
              </li>
            </ul>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700">
            Hasil Pemindaian
          </h2>
          <div className="flex-grow">
            <PredictionResults
              predictions={predictions}
              imageUrl={capturedImageSrc}
            />
          </div>
        </div>
      </div>

      <ImageUpload ref={fileUploadRef} onUpload={classifyImage} />

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2C6B3F] mb-4"></div>
            <p className="text-lg text-[#2C6B3F] font-semibold">
              Memindai sampah...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WasteClassifier;
