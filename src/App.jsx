import { HashRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext.jsx';
import Layout from './components/Layout/Layout.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Home from './pages/Home/Home.jsx';
import SubjectPage from './pages/Subject/SubjectPage.jsx';
import TopicPage from './pages/Topic/TopicPage.jsx';
import HandbooksPage from './pages/Handbooks/HandbooksPage.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';

/**
 * Routes (using HashRouter for GitHub Pages & static hosting compatibility)
 *   /#/                               → Home (subject list)
 *   /#/subjects/:subjectId            → Subject page (topic list), e.g. /#/subjects/physics
 *   /#/subjects/:subjectId/:topicId   → Dedicated Topic page with interactive lab & equations
 */
export default function App() {
  return (
    <LanguageProvider>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="handbooks" element={<HandbooksPage />} />
            <Route path="subjects/:subjectId" element={<SubjectPage />} />
            <Route path="subjects/:subjectId/:topicId" element={<TopicPage />} />
            <Route path="subjects/:subjectId/:topicId/:subTopicId" element={<TopicPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </LanguageProvider>
  );
}
