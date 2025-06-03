import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebase'; // Import auth
import { signOut } from 'firebase/auth'; // Import signOut
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError('');
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          setError('User belum login');
          setLoading(false);
          return;
        }
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          setError('Data user tidak ditemukan');
        }
      } catch (err) {
        setError('Gagal mengambil data user');
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('userId'); // Clear userId from local storage
      navigate('/login'); // Redirect to login page after logout
    } catch (err) {
      console.error('Error during logout:', err);
      setError('Gagal logout. Silakan coba lagi.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-red-50 text-red-600 rounded-lg shadow mx-4">
        {error}
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  const getInitials = name => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0]?.toUpperCase())
      .join('')
      .slice(0, 2);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-700 p-6 text-white">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-white text-green-600 text-2xl font-bold">
              {getInitials(userData.name)}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{userData.name || 'User'}</h2>
              <p className="opacity-90">{userData.email}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Statistik
          </h3>

          {/* Stats cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <div className="text-3xl font-bold text-green-600">
                {userData.points || 0}
              </div>
              <div className="text-sm text-green-700">Total Poin</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="text-3xl font-bold text-blue-600">
                {userData.scanCount || 0}
              </div>
              <div className="text-sm text-blue-700">Total Klasifikasi</div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3 border-t pt-4 border-gray-100">
            <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
              <span className="text-gray-600">Status Akun</span>
              <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-sm font-medium">
                Aktif
              </span>
            </div>
            <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
              <span className="text-gray-600">Terakhir Aktif</span>
              <span className="text-gray-800">
                {new Date().toLocaleDateString('id-ID')}
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-8">
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
