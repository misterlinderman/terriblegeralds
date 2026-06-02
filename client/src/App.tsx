import { Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import PublicLayout from './components/public/PublicLayout';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Loading from './components/Loading';
import HomePage from './pages/public/HomePage';
import EventsPage from './pages/public/EventsPage';
import ComebackCityPage from './pages/public/ComebackCityPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEventsPage from './pages/admin/AdminEventsPage';
import AdminMenuPage from './pages/admin/AdminMenuPage';
import AdminFaqsPage from './pages/admin/AdminFaqsPage';
import AdminContentPage from './pages/admin/AdminContentPage';
import AdminInquiriesPage from './pages/admin/AdminInquiriesPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import { useApiAuth } from './hooks/useApiAuth';

function App() {
  const { isLoading } = useAuth0();
  useApiAuth();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/comeback-city-pizza" element={<ComebackCityPage />} />
      </Route>

      <Route path="/admin/login" element={<AdminLoginPage />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="events" element={<AdminEventsPage />} />
        <Route path="menu" element={<AdminMenuPage />} />
        <Route path="faqs" element={<AdminFaqsPage />} />
        <Route path="content" element={<AdminContentPage />} />
        <Route path="inquiries" element={<AdminInquiriesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
