import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import ViewTransitionLink from '../components/common/ViewTransitionLink';

const Home = () => {
  const location = useLocation();

  // Memindahkan semua definisi konstanta ke dalam komponen Home
  const hero = {
    title: 'Tingkatkan Pengelolaan Sampah Anda dengan Solusi Cerdas!',
    subtitle: 'Kami hadir untuk membantu proses pemilahan sampah di rumah, sekolah, dan fasilitas umum lebih efisien dengan teknologi, memotivasi masyarakat agar jadi lebih peduli dalam mengelola sampah.',
    cta: 'Scan Sampah',
    imagePhone: '/images/general/Splash-Screen-1.png',
  };

  const about = {
    title: 'Misi Kami adalah Mentransformasi Pengelolaan Sampah untuk Masa Depan yang Berkelanjutan',
    points: [
      {
        icon: '/images/icons/Trash.svg',
        title: 'Meningkatkan Pemilahan Sampah',
        desc: 'Membantu masyarakat memilah sampah dengan mudah dan efisien melalui teknologi.',
      },
      {
        icon: '/images/icons/Human-Tree.svg',
        title: 'Meningkatkan Kesadaran Masyarakat',
        desc: 'Memberikan edukasi dan motivasi agar masyarakat lebih peduli terhadap pengelolaan sampah.',
      },
      {
        icon: '/images/icons/Leaf.svg',
        title: 'Mengurangi Dampak Lingkungan',
        desc: 'Mengurangi limbah dan polusi dengan pengelolaan sampah yang lebih baik.',
      },
    ],
    cta: 'Lihat Detail',
  };

  const features = [
    {
      icon: '/images/icons/Trash-Scan.svg',
      title: 'Klasifikasi Sampah Otomatis',
      desc: 'Gunakan kamera atau unggah gambar sampah untuk langsung mengidentifikasi jenisnya (organik, anorganik, B3, dll.) dengan teknologi AI.',
      cta: 'Coba Sekarang',
    },
    {
      icon: '/images/icons/Human-Throw-Trash.svg',
      title: 'Edukasi Pemilahan Sampah',
      desc: 'Akses panduan visual dan artikel tentang cara memilah sampah dengan benar berdasarkan kategori yang telah diklasifikasikan.',
      cta: 'Pelajari Lebih Lanjut',
    },
    {
      icon: '/images/icons/History-Scan.svg',
      title: 'Riwayat Klasifikasi',
      desc: 'Pantau semua hasil klasifikasi sebelumnya, termasuk rekomendasi penanganan dan pemilahan untuk Anda.',
      cta: 'Lihat Riwayat',
    },
    {
      icon: '/images/icons/Location-Trash-Bank.svg',
      title: 'Lokasi TPA Terdekat',
      desc: 'Temukan fasilitas daur ulang atau bank sampah terdekat dengan navigasi GPS. Strash membantu Anda menyalurkan sampah yang telah dipilah ke tempat yang tepat.',
      cta: 'Lihat Lokasi',
    },
    {
      icon: '/images/icons/Ranking.svg',
      title: 'Peringkat EcoPoints',
      desc: 'Dapatkan poin (EcoPoints) setiap kali berhasil memilah sampah. Naikkan peringkat Anda dalam leaderboard komunitas dan tukarkan poin menjadi voucher belanja atau donasi pohon.',
      cta: 'Lihat Selengkapnya',
    },
    {
      icon: '/images/icons/Donation.svg',
      title: 'Donasi untuk Lingkungan',
      desc: 'Berkontribusi langsung pada program lingkungan pilihan seperti donasi tempat pembuangan sampah, edukasi daur ulang sekolah, atau penanaman mangrove. Kami menjamin transparansi penuh dalam setiap langkah yang diambil.',
      cta: 'Lihat Lebih Lanjut',
    },
  ];

  const steps = [
    {
      icon: '/images/icons/Trash-Scan.svg',
      title: 'Langkah 1: Unggah Gambar Sampah',
      desc: 'Gunakan fitur kamera atau unggah foto sampah dari galeri. Sistem AI kami siap mengenali jenis sampah (organik, anorganik, B3) secara instan.',
    },
    {
      icon: '/images/icons/Result-Scan.svg',
      title: 'Langkah 2: Sistem Otomatis Klasifikasi',
      desc: 'Strash memudahkan tindakan lanjutan dengan navigasi ke TPA terdekat, riwayat pemilahan pribadi yang terpantau, serta sistem poin dan peringkat untuk mendorong partisipasi daur ulang secara konsisten.',
    },
    {
      icon: '/images/icons/Recycle.svg',
      title: 'Langkah 3: Pelajari Panduan Pemilahan',
      desc: 'Akses panduan visual interaktif yang menjelaskan langkah praktis pemilahan berdasarkan hasil klasifikasi, termasuk dampak lingkungan untuk meningkatkan kesadaran pengguna.',
    },
    {
      icon: '/images/icons/Next-Recycle.svg',
      title: 'Langkah 4: Temukan Solusi Lanjutan',
      desc: 'Strash memudahkan tindakan lanjutan dengan navigasi ke TPA terdekat, riwayat pemilahan pribadi yang terpantau, serta sistem poin dan peringkat untuk mendorong partisipasi daur ulang secara konsisten.',
    },
  ];

  const testimonials = [
    {
      name: 'Dian Sastrowardoyo',
      role: 'Ibu Rumah Tangga',
      text: 'Sejak pakai Strash, urusan pilah sampah jadi lebih mudah! Aplikasinya cepat mengenali jenis sampah dan panduannya sangat membantu. Sekeluarga sekarang lebih disiplin memilah sampah berkat fitur riwayat klasifikasinya.',
    },
    {
      name: 'Budi Santoso',
      role: 'Aktivis Lingkungan',
      text: 'Aplikasi wajib buat yang peduli lingkungan! Fitur pencarian bank sampah terdekat sangat berguna, dan sistem EcoPoints-nya bikin saya termotivasi untuk terus daur ulang. Pelayanan tim Strash juga responsif banget!',
    },
    {
      name: 'Rudi Hartono',
      role: 'Ketua RT',
      text: 'Dengan Strash, kerja kami jadi lebih efisien karena sampah sudah terpilah dengan baik sejak dari sumbernya. Aplikasi ini benar-benar membantu gerakan lingkungan di tingkat masyarakat!',
    },
  ];

  const faqs = [
    {
      question: 'Apakah Strash bisa mengenali semua jenis sampah?',
      answer: 'Strash dapat mengenali banyak jenis sampah umum, namun akurasi terbaik pada sampah rumah tangga.',
    },
    {
      question: 'Bagaimana akurasi klasifikasinya?',
      answer: 'Akurasi tinggi untuk sampah yang jelas dan gambar yang terang.',
    },
    {
      question: 'Apakah data gambar saya disimpan?',
      answer: 'Tidak, gambar hanya digunakan untuk proses klasifikasi dan tidak disimpan.',
    },
    {
      question: 'Bagaimana cara menemukan TPA terdekat?',
      answer: 'Gunakan fitur lokasi pada aplikasi untuk menemukan TPA atau bank sampah terdekat.',
    },
    {
      question: 'Apa manfaat sistem poin EcoPoints?',
    answer: 'EcoPoints dapat ditukar dengan reward atau donasi untuk program lingkungan.',
    },
  ];

  const team = {
    title: 'Tim Kami Siap Membantu Anda',
    desc: 'Jika ada pertanyaan atau butuh bantuan, tim kami siap membantu Anda kapan saja.',
    cta: 'Hubungi Kami',
    image: '/images/general/Costumer-Service.png',
  };

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash.replace('#', ''));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <section className="bg-white font-nunito">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-0 px-8 md:py-8 md:px-10 lg:px-14 bg-white max-w-4xl mx-auto gap-4">
        <h1 className="text-4xl md:text-5xl font-semibold text-[#2C6B3F] mb-6 leading-[2.8rem] md:leading-[4rem] tracking-wide text-center">
          {hero.title}
        </h1>
        {/* Perubahan di sini: font-light dihapus jika ingin normal, atau biarkan jika ingin lebih tipis dari normal */}
        <p className="text-[#2C6B3F] max-w-xxl mb-8 text-lg text-center">
          {hero.subtitle}
        </p>
        <ViewTransitionLink
          to="/classify"
          className="bg-[#2C6B3F] text-white py-4 px-6 rounded-full font-bold shadow hover:bg-[#1F4D2E] transition mb-10 flex items-center gap-3 mx-auto text-lg"
        >
          {hero.cta}
          <img
            src="/images/icons/Arrow-Right-Up-2.svg"
            alt="Arrow"
            className="h-4 w-4"
          />
        </ViewTransitionLink>
        <img
          src={hero.imagePhone}
          alt="Strash App Screenshot"
          className="mx-auto"
        />
      </section>

      {/* About Section */}
      <section id="about" className="relative py-16 px-4 md:px-6 lg:px-8 overflow-hidden w-full max-w-full bg-white">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-16">
          <div className="flex flex-col gap-3 z-10">
            <span className="text-[#2C6B3F] font-bold tracking-widest mb-4 text-sm md:text-base">
              TENTANG KAMI
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#2C6B3F] mb-6 md:mb-10 text-left leading-[2.5rem] md:leading-[3.5rem]">
              {about.title}
            </h2>
            {about.points.map((point, idx) => (
              <div key={idx} className="flex items-start gap-6 mb-6">
                <span className="flex items-center justify-center h-16 w-16 md:h-14 md:w-14 rounded-full bg-[#2C6B3F] shrink-0">
                  <img
                    src={point.icon}
                    alt="icon"
                    className="h-8 w-8 md:h-7 md:w-7 text-white"
                  />
                </span>
                <div>
                  <h3 className="font-bold text-[#2C6B3F] text-lg mb-1">
                    {point.title}
                  </h3>
                  {/* Perubahan di sini: font-medium dihapus */}
                  <p className="text-[#2C6B3F] text-base">
                    {point.desc}
                  </p>
                </div>
              </div>
            ))}
            <ViewTransitionLink
              to="/about"
              className="mt-4 w-max bg-[#2C6B3F] text-white text-lg py-2 pl-6 pr-[.5rem] rounded-full font-bold shadow hover:bg-[#1F4D2E] transition flex items-center gap-2"
            >
              {about.cta}
              <span className="flex items-center justify-center h-12 w-12 rounded-full bg-white ml-2">
                <img
                  src="/images/icons/Arrow-Right-Up.svg"
                  alt="Arrow"
                  className="h-4 w-4"
                />
              </span>
            </ViewTransitionLink>
          </div>
          <div className="hidden md:flex justify-center items-center h-full">
            <img
              src="/images/general/Splash-Screen-2.png"
              alt="Ilustrasi"
              className="w-full max-w-[480px] h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section id="steps" className="py-16 px-4 md:px-6 lg:px-8 w-full bg-white">
        <span className="block text-[#2C6B3F] font-bold tracking-widest text-center text-sm md:text-base mb-6">
          CARA KERJA
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#2C6B3F] mb-6 text-center">
          Bersama Kita Wujudkan Dunia Bebas Sampah
        </h2>
        {/* Perubahan di sini: font-medium dihapus */}
        <p className="text-[#2C6B3F] text-center max-w-3xl mx-auto mb-12 text-lg">
          Strash menghadirkan solusi pintar berbasis AI untuk memudahkan
          pemilahan sampah sehari-hari. Dengan teknologi canggih, kami mengubah
          kebiasaan buang sampah menjadi aksi berkelanjutan.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-3xl border border-gray-200 shadow p-8 min-h-[180px] flex items-start"
            >
              <span className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-10 w-10 rounded-full bg-[#2C6B3F] text-white font-bold text-lg shadow-md z-10">
                {idx + 1}
              </span>
              <span className="flex items-center justify-center h-16 w-16 md:h-20 md:w-20 rounded-xl bg-[#2C6B3F] flex-shrink-0">
                <img
                  src={step.icon}
                  alt="icon"
                  className="h-8 w-8 md:h-10 md:w-10 text-white"
                />
              </span>
              <div className="flex-1 pl-6">
                <h3 className="font-bold text-[#2C6B3F] text-lg mb-1">
                  {step.title}
                </h3>
                {/* Perubahan di sini: font-medium dihapus */}
                <p className="text-[#2C6B3F] text-base">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 md:px-6 lg:px-8 w-full max-w-full mx-auto bg-white">
        <span className="block text-[#2C6B3F] font-bold tracking-widest text-center text-sm md:text-base mb-6">
          FITUR
        </span>
        <h2 className="text-3xl mb-8 md:text-4xl font-extrabold text-[#2C6B3F] mb-14 text-center mx-auto max-w-4xl leading-[2.5rem] md:leading-[3.5rem]">
          Solusi Pintar Strash untuk Pengelolaan Sampah Berkelanjutan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl shadow p-10 flex flex-col items-start text-left min-h-[320px]"
            >
              <span className="flex items-center justify-center h-14 w-14 rounded bg-[#2C6B3F] mb-6">
                <img
                  src={feature.icon}
                  alt="icon"
                  className="h-8 w-8 text-white"
                />
              </span>
              <h3 className="font-bold text-[#2C6B3F] text-xl mb-1">
                {feature.title}
              </h3>
              {/* Perubahan di sini: font-medium dihapus */}
              <p className="text-[#2C6B3F] text-base mb-6 max-w-96">
                {feature.desc}
              </p>
              {feature.title === 'Klasifikasi Sampah Otomatis' ? (
                <ViewTransitionLink
                  to="/classify"
                  className="border border-[#2C6B3F] text-[#2C6B3F] px-6 py-2 rounded-md font-semibold text-base hover:bg-[#2C6B3F] hover:text-white transition mt-auto block text-center"
                >
                  {feature.cta}
                </ViewTransitionLink>
              ) : feature.title === 'Edukasi Pemilahan Sampah' ? (
                <ViewTransitionLink
                  to="/education"
                  className="border border-[#2C6B3F] text-[#2C6B3F] px-6 py-2 rounded-md font-semibold text-base hover:bg-[#2C6B3F] hover:text-white transition mt-auto block text-center"
                >
                  {feature.cta}
                </ViewTransitionLink>
              ) : feature.title === 'Riwayat Klasifikasi' ? (
                <ViewTransitionLink
                  to="/history"
                  className="border border-[#2C6B3F] text-[#2C6B3F] px-6 py-2 rounded-md font-semibold text-base hover:bg-[#2C6B3F] hover:text-white transition mt-auto block text-center"
                >
                  {feature.cta}
                </ViewTransitionLink>
              ) : feature.title === 'Lokasi TPA Terdekat' ? (
                <ViewTransitionLink
                  to="/location"
                  className="border border-[#2C6B3F] text-[#2C6B3F] px-6 py-2 rounded-md font-semibold text-base hover:bg-[#2C6B3F] hover:text-white transition mt-auto block text-center"
                >
                  {feature.cta}
                </ViewTransitionLink>
              ) : feature.title === 'Peringkat EcoPoints' ? (
                <ViewTransitionLink
                  to="/leaderboard"
                  className="border border-[#2C6B3F] text-[#2C6B3F] px-6 py-2 rounded-md font-semibold text-base hover:bg-[#2C6B3F] hover:text-white transition mt-auto block text-center"
                >
                  {feature.cta}
                </ViewTransitionLink>
              ) : feature.title === 'Donasi untuk Lingkungan' ? (
                <ViewTransitionLink
                  to="/donation"
                  className="border border-[#2C6B3F] text-[#2C6B3F] px-6 py-2 rounded-md font-semibold text-base hover:bg-[#2C6B3F] hover:text-white transition mt-auto block text-center"
                >
                  {feature.cta}
                </ViewTransitionLink>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section id="testimonials" className="py-16 px-4 md:px-6 lg:px-8 w-full max-w-full mx-auto bg-white">
        <span className="block text-[#2C6B3F] font-bold tracking-widest text-center text-sm md:text-base mb-6">
          TESTIMONI
        </span>
        <h2 className="text-3xl mb-8 md:text-4xl font-extrabold text-[#2C6B3F] mb-14 text-center">
          Apa Kata Pengguna Tentang Strash?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-gray-100 shadow-lg p-10 gap-2 flex flex-col items-center text-center min-h-[220px]"
            >
              <div className="w-20 h-20 rounded-full bg-[#2C6B3F] text-white flex items-center justify-center font-bold text-3xl mb-4">
                {t.name[0]}
              </div>
              {/* Perubahan di sini: font-medium dihapus */}
              <p className="text-[#2C6B3F] text-base mb-2">
                "{t.text}"
              </p>
              <span className="font-bold text-[#2C6B3F] text-lg">{t.name}</span>
              {/* Perubahan di sini: font-medium dihapus */}
              <span className="text-[#2C6B3F] text-base mt-1">
                {t.role}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 w-full max-w-full mx-auto bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-y-4 lg:gap-x-16">
          <div className="lg:col-span-4 w-full">
            <h2 className="text-4xl font-extrabold text-[#2C6B3F] mb-4 text-left break-words">
              Strash FAQs
            </h2>
            {/* Perubahan di sini: font-light dihapus jika ingin normal, atau biarkan jika ingin lebih tipis dari normal */}
            <p className="text-[#2C6B3F] text-lg text-left break-words">
              Temukan jawaban atas pertanyaan paling umum tentang aplikasi
              pemilahan sampah berbasis AI kami - solusi revolusioner untuk
              memudahkan pemilahan sampah harian Anda dengan akurasi tinggi.
            </p>
          </div>
          <div className="lg:col-span-8 flex flex-col gap-0 w-full">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className={`group py-6 w-full ${
                  idx !== faqs.length - 1 ? 'border-b-2 border-[#2C6B3F]' : ''
                }`}
              >
                <summary className="font-bold text-[#2C6B3F] cursor-pointer text-xl flex items-center justify-between break-words">
                  <span className="break-words">{faq.question}</span>
                  <span className="ml-4 flex-shrink-0">
                    <img
                      src="/images/icons/Plus.svg"
                      alt="Plus"
                      className="w-5 h-5 text-[#2C6B3F] group-open:hidden"
                    />
                    <img
                      src="/images/icons/Minus.svg"
                      alt="Minus"
                      className="w-5 h-5 text-[#2C6B3F] hidden group-open:inline"
                    />
                  </span>
                </summary>
                {/* Perubahan di sini: font-medium dihapus */}
                <p className="text-[#2C6B3F] text-base mt-4 pl-1 break-words">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 px-4 md:px-6 lg:px-8 bg-white w-full">
        <div className="bg-white rounded-3xl shadow-lg border px-6 py-8 md:py-12 md:px-16 w-full flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl max-w-sm font-extrabold text-[#2C6B3F] mb-4 md:leading-[3.2rem]">
              {team.title}
            </h2>
            {/* Perubahan di sini: font-normal digunakan */}
            <p className="text-[#2C6B3F] text-lg mb-8 max-w-xl font-normal">
              {team.desc}
            </p>
            <a
              href="mailto:strash@gmail.com"
              className="mt-4 w-max bg-[#2C6B3F] text-white text-lg py-2 pl-6 pr-[.5rem] rounded-full font-bold shadow hover:bg-[#1F4D2E] transition flex items-center gap-2"
            >
              {team.cta}
              <span className="flex items-center justify-center h-12 w-12 rounded-full bg-white ml-2">
                <img
                  src="/images/icons/Phone.svg"
                  alt="Arrow"
                  className="h-7 w-7"
                />
              </span>
            </a>
          </div>
          <div className="hidden md:block">
            <img
              src={team.image}
              alt="Tim Strash"
              className="h-56 w-56 md:h-96 md:w-96 rounded-3xl bg-white object-contain"
            />
          </div>
        </div>
      </section>
    </section>
  );
};

export default Home;