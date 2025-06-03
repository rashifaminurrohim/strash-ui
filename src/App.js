import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from './layouts/MainLayout';
import WasteClassifier from './components/classifier/WasteClassifier';
import Home from './pages/Home';
import Education from './pages/Education';
import LeaderboardPage from './pages/Leaderboard';
import Login from './pages/Login';
import Register from './pages/Register';
import HistoryPage from './components/history/HistoryPage';
import Profile from './pages/Profile';
import { auth } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('userId');
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Public Route Component (redirects to classify if already logged in)
const PublicRoute = ({ children }) => {
  const user = localStorage.getItem('userId');
  if (user) {
    return <Navigate to="/classify" replace />;
  }
  return children;
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <MainLayout>
          <Home />
        </MainLayout>
      ),
    },
    {
      path: "/classify",
      element: (
        <ProtectedRoute>
          <MainLayout>
            <WasteClassifier />
          </MainLayout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/history",
      element: (
        <ProtectedRoute>
          <MainLayout>
            <HistoryPage />
          </MainLayout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/education",
      element: (
        <MainLayout>
          <Education />
        </MainLayout>
      ),
    },
    {
      path: "/leaderboard",
      element: (
        <MainLayout>
          <LeaderboardPage />
        </MainLayout>
      ),
    },
    {
      path: "/login",
      element: (
        <PublicRoute>
          <MainLayout>
            <Login />
          </MainLayout>
        </PublicRoute>
      ),
    },
    {
      path: "/register",
      element: (
        <PublicRoute>
          <MainLayout>
            <Register />
          </MainLayout>
        </PublicRoute>
      ),
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute>
          <MainLayout>
            <Profile />
          </MainLayout>
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        localStorage.setItem('token', token);
        localStorage.setItem('userId', user.uid);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App; 