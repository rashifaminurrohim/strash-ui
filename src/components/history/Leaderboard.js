import React, { useState } from "react";
import { getAuth } from "firebase/auth";

const FILTERS = ["Mingguan", "Bulanan", "Tahunan"];
const userStat = {
  avatar: "/images/general/Picture-Avatar.png",
  targetRank: 1,
};

const info = {
  cara: [
    "Daur ulang plastik: 10 poin",
    "Daur ulang kertas: 5 poin",
    "Daur ulang logam: 15 poin",
    "Daur ulang kaca: 8 poin",
    "Daur ulang organik: 3 poin",
  ],
  penukaran: [
    "100 poin: Voucher belanja Rp 50.000",
    "500 poin: Voucher belanja Rp 100.000",
    "1000 poin: Voucher belanja Rp 200.000",
    "3000 poin: Voucher belanja Rp 500.000",
    "Semua poin: Dapat didonasikan untuk program lingkungan",
  ],
};

const LeaderboardList = ({ leaderboard }) => {
  const [filter, setFilter] = useState(FILTERS[0]);
  const [search, setSearch] = useState("");

  const auth = getAuth();
  const currentUserUid = auth.currentUser?.uid;
  
  const sortedLeaderboard = [...leaderboard].sort((a, b) => b.points - a.points);
  const rankedLeaderboard = sortedLeaderboard.map((user, index) => ({
    ...user,
    rank: index + 1,
  }));
  const currentUser = rankedLeaderboard.find((user) => user.uid === currentUserUid) || {
    name: "Guest",
    points: 0,
    rank: "-"
  };
  const topContributors = rankedLeaderboard.slice(0, 3);
  const rankingList = rankedLeaderboard.slice(3);

  return (
    <section className="bg-white w-full min-h-screen z-50 font-nunito text-primary">
      <header className="w-full pt-8 px-8 md:pt-16 md:px-10 lg:px-16">
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary mb-6 text-center">
          Peringkat Pengguna
        </h1>
        <form
          className="flex flex-col md:flex-row md:items-center gap-3 bg-[#E8F5E9] rounded-xl p-3 md:p-4 md:gap-4 md:justify-between w-full mb-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="relative w-full md:w-48">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full bg-white rounded-lg border border-primary px-3 pr-8 py-2 text-primary font-semibold appearance-none outline-none"
              aria-label="Filter Peringkat"
            >
              {FILTERS.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
            <img
              src="/images/icons/Dropdown.svg"
              alt="Dropdown"
              className="w-4 h-4 text-primary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div>
          <div className="flex-1 flex justify-end w-full md:w-auto">
            <div className="relative w-full md:w-72">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
                <img
                  src="/images/icons/Search.svg"
                  alt="Cari"
                  className="w-5 h-5 text-primary"
                />
              </span>
              <input
                type="text"
                placeholder="Cari pengguna..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-primary pl-10 py-2 pr-4 text-primary font-medium focus:ring-2 focus:ring-primary"
                aria-label="Cari pengguna"
              />
            </div>
          </div>
        </form>
      </header>

      {/* Statistik Pribadi */}
      <section className="w-full mb-8 px-8 md:px-10 lg:px-16">
        <div className="bg-white border border-gray-200 rounded-xl flex flex-col md:flex-row items-center justify-between p-6 gap-6 shadow-sm">
          <div className="flex flex-col items-start flex-1 w-full">
            <h2 className="text-lg md:text-xl font-bold text-primary mb-2 md:mb-0">
              Statistik Pribadi Anda
            </h2>
            <div className="flex items-center gap-4 mt-4">
              <img
                src={userStat.avatar}
                alt="Avatar"
                className="h-14 w-14 rounded-full border-2 border-primary object-cover"
              />
              <div>
                <div className="font-bold text-primary text-lg">
                  {currentUser.name}
                </div>
                <div className="text-primary text-sm opacity-70">
                  Peringkat saat ini:{" "}
                  <span className="font-bold">#{currentUser.rank}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-8 self-end items-center justify-end w-full md:w-auto">
            <div className="flex flex-col items-center">
              <span className="text-primary text-xs font-semibold mb-1">
                Total Poin
              </span>
              <span className="text-2xl font-extrabold text-primary">
                {currentUser.points}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-primary text-xs font-semibold mb-1">
                Target Peringkat
              </span>
              <span className="text-2xl font-extrabold text-primary">
                #{userStat.targetRank}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Top Kontributor */}
      <section className="w-full mb-12 px-8 md:px-10 lg:px-16">
        <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 text-center">
          Top Kontributor
        </h2>
        {/* Mobile: 1-2-3 */}
        <div className="flex flex-col md:hidden justify-center items-center gap-10">
          {topContributors
            .sort((a, b) => a.rank - b.rank)
            .map((c) => (
              <article
                key={c.uid}
                className={
                  c.rank === 1
                    ? "relative flex flex-col items-center justify-center bg-white rounded-2xl py-8 px-14 w-full max-w-2xl aspect-[16/7] shadow-sm border-2 border-primary z-10 transition-transform duration-200 hover:-translate-y-2 hover:shadow-lg"
                    : `relative flex flex-col items-center justify-center bg-white rounded-2xl py-8 px-12 w-full max-w-xl aspect-[16/7] shadow-md border border-transparent transition-transform duration-200 hover:-translate-y-2 hover:shadow-lg mt-6`
                }
              >
                <figure className="flex flex-col items-center justify-center w-full">
                  <div
                    className={
                      c.rank === 1
                        ? "relative flex items-center justify-center w-36 h-36 mb-2"
                        : "relative flex items-center justify-center w-32 h-32 mb-2"
                    }
                  >
                    <img
                      src={c.avatar || "/images/general/Picture-Avatar.png"}
                      alt={c.name}
                      className={
                        c.rank === 1
                          ? "w-32 h-32 rounded-full border-2 border-primary object-cover"
                          : c.rank === 2
                            ? "w-28 h-28 rounded-full border-2 border-[#66BB6A] object-cover"
                            : "w-28 h-28 rounded-full border-2 border-[#A5D6A7] object-cover"
                      }
                    />
                    {c.rank === 1 ? (
                      <span className="absolute top-2 right-2 flex items-center justify-center rounded-full font-bold text-lg bg-primary text-white w-10 h-10 shadow">
                        {c.rank}
                      </span>
                    ) : c.rank === 2 ? (
                      <span className="absolute top-2 right-2 flex items-center justify-center rounded-full font-bold text-base bg-[#66BB6A] text-white w-8 h-8 shadow">
                        {c.rank}
                      </span>
                    ) : (
                      <span
                        className="absolute top-2 right-2 flex items-center justify-center rounded-full font-bold text-base"
                        style={{
                          background: "#A5D6A7",
                          color: "#FFFFFF",
                          width: "2rem",
                          height: "2rem",
                        }}
                      >
                        {c.rank}
                      </span>
                    )}
                  </div>
                  <figcaption
                    className={
                      c.rank === 1
                        ? "font-extrabold text-primary text-xl mb-1 text-center w-full"
                        : "font-bold text-primary text-lg mb-1 text-center w-full"
                    }
                  >
                    {c.name}
                  </figcaption>
                  <div
                    className={
                      c.rank === 1
                        ? "text-lg font-extrabold text-[#4CAF50] text-center w-full"
                        : c.rank === 2
                          ? "text-base font-bold text-[#66BB6A] text-center w-full"
                          : "text-base font-bold text-center w-full"
                    }
                    style={c.rank === 3 ? { color: "#66BB6A" } : {}}
                  >
                    {c.points} Poin
                  </div>
                  {c.isChampion && (
                    <span className="flex items-center gap-2 bg-[#E8F5E9] text-primary font-bold text-xs rounded-lg px-4 py-2 mt-3 mx-auto">
                      <img
                        src="/images/icons/Crown.svg"
                        alt="Juara"
                        className="h-4 w-4"
                      />
                      Juara Minggu Ini
                    </span>
                  )}
                </figure>
              </article>
            ))}
        </div>
        {/* Desktop: 2-1-3 */}
        <div className="hidden md:flex flex-row justify-center items-center gap-10">
          {/* Juara 2 */}
          {topContributors
            .filter((c) => c.rank === 2)
            .map((c) => (
              <article
                key={c.uid}
                className="relative flex flex-col items-center justify-center bg-white rounded-2xl py-8 px-12 w-full max-w-xl md:w-[25%] aspect-[16/7] shadow-md border border-transparent transition-transform duration-200 hover:-translate-y-2 hover:shadow-lg md:mt-24"
              >
                <figure className="flex flex-col items-center justify-center w-full">
                  <div className="relative flex items-center justify-center w-32 h-32 mb-2">
                    <img
                      src={c.avatar || "/images/general/Picture-Avatar.png"}
                      alt={c.name}
                      className="w-28 h-28 rounded-full border-2 border-[#66BB6A] object-cover"
                    />
                    <span className="absolute top-2 right-2 flex items-center justify-center rounded-full font-bold text-base bg-[#66BB6A] text-white w-8 h-8 shadow">
                      {c.rank}
                    </span>
                  </div>
                  <figcaption className="font-bold text-primary text-lg mb-1 text-center w-full">
                    {c.name}
                  </figcaption>
                  <div className="text-base font-bold text-[#66BB6A] text-center w-full">
                    {c.points} Poin
                  </div>
                </figure>
              </article>
            ))}
          {/* Juara 1 */}
          {topContributors
            .filter((c) => c.rank === 1)
            .map((c) => (
              <article
                key={c.uid}
                className="relative flex flex-col items-center justify-center bg-white rounded-2xl py-8 px-14 w-full max-w-2xl md:w-[30%] aspect-[16/7] shadow-sm border-2 border-[#2C6B3F] z-10 transition-transform duration-200 hover:-translate-y-2 hover:shadow-lg"
              >
                <figure className="flex flex-col items-center justify-center w-full">
                  <div className="relative flex items-center justify-center w-36 h-36 mb-2">
                    <img
                      src={c.avatar || "/images/general/Picture-Avatar.png"}
                      alt={c.name}
                      className="w-32 h-32 rounded-full border-2 border-[#2C6B3F] object-cover"
                    />
                    <span className="absolute top-2 right-2 flex items-center justify-center rounded-full font-bold text-lg bg-primary text-white w-10 h-10 shadow">
                      {c.rank}
                    </span>
                  </div>
                  <figcaption className="font-extrabold text-primary text-xl mb-1 text-center w-full">
                    {c.name}
                  </figcaption>
                  <div className="text-lg font-extrabold text-[#4CAF50] text-center w-full">
                    {c.points} Poin
                  </div>
                  {c.isChampion && (
                    <span className="flex items-center gap-2 bg-[#E8F5E9] text-primary font-bold text-xs rounded-lg px-4 py-2 mt-3 mx-auto">
                      <img
                        src="/images/icons/Crown.svg"
                        alt="Juara"
                        className="h-4 w-4"
                      />
                      Juara Minggu Ini
                    </span>
                  )}
                </figure>
              </article>
            ))}
          {/* Juara 3 */}
          {topContributors
            .filter((c) => c.rank === 3)
            .map((c) => (
              <article
                key={c.uid}
                className="relative flex flex-col items-center justify-center bg-white rounded-2xl py-8 px-12 w-full max-w-xl md:w-[25%] aspect-[16/7] shadow-md border border-transparent transition-transform duration-200 hover:-translate-y-2 hover:shadow-lg md:mt-24"
              >
                <figure className="flex flex-col items-center justify-center w-full">
                  <div className="relative flex items-center justify-center w-32 h-32 mb-2">
                    <img
                      src={c.avatar || "/images/general/Picture-Avatar.png"}
                      alt={c.name}
                      className="w-28 h-28 rounded-full border-2 border-[#A5D6A7] object-cover"
                    />
                    <span
                      className="absolute top-2 right-2 flex items-center justify-center rounded-full font-bold text-base"
                      style={{
                        background: "#A5D6A7",
                        color: "#FFFFFF",
                        width: "2rem",
                        height: "2rem",
                      }}
                    >
                      {c.rank}
                    </span>
                  </div>
                  <figcaption className="font-bold text-primary text-lg mb-1 text-center w-full">
                    {c.name}
                  </figcaption>
                  <div
                    className="text-base font-bold text-center w-full"
                    style={{ color: "#66BB6A" }}
                  >
                    {c.points} Poin
                  </div>
                </figure>
              </article>
            ))}
        </div>
      </section>

      {/* Daftar Peringkat */}
      <section className="w-full mb-8 px-8 md:px-10 lg:px-16">
        <h2 className="text-lg md:text-xl font-bold text-primary mb-4">
          Daftar Peringkat
        </h2>
        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-full bg-[#E8F5E9] rounded-xl">
            <thead className="bg-gray-100">
              <tr className="text-primary font-bold text-base">
                <th className="py-4 px-8 text-center" style={{ width: "20%" }}>
                  Peringkat
                </th>
                <th className="py-4 px-8 text-center" style={{ width: "60%" }}>
                  Pengguna
                </th>
                <th className="py-4 px-8 text-center" style={{ width: "20%" }}>
                  Total Poin
                </th>
              </tr>
            </thead>
            <tbody>
              {rankingList.map((row, i) => (
                <tr
                  key={row.rank}
                  className="bg-white border border-[#E0E0E0]"
                >
                  <td
                    className="py-6 px-8 font-bold text-center align-middle"
                    style={{ color: "#388E3C", width: "20%" }}
                  >
                    #{row.rank}
                  </td>
                  <td
                    className="py-6 px-8 align-middle pl-8"
                    style={{ width: "60%" }}
                  >
                    <div className="flex items-center gap-3 h-10 justify-center sm:ml-[40%] sm:justify-start">
                      <img
                        src={row.avatar || "/images/general/Picture-Avatar.png"}
                        alt={row.name}
                        className="h-10 w-10 rounded-full object-cover border-2 border-[#66BB6A]"
                      />
                      <span
                        className="font-semibold"
                        style={{ color: "#388E3C" }}
                      >
                        {row.name}
                      </span>
                    </div>
                  </td>
                  <td
                    className="py-6 px-8 text-center font-bold align-middle"
                    style={{ color: "#66BB6A", width: "20%" }}
                  >
                    {row.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Info Section */}
      <section className="w-full mb-8 px-8 md:px-10 lg:px-16">
        <section className="bg-[#E8F5E9] rounded-xl p-8 mb-8 w-full" aria-labelledby="info-title">
          <header>
            <h2 id="info-title" className="text-xl md:text-2xl font-bold text-primary mb-4">
              Tentang Peringkat
            </h2>
            <p className="text-primary text-base mb-6">
              Peringkat dihitung berdasarkan total poin yang Anda kumpulkan dari aktivitas daur ulang sampah. Semakin banyak sampah yang Anda daur ulang, semakin tinggi peringkat Anda.
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article className="bg-white rounded-xl border border-primary p-6 flex flex-col gap-2" aria-labelledby="cara-title">
              <header className="flex items-center gap-3 mb-2">
                <img src="/images/icons/Recycle-3.svg" alt="Poin" className="h-6 w-6" />
                <h3 id="cara-title" className="font-bold text-primary text-lg m-0">Cara Mendapatkan Poin</h3>
              </header>
              <ul className="list-disc pl-6 text-primary text-base font-medium">
                {info.cara.map((item, i) => (
                  <li key={i} className="mb-2 last:mb-0">{item}</li>
                ))}
              </ul>
            </article>
            <article className="bg-white rounded-xl border border-primary p-6 flex flex-col gap-2" aria-labelledby="penukaran-title">
              <header className="flex items-center gap-3 mb-2">
                <img src="/images/icons/Gift.svg" alt="Penukaran" className="h-6 w-6" />
                <h3 id="penukaran-title" className="font-bold text-primary text-lg m-0">Penukaran Poin</h3>
              </header>
              <ul className="list-disc pl-6 text-primary text-base font-medium">
                {info.penukaran.map((item, i) => (
                  <li key={i} className="mb-2 last:mb-0">{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>
      </section>
    </section>
  );
};

export default LeaderboardList; 