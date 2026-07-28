import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import PublicLayout from './components/public/PublicLayout';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Loading from './components/Loading';
import HomePage from './pages/public/HomePage';
import MenuPage from './pages/public/MenuPage';
import AboutPage from './pages/public/AboutPage';
import CateringPage from './pages/public/CateringPage';
import EventsPage from './pages/public/EventsPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEventsPage from './pages/admin/AdminEventsPage';
import AdminMenuPage from './pages/admin/AdminMenuPage';
import AdminCateringTiersPage from './pages/admin/AdminCateringTiersPage';
import AdminVenuesPage from './pages/admin/AdminVenuesPage';
import AdminPressFeaturesPage from './pages/admin/AdminPressFeaturesPage';
import AdminFaqsPage from './pages/admin/AdminFaqsPage';
import AdminContentPage from './pages/admin/AdminContentPage';
import AdminInquiriesPage from './pages/admin/AdminInquiriesPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import { useApiAuth } from './hooks/useApiAuth';

const Phase0VerifyPage = import.meta.env.DEV
  ? lazy(() => import('./pages/dev/Phase0VerifyPage'))
  : null;

const Phase1DsDemoPage = import.meta.env.DEV
  ? lazy(() => import('./pages/dev/Phase1DsDemoPage'))
  : null;

function App() {
  const { isLoading } = useAuth0();
  useApiAuth();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Routes>
      {Phase1DsDemoPage ? (
        <Route
          path="/dev/phase-1"
          element={
            <Suspense fallback={<Loading />}>
              <Phase1DsDemoPage />
            </Suspense>
          }
        />
      ) : null}

      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/catering" element={<CateringPage />} />
        <Route path="/events" element={<EventsPage />} />
        {Phase0VerifyPage ? (
          <Route
            path="/dev/phase-0"
            element={
              <Suspense fallback={<Loading />}>
                <Phase0VerifyPage />
              </Suspense>
            }
          />
        ) : null}
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
        <Route path="catering-tiers" element={<AdminCateringTiersPage />} />
        <Route path="venues" element={<AdminVenuesPage />} />
        <Route path="press-features" element={<AdminPressFeaturesPage />} />
        <Route path="faqs" element={<AdminFaqsPage />} />
        <Route path="content" element={<AdminContentPage />} />
        <Route path="inquiries" element={<AdminInquiriesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
