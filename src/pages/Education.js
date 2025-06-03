import React, { useState, useRef } from 'react';

const EducationView = () => {
  const [selectedCategory, setSelectedCategory] = useState('plastik');
  const [arrowHover, setArrowHover] = useState(false); // Untuk tombol 'Mulai Belajar'
  const [hoveredCard, setHoveredCard] = useState(null); // Untuk efek hover pada kartu kategori
  const eduRef = useRef(null); // Untuk scroll ke bagian kategori

  return (
    // section utama tidak perlu padding-top, karena header di dalamnya yang akan mengatur
    <section className="bg-white min-h-screen pt-0 z-10 font-nunito">
      {/* Hero Section */}
      {/* Mengatur padding-top di sini agar konten tidak tertutup fixed navbar.
          Asumsi navbar memiliki tinggi sekitar 96px (h-24) untuk md dan 128px (h-32) untuk lg.
          pt-[6rem] = 96px, md:pt-[8rem] = 128px */}
      <header className="max-w-full mx-auto flex flex-col md:flex-row items-center gap-6 pt-[6rem] px-8 md:pt-[8rem] md:px-10 lg:px-14">
        <section className="flex-1 flex flex-col gap-4 w-full md:gap-2">
          <span className="text-xs md:text-sm text-[#2C6B3F] font-semibold tracking-widest mb-2">
            EDUKASI Strash
          </span>
          <h1 className="text-3xl md:text-4xl max-w-sm font-extrabold text-[#2C6B3F] leading-[2.5rem] md:leading-[3.5rem] mb-2">
            Edukasi Pemilahan Sampah
          </h1>
          <p className="text-[#2C6B3F] text-sm md:text-base mb-4 max-w-lg">
            Pelajari cara memilah sampah dengan benar untuk menciptakan
            lingkungan yang lebih bersih dan berkelanjutan.
          </p>
          <button
            className="w-max bg-white border border-[#2C6B3F] text-[#2C6B3F] font-semibold rounded-lg px-5 py-3 flex items-center gap-3 hover:bg-[#2C6B3F] hover:text-white transition"
            onMouseEnter={() => setArrowHover(true)}
            onMouseLeave={() => setArrowHover(false)}
            onClick={() => {
              if (eduRef.current) {
                eduRef.current.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                });
              }
            }}
          >
            Mulai Belajar
            <img
              src={
                arrowHover
                  ? '/images/icons/Arrow-Right-2.svg'
                  : '/images/icons/Arrow-Right.svg'
              }
              alt="Arrow"
              className="w-4 h-4"
            />
          </button>
        </section>
        <figure className="hidden md:flex flex justify-center items-center">
          <img
            src="/images/general/Splash-Screen-6.png"
            alt="Laptop"
            className="max-w-xs md:max-w-md lg:max-w-lg w-full"
          />
        </figure>
      </header>

      {/* Kategori Sampah */}
      {/* Container ini memiliki padding-left/right dan margin-top yang besar di screenshot */}
      <nav className="w-full mx-auto grid grid-cols-1 md:grid-cols-5 gap-4 mt-12 mb-8 px-14 md:px-14 lg:px-14">
        {' '}
        {/* Adjusted px */}
        {[
          {
            key: 'plastik',
            label: 'Plastik',
            icon: '/images/icons/Plastic.svg',
            iconActive: '/images/icons/Plastic-2.svg',
          },
          {
            key: 'kertas',
            label: 'Kertas',
            icon: '/images/icons/Paper.svg',
            iconActive: '/images/icons/Paper-2.svg',
          },
          {
            key: 'logam',
            label: 'Logam',
            icon: '/images/icons/Metal.svg',
            iconActive: '/images/icons/Metal-2.svg',
          },
          {
            key: 'kaca',
            label: 'Kaca',
            icon: '/images/icons/Glass.svg',
            iconActive: '/images/icons/Glass-2.svg',
          },
          {
            key: 'organik',
            label: 'Organik',
            icon: '/images/icons/Organic.svg',
            iconActive: '/images/icons/Organic-2.svg',
          },
        ].map(cat => (
          <button
            key={cat.key}
            type="button"
            onClick={() => setSelectedCategory(cat.key)}
            onMouseEnter={() => setHoveredCard(cat.key)}
            onMouseLeave={() => setHoveredCard(null)}
            className={`flex flex-col items-center justify-center w-full h-32 rounded-2xl font-semibold border-2 shadow transition gap-3
              ${
                selectedCategory === cat.key // Warna aktif
                  ? 'bg-[#2C6B3F] text-white border-[#2C6B3F]'
                  : hoveredCard === cat.key // Warna hover (tetap hijau border, teks putih)
                  ? 'bg-[#2C6B3F] text-white border-[#2C6B3F]'
                  : 'bg-white text-[#2C6B3F] border-[#2C6B3F]' // Warna default: putih, border hijau, teks hijau
              }
            `}
          >
            <img
              src={
                selectedCategory === cat.key || hoveredCard === cat.key
                  ? cat.iconActive
                  : cat.icon
              }
              alt={cat.label}
              className="h-7 w-7 mb-2"
            />
            <span className="text-lg">{cat.label}</span>
          </button>
        ))}
      </nav>

      {/* Section Dinamis Berdasarkan Kategori */}
      {/* Padding horizontal section ini juga disesuaikan agar sama dengan nav kategori */}
      <section
        ref={eduRef}
        className="w-full mx-auto px-14 md:px-14 lg:px-14 mb-12"
      >
        {' '}
        {/* Adjusted px */}
        <h2 className="text-xl md:text-2xl font-bold text-[#2C6B3F] mb-2">
          {selectedCategory === 'plastik'
            ? 'Plastik'
            : selectedCategory === 'kertas'
            ? 'Kertas'
            : selectedCategory === 'logam'
            ? 'Logam'
            : selectedCategory === 'kaca'
            ? 'Kaca'
            : selectedCategory === 'organik'
            ? 'Organik'
            : ''}
        </h2>
        <p className="text-[#2C6B3F] mb-6 text-sm md:text-base">
          {selectedCategory === 'plastik' &&
            'Sampah plastik membutuhkan waktu ratusan tahun untuk terurai. Pemilahan yang tepat membantu proses daur ulang.'}
          {selectedCategory === 'kertas' &&
            'Kertas adalah salah satu sampah yang mudah terurai dan dapat didaur ulang menjadi produk baru. Pemilahan kertas membantu mengurangi penebangan pohon dan limbah di TPA.'}
          {selectedCategory === 'logam' &&
            'Logam adalah material yang dapat didaur ulang berkali-kali tanpa mengurangi kualitasnya. Proses daur ulang logam menghemat energi dan sumber daya alam.'}
          {selectedCategory === 'kaca' &&
            'Kaca dapat didaur ulang 100% dan dapat diproses berulang kali tanpa penurunan kualitas. Daur ulang kaca menghemat energi dan mengurangi limbah.'}
          {selectedCategory === 'organik' &&
            'Sampah organik dapat dikompos menjadi pupuk yang bermanfaat untuk tanaman. Pengomposan mengurangi volume sampah dan menghasilkan nutrisi untuk tanah.'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {selectedCategory === 'plastik' && (
            <>
              <article className="bg-white rounded-xl shadow p-0 flex flex-col overflow-hidden">
                <figure>
                  <img
                    src="/images/general/Plastic-1.jpg"
                    alt="Jenis Plastik"
                    className="w-full h-56 md:h-64 object-cover"
                  />
                </figure>
                <section className="flex-1 p-6 flex flex-col justify-center">
                  <h3 className="font-bold text-[#2C6B3F] text-lg mb-1">
                    Jenis-jenis Plastik
                  </h3>
                  <p className="text-[#2C6B3F] text-sm md:text-base">
                    Terdapat berbagai jenis plastik seperti PET (botol minuman),
                    HDPE (botol sampo), PVC (pipa), LDPE (kantong plastik), PP
                    (wadah makanan), dan PS (styrofoam). Setiap jenis memiliki
                    karakteristik dan proses daur ulang yang berbeda.
                  </p>
                </section>
              </article>
              <article className="bg-white rounded-xl shadow p-0 flex flex-col overflow-hidden">
                <img
                  src="/images/general/Plastic-2.jpg"
                  alt="Cara Memilah Plastik"
                  className="w-full h-56 md:h-64 object-cover"
                />
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <h3 className="font-bold text-[#2C6B3F] text-lg mb-1">
                    Cara Memilah Plastik
                  </h3>
                  <p className="text-[#2C6B3F] text-sm md:text-base">
                    Pisahkan plastik sesuai jenisnya dan bersihkan dari sisa
                    makanan atau minuman. Jika tutup dan label terbuat dari
                    plastik berbeda, pisahkan juga. Pastikan plastik dalam
                    keadaan kering sebelum dikumpulkan agar proses daur ulang
                    berjalan lebih efektif.
                  </p>
                </div>
              </article>
              <article className="bg-white rounded-xl shadow p-0 flex flex-col overflow-hidden">
                <img
                  src="/images/general/Plastic-3.jpg"
                  alt="Dampak Plastik"
                  className="w-full h-56 md:h-64 object-cover"
                />
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <h3 className="font-bold text-[#2C6B3F] text-lg mb-1">
                    Dampak Plastik
                  </h3>
                  <p className="text-[#2C6B3F] text-sm md:text-base">
                    Sampah plastik yang tidak dikelola dengan baik bisa
                    mencemari tanah, air, serta mengancam kehidupan laut. Dengan
                    mendaur ulang plastik, kita bisa menghemat energi sekaligus
                    mengurangi emisi gas rumah kaca yang berkontribusi pada
                    perubahan iklim.
                  </p>
                </div>
              </article>
              <article className="bg-white rounded-xl shadow p-0 flex flex-col overflow-hidden">
                <img
                  src="/images/general/Plastic-4.jpg"
                  alt="Tips Mengurangi Plastik"
                  className="w-full h-56 md:h-64 object-cover"
                />
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <h3 className="font-bold text-[#2C6B3F] text-lg mb-1">
                    Tips Mengurangi Penggunaan Plastik
                  </h3>
                  <p className="text-[#2C6B3F] text-sm md:text-base">
                    Kurangi penggunaan plastik sekali pakai dengan beralih ke
                    tas kain, botol minum isi ulang, dan wadah yang bisa dipakai
                    berulang. Setiap langkah kita dapat membantu mengurangi
                    limbah plastik dan menjaga kelestarian lingkungan lebih
                    efektif.
                  </p>
                </div>
              </article>
            </>
          )}
          {selectedCategory === 'kertas' && (
            <>
              <article className="bg-white rounded-xl shadow p-0 flex flex-col overflow-hidden">
                <img
                  src="/images/general/Paper-1.jpg"
                  alt="Jenis Kertas"
                  className="w-full h-56 md:h-64 object-cover"
                />
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <h3 className="font-bold text-[#2C6B3F] text-lg mb-1">
                    Jenis-jenis Kertas
                  </h3>
                  <p className="text-[#2C6B3F] text-sm md:text-base">
                    Kertas memiliki berbagai jenis seperti kertas HVS (dokumen),
                    koran, kardus (karton), kertas majalah, dan kertas
                    pembungkus. Setiap jenis memiliki proses daur ulang yang
                    berbeda dan dapat dimanfaatkan kembali menjadi produk baru.
                  </p>
                </div>
              </article>
              <article className="bg-white rounded-xl shadow p-0 flex flex-col overflow-hidden">
                <img
                  src="/images/general/Paper-2.jpg"
                  alt="Cara Memilah Kertas"
                  className="w-full h-56 md:h-64 object-cover"
                />
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <h3 className="font-bold text-[#2C6B3F] text-lg mb-1">
                    Cara Memilah Kertas
                  </h3>
                  <p className="text-[#2C6B3F] text-sm md:text-base">
                    Pisahkan kertas berdasarkan jenisnya. Hindari kertas yang
                    terkontaminasi minyak, cat, atau bahan kimia. Lipat kardus
                    untuk menghemat ruang penyimpanan. Simpan di tempat kering
                    untuk menjaga kualitas kertas.
                  </p>
                </div>
              </article>
              <article className="bg-white rounded-xl shadow p-0 flex flex-col overflow-hidden">
                <img
                  src="/images/general/Paper-3.jpg"
                  alt="Manfaat Daur Ulang Kertas"
                  className="w-full h-56 md:h-64 object-cover"
                />
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <h3 className="font-bold text-[#2C6B3F] text-lg mb-1">
                    Manfaat Daur Ulang Kertas
                  </h3>
                  <p className="text-[#2C6B3F] text-sm md:text-base">
                    Daur ulang kertas dapat menghemat air, energi, dan
                    mengurangi penebangan pohon. Satu ton kertas yang didaur
                    ulang dapat menyelamatkan 17 pohon dan menghemat 7.000 galon
                    air.
                  </p>
                </div>
              </article>
              <article className="bg-white rounded-xl shadow p-0 flex flex-col overflow-hidden">
                <img
                  src="/images/general/Paper-4.jpg"
                  alt="Tips Mengurangi Kertas"
                  className="w-full h-56 md:h-64 object-cover"
                />
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <h3 className="font-bold text-[#2C6B3F] text-lg mb-1">
                    Tips Mengurangi Penggunaan Kertas
                  </h3>
                  <p className="text-[#2C6B3F] text-sm md:text-base">
                    Kurangi penggunaan kertas dengan beralih ke media digital
                    seperti email, dokumen elektronik, dan catatan digital.
                    Selain itu, gunakan kertas secara efisien dengan mencetak
                    hanya jika benar-benar diperlukan dan manfaatkan kedua sisi
                    kertas untuk menghemat penggunaan.
                  </p>
                </div>
              </article>
            </>
          )}
          {selectedCategory === 'logam' && (
            <>
              <article className="bg-white rounded-xl shadow p-0 flex flex-col overflow-hidden">
                <img
                  src="/images/general/Metal-1.jpg"
                  alt="Jenis Logam"
                  className="w-full h-56 md:h-64 object-cover"
                />
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <h3 className="font-bold text-[#2C6B3F] text-lg mb-1">
                    Jenis-jenis Logam
                  </h3>
                  <p className="text-[#2C6B3F] text-sm md:text-base">
                    Logam terdiri dari berbagai jenis seperti aluminium (kaleng
                    minuman), besi (peralatan), tembaga (kabel), dan stainless
                    steel (peralatan dapur). Setiap jenis memiliki nilai ekonomi
                    dan proses daur ulang yang berbeda.
                  </p>
                </div>
              </article>
              <article className="bg-white rounded-xl shadow p-0 flex flex-col overflow-hidden">
                <img
                  src="/images/general/Metal-2.jpg"
                  alt="Cara Memilah Logam"
                  className="w-full h-56 md:h-64 object-cover"
                />
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <h3 className="font-bold text-[#2C6B3F] text-lg mb-1">
                    Cara Memilah Logam
                  </h3>
                  <p className="text-[#2C6B3F] text-sm md:text-base">
                    Pisahkan logam berdasarkan jenisnya. Bersihkan dari sisa
                    makanan atau kontaminan. Tekan kaleng untuk menghemat ruang
                    penyimpanan. Perhatikan logam yang mengandung bahan
                    berbahaya seperti baterai atau cat.
                  </p>
                </div>
              </article>
              <article className="bg-white rounded-xl shadow p-0 flex flex-col overflow-hidden">
                <img
                  src="/images/general/Metal-3.jpg"
                  alt="Nilai Ekonomi Logam"
                  className="w-full h-56 md:h-64 object-cover"
                />
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <h3 className="font-bold text-[#2C6B3F] text-lg mb-1">
                    Nilai Ekonomi Logam
                  </h3>
                  <p className="text-[#2C6B3F] text-sm md:text-base">
                    Logam bekas memiliki nilai jual yang baik. Daur ulang logam
                    menghemat 95% energi dibandingkan produksi dari bahan
                    mentah. Satu ton aluminium yang didaur ulang dapat menghemat
                    14.000 kWh listrik.
                  </p>
                </div>
              </article>
              <article className="bg-white rounded-xl shadow p-0 flex flex-col overflow-hidden">
                <img
                  src="/images/general/Metal-4.jpg"
                  alt="Tips Mengurangi Logam"
                  className="w-full h-56 md:h-64 object-cover"
                />
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <h3 className="font-bold text-[#2C6B3F] text-lg mb-1">
                    Tips Mengurangi Penggunaan Logam
                  </h3>
                  <p className="text-[#2C6B3F] text-sm md:text-base">
                    Batasi penggunaan logam dengan memilih produk yang tahan
                    lama dan mudah didaur ulang. Manfaatkan kembali barang logam
                    yang masih layak pakai dan dukung program daur ulang untuk
                    mengurangi limbah logam di lingkungan.
                  </p>
                </div>
              </article>
            </>
          )}
          {selectedCategory === 'kaca' && (
            <>
              <article className="bg-white rounded-xl shadow p-0 flex flex-col overflow-hidden">
                <img
                  src="/images/general/Glass-1.jpg"
                  alt="Jenis Kaca"
                  className="w-full h-56 md:h-64 object-cover"
                />
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <h3 className="font-bold text-[#2C6B3F] text-lg mb-1">
                    Jenis-jenis Kaca
                  </h3>
                  <p className="text-[#2C6B3F] text-sm md:text-base">
                    Kaca memiliki berbagai jenis seperti botol (minuman,
                    parfum), gelas, kaca jendela, dan wadah makanan. Setiap
                    jenis dapat didaur ulang menjadi produk kaca baru dengan
                    kualitas yang sama.
                  </p>
                </div>
              </article>
              <article className="bg-white rounded-xl shadow p-0 flex flex-col overflow-hidden">
                <img
                  src="/images/general/Glass-2.jpg"
                  alt="Cara Memilah Kaca"
                  className="w-full h-56 md:h-64 object-cover"
                />
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <h3 className="font-bold text-[#2C6B3F] text-lg mb-1">
                    Cara Memilah Kaca
                  </h3>
                  <p className="text-[#2C6B3F] text-sm md:text-base">
                    Pisahkan kaca berdasarkan warnanya (bening, hijau, coklat).
                    Tangani dengan hati-hati menggunakan sarung tangan untuk
                    menghindari cedera. Bersihkan dari sisa isi, tutup, dan
                    label. Hindari mencampur dengan keramik atau kristal.
                  </p>
                </div>
              </article>
              <article className="bg-white rounded-xl shadow p-0 flex flex-col overflow-hidden">
                <img
                  src="/images/general/Glass-3.jpg"
                  alt="Keamanan Penanganan Kaca"
                  className="w-full h-56 md:h-64 object-cover"
                />
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <h3 className="font-bold text-[#2C6B3F] text-lg mb-1">
                    Keamanan Penanganan Kaca
                  </h3>
                  <p className="text-[#2C6B3F] text-sm md:text-base">
                    Gunakan sarung tangan dan peralatan yang tepat saat
                    menangani kaca. Simpan dalam wadah kokoh dan tandai dengan
                    jelas. Pecahan kaca harus dibungkus kertas tebal sebelum
                    dibuang untuk menghindari cedera.
                  </p>
                </div>
              </article>
              <article className="bg-white rounded-xl shadow p-0 flex flex-col overflow-hidden">
                <img
                  src="/images/general/Glass-4.jpg"
                  alt="Tips Mengurangi Pengunaan Kaca"
                  className="w-full h-56 md:h-64 object-cover"
                />
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <h3 className="font-bold text-[#2C6B3F] text-lg mb-1">
                    Tips Mengurangi Penggunaan Kaca
                  </h3>
                  <p className="text-[#2C6B3F] text-sm md:text-base">
                    Kurangi penggunaan kaca dengan memilih wadah atau produk
                    alternatif yang lebih ringan dan mudah didaur ulang, seperti
                    plastik ramah lingkungan atau logam. Selain itu, manfaatkan
                    kembali barang kaca yang masih layak pakai untuk mengurangi
                    limbah dan menjaga keberlanjutan lingkungan.
                  </p>
                </div>
              </article>
            </>
          )}
          {selectedCategory === 'organik' && (
            <>
              <article className="bg-white rounded-xl shadow p-0 flex flex-col overflow-hidden">
                <img
                  src="/images/general/Organic-1.jpg"
                  alt="Jenis-jenis Sampah Organik"
                  className="w-full h-56 md:h-64 object-cover"
                />
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <h3 className="font-bold text-[#2C6B3F] text-lg mb-1">
                    Jenis-jenis Sampah Organik
                  </h3>
                  <p className="text-[#2C6B3F] text-sm md:text-base">
                    Sampah organik meliputi sisa makanan (sayur, buah, nasi),
                    daun kering, ranting, limbah taman, ampas kopi, dan cangkang
                    telur. Semua bahan ini dapat diproses menjadi kompos yang
                    kaya nutrisi.
                  </p>
                </div>
              </article>
              <article className="bg-white rounded-xl shadow p-0 flex flex-col overflow-hidden">
                <img
                  src="/images/general/Organic-2.jpg"
                  alt="Cara Memilah Sampah Organik"
                  className="w-full h-56 md:h-64 object-cover"
                />
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <h3 className="font-bold text-[#2C6B3F] text-lg mb-1">
                    Cara Memilah Sampah Organik
                  </h3>
                  <p className="text-[#2C6B3F] text-sm md:text-base">
                    Pisahkan sampah organik dari non-organik. Potong menjadi
                    bagian lebih kecil untuk mempercepat pengomposan. Hindari
                    memasukkan daging, tulang, atau makanan berminyak. Jaga
                    kelembaban yang seimbang.
                  </p>
                </div>
              </article>
              <article className="bg-white rounded-xl shadow p-0 flex flex-col overflow-hidden">
                <img
                  src="/images/general/Organic-3.jpg"
                  alt="Dampak Sampah Organik"
                  className="w-full h-56 md:h-64 object-cover"
                />
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <h3 className="font-bold text-[#2C6B3F] text-lg mb-1">
                    Dampak Sampah Organik
                  </h3>
                  <p className="text-[#2C6B3F] text-sm md:text-base">
                    Sampah organik yang tidak dikelola dapat menimbulkan bau dan
                    mencemari lingkungan. Dengan mengolahnya menjadi kompos,
                    kita dapat mengurangi limbah dan menghasilkan pupuk alami.
                  </p>
                </div>
              </article>
              <article className="bg-white rounded-xl shadow p-0 flex flex-col overflow-hidden">
                <img
                  src="/images/general/Organic-4.jpg"
                  alt="Tips Mengelola Sampah Organik"
                  className="w-full h-56 md:h-64 object-cover"
                />
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <h3 className="font-bold text-[#2C6B3F] text-lg mb-1">
                    Tips Mengelola Sampah Organik
                  </h3>
                  <p className="text-[#2C6B3F] text-sm md:text-base">
                    Kurangi limbah organik dengan mempraktikkan pola makan yang
                    efisien, seperti membeli bahan makanan secukupnya dan
                    mengolah sisa makanan menjadi kompos. Selain itu, manfaatkan
                    limbah organik rumah tangga untuk pupuk alami agar limbah
                    tidak terbuang sia-sia dan lingkungan tetap terjaga.
                  </p>
                </div>
              </article>
            </>
          )}
        </div>
      </section>

      {/* Tips Pemilahan Sampah */}
      <section className="w-full mx-auto px-8 md:px-10 lg:px-16 mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-[#2C6B3F] mb-4">
          Tips Pemilahan Sampah
        </h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="bg-white border border-[#2C6B3F] rounded-lg p-6 flex flex-col items-start gap-2">
            <figure
              className="rounded-full p-4 mb-4 flex items-center justify-center"
              style={{ background: '#2c6b3f' }}
            >
              <img
                src="/images/icons/Sort.svg"
                alt="Sort"
                className="w-6 h-6"
              />
            </figure>
            <h4 className="font-bold text-[#2C6B3F] text-xl mb-1">
              Pilah dari Sumbernya
            </h4>
            <p className="text-[#2C6B3F] text-sm md:text-base">
              Mulailah memilah sampah sejak di rumah supaya proses daur ulang
              dan pengolahan sampah berikutnya bisa berjalan lebih lancar dan
              efektif.
            </p>
          </article>
          <article className="bg-white border border-[#2C6B3F] rounded-lg p-6 flex flex-col items-start gap-2">
            <figure
              className="rounded-full p-4 mb-4 flex items-center justify-center"
              style={{ background: '#2c6b3f' }}
            >
              <img
                src="/images/icons/Recycle-2.svg"
                alt="Recycle"
                className="w-6 h-6"
              />
            </figure>
            <h4 className="font-bold text-[#2C6B3F] text-xl mb-1">
              Bersihkan Sebelum Buang
            </h4>
            <p className="text-[#2C6B3F] text-sm md:text-base">
              Pastikan sampah plastik bebas dari sisa makanan atau kontaminan
              sebelum dibuang agar proses daur ulang menjadi lebih efektif dan
              hasilnya lebih berkualitas.
            </p>
          </article>
          <article className="bg-white border border-[#2C6B3F] rounded-lg p-6 flex flex-col items-start gap-2">
            <figure
              className="rounded-full p-4 mb-4 flex items-center justify-center"
              style={{ background: '#2c6b3f' }}
            >
              <img
                src="/images/icons/Leaf-2.svg"
                alt="Leaf"
                className="w-6 h-6"
              />
            </figure>
            <h4 className="font-bold text-[#2C6B3F] text-xl mb-1">
              Manfaatkan Kembali
            </h4>
            <p className="text-[#2C6B3F] text-sm md:text-base">
              Usahakan untuk menggunakan kembali barang atau sampah sebelum
              membuangnya agar limbah berkurang dan sumber daya yang ada dapat
              dimanfaatkan secara lebih optimal.
            </p>
          </article>
        </div>
      </section>
    </section>
  );
};

export default EducationView;
