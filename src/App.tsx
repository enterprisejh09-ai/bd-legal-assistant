
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AppProvider } from './context/AppContext';
import { LanguageProvider } from './context/LanguageContext';
import { ToastProvider } from './components/ui/Toast';

import { Layout } from './components/layout/Layout';

import { DashboardPage } from './pages/DashboardPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { AnalyzeCasePage } from './pages/AnalyzeCasePage';
import { LawLibraryPage } from './pages/LawLibraryPage';
import { DocumentAnalyzerPage } from './pages/DocumentAnalyzerPage';
import { DocumentGeneratorPage } from './pages/DocumentGeneratorPage';
import { CaseHistoryPage } from './pages/CaseHistoryPage';
import { LegalHelpPage } from './pages/LegalHelpPage';
import { AdminPage } from './pages/AdminPage';
import { SettingsPage } from './pages/SettingsPage';

function ComingSoon({ title }: { title: string }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-bold text-navy mb-3">{title}</h1>
      <p className="text-muted">
        This feature is under development.
      </p>
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-navy">404</h1>
      <p className="text-muted mt-2">Page not found.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AppProvider>
          <ToastProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/ai-assistant" element={<AIAssistantPage />} />
                <Route path="/analyze-case" element={<AnalyzeCasePage />} />
                <Route path="/law-library" element={<LawLibraryPage />} />
                <Route path="/document-analyzer" element={<DocumentAnalyzerPage />} />
                <Route path="/document-generator" element={<DocumentGeneratorPage />} />

                <Route path="/case-history" element={<CaseHistoryPage />} />
                <Route path="/legal-help" element={<LegalHelpPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </ToastProvider>
        </AppProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
