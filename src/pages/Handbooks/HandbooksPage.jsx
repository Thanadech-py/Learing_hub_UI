import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  getHandbooksSummary,
  triggerDirectDownload,
} from '../../data/handbooksRegistry.js';
import {
  useDynamicHandbooks,
  resolveSubjectMeta,
} from '../../services/googleDriveSync.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './HandbooksPage.css';

const SUBJECT_ACCENTS = {
  physics: '#38bdf8',
  'linear-algebra': '#a78bfa',
  'com-prog': '#34d399',
  mathematics: '#f59e0b',
};

const TOPIC_TITLES = {
  vectors: { en: 'Vectors', th: 'เวกเตอร์' },
  'linear-combinations': { en: 'Linear Combinations', th: 'ผลรวมเชิงเส้น' },
  matrices: { en: 'Matrices', th: 'เมทริกซ์' },
  'matrix-multiplication': { en: 'Matrix Multiplication', th: 'การคูณเมทริกซ์' },
  'linear-transformations': { en: 'Linear Transformations', th: 'การแปลงเชิงเส้น' },
  'systems-of-equations': { en: 'Systems of Equations', th: 'ระบบสมการเชิงเส้น' },
  determinants: { en: 'Determinants', th: 'ดีเทอร์มิแนนต์' },
  'vector-spaces': { en: 'Vector Spaces', th: 'ปริภูมิเวกเตอร์' },
  orthogonal: { en: 'Projections & Least Squares', th: 'การฉายภาพและกำลังสองน้อยที่สุด' },
  'eigenvalues-and-eigenvectors': { en: 'Eigenvalues & Eigenvectors', th: 'ไอเกนแวลูและไอเกนเวกเตอร์' },
  diagonalization: { en: 'Diagonalization & Powers', th: 'การแปลงทแยงมุมและเลขยกกำลัง' },
  'symmetric-matrices': { en: 'Symmetric & Spectral', th: 'เมทริกซ์สมมาตรและทฤษฎีบทสเปกตรัม' },
  'positive-definite': { en: 'Positive Definite Matrices', th: 'เมทริกซ์โพซิตีฟเดฟินิต' },
  svd: { en: 'Singular Value Decomposition (SVD)', th: 'การแยกค่าเอกฐาน (SVD)' },
  kinematics: { en: 'Kinematics', th: 'จลนศาสตร์' },
  'newtons-laws': { en: "Newton's Laws", th: 'กฎของนิวตัน' },
  'work-and-energy': { en: 'Work & Energy', th: 'งานและพลังงาน' },
  momentum: { en: 'Momentum', th: 'โมเมนตัม' },
  'circular-motion': { en: 'Rotational Dynamics', th: 'พลศาสตร์การหมุน' },
  elasticity: { en: 'Elasticity & Modulus', th: 'ความยืดหยุ่นและมอดุลัส' },
  'fluid-mechanics': { en: 'Fluid Mechanics', th: 'กลศาสตร์ของไหล' },
  oscillations: { en: 'Oscillations', th: 'การแกว่งกวัด' },
  waves: { en: 'Waves & Sound', th: 'คลื่นและเสียง' },
  thermodynamics: { en: 'Thermodynamics', th: 'อุณหพลศาสตร์' },
  'units-and-measurement': { en: 'Units & Measurement', th: 'หน่วยและมิติ' },
  'c-programming': { en: 'C Programming', th: 'การเขียนโปรแกรมภาษา C' },
  'py-programming': { en: 'Python Programming', th: 'การเขียนโปรแกรมภาษา Python' },
  'number-systems': { en: 'Number Systems', th: 'ระบบจำนวน' },
  'algebraic-expressions': { en: 'Algebraic Expressions', th: 'นิพจน์พีชคณิต' },
  functions: { en: 'Functions', th: 'ฟังก์ชัน' },
  trigonometry: { en: 'Trigonometry', th: 'ตรีโกณมิติ' },
  limits: { en: 'Limits', th: 'ลิมิตและความต่อเนื่อง' },
  derivatives: { en: 'Derivatives', th: 'อนุพันธ์' },
  integrals: { en: 'Integrals & Integration', th: 'ปริพันธ์และเทคนิคการอินทิเกรต' },
};

const LA_SERIES_ROADMAP = [
  { code: 'LA-01', id: 'la-01-vectors', labelEn: '01 Vectors', labelTh: '01 เวกเตอร์' },
  { code: 'LA-02', id: 'la-02-solving-elimination', labelEn: '02 Elimination', labelTh: '02 การกำจัดเกาส์' },
  { code: 'LA-03', id: 'la-03-vector-spaces', labelEn: '03 Subspaces', labelTh: '03 ปริภูมิย่อย' },
  { code: 'LA-04', id: 'la-04-determinants', labelEn: '04 Determinants', labelTh: '04 ดีเทอร์มิแนนต์' },
  { code: 'LA-05', id: 'la-05-linear-transformations', labelEn: '05 Transforms', labelTh: '05 การแปลงเชิงเส้น' },
  { code: 'LA-06', id: 'la-06-diagonalization', labelEn: '06 Diagonalization', labelTh: '06 เมทริกซ์ทแยงมุม', isNew: false},
  { code: 'LA-07', id: 'la-07-symmetric-spectral', labelEn: '07 Symmetric & Spectral', labelTh: '07 เมทริกซ์สมมาตร', isNew: false },
  { code: 'LA-08', id: 'la-08-positive-definite', labelEn: '08 Positive Definite', labelTh: '08 โพซิตีฟเดฟินิต', isNew: false },
  { code: 'LA-09', id: 'la-09-svd', labelEn: '09 SVD & Pseudoinverse', labelTh: '09 ค่าเอกฐาน SVD', isNew: false },
];

export default function HandbooksPage() {
  const { lang, t } = useLanguage();
  const isThai = lang === 'th';

  const {
    catalog,
    discoveredSubjects,
    isSyncing,
    syncNow,
  } = useDynamicHandbooks();

  const [selectedSubject, setSelectedSubject] = useState('all');
  const [langFilter, setLangFilter] = useState('all'); // 'all' | 'th' | 'en'
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState({});

  const summary = useMemo(() => getHandbooksSummary(catalog), [catalog]);

  const subjectsFilterList = useMemo(() => {
    const allTab = {
      id: 'all',
      icon: '📦',
      labelEn: 'All Releases',
      labelTh: 'เอกสารทั้งหมด',
      count: catalog.length,
    };

    const dynamicTabs = discoveredSubjects.map((sub) => ({
      id: sub.id,
      icon: sub.icon || '📁',
      labelEn: sub.labelEn,
      labelTh: sub.labelTh,
      count: catalog.filter((h) => h.subjectId === sub.id).length,
      accent: sub.accent,
    }));

    return [allTab, ...dynamicTabs];
  }, [catalog, discoveredSubjects]);

  const filteredHandbooks = useMemo(() => {
    let list = catalog;

    if (selectedSubject !== 'all') {
      list = list.filter((h) => h.subjectId === selectedSubject);
    }

    if (langFilter === 'th') {
      list = list.filter((h) => h.editions?.th?.available);
    } else if (langFilter === 'en') {
      list = list.filter((h) => h.editions?.en?.available);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (h) =>
          (h.code && h.code.toLowerCase().includes(q)) ||
          h.title.toLowerCase().includes(q) ||
          h.titleTh.toLowerCase().includes(q) ||
          h.description.toLowerCase().includes(q) ||
          h.descriptionTh.toLowerCase().includes(q) ||
          h.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }
    return list;
  }, [catalog, selectedSubject, langFilter, searchQuery]);

  const toggleExpand = (id) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const allFilteredExpanded =
    filteredHandbooks.length > 0 && filteredHandbooks.every((h) => Boolean(expandedIds[h.id]));

  const handleToggleAll = () => {
    if (allFilteredExpanded) {
      setExpandedIds({});
    } else {
      const next = {};
      filteredHandbooks.forEach((h) => {
        next[h.id] = true;
      });
      setExpandedIds(next);
    }
  };

  const scrollToHandbook = (id) => {
    if (selectedSubject !== 'all' && selectedSubject !== 'linear-algebra') {
      setSelectedSubject('linear-algebra');
    }
    setExpandedIds((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('handbook-strip--highlight');
        setTimeout(() => el.classList.remove('handbook-strip--highlight'), 2200);
      }
    }, 100);
  };

  const showLaRoadmap = selectedSubject === 'all' || selectedSubject === 'linear-algebra';

  return (
    <div className="handbooks-page">
      {/* Breadcrumb Navigation */}
      <nav className="handbooks-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">{t('Home', 'หน้าหลัก')}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{t('Master Handbooks & Releases', 'คลังเอกสารสรุปและดาวน์โหลด')}</span>
      </nav>

      {/* Hero Header */}
      <header className="handbooks-hero">
        <div className="handbooks-hero__top-row">
          <div className="handbooks-hero__badge">
            <span>☁️ GOOGLE DRIVE CLOUD REPOSITORY • DIRECT DOWNLOAD LEDGER</span>
          </div>
          <div className="handbooks-telemetry">
            <span className="handbooks-telemetry__chip">
              <strong>{summary.totalVolumes}</strong> {t('Volumes', 'เล่มหลัก')}
            </span>
            <span className="handbooks-telemetry__chip handbooks-telemetry__chip--th">
              🇹🇭 <strong>{summary.thCount}</strong> {t('Thai PDFs', 'ฉบับภาษาไทย')}
            </span>
            <span className="handbooks-telemetry__chip handbooks-telemetry__chip--en">
              🇬🇧 <strong>{summary.enCount}</strong> {t('English PDFs', 'ฉบับภาษาอังกฤษ')}
            </span>
            <button
              type="button"
              className="handbooks-telemetry__sync-btn"
              onClick={() => syncNow(true)}
              disabled={isSyncing}
              title={t(
                'Sync latest folders and PDF handbooks from Google Drive',
                'ซิงก์โฟลเดอร์วิชาและไฟล์ PDF ล่าสุดจาก Google Drive'
              )}
            >
              <span aria-hidden="true">{isSyncing ? '⏳' : '🔄'}</span>
              <span>
                {isSyncing
                  ? t('Syncing Drive...', 'กำลังซิงก์ Drive...')
                  : t('Sync Drive', 'ซิงก์ข้อมูล Drive')}
              </span>
            </button>
          </div>
        </div>

        <h1 className="handbooks-hero__title">
          {t('Official Master Reference Handbooks', 'คลังเอกสารสรุปและคู่มืออ้างอิงมาตรฐาน')}
        </h1>
        <p className="handbooks-hero__subtitle">
          {t(
            'Select and download synthesized university reference handbooks in Thai (TH) or English (EN). Hosted on Google Drive for zero-bloat instant direct-to-device downloads.',
            'เลือกดาวน์โหลดเอกสารสรุปเนื้อหาหลักแยกตามรายวิชาและภาษา (ฉบับภาษาไทย TH / ฉบับภาษาอังกฤษ EN) เชื่อมต่อโดยตรงกับคลัง Google Drive กดดาวน์โหลดลงเครื่องได้ทันทีโดยไม่ต้องเปลี่ยนหน้า'
          )}
        </p>

        {/* Copyright Safety Assurance Banner */}
        <div className="handbooks-copyright-banner">
          <div className="handbooks-copyright-banner__icon">🛡️</div>
          <div className="handbooks-copyright-banner__text">
            <strong>
              {t('Copyright-Compliant Original Synthesis', 'เอกสารสังเคราะห์มาตรฐาน ปลอดภัยทางลิขสิทธิ์ 100%')}
            </strong>
            <p>
              {t(
                'All documents in this release index are original synthesized study guides engineered for Learning Hub. Zero raw textbook scans or proprietary slides are distributed.',
                'เอกสารทุกฉบับในรายการนี้เป็นคู่มือสรุปเนื้อหาที่สังเคราะห์และเรียบเรียงขึ้นใหม่สำหรับ Learning Hub โดยเฉพาะ ไม่มีการแจกจ่ายไฟล์สแกนตำราหรือสไลด์ต้นฉบับ'
              )}
            </p>
          </div>
        </div>

        {/* Linear Algebra Full Curriculum Roadmap Strip */}
        {showLaRoadmap && (
          <div className="la-roadmap-card">
            <div className="la-roadmap-card__header">
              <span className="la-roadmap-card__badge">📐 LINEAR ALGEBRA MASTER SERIES</span>
              <h3 className="la-roadmap-card__title">
                {t('Core Curriculum Volumes 01 → 10 Complete Roadmap', 'แผนผังหลักสูตรพีชคณิตเชิงเส้น เล่ม 01 ถึง 10 ครบวงจร พร้อมทั้งเอกสารเตรียมสอบ Final')}
              </h3>
            </div>
            <p className="la-roadmap-card__desc">
              {t(
                'Volumes 06 (Diagonalization), 07 (Symmetric & Spectral), 08 (Positive Definite), and 09 (Singular Value Decomposition) are newly published in both Thai and English. Click any volume below to jump directly to its download entry:',
                'เล่มที่ 06 (การแปลงทแยงมุม), 07 (เมทริกซ์สมมาตรและสเปกตรัม), 08 (โพซิตีฟเดฟินิต) และ 09 (การแยกค่าเอกฐาน SVD) ได้รับการเพิ่มเข้ามาใหม่ทั้งฉบับภาษาไทยและอังกฤษ คลิกเล่มใดก็ได้เพื่อเลื่อนไปยังรายการดาวน์โหลด:'
              )}
            </p>
            <div className="la-roadmap-chips">
              {LA_SERIES_ROADMAP.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`la-roadmap-chip ${item.isNew ? 'la-roadmap-chip--new' : ''}`}
                  onClick={() => scrollToHandbook(item.id)}
                  title={`${isThai ? item.labelTh : item.labelEn} (${item.code})`}
                >
                  <span className="la-roadmap-chip__code">{item.code}</span>
                  <span className="la-roadmap-chip__label">{isThai ? item.labelTh : item.labelEn}</span>
                  {item.isNew && <span className="la-roadmap-chip__new-tag">✨ NEW</span>}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Toolbar: Subject Tabs + Language Selector + Search */}
      <div className="handbooks-toolbar">
        <div className="handbooks-toolbar__row">
          {/* Subject Filter Pills (Dynamically updated when new subject folders are added on Drive) */}
          <div className="handbooks-subject-pills" role="tablist" aria-label="Filter by subject">
            {subjectsFilterList.map((sub) => (
              <button
                key={sub.id}
                type="button"
                role="tab"
                aria-selected={selectedSubject === sub.id}
                className={`handbooks-pill ${selectedSubject === sub.id ? 'handbooks-pill--active' : ''}`}
                onClick={() => setSelectedSubject(sub.id)}
              >
                <span aria-hidden="true">{sub.icon}</span>
                <span>{isThai ? sub.labelTh : sub.labelEn}</span>
                <span className="handbooks-pill__count">{sub.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="handbooks-toolbar__row handbooks-toolbar__row--sub">
          <div className="handbooks-search-box">
            <span className="handbooks-search-icon" aria-hidden="true">🔍</span>
            <input
              type="search"
              className="handbooks-search-input"
              placeholder={t(
                'Filter releases by code (e.g. LA-06, PHY-01), title, topic, or keyword...',
                'ค้นหารหัสเอกสาร (เช่น LA-06, PHY-01), ชื่อเรื่อง, คำสำคัญ หรือหัวข้อ...'
              )}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="handbooks-search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="handbooks-toolbar__meta-actions">
            <span className="handbooks-result-count">
              {t(
                `Showing ${filteredHandbooks.length} of ${catalog.length} releases`,
                `แสดง ${filteredHandbooks.length} จาก ${catalog.length} รายการ`
              )}
            </span>
            <button
              type="button"
              className="handbooks-expand-all-btn"
              onClick={handleToggleAll}
            >
              {allFilteredExpanded
                ? t('▴ Collapse All Details', '▴ ย่อรายละเอียดทั้งหมด')
                : t('▾ Expand All Details', '▾ ขยายรายละเอียดทั้งหมด')}
            </button>
          </div>
        </div>
      </div>

      {/* Ubuntu-Style Release Strip Table */}
      {filteredHandbooks.length > 0 ? (
        <div className="handbook-ledger" role="region" aria-label="Handbooks Release Table">
          {/* Table Column Header Strip */}
          <div className="handbook-ledger__head" aria-hidden="true">
            <div className="handbook-ledger__col handbook-ledger__col--doc">
              {t('RELEASE / DOCUMENT TITLE', 'รหัส / ชื่อเอกสารคู่มืออ้างอิง')}
            </div>
            <div className="handbook-ledger__col handbook-ledger__col--meta">
              {t('DISCIPLINE & TAGS', 'หมวดวิชาและหัวข้อสำคัญ')}
            </div>
            <div className="handbook-ledger__col handbook-ledger__col--size">
              {t('AVAILABLE EDITIONS & PAGES', 'ขนาดไฟล์และจำนวนหน้า')}
            </div>
            <div className="handbook-ledger__col handbook-ledger__col--actions" />
          </div>

          {/* Release Strip Rows */}
          <div className="handbook-ledger__body">
            {filteredHandbooks.map((handbook) => {
              const isExpanded = Boolean(expandedIds[handbook.id]);
              const subjectMeta = resolveSubjectMeta(handbook.subjectId);
              const accent = SUBJECT_ACCENTS[handbook.subjectId] || subjectMeta.accent || '#38bdf8';
              const primaryTitle = isThai ? handbook.titleTh : handbook.title;
              const secondaryTitle = isThai ? handbook.title : handbook.titleTh;
              const desc = isThai ? handbook.descriptionTh : handbook.description;
              const badge = isThai ? handbook.badgeTh : handbook.badge;
              const author = isThai ? handbook.authorTh : handbook.author;
              const subjectName = isThai
                ? handbook.subjectNameTh || subjectMeta.labelTh
                : handbook.subjectName || subjectMeta.labelEn;

              const thEd = handbook.editions?.th?.available ? handbook.editions.th : null;
              const enEd = handbook.editions?.en?.available ? handbook.editions.en : null;

              return (
                <article
                  key={handbook.id}
                  id={handbook.id}
                  className={`handbook-strip ${isExpanded ? 'handbook-strip--expanded' : ''} ${
                    handbook.isNew ? 'handbook-strip--new' : ''
                  }`}
                  style={{ '--strip-accent': accent }}
                >
                  {/* Main Horizontal Strip Row */}
                  <div
                    className="handbook-strip__main"
                    onClick={() => toggleExpand(handbook.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleExpand(handbook.id);
                      }
                    }}
                  >
                    {/* Col 1: Code, Format Icon & Titles */}
                    <div className="handbook-strip__doc">
                      <div className="handbook-strip__code-box">
                        <span className="handbook-strip__format-badge">PDF</span>
                        <span className="handbook-strip__code">{handbook.code || 'DOC'}</span>
                      </div>
                      <div className="handbook-strip__titles">
                        <div className="handbook-strip__title-row">
                          <h2 className="handbook-strip__title">{primaryTitle}</h2>
                          {handbook.isNew && (
                            <span className="handbook-strip__new-badge">
                              ✨ {t('NEW', 'ใหม่')}
                            </span>
                          )}
                        </div>
                        <p className="handbook-strip__subtitle">{secondaryTitle}</p>
                      </div>
                    </div>

                    {/* Col 2: Discipline Badge & Key Tags */}
                    <div className="handbook-strip__meta">
                      <div className="handbook-strip__badges">
                        <span className="handbook-strip__subject-pill">{subjectName}</span>
                        <span className="handbook-strip__vol-pill">{badge}</span>
                      </div>
                      <div className="handbook-strip__tags-preview">
                        {handbook.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="handbook-strip__tag">
                            #{tag}
                          </span>
                        ))}
                        {handbook.tags.length > 3 && (
                          <span className="handbook-strip__tag handbook-strip__tag--more">
                            +{handbook.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Col 3: Available Editions, Pages & File Sizes */}
                    <div className="handbook-strip__sizes">
                      <div className={`handbook-strip__size-row ${thEd ? 'handbook-strip__size-row--th' : 'handbook-strip__size-row--muted'}`}>
                        <span className="handbook-strip__lang-dot">🇹🇭 TH</span>
                        <span className="handbook-strip__size-val">
                          {thEd ? `${handbook.pages?.th ? `${handbook.pages.th}p · ` : ''}${thEd.fileSize}` : '—'}
                        </span>
                      </div>
                      <div className={`handbook-strip__size-row ${enEd ? 'handbook-strip__size-row--en' : 'handbook-strip__size-row--muted'}`}>
                        <span className="handbook-strip__lang-dot">🇬🇧 EN</span>
                        <span className="handbook-strip__size-val">
                          {enEd ? `${handbook.pages?.en ? `${handbook.pages.en}p · ` : ''}${enEd.fileSize}` : '—'}
                        </span>
                      </div>
                    </div>

                    {/* Col 4: Drawer Toggle */}
                    <div className="handbook-strip__actions">
                      <button
                        type="button"
                        className={`handbook-expand-btn ${isExpanded ? 'handbook-expand-btn--open' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(handbook.id);
                        }}
                        aria-expanded={isExpanded}
                        title={
                          isExpanded
                            ? t('Collapse release details', 'ย่อรายละเอียด')
                            : t('Expand release details & files', 'ดูรายละเอียดและไฟล์เอกสาร')
                        }
                      >
                        <span>{isExpanded ? '▴' : '▾'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Expandable Release Notes & Mirror Drawer */}
                  {isExpanded && (
                    <div className="handbook-strip__drawer">
                      <div className="handbook-strip__drawer-grid">
                        {/* Left: Synopsis & Citation */}
                        <div className="handbook-strip__drawer-info">
                          <h3 className="handbook-strip__drawer-heading">
                            {t('Document Synopsis & Coverage', 'เนื้อหาครอบคลุมและรายละเอียดเอกสาร')}
                          </h3>
                          <p className="handbook-strip__drawer-desc">{desc}</p>

                          <div className="handbook-strip__citation">
                            <span aria-hidden="true">📌</span>
                            <span>
                              <strong>{t('Synthesis Source:', 'แหล่งอ้างอิงการสังเคราะห์:')}</strong> {author}
                            </span>
                          </div>

                          <div className="handbook-strip__all-tags">
                            {handbook.tags.map((tag) => (
                              <span key={tag} className="handbook-strip__tag">
                                #{tag}
                              </span>
                            ))}
                          </div>

                          {/* Connected Interactive Labs */}
                          {handbook.topicIds && handbook.topicIds.length > 0 && (
                            <div className="handbook-strip__labs">
                              <span className="handbook-strip__labs-label">
                                {t('Connected Interactive Web Labs:', 'ห้องปฏิบัติการจำลองที่เชื่อมโยง:')}
                              </span>
                              <div className="handbook-strip__labs-list">
                                {handbook.topicIds.map((tid) => {
                                  const topicLabel = isThai
                                    ? TOPIC_TITLES[tid]?.th || tid
                                    : TOPIC_TITLES[tid]?.en || tid;
                                  return (
                                    <Link
                                      key={tid}
                                      to={`/subjects/${handbook.subjectId}/${tid}`}
                                      className="handbook-strip__lab-link"
                                    >
                                      <span aria-hidden="true">🧪</span>
                                      <span>{topicLabel}</span>
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Right: Ubuntu-Style Checksum / Edition Mirror Sub-table */}
                        <div className="handbook-strip__drawer-files">
                          <h3 className="handbook-strip__drawer-heading">
                            {t('Direct Release Files (Select Language)', 'ไฟล์เอกสารแยกตามภาษา (เลือกดาวน์โหลดลงเครื่อง / เปิดอ่าน)')}
                          </h3>
                          <div className="handbook-file-list">
                            {thEd && (
                              <div className="handbook-file-row">
                                <div className="handbook-file-row__info">
                                  <span className="handbook-file-row__lang">
                                    🇹🇭 ฉบับภาษาไทย (Thai Edition)
                                    {handbook.pages?.th && ` • ${handbook.pages.th} หน้า`}
                                  </span>
                                  <code className="handbook-file-row__name">{thEd.filename}</code>
                                </div>
                                <div className="handbook-file-row__right">
                                  <span className="handbook-file-row__size">{thEd.fileSize}</span>
                                  <a
                                    href={thEd.downloadUrl}
                                    download={thEd.filename}
                                    onClick={(e) => triggerDirectDownload(e, thEd.downloadUrl)}
                                    className="handbook-file-row__btn handbook-file-row__btn--dl"
                                  >
                                    📥 {t('Download', 'ดาวน์โหลด')}
                                  </a>
                                  <a
                                    href={thEd.previewUrl || thEd.downloadUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="handbook-file-row__btn handbook-file-row__btn--view"
                                  >
                                    👁️ {t('Open', 'เปิดอ่าน')}
                                  </a>
                                </div>
                              </div>
                            )}

                            {enEd && (
                              <div className="handbook-file-row">
                                <div className="handbook-file-row__info">
                                  <span className="handbook-file-row__lang">
                                    🇬🇧 English Edition (ต้นฉบับภาษาอังกฤษ)
                                    {handbook.pages?.en && ` • ${handbook.pages.en} pages`}
                                  </span>
                                  <code className="handbook-file-row__name">{enEd.filename}</code>
                                </div>
                                <div className="handbook-file-row__right">
                                  <span className="handbook-file-row__size">{enEd.fileSize}</span>
                                  <a
                                    href={enEd.downloadUrl}
                                    download={enEd.filename}
                                    onClick={(e) => triggerDirectDownload(e, enEd.downloadUrl)}
                                    className="handbook-file-row__btn handbook-file-row__btn--dl"
                                  >
                                    📥 {t('Download', 'ดาวน์โหลด')}
                                  </a>
                                  <a
                                    href={enEd.previewUrl || enEd.downloadUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="handbook-file-row__btn handbook-file-row__btn--view"
                                  >
                                    👁️ {t('Open', 'เปิดอ่าน')}
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="handbooks-empty">
          <div className="handbooks-empty__icon">📑</div>
          <h3>{t('No matching handbooks found', 'ไม่พบเอกสารที่ตรงกับเงื่อนไขการค้นหา')}</h3>
          <p>
            {t(
              'Try clearing your search query or switching the subject / language filter.',
              'ลองล้างคำค้นหา หรือเปลี่ยนตัวกรองหมวดวิชาและภาษาด้านบน'
            )}
          </p>
          <button
            type="button"
            className="handbooks-empty__btn"
            onClick={() => {
              setSelectedSubject('all');
              setLangFilter('all');
              setSearchQuery('');
            }}
          >
            {t('Reset All Filters', 'แสดงเอกสารทั้งหมด')}
          </button>
        </div>
      )}
    </div>
  );
}
