import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import Swal from 'sweetalert2';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Check auth state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
      setUserName(localStorage.getItem('userName') || '');
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleMenuClick = () => {
    setIsMenuOpen(true);
    Swal.fire({
      title: "Menu Navigasi",
      html: `
        <nav class="flex flex-col gap-4 text-center" role="navigation" aria-label="Menu Utama">
          <a href="/" class="text-[#2C6B3F] text-lg font-semibold hover:font-extrabold transition py-2 ${location.pathname === "/" ? "font-extrabold" : ""}" aria-current="${location.pathname === "/" ? "page" : "false"}">Beranda</a>
          <a href="/classify" class="text-[#2C6B3F] text-lg font-semibold hover:font-extrabold transition py-2 ${location.pathname === "/classify" ? "font-extrabold" : ""}" aria-current="${location.pathname === "/classify" ? "page" : "false"}">Klasifikasi</a>
          <a href="/history" class="text-[#2C6B3F] text-lg font-semibold hover:font-extrabold transition py-2 ${location.pathname === "/history" ? "font-extrabold" : ""}" aria-current="${location.pathname === "/history" ? "page" : "false"}">Riwayat</a>
          <a href="/education" class="text-[#2C6B3F] text-lg font-semibold hover:font-extrabold transition py-2 ${location.pathname === "/education" ? "font-extrabold" : ""}" aria-current="${location.pathname === "/education" ? "page" : "false"}">Edukasi</a>
          <a href="/leaderboard" class="text-[#2C6B3F] text-lg font-semibold hover:font-extrabold transition py-2 ${location.pathname === "/leaderboard" ? "font-extrabold" : ""}" aria-current="${location.pathname === "/leaderboard" ? "page" : "false"}">Peringkat</a>
          ${isAuthenticated ? `
            <a href="/profile" class="text-[#2C6B3F] text-lg font-semibold hover:font-extrabold transition py-2 ${location.pathname === "/profile" ? "font-extrabold" : ""}" aria-current="${location.pathname === "/profile" ? "page" : "false"}">Profil</a>
          ` : `
            <a href="/login" class="text-[#2C6B3F] text-lg font-semibold hover:font-extrabold transition py-2 ${location.pathname === "/login" ? "font-extrabold" : ""}" aria-current="${location.pathname === "/login" ? "page" : "false"}">Masuk</a>
            <a href="/register" class="text-[#2C6B3F] text-lg font-semibold hover:font-extrabold transition py-2 ${location.pathname === "/register" ? "font-extrabold" : ""}" aria-current="${location.pathname === "/register" ? "page" : "false"}">Daftar</a>
          `}
        </nav>
        <button id="logout-btn" onclick="document.getElementById('logout-btn').click()" style="display: none;"></button>
      `,
      showConfirmButton: false,
      showCloseButton: true,
      customClass: {
        popup: "rounded-3xl",
        closeButton: "text-[#2C6B3F] hover:text-green-800",
        title: "text-[#2C6B3F] font-bold text-2xl",
        htmlContainer: "mt-4",
      },
      background: "#ffffff",
      width: "90%",
      padding: "2rem",
      position: "top",
      backdrop: `
        rgba(0,0,0,0.4)
      `,
      didClose: () => setIsMenuOpen(false)
    });
  };

  return (
    <header className="w-full bg-white fixed top-0 left-0 z-50 font-nunito"> {/* shadow-md dihilangkan di sini */}
      <nav className="w-full flex items-center justify-between px-8 md:px-10 lg:px-14" aria-label="Navigasi Utama">
        <div className="flex items-center gap-2">
          <Link to="/" aria-label="Beranda">
            <img
              src="/images/logo/Logo.png"
              alt="EcoSort Logo"
              className="h-24 md:h-32 w-auto"
              width="128"
              height="128"
            />
          </Link>
        </div>
        <ul className="hidden md:flex gap-10 text-[#2C6B3F] font-semibold text-base" role="menubar">
          <li role="none">
            <Link
              to="/"
              className={`transition hover:font-extrabold ${
                location.pathname === "/" ? "font-extrabold" : "font-semibold"
              }`}
              role="menuitem"
              aria-current={location.pathname === "/" ? "page" : undefined}
            >
              Beranda
            </Link>
          </li>
          {isAuthenticated && (
            <li role="none">
              <Link
                to="/classify"
                className={`transition hover:font-extrabold ${
                  location.pathname === "/classify" ? "font-extrabold" : "font-semibold"
                }`}
                role="menuitem"
                aria-current={location.pathname === "/classify" ? "page" : undefined}
              >
                Scan
              </Link>
            </li>
          )}
          {isAuthenticated && (
            <li role="none">
              <Link
                to="/history"
                className={`transition hover:font-extrabold ${
                  location.pathname === "/history" ? "font-extrabold" : "font-semibold"
                }`}
                role="menuitem"
                aria-current={location.pathname === "/history" ? "page" : undefined}
              >
                Riwayat
              </Link>
            </li>
          )}
          <li role="none">
            <Link
              to="/education"
              className={`transition hover:font-extrabold ${
                location.pathname === "/education" ? "font-extrabold" : "font-semibold"
              }`}
              role="menuitem"
              aria-current={location.pathname === "/education" ? "page" : undefined}
            >
              Edukasi
            </Link>
          </li>
          <li role="none">
            <Link
              to="/leaderboard"
              className={`transition hover:font-extrabold ${
                location.pathname === "/leaderboard" ? "font-extrabold" : "font-semibold"
              }`}
              role="menuitem"
              aria-current={location.pathname === "/leaderboard" ? "page" : undefined}
            >
              Peringkat
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li role="none">
                <Link
                  to="/profile"
                  className={`transition hover:font-extrabold ${
                    location.pathname === "/profile" ? "font-extrabold" : "font-semibold"
                  }`}
                  role="menuitem"
                  aria-current={location.pathname === "/profile" ? "page" : undefined}
                >
                  Profil
                </Link>
              </li>
            </>
          ) : (
            <>
              <li role="none">
                <Link
                  to="/login"
                  className={`transition hover:font-extrabold ${
                    location.pathname === "/login" ? "font-extrabold" : "font-semibold"
                  }`}
                  role="menuitem"
                  aria-current={location.pathname === "/login" ? "page" : undefined}
                >
                  Masuk
                </Link>
              </li>
              <li role="none">
                <Link
                  to="/register"
                  className={`transition hover:font-extrabold ${
                    location.pathname === "/register" ? "font-extrabold" : "font-semibold"
                  }`}
                  role="menuitem"
                  aria-current={location.pathname === "/register" ? "page" : undefined}
                >
                  Daftar
                </Link>
              </li>
            </>
          )}
        </ul>
        <button
          className="md:hidden p-2"
          onClick={handleMenuClick}
          aria-label="Buka menu navigasi"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <img
            src="/images/icons/Menu.svg"
            alt=""
            className="w-6 h-6"
            aria-hidden="true"
          />
        </button>
      </nav>
    </header>
  );
};

export default Navbar;