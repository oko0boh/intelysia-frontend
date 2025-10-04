import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import BusinessDetailPage from './pages/BusinessDetailPage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import CategoryPage from './pages/CategoryPage';
import LocationPage from './pages/LocationPage';
import SearchPage from './pages/SearchPage';
import BlogPostPage from './pages/BlogPostPage';
import ArticlePage from './pages/ArticlePage';
import ClaimBusinessPage from './pages/ClaimBusinessPage';
import RegisterBusinessPage from './pages/RegisterBusinessPage';
import BusinessOwnerDashboard from './pages/BusinessOwnerDashboard';
import AdminBulkImportPage from './pages/AdminBulkImportPage';
import EmailSetupPage from './pages/EmailSetupPage';

// Redirect component for singular article URLs
const ArticleRedirect: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/articles/${slug}`} replace />;
};

export function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* English routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/business/:id" element={<BusinessDetailPage />} />
              <Route path="/business/:id/:slug" element={<BusinessDetailPage />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/location/:location" element={<LocationPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/articles/:slug" element={<ArticlePage />} />
              {/* Redirect from singular /article to plural /articles */}
              <Route path="/article/:slug" element={<ArticleRedirect />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/claim-business" element={<ClaimBusinessPage />} />
              <Route path="/register-business" element={<RegisterBusinessPage />} />
              <Route path="/business-dashboard" element={<BusinessOwnerDashboard />} />
              <Route path="/admin/bulk-import" element={<AdminBulkImportPage />} />
              <Route path="/admin/email-setup" element={<EmailSetupPage />} />
              
              {/* French routes - mirror structure with /fr/ prefix */}
              <Route path="/fr" element={<HomePage />} />
              <Route path="/fr/business/:id" element={<BusinessDetailPage />} />
              <Route path="/fr/business/:id/:slug" element={<BusinessDetailPage />} />
              <Route path="/fr/category/:category" element={<CategoryPage />} />
              <Route path="/fr/location/:location" element={<LocationPage />} />
              <Route path="/fr/search" element={<SearchPage />} />
              <Route path="/fr/blog" element={<BlogPage />} />
              <Route path="/fr/blog/:slug" element={<BlogPostPage />} />
              <Route path="/fr/articles/:slug" element={<ArticlePage />} />
              <Route path="/fr/about" element={<AboutPage />} />
              <Route path="/fr/claim-business" element={<ClaimBusinessPage />} />
              <Route path="/fr/register-business" element={<RegisterBusinessPage />} />
              <Route path="/fr/business-dashboard" element={<BusinessOwnerDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}