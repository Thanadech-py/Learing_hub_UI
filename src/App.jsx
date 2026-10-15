import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Home from './pages/Home/Home.jsx';
import SubjectPage from './pages/Subject/SubjectPage.jsx';
import TopicPage from './pages/Topic/TopicPage.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';

/**
 * Routes
 *   /                               → Home (subject list)
 *   /subjects/:subjectId            → Subject page (topic list), e.g. /subjects/physics
 *   /subjects/:subjectId/:topicId   → Dedicated Topic page with interactive lab & equations
 */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="subjects/:subjectId" element={<SubjectPage />} />
          <Route path="subjects/:subjectId/:topicId" element={<TopicPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
