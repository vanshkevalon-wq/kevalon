import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import PortfolioPage from "./pages/PortfolioPage";
import ContactPage from "./pages/ContactPage";
import ApplyNowPage from "./pages/ApplyNowPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminProfilePage from "./pages/AdminProfilePage";
import WebAppDevelopmentPage from "./pages/WebAppDevelopmentPage";
import WebERPDevelopmentPage from "./pages/WebERPDevelopmentPage";
import ApiDevelopmentPage from "./pages/ApiDevelopmentPage";
import SeoDigitalMarketingPage from "./pages/SeoDigitalMarketingPage";
import MobileApplicationDevelopmentPage from "./pages/MobileApplicationDevelopmentPage";
import GameDevelopmentPage from "./pages/GameDevelopmentPage";
import ECommerceDevelopmentPage from "./pages/ECommerceDevelopmentPage";
import CRMDevelopmentPage from "./pages/CRMDevelopmentPage";
import FieldForceManagementPage from "./pages/FieldForceManagementPage";
import CaseStudyPage from "./pages/CaseStudyPage";
import ProjectPreviewPage from "./pages/ProjectPreviewPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import CareersPage from "./pages/CareersPage";
import InternshipTrainingPage from "./pages/InternshipTrainingPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import ScrollToTop from "./components/ScrollToTop";
import Cursor from "./components/Cursor";

function AdminRouteGate() {
  const token = localStorage.getItem('kevalon-admin-token');
  return <Navigate to={token ? '/admin/dashboard' : '/admin/login'} replace />;
}

function App() {
  return (
    <>
      <Cursor />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/web-application-development" element={<WebAppDevelopmentPage />} />
          <Route path="services/mobile-application-development" element={<MobileApplicationDevelopmentPage />} />
          <Route path="services/game-development" element={<GameDevelopmentPage />} />
          <Route path="services/e-commerce-development" element={<ECommerceDevelopmentPage />} />
          <Route path="services/web-erp-development" element={<WebERPDevelopmentPage />} />
          <Route path="services/api-development" element={<ApiDevelopmentPage />} />
          <Route path="services/crm-development" element={<CRMDevelopmentPage />} />
          <Route path="services/field-force-management" element={<FieldForceManagementPage />} />
          <Route path="services/seo-digital-marketing" element={<SeoDigitalMarketingPage />} />
          <Route path="case-study/:slug" element={<CaseStudyPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="project-preview/:slug" element={<ProjectPreviewPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="apply-now" element={<ApplyNowPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:id" element={<BlogDetailPage />} />
          <Route path="careers" element={<CareersPage />} />
          <Route path="services/internship-training" element={<InternshipTrainingPage />} />
        </Route>
        <Route path="/admin" element={<AdminRouteGate />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/profile" element={<AdminProfilePage />} />
      </Routes>
    </>
  );
}

export default App;