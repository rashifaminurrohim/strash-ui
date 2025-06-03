const API_URL = 'http://localhost:3005/api';

const handleApiError = error => {
  if (error.response) {
    // Server responded with error status
    switch (error.response.status) {
      case 500:
        throw new Error(
          'Terjadi kesalahan pada server. Silakan coba lagi nanti.'
        );
      case 404:
        throw new Error('Endpoint tidak ditemukan.');
      case 401:
        throw new Error('Anda perlu login terlebih dahulu.');
      default:
        throw new Error(
          'Terjadi kesalahan: ' + error.response.data.message ||
            'Silakan coba lagi.'
        );
    }
  } else if (error.request) {
    // Request was made but no response received
    throw new Error(
      'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.'
    );
  } else {
    // Something happened in setting up the request
    throw new Error('Terjadi kesalahan: ' + error.message);
  }
};

export { API_URL, handleApiError };
