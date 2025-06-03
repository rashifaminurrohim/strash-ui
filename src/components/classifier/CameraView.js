import React, {
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';

const CameraView = forwardRef(({ onCapture }, ref) => {
  const videoRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState('');

  // Mengekspos fungsi ke komponen induk melalui ref
  useImperativeHandle(ref, () => ({
    start: startCamera,
    capture: captureImage,
    stop: stopCamera,
  }));

  // Efek cleanup untuk menghentikan stream kamera saat komponen dilepas
  useEffect(() => {
    return () => {
      console.log(
        'CameraView: Cleanup effect - stopping camera stream on unmount.'
      );
      stopCamera();
    };
  }, []);

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
      console.log('CameraView: Camera stream stopped.');
    }
  };

  const startCamera = async () => {
    setError('');
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError('Browser Anda tidak mendukung akses kamera.');
        console.error('CameraView: Browser does not support camera access.');
        return;
      }
      if (videoRef.current && videoRef.current.srcObject) {
        stopCamera(); // Hentikan stream yang ada sebelum memulai yang baru
      }

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setCameraActive(true);
      console.log('CameraView: Camera stream started successfully.');
    } catch (err) {
      setError('Gagal mengakses kamera: ' + err.message);
      setCameraActive(false);
      console.error('CameraView: Camera access error:', err);
    }
  };

  const captureImage = () => {
    if (!cameraActive || !videoRef.current) {
      setError('Kamera tidak aktif untuk mengambil gambar.');
      console.warn(
        'CameraView: Attempted to capture image but camera is not active.'
      );
      return;
    }
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const img = new Image();
    img.onload = () => {
      onCapture(img); // Teruskan objek Image ke parent
      console.log('CameraView: Image captured and passed to parent.');
    };
    img.src = canvas.toDataURL('image/jpeg'); // Dapatkan data URL
  };

  return (
    <div className="relative w-full h-full bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
      {error && (
        <div className="absolute inset-0 flex items-center justify-center p-4 text-center text-red-700 bg-red-100 bg-opacity-80 rounded-lg z-10">
          {error}
        </div>
      )}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`w-full h-full object-cover ${cameraActive ? '' : 'hidden'}`}
      />
      {!cameraActive && !error && (
        <div className="flex flex-col items-center justify-center text-gray-400">
          <svg
            className="w-20 h-20 mb-2"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <p>Kamera tidak tersedia</p>
        </div>
      )}
    </div>
  );
});

export default CameraView;
