import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebase'; // Import auth
import { signOut } from 'firebase/auth'; // Import signOut
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import ViewTransitionLink from '../components/common/ViewTransitionLink';

// Toggle Switch Component
function ToggleSwitch({ checked, onChange, disabled, animate = true }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-flex h-7 w-14 items-center rounded-full focus:outline-none ${checked ? "bg-[#43B26C]" : "bg-gray-200"} ${disabled ? "opacity-60 cursor-not-allowed" : ""} ${animate ? "transition-colors duration-200" : ""}`}
      tabIndex={0}
    >
      <span
        className={`inline-block h-6 w-6 transform rounded-full bg-white shadow ${checked ? "translate-x-7" : "translate-x-1"} ${animate ? "transition-transform duration-200" : ""}`}
      />
    </button>
  );
}

const sidebarMenu = [
  {
    icon: "/images/icons/Profile.svg",
    label: "Informasi Pribadi",
    desc: "Kelola data pribadi anda",
    id: "profile",
  },
  {
    icon: "/images/icons/Password.svg",
    label: "Ubah Password",
    desc: "Perbarui password akun anda",
    id: "password",
  },
  {
    icon: "/images/icons/Notification.svg",
    label: "Pengaturan Notifikasi",
    desc: "Kelola preferensi notifikasi",
    id: "notifications",
  },
  {
    icon: "/images/icons/Privacy.svg",
    label: "Preferensi Privasi",
    desc: "Kelola pengaturan privasi",
    id: "privacy",
  },
  {
    icon: "/images/icons/Language.svg",
    label: "Bahasa Aplikasi",
    desc: "Ubah bahasa aplikasi",
    id: "language",
  },
  {
    icon: "/images/icons/Help.svg",
    label: "Bantuan & Dukungan",
    desc: "Pusat bantuan dan dukungan",
    id: "help",
  },
];

const sidebarActiveIcons = [
  "/images/icons/Avatar.svg",
  "/images/icons/Password-3.svg",
  "/images/icons/Notification-3.svg",
  "/images/icons/Shield.svg",
  "/images/icons/Earth-Outline-2.svg",
  "/images/icons/Ask-2.svg",
];
const sidebarInactiveIcons = [
  "/images/icons/Avatar-2.svg",
  "/images/icons/Password-2.svg",
  "/images/icons/Notification-2.svg",
  "/images/icons/Shield-2.svg",
  "/images/icons/Earth-Outline.svg",
  "/images/icons/Ask-2.svg",
];

const pointHistory = [
  {
    icon: "/images/icons/Plastic.svg",
    title: "Plastik",
    date: "14 Mei 2025 • 09:30",
    point: "+ 3 Poin",
    positive: true,
  },
  {
    icon: "/images/icons/Paper.svg",
    title: "Kertas",
    date: "10 Mei 2025 • 14:15",
    point: "+ 3 Poin",
    positive: true,
  },
  {
    icon: "/images/icons/Reward.svg",
    title: "Penukaran Voucher",
    date: "01 Mei 2025 • 16:45",
    point: "- 100 Poin",
    positive: false,
  },
];

function ContentSection({ activeTab }) {
  const [notifAktivitas, setNotifAktivitas] = useState(true);
  const [notifHadiah, setNotifHadiah] = useState(false);
  const [privasiPublik, setPrivasiPublik] = useState(true);
  const [privasiAnalitik, setPrivasiAnalitik] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [animateToggle, setAnimateToggle] = useState(false);

  // Reset animateToggle when tab changes
  useEffect(() => {
    setAnimateToggle(false);
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 1) {
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }, [activeTab]);

  const handleToggleChange = (setter) => (value) => {
    setAnimateToggle(true);
    setter(value);
    // Reset animateToggle after animation completes
    setTimeout(() => setAnimateToggle(false), 200);
  };

  if (activeTab === 0) {
    // Informasi Pribadi
    return (
      <section className="bg-white border border-gray-200 rounded-xl p-8 mb-6">
        <header className="mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2">
            Informasi Pribadi
          </h2>
        </header>
        <form className="flex flex-col gap-5">
          <label className="flex flex-col gap-1">
            <span className="text-primary text-sm font-semibold">
              Nama Lengkap
            </span>
            <input
              type="text"
              className="border rounded-lg px-4 py-2"
              value="Ahmad Rizki"
              readOnly
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-primary text-sm font-semibold">Email</span>
            <input
              type="email"
              className="border rounded-lg px-4 py-2"
              value="ahmad.rizki@email.com"
              readOnly
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-primary text-sm font-semibold">
              Nomor Telepon
            </span>
            <input
              type="text"
              className="border rounded-lg px-4 py-2"
              value="+62 812 3456 7890"
              readOnly
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-primary text-sm font-semibold">Alamat</span>
            <textarea
              className="border rounded-lg px-4 py-2"
              placeholder="Masukkan alamat lengkap Anda"
            />
          </label>
          <button
            type="submit"
            className="bg-[#357A46] text-white font-bold rounded-lg px-8 py-2 mt-2 shadow hover:bg-[#245C34] transition"
          >
            Simpan Perubahan
          </button>
        </form>
      </section>
    );
  }
  if (activeTab === 1) {
    // Ubah Password
    return (
      <section className="bg-white border border-gray-200 rounded-xl p-8 mb-6">
        <header className="mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2">
            Ubah Password
          </h2>
        </header>
        <form className="flex flex-col gap-5">
          <label className="flex flex-col gap-1">
            <span className="text-primary text-sm font-semibold">
              Password Saat Ini
            </span>
            <input
              type="password"
              className="border rounded-lg px-4 py-2"
              placeholder="Password saat ini"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              autoComplete="current-password"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-primary text-sm font-semibold">
              Password Baru
            </span>
            <input
              type="password"
              className="border rounded-lg px-4 py-2"
              placeholder="Masukkan password baru"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-primary text-sm font-semibold">
              Konfirmasi Password Baru
            </span>
            <input
              type="password"
              className="border rounded-lg px-4 py-2"
              placeholder="Konfirmasi password baru"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
          </label>
          <button
            type="submit"
            className="bg-[#357A46] text-white font-bold rounded-lg px-8 py-2 mt-2 shadow hover:bg-[#245C34] transition"
          >
            Perbarui Password
          </button>
        </form>
      </section>
    );
  }
  if (activeTab === 2) {
    // Pengaturan Notifikasi
    return (
      <section className="bg-white border border-gray-200 rounded-xl p-8 mb-6">
        <header className="mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2">
            Pengaturan Notifikasi
          </h2>
        </header>
        <form className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <span className="text-primary">Aktivitas Daur Ulang</span>
            <ToggleSwitch
              checked={notifAktivitas}
              onChange={handleToggleChange(setNotifAktivitas)}
              animate={animateToggle}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-primary">Hadiah & Penukaran Poin</span>
            <ToggleSwitch
              checked={notifHadiah}
              onChange={handleToggleChange(setNotifHadiah)}
              animate={animateToggle}
            />
          </div>
          <button
            type="submit"
            className="bg-[#357A46] text-white font-bold rounded-lg px-8 py-2 mt-2 shadow hover:bg-[#245C34] transition"
          >
            Simpan Pengaturan
          </button>
        </form>
      </section>
    );
  }
  if (activeTab === 3) {
    // Preferensi Privasi
    return (
      <section className="bg-white border border-gray-200 rounded-xl p-8 mb-6">
        <header className="mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2">
            Preferensi Privasi
          </h2>
        </header>
        <form className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <span className="text-primary">
              Tampilkan Profil di Peringkat Publik
            </span>
            <ToggleSwitch
              checked={privasiPublik}
              onChange={handleToggleChange(setPrivasiPublik)}
              animate={animateToggle}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-primary">
              Izinkan Penggunaan Data untuk Analitik
            </span>
            <ToggleSwitch
              checked={privasiAnalitik}
              onChange={handleToggleChange(setPrivasiAnalitik)}
              animate={animateToggle}
            />
          </div>
          <button
            type="submit"
            className="bg-[#357A46] text-white font-bold rounded-lg px-8 py-2 mt-2 shadow hover:bg-[#245C34] transition"
          >
            Simpan Preferensi
          </button>
        </form>
      </section>
    );
  }
  if (activeTab === 4) {
    // Bahasa Aplikasi
    return (
      <section className="bg-white border border-gray-200 rounded-xl p-8 mb-6">
        <header className="mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2">
            Bahasa Aplikasi
          </h2>
        </header>
        <form className="flex flex-col gap-5">
          <label className="flex flex-col gap-1">
            <span className="text-primary text-sm font-semibold">
              Pilih Bahasa
            </span>
            <select className="border rounded-lg px-4 py-2">
              <option>Bahasa Indonesia</option>
            </select>
          </label>
          <button
            type="submit"
            className="bg-[#357A46] text-white font-bold rounded-lg px-8 py-2 mt-2 shadow hover:bg-[#245C34] transition"
          >
            Simpan Pengaturan
          </button>
        </form>
      </section>
    );
  }
  if (activeTab === 5) {
    // Bantuan & Dukungan
    return (
      <section className="bg-white border border-gray-200 rounded-xl p-8 mb-6">
        <header className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-2">
            Bantuan & Dukungan
          </h2>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article className="bg-[#F8FAF9] rounded-xl p-6 flex flex-col shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <img
                src="/images/icons/Book.svg"
                alt="Panduan"
                className="h-5 w-5 text-white"
              />
              <span className="font-bold text-primary text-lg">
                Panduan Pengguna
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Pelajari cara menggunakan aplikasi dan fitur-fiturnya
            </p>
            <a
              href="#"
              className="text-[#43B26C] font-semibold flex items-center gap-1 hover:font-extrabold"
            >
              Lihat Panduan <span>&rarr;</span>
            </a>
          </article>
          <article className="bg-[#F8FAF9] rounded-xl p-6 flex flex-col shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <img
                src="/images/icons/Ask-Fill.svg"
                alt="FAQ"
                className="h-5 w-5 text-white"
              />
              <span className="font-bold text-primary text-lg">FAQ</span>
            </div>
            <p className="text-gray-600 mb-4">
              Temukan jawaban untuk pertanyaan yang sering diajukan
            </p>
            <a
              href="#"
              className="text-[#43B26C] font-semibold flex items-center gap-1 hover:font-extrabold"
            >
              Lihat FAQ <span>&rarr;</span>
            </a>
          </article>
          <article className="bg-[#F8FAF9] rounded-xl p-6 flex flex-col shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <img
                src="/images/icons/Headphone-CS-2.svg"
                alt="Hubungi"
                className="h-5 w-5 text-white"
              />
              <span className="font-bold text-primary text-lg">
                Hubungi Kami
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Hubungi tim dukungan kami untuk bantuan
            </p>
            <a
              href="#"
              className="text-[#43B26C] font-semibold flex items-center gap-1 hover:font-extrabold"
            >
              Hubungi Dukungan <span>&rarr;</span>
            </a>
          </article>
          <article className="bg-[#F8FAF9] rounded-xl p-6 flex flex-col shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <img
                src="/images/icons/Feedback.svg"
                alt="Feedback"
                className="h-5 w-5 text-white"
              />
              <span className="font-bold text-primary text-lg">
                Kirim Feedback
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Berikan saran dan masukan untuk perbaikan aplikasi
            </p>
            <a
              href="#"
              className="text-[#43B26C] font-semibold flex items-center gap-1 hover:font-extrabold"
            >
              Kirim Feedback <span>&rarr;</span>
            </a>
          </article>
        </div>
      </section>
    );
  }
  // Bantuan & Dukungan
  return null;
}

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const [activeTab, setActiveTab] = useState(0);
  const [hoverIdx, setHoverIdx] = useState(null);

  const summary = [
    { icon: "/images/icons/Star-2.svg", label: "Total Poin", value: userData?.points ?? 0 },
    { icon: "/images/icons/Task.svg", label: "Total Aktivitas", value: userData?.scanCount ?? 0 },
  ];

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
    <section className="bg-white min-h-screen w-full z-50 font-nunito text-[#2C6B3F]">
      <div className="w-full pt-8 px-8 md:pt-16 md:px-10 lg:px-16">
        <form
          className="flex flex-col md:flex-row md:items-center gap-6 mb-8 relative"
          encType="multipart/form-data"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="relative w-fit">
            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-white text-green-600 text-2xl font-bold border border-[#2C6B3F]">
              {getInitials(userData.name)}
            </div>
          </div>
          <div className="flex flex-col justify-center gap-1">
            <h1 className="text-3xl font-extrabold text-primary leading-tight">
              {userData.name || 'User'}
            </h1>
            <a
              href="mailto:ahmad.rizki@email.com"
              className="text-primary text-lg"
            >
              {userData.email}
            </a>
          </div>
        </form>

        {/* divider */}
        <div className="border-b border-[#357A46] mb-10" />

        {/* total  */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {summary.map((s, i) => (
            <article
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-6 flex items-center gap-5 shadow-sm"
            >
              <span
                className="flex items-center justify-center h-16 w-16 rounded-full"
                style={{ background: "#E8F5E9" }}
              >
                <img src={s.icon} alt={s.label} className="h-7 w-7" />
              </span>
              <div>
                <div className="text-primary text-3xl font-extrabold leading-tight">
                  {s.value}
                </div>
                <div className="text-primary text-base font-semibold mt-1">
                  {s.label}
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="flex flex-col md:flex-row gap-8 mb-8 w-full">
          {/* Sidebar */}
          <aside className="w-full md:w-1/3 mb-8 md:mb-0">
            <nav
              aria-label="Pengaturan Akun"
              className="rounded-xl border border-gray-200 overflow-hidden bg-white"
            >
              <div className="bg-[#E8F5E9] px-6 py-4 rounded-t-xl">
                <span className="text-primary font-bold text-lg">
                  Pengaturan Akun
                </span>
              </div>
              <ul className="flex flex-col">
                {sidebarMenu.map((item, idx) => {
                  const isActive = idx === activeTab;
                  const isHover = hoverIdx === idx && !isActive;
                  return (
                    <li
                      key={item.label}
                      className={`flex items-start gap-3 px-6 py-4 cursor-pointer relative transition-all duration-150 ${isActive || isHover ? "font-bold text-primary" : "text-primary"} border-b border-[#E5E7EB]`}
                      onClick={() => setActiveTab(idx)}
                      onMouseEnter={() => setHoverIdx(idx)}
                      onMouseLeave={() => setHoverIdx(null)}
                    >
                      <span
                        className={`flex items-center justify-center h-11 w-11 rounded-full mr-1 ${isActive || isHover ? "bg-[#E8F5E9]" : "bg-[#F3F4F6]"}`}
                      >
                        <img
                          src={
                            isActive || isHover
                              ? sidebarActiveIcons[idx]
                              : sidebarInactiveIcons[idx]
                          }
                          alt=""
                          className="h-5 w-5"
                        />
                      </span>
                      <div className="flex flex-col">
                        <span
                          className={`text-base leading-tight transition-all duration-150 ${isActive || isHover ? "font-bold text-primary" : "font-normal text-primary"}`}
                        >
                          {item.label}
                        </span>
                        <span
                          className={`text-xs mt-1 transition-all duration-150 ${isActive || isHover ? "text-primary font-semibold" : "text-gray-500 font-normal"}`}
                        >
                          {item.desc}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <button 
                onClick={handleLogout}
                className="w-11/12 my-4 mx-auto py-3 rounded-lg bg-[#FEF2F2] text-[#DC2626] font-bold flex items-center justify-center gap-2 transition hover:bg-[#FECACA] hover:font-extrabold"
              >
                <img
                  src="/images/icons/Logout.svg"
                  alt="Logout"
                  className="h-5 w-5"
                />
                Logout
              </button>
            </nav>
          </aside>
          
          {/* Main Content */}
          <main className="w-full md:w-2/3 flex flex-col gap-8">
            <ContentSection activeTab={activeTab} />
            <section
              aria-labelledby="riwayat-poin-title"
              className="bg-white border border-gray-200 rounded-xl p-6 md:p-8"
            >
              <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-2">
                <h3
                  id="riwayat-poin-title"
                  className="text-2xl font-bold text-primary"
                >
                  Riwayat Poin
                </h3>
                <ViewTransitionLink
                  to="/history"
                  className="text-primary text-sm font-semibold flex items-center gap-1 transition hover:font-bold focus:font-bold"
                >
                  Lihat Detail Riwayat <span>&rarr;</span>
                </ViewTransitionLink>
              </header>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-[#E8F5E9] rounded-lg p-4 mb-6 gap-4 border border-[#D1FADF]">
                <div className="flex items-center gap-4">
                  <span className="flex items-center justify-center h-16 w-16 rounded-full bg-white">
                    <img
                      src="/images/icons/Star-2.svg"
                      alt="Total Poin"
                      className="h-7 w-7"
                    />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-primary font-bold text-base leading-tight mb-[4px]">
                      Total Poin
                    </span>
                    <span className="text-3xl font-extrabold text-primary leading-tight">
                      {userData.points}
                    </span>
                  </div>
                </div>
                <button className="bg-[#357A46] text-white font-semibold rounded-md py-2 px-6 flex items-center gap-3 hover:bg-green-800 transition">
                  <img
                    src="/images/icons/Exchange.svg"
                    alt="Tukar Poin"
                    className="h-5 w-5"
                  />
                  Tukar Poin
                </button>
              </div>
              <ul className="flex flex-col gap-6">
                {pointHistory.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-5"
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex items-center justify-center h-14 w-14 rounded-md bg-[#E8F5E9]">
                        <img src={item.icon} alt="" className="h-7 w-7" />
                      </span>
                      <div>
                        <div className="font-bold text-primary text-lg leading-tight">
                          {item.title}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {item.date}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`font-bold text-lg ${item.positive ? "text-[#43B26C]" : "text-[#DC2626]"}`}
                    >
                      {item.point}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </main>
          

        </section>


      </div>
    </section>
  );
};

export default Profile;
