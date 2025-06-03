import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex-1 flex-col items-center">
      <Navbar />
      <main className="min-h-screen flex flex-col px-2 sm:px-4 md:px-8 bg-white mt-24 items-center">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout; 