import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import subjects from '../../data/subjects/index.js';
import { getTopicData } from '../../data/topicRegistry.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { localizeSubject, localizeTopicData } from '../../i18n/thaiTranslations.js';
import LanguageSlider from '../LanguageSlider/LanguageSlider.jsx';
import SubjectIcon from '../SubjectCard/SubjectIcon.jsx';
import logoImg from '../logo/Logo.png';
import './Layout.css';

/**
 * Shared application shell featuring:
 * - Collapsible Left Navigation Sidebar (with subject tree, sub-topics, and quick filter)
 * - Toggle button to hide/show the sidebar at any time
 * - Responsive top bar with ENG / ไทย sliding language switcher
 */
export default function Layout() {
  const location = useLocation();
  const { lang, t } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 960) {
      return false;
    }
    const saved = typeof window !== 'undefined' ? localStorage.getItem('ls_sidebar_open') : null;
    return saved !== null ? saved === 'true' : true;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSubjects, setExpandedSubjects] = useState(() => ({
    physics: true,
    mathematics: true,
    'linear-algebra': true,
    'com-prog': false,
  }));

  useEffect(() => {
    try {
      localStorage.setItem('ls_sidebar_open', String(isSidebarOpen));
    } catch {
      // ignore storage errors
    }
  }, [isSidebarOpen]);

  // Automatically expand the active subject in the sidebar when navigating
  useEffect(() => {
    const parts = location.pathname.split('/').filter(Boolean);
    if (parts[0] === 'subjects' && parts[1]) {
      setExpandedSubjects((prev) => ({ ...prev, [parts[1]]: true }));
    }
  }, [location.pathname]);

  const handleMobileNavClick = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 960) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSubjectExpand = (subjectId) => {
    setExpandedSubjects((prev) => ({
      ...prev,
      [subjectId]: !prev[subjectId],
    }));
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();

  return (
    <div className={`app-shell ${isSidebarOpen ? 'app-shell--sidebar-open' : 'app-shell--sidebar-closed'}`}>
      {/* Collapsible Left Navigation Sidebar */}
      <aside
        className={`app-sidebar ${isSidebarOpen ? 'app-sidebar--open' : 'app-sidebar--closed'}`}
        aria-label="Primary Subject & Topic Navigation"
      >
        <div className="app-sidebar__top">
          <Link to="/" className="layout__logo" onClick={handleMobileNavClick}>
            <img src={logoImg} alt="Learning Space Logo" className="layout__logo-img" />
            <div className="layout__logo-block">
              <span className="layout__logo-text">Learning Space</span>
              <span className="layout__logo-sub">
                {t('Interactive STEM Lab', 'ห้องทดลอง STEM เชิงโต้ตอบ')}
              </span>
            </div>
          </Link>

          <button
            type="button"
            className="sidebar-hide-btn"
            onClick={() => setIsSidebarOpen(false)}
            title={t('Hide navigation sidebar', 'ซ่อนแถบเมนูด้านข้าง')}
            aria-label="Hide navigation sidebar"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{t('Hide', 'ซ่อน')}</span>
          </button>
        </div>

        {/* Quick Topic Search Filter */}
        <div className="app-sidebar__search">
          <input
            type="search"
            className="app-sidebar__search-input"
            placeholder={t('Filter topics or chapters...', 'ค้นหาบทเรียนหรือหัวข้อ...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Filter topics"
          />
        </div>

        {/* Navigation Links Tree */}
        <nav className="app-sidebar__nav">
          <Link
            to="/"
            className={`sidebar-home-link ${location.pathname === '/' ? 'sidebar-home-link--active' : ''}`}
            onClick={handleMobileNavClick}
          >
            <span className="sidebar-home-link__icon" aria-hidden="true">🏠</span>
            <span>{t('All Subjects Home', 'หน้าหลักรวมทุกวิชา')}</span>
          </Link>

          <div className="sidebar-subjects-list">
            {subjects.map((rawSubj) => {
              const subj = localizeSubject(rawSubj, lang);
              const isSubjActive = location.pathname.startsWith(`/subjects/${subj.id}`);
              const filteredTopics = normalizedQuery
                ? subj.topics.filter(
                    (tp) =>
                      tp.title.toLowerCase().includes(normalizedQuery) ||
                      tp.description?.toLowerCase().includes(normalizedQuery)
                  )
                : subj.topics;

              if (normalizedQuery && filteredTopics.length === 0) {
                return null;
              }

              const isExpanded = normalizedQuery ? true : Boolean(expandedSubjects[subj.id]);

              return (
                <div
                  key={subj.id}
                  className={`sidebar-subject-group ${isSubjActive ? 'sidebar-subject-group--active' : ''}`}
                  style={{ '--subj-accent': subj.accent }}
                >
                  <div className="sidebar-subject-header">
                    <Link
                      to={`/subjects/${subj.id}`}
                      className="sidebar-subject-link"
                      onClick={handleMobileNavClick}
                    >
                      <span className="sidebar-subject-icon">
                        <SubjectIcon name={subj.icon} />
                      </span>
                      <span className="sidebar-subject-title">{subj.title}</span>
                      <span className="sidebar-subject-count">{subj.topics.length}</span>
                    </Link>
                    <button
                      type="button"
                      className="sidebar-subject-chevron"
                      onClick={() => toggleSubjectExpand(subj.id)}
                      aria-label={isExpanded ? `Collapse ${subj.title}` : `Expand ${subj.title}`}
                    >
                      <span className={`chevron-icon ${isExpanded ? 'chevron-icon--open' : ''}`}>▾</span>
                    </button>
                  </div>

                  {isExpanded && (
                    <ul className="sidebar-topics-ul">
                      {filteredTopics.map((topic, idx) => {
                        const topicPath = `/subjects/${subj.id}/${topic.id}`;
                        const isTopicActive =
                          location.pathname === topicPath ||
                          location.pathname.startsWith(`${topicPath}/`);
                        const richTopic = localizeTopicData(
                          getTopicData(subj.id, topic.id),
                          subj.id,
                          topic.id,
                          lang
                        );
                        const subPages = richTopic?.subPages || [];

                        return (
                          <li key={topic.id} className="sidebar-topic-li">
                            <Link
                              to={topicPath}
                              className={`sidebar-topic-link ${isTopicActive ? 'sidebar-topic-link--active' : ''}`}
                              onClick={handleMobileNavClick}
                            >
                              <span className="sidebar-topic-num">
                                {String(idx + 1).padStart(2, '0')}
                              </span>
                              <span className="sidebar-topic-name">{topic.title}</span>
                              {topic.inDevelopment && (
                                <span
                                  style={{
                                    marginLeft: 'auto',
                                    fontSize: '0.62rem',
                                    fontWeight: 700,
                                    padding: '0.1rem 0.4rem',
                                    borderRadius: '999px',
                                    background: 'rgba(251, 191, 36, 0.14)',
                                    color: '#fbbf24',
                                    border: '1px solid rgba(251, 191, 36, 0.35)',
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  {t('In Dev', 'กำลังพัฒนา')}
                                </span>
                              )}
                            </Link>

                            {/* Show sub-pages when topic is active or has subPages matching filter */}
                            {subPages.length > 1 && isTopicActive && (
                              <ul className="sidebar-subpages-ul">
                                {subPages.map((sp, spIdx) => {
                                  const spUrl =
                                    spIdx === 0
                                      ? topicPath
                                      : `${topicPath}/${sp.id}`;
                                  const isSpActive =
                                    spIdx === 0
                                      ? location.pathname === topicPath ||
                                        location.pathname === `${topicPath}/${sp.id}`
                                      : location.pathname === spUrl;
                                  return (
                                    <li key={sp.id}>
                                      <Link
                                        to={spUrl}
                                        className={`sidebar-subpage-link ${isSpActive ? 'sidebar-subpage-link--active' : ''}`}
                                        onClick={handleMobileNavClick}
                                      >
                                        <span>{sp.icon || '•'}</span>
                                        <span>{sp.title}</span>
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* Mobile Backdrop when sidebar is open on small screens */}
      {isSidebarOpen && (
        <div
          className="app-sidebar-backdrop"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Content Area */}
      <div className="layout">
        <header className="layout__nav">
          <div className="layout__nav-left">
            <button
              type="button"
              className="sidebar-toggle-btn"
              onClick={() => setIsSidebarOpen((open) => !open)}
              title={isSidebarOpen ? 'Hide navigation sidebar' : 'Show navigation sidebar'}
              aria-expanded={isSidebarOpen}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <line x1="9" y1="3" x2="9" y2="21" />
              </svg>
              <span>
                {isSidebarOpen
                  ? t('Hide Menu', 'ซ่อนเมนู')
                  : t('Show Menu', 'เปิดเมนู')}
              </span>
            </button>

            {!isSidebarOpen && (
              <Link to="/" className="layout__logo">
                <img src={logoImg} alt="Learning Space Logo" className="layout__logo-img" />
                <span className="layout__logo-text">Learning Space</span>
              </Link>
            )}
          </div>

          <div className="layout__nav-right">
            {subjects.map((rawSubj) => {
              const s = localizeSubject(rawSubj, lang);
              const active = location.pathname.startsWith(`/subjects/${s.id}`);
              return (
                <Link
                  key={s.id}
                  to={`/subjects/${s.id}`}
                  className={`layout__top-pill ${active ? 'layout__top-pill--active' : ''}`}
                  style={{ '--pill-accent': s.accent }}
                >
                  {s.title}
                </Link>
              );
            })}

            {/* Top-of-page ENG / ไทย Slide Language Switcher */}
            <LanguageSlider />
          </div>
        </header>

        <main className="layout__main">
          <Outlet />
        </main>

        <footer className="layout__footer">
          © {new Date().getFullYear()} Learning Space by Thxncdzch ·{' '}
          {t(
            'Interactive 2D & 3D STEM Visualizations',
            'สื่อการเรียนรู้และจำลองภาพโต้ตอบ 2D & 3D ทางวิทยาศาสตร์และวิศวกรรม'
          )}
        </footer>
      </div>
    </div>
  );
}
