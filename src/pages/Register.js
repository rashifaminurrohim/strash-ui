import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Password tidak cocok');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const userDocRef = doc(db, 'users', userCredential.user.uid);
      const userData = {
        email: formData.email,
        name: formData.name,
        scanCount: 0,
        points: 0,
        createdAt: new Date().toISOString(),
        uid: userCredential.user.uid
      };
      await setDoc(userDocRef, userData, { merge: true });
      await auth.signOut();
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-white font-nunito pb-12 px-4 md:pb-24 md:px-8 text-[#2C6B3F]">
      {/* Logo & Heading */}
      <header className="flex flex-col items-center mt-8 z-50">
        <img
          src="/images/logo/Logo_Icon.png"
          alt="Strash Icon"
          className="h-16 w-16 md:h-20 md:w-20 mb-4"
        />
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-primary mb-2 text-center">
          Buat Akun Baru
        </h1>
        <p className="font-medium text-primary text-sm md:text-base text-center max-w-md mb-2">
          Bergabunglah bersama kami untuk dunia yang lebih bersih.
        </p>
      </header>

      <form className="w-full max-w-md bg-white rounded-2xl shadow-lg px-4 py-6 md:px-8 md:py-10 mb-6" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
          {/* Nama Lengkap */}
          <section className="mb-5">
            <label htmlFor="name" className="block font-semibold mb-2 text-sm md:text-base">
              Nama Lengkap
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2C6B3F]">
                <img src="/images/icons/Avatar.svg" alt="User" className="h-5 w-5" />
              </span>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2C6B3F] focus:border-[#2C6B3F] outline-none transition font-bold text-sm md:text-base placeholder:font-medium"
                placeholder="Nama Lengkap"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </section>

          {/* Email */}
          <section className="mb-5">
            <label htmlFor="email" className="block font-semibold mb-2 text-sm md:text-base">
              Alamat Email
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2C6B3F]">
                <img src="/images/icons/Email.svg" alt="Email" className="h-5 w-5" />
              </span>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                required
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2C6B3F] focus:border-[#2C6B3F] outline-none transition font-bold text-sm md:text-base placeholder:font-medium"
                placeholder="contoh@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </section>

          {/* Password */}
          <section className="mb-5">
            <label htmlFor="password" className="block font-semibold mb-2 text-sm md:text-base">
              Kata Sandi
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2C6B3F]">
                <img src="/images/icons/Password.svg" alt="Password" className="h-5 w-5" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full pl-11 pr-10 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2C6B3F] focus:border-[#2C6B3F] outline-none transition font-bold text-sm md:text-base placeholder:font-medium"
                placeholder="***********"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
              >
                <img
                  src={showPassword ? "/images/icons/Password-Open.svg" : "/images/icons/Password-Hide.svg"}
                  alt={showPassword ? "Tutup Sandi" : "Lihat Sandi"}
                  className="h-5 w-5"
                />
              </button>
            </div>
          </section>

          {/* Konfirmasi Password */}
          <section className="mb-8">
            <label htmlFor="confirm-password" className="block font-semibold mb-2 text-sm md:text-base">
              Konfirmasi Kata Sandi
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                <img src="/images/icons/Password.svg" alt="Password" className="h-5 w-5" />
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                autoComplete="new-password"
                required
                className="w-full pl-11 pr-10 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2C6B3F] focus:border-[#2C6B3F] outline-none transition font-bold text-sm md:text-base placeholder:font-medium"
                placeholder="***********"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none"
                onClick={() => setShowConfirmPassword((v) => !v)}
                tabIndex={-1}
              >
                <img
                  src={showConfirmPassword ? "/images/icons/Password-Open.svg" : "/images/icons/Password-Hide.svg"}
                  alt={showConfirmPassword ? "Tutup Sandi" : "Lihat Sandi"}
                  className="h-5 w-5"
                />
              </button>
            </div>
          </section>
        
        {/* Button Daftar */}
        <button
          type="submit"
          disabled={loading}
          className="w-full relative flex items-center bg-[#2C6B3F] text-white py-4 md:py-5 rounded-lg font-bold text-base md:text-lg shadow hover:bg-green-800 transition mb-6"
        >
          <span className="flex items-center justify-center w-12 z-10">
            <img src="/images/icons/Enter.svg" alt="Daftar" className="w-5 h-5" />
          </span>
          <span className="absolute left-0 top-0 w-full h-full flex items-center justify-center font-semibold">
            {loading ? 'Memproses...' : 'Daftar'}
          </span>
        </button>

        {/* Divider */}
        <section className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="mx-4 text-gray-500 font-medium text-sm md:text-base">Atau lanjutkan dengan</span>
          <div className="flex-1 h-px bg-gray-300" />
        </section>
        {/* Social Buttons */}
        <nav className="flex flex-col gap-3 md:flex-row md:gap-4 mb-2">
          <button className="flex-1 border-2 border-[#2C6B3F] rounded-lg py-3 flex items-center justify-center hover:bg-[#2C6B3F]/10 transition" onClick={e => e.preventDefault()}>
            <img src="/images/icons/Google.svg" alt="Google" className="h-4 w-4" />
          </button>
          <button className="flex-1 border-2 border-[#2C6B3F] rounded-lg py-3 flex items-center justify-center hover:bg-[#2C6B3F]/10 transition" onClick={e => e.preventDefault()}>
            <img src="/images/icons/Facebook.svg" alt="Facebook" className="h-4 w-4" />
          </button>
          <button className="flex-1 border-2 border-[#2C6B3F] rounded-lg py-3 flex items-center justify-center hover:bg-[#2C6B3F]/10 transition" onClick={e => e.preventDefault()}>
            <img src="/images/icons/iCloud.svg" alt="Apple" className="h-4 w-4" />
          </button>
        </nav>
      </form>

      <p className="mt-2 text-center text-primary font-medium text-sm md:text-base">
        Sudah punya akun?{' '}
        <Link to="/login" className="font-bold hover:font-extrabold">
          Masuk di sini
        </Link>
      </p>

      {/* Fitur bawah */}
      <footer className="flex flex-col md:flex-row flex-wrap justify-center gap-4 md:gap-8 mt-8 text-primary text-xs md:text-sm font-medium">
        <section className="flex items-center gap-2 justify-center">
          <img src="/images/icons/Shield.svg" alt="Login Aman" className="h-5 w-5" />
          Login Aman
        </section>
        <section className="flex items-center gap-2 justify-center">
          <img src="/images/icons/Lock.svg" alt="Privasi Terlindungi" className="h-5 w-5" />
          Privasi Terlindungi
        </section>
        <section className="flex items-center gap-2 justify-center">
          <img src="/images/icons/Headphone-CS.svg" alt="Dukungan 24/7" className="h-5 w-5" />
          Dukungan 24/7
        </section>
      </footer>
    </section>
  );
};

export default Register; 