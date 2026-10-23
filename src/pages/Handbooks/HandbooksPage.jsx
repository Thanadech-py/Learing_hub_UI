import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { HANDBOOKS_CATALOG, getHandbooksSummary, getHandbookEdition } from '../../data/handbooksRegistry.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './HandbooksPage.css';

const SUBJECT_ACCENTS = {
  physics: '#38bdf8',
  'linear-algebra': '#a78bfa',
  'com-prog': '#34d399',
  mathematics: '#f59e0b',
};

export default function HandbooksPage() {
  const { lang, t } = useLanguage();
  const isThai = lang === 'th';

  const [selectedSubject, setSelectedSubject] = useState('all');
  const [langFilter, setLangFilter] = useState('all'); // 'all' | 'th' | 'en'
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState({});

  const summary = useMemo(() => getHandbooksSummary(), []);

  const subjectsFilterList = useMemo(() => {
    const counts = {
      all: HANDBOOKS_CATALOG.length,
      physics: HANDBOOKS_CATALOG.filter((h) => h.subjectId === 'physics').length,
      'linear-algebra': HANDBOOKS_CATALOG.filter((h) => h.subjectId === 'linear-algebra').length,
      'com-prog': HANDBOOKS_CATALOG.filter((h) => h.subjectId === 'com-prog').length,
    };
    return [
      { id: 'all', icon: '📦', labelEn: 'All Releases', labelTh: 'เอกสารทั้งหมด', count: counts.all },
      { id: 'physics', icon: '⚛️', labelEn: 'Physics', labelTh: 'ฟิสิกส์', count: counts.physics },
      { id: 'linear-algebra', icon: '📐', labelEn: 'Linear Algebra', labelTh: 'พีชคณิตเชิงเส้น', count: counts['linear-algebra'] },
      { id: 'com-prog', icon: '💻', labelEn: 'Programming', labelTh: 'การเขียนโปรแกรม', count: counts['com-prog'] },
    ];
  }, []);

  const filteredHandbooks = useMemo(() => {
    let list = HANDBOOKS_CATALOG;

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
  }, [selectedSubject, langFilter, searchQuery]);

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
            <span>📚 OFFICIAL LEARNING RESOURCE REPOSITORY • BILINGUAL EDITION LEDGER</span>
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
          </div>
        </div>

        <h1 className="handbooks-hero__title">
          {t('Official Master Reference Handbooks', 'คลังเอกสารสรุปและคู่มืออ้างอิงมาตรฐาน')}
        </h1>
        <p className="handbooks-hero__subtitle">
          {t(
            'Select and download synthesized university reference handbooks in Thai (TH) or English (EN). Structured like a software release directory for instant one-click access and offline study.',
            'เลือกดาวน์โหลดเอกสารสรุปเนื้อหาหลักแยกตามรายวิชาและภาษา (ฉบับภาษาไทย TH / ฉบับภาษาอังกฤษ EN) ในรูปแบบแถบรายการดาวน์โหลดที่ค้นหาและเข้าถึงได้ทันที'
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
      </header>

      {/* Toolbar: Subject Tabs + Language Selector + Search */}
      <div className="handbooks-toolbar">
        <div className="handbooks-toolbar__row">
          {/* Subject Filter Pills */}
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

          {/* Language Edition Filter */}
          <div className="handbooks-lang-switch" role="group" aria-label="Filter by language edition">
            <span className="handbooks-lang-switch__label">{t('Edition:', 'ภาษา:')}</span>
            <button
              type="button"
              className={`handbooks-lang-btn ${langFilter === 'all' ? 'handbooks-lang-btn--active' : ''}`}
              onClick={() => setLangFilter('all')}
            >
              🌐 {t('All (TH + EN)', 'ทั้งหมด (ไทย + EN)')}
            </button>
            <button
              type="button"
              className={`handbooks-lang-btn ${langFilter === 'th' ? 'handbooks-lang-btn--active' : ''}`}
              onClick={() => setLangFilter('th')}
            >
              🇹🇭 {t('Thai (TH)', 'ภาษาไทย')}
            </button>
            <button
              type="button"
              className={`handbooks-lang-btn ${langFilter === 'en' ? 'handbooks-lang-btn--active' : ''}`}
              onClick={() => setLangFilter('en')}
            >
              🇬🇧 {t('English (EN)', 'English')}
            </button>
          </div>
        </div>

        <div className="handbooks-toolbar__row handbooks-toolbar__row--sub">
          <div className="handbooks-search-box">
            <span className="handbooks-search-icon" aria-hidden="true">🔍</span>
            <input
              type="search"
              className="handbooks-search-input"
              placeholder={t(
                'Filter releases by code (e.g. PHY-01), title, topic, or keyword...',
                'ค้นหารหัสเอกสาร (เช่น PHY-01), ชื่อเรื่อง, คำสำคัญ หรือหัวข้อ...'
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
                `Showing ${filteredHandbooks.length} of ${HANDBOOKS_CATALOG.length} releases`,
                `แสดง ${filteredHandbooks.length} จาก ${HANDBOOKS_CATALOG.length} รายการ`
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
              {t('AVAILABLE EDITIONS', 'ขนาดไฟล์แยกภาษา')}
            </div>
            <div className="handbook-ledger__col handbook-ledger__col--actions">
              {t('DIRECT ISO/PDF DOWNLOAD & PREVIEW', 'เลือกดาวน์โหลดแยกภาษา / เปิดอ่าน')}
            </div>
          </div>

          {/* Release Strip Rows */}
          <div className="handbook-ledger__body">
            {filteredHandbooks.map((handbook) => {
              const isExpanded = Boolean(expandedIds[handbook.id]);
              const accent = SUBJECT_ACCENTS[handbook.subjectId] || '#38bdf8';
              const primaryTitle = isThai ? handbook.titleTh : handbook.title;
              const secondaryTitle = isThai ? handbook.title : handbook.titleTh;
              const desc = isThai ? handbook.descriptionTh : handbook.description;
              const badge = isThai ? handbook.badgeTh : handbook.badge;
              const author = isThai ? handbook.authorTh : handbook.author;
              const subjectName = isThai ? handbook.subjectNameTh : handbook.subjectName;

              const thEd = handbook.editions?.th?.available ? handbook.editions.th : null;
              const enEd = handbook.editions?.en?.available ? handbook.editions.en : null;
              const preferredEd = getHandbookEdition(handbook, lang);

              const showThBtn = thEd && (langFilter === 'all' || langFilter === 'th');
              const showEnBtn = enEd && (langFilter === 'all' || langFilter === 'en');

              return (
                <article
                  key={handbook.id}
                  className={`handbook-strip ${isExpanded ? 'handbook-strip--expanded' : ''}`}
                  style={{ '--strip-accent': accent }}
                >
                  {/* Main Horizontal Strip Row */}
                  <div className="handbook-strip__main">
                    {/* Col 1: Code, Format Icon & Titles */}
                    <div className="handbook-strip__doc" onClick={() => toggleExpand(handbook.id)}>
                      <div className="handbook-strip__code-box">
                        <span className="handbook-strip__format-badge">PDF</span>
                        <span className="handbook-strip__code">{handbook.code || 'DOC'}</span>
                      </div>
                      <div className="handbook-strip__titles">
                        <h2 className="handbook-strip__title">{primaryTitle}</h2>
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

                    {/* Col 3: Available Editions & File Sizes */}
                    <div className="handbook-strip__sizes">
                      {thEd ? (
                        <div className="handbook-strip__size-row handbook-strip__size-row--th">
                          <span className="handbook-strip__lang-dot">🇹🇭 TH</span>
                          <span className="handbook-strip__size-val">{thEd.fileSize}</span>
                        </div>
                      ) : (
                        <div className="handbook-strip__size-row handbook-strip__size-row--muted">
                          <span>🇹🇭 —</span>
                        </div>
                      )}
                      {enEd && (
                        <div className="handbook-strip__size-row handbook-strip__size-row--en">
                          <span className="handbook-strip__lang-dot">🇬🇧 EN</span>
                          <span className="handbook-strip__size-val">{enEd.fileSize}</span>
                        </div>
                      )}
                    </div>

                    {/* Col 4: Ubuntu-Style Direct Download Buttons & Drawer Toggle */}
                    <div className="handbook-strip__actions">
                      {showThBtn && (
                        <a
                          href={thEd.downloadUrl}
                          download={thEd.filename}
                          className={`handbook-dl-btn handbook-dl-btn--th ${
                            isThai || langFilter === 'th' ? 'handbook-dl-btn--primary' : ''
                          }`}
                          title={`${t('Download Thai PDF', 'ดาวน์โหลดฉบับภาษาไทย')} (${thEd.fileSize})`}
                        >
                          <span className="handbook-dl-btn__icon" aria-hidden="true">📥</span>
                          <span className="handbook-dl-btn__flag" aria-hidden="true">🇹🇭</span>
                          <span className="handbook-dl-btn__text">
                            {t('Thai PDF', 'โหลดฉบับไทย')}
                          </span>
                          <span className="handbook-dl-btn__size">{thEd.fileSize}</span>
                        </a>
                      )}

                      {showEnBtn && (
                        <a
                          href={enEd.downloadUrl}
                          download={enEd.filename}
                          className={`handbook-dl-btn handbook-dl-btn--en ${
                            (!isThai && langFilter !== 'th') || !thEd ? 'handbook-dl-btn--primary' : ''
                          }`}
                          title={`${t('Download English PDF', 'ดาวน์โหลดฉบับภาษาอังกฤษ')} (${enEd.fileSize})`}
                        >
                          <span className="handbook-dl-btn__icon" aria-hidden="true">📥</span>
                          <span className="handbook-dl-btn__flag" aria-hidden="true">🇬🇧</span>
                          <span className="handbook-dl-btn__text">
                            {t('English PDF', 'โหลด EN')}
                          </span>
                          <span className="handbook-dl-btn__size">{enEd.fileSize}</span>
                        </a>
                      )}

                      {preferredEd && (
                        <a
                          href={preferredEd.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="handbook-icon-btn"
                          title={t(
                            `Preview ${preferredEd.label} in Browser`,
                            `เปิดอ่าน (${preferredEd.label}) บนเบราว์เซอร์`
                          )}
                        >
                          <span aria-hidden="true">👁️</span>
                          <span className="handbook-icon-btn__label">{t('Read', 'อ่าน')}</span>
                        </a>
                      )}

                      <button
                        type="button"
                        className={`handbook-expand-btn ${isExpanded ? 'handbook-expand-btn--open' : ''}`}
                        onClick={() => toggleExpand(handbook.id)}
                        aria-expanded={isExpanded}
                        title={t('Toggle release details & links', 'ดูรายละเอียดและลิงก์บทเรียน')}
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
                                {handbook.topicIds.map((tid) => (
                                  <Link
                                    key={tid}
                                    to={`/subjects/${handbook.subjectId}/${tid}`}
                                    className="handbook-strip__lab-link"
                                  >
                                    <span aria-hidden="true">🧪</span>
                                    <span>{tid}</span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Right: Ubuntu-Style Checksum / Edition Mirror Sub-table */}
                        <div className="handbook-strip__drawer-files">
                          <h3 className="handbook-strip__drawer-heading">
                            {t('Direct Release Files (Select Language)', 'ไฟล์เอกสารแยกตามภาษา (เลือกดาวน์โหลด / เปิดอ่าน)')}
                          </h3>
                          <div className="handbook-file-list">
                            {thEd && (
                              <div className="handbook-file-row">
                                <div className="handbook-file-row__info">
                                  <span className="handbook-file-row__lang">🇹🇭 ฉบับภาษาไทย (Thai Edition)</span>
                                  <code className="handbook-file-row__name">{thEd.filename}</code>
                                </div>
                                <div className="handbook-file-row__right">
                                  <span className="handbook-file-row__size">{thEd.fileSize}</span>
                                  <a
                                    href={thEd.downloadUrl}
                                    download={thEd.filename}
                                    className="handbook-file-row__btn handbook-file-row__btn--dl"
                                  >
                                    📥 {t('Download', 'ดาวน์โหลด')}
                                  </a>
                                  <a
                                    href={thEd.downloadUrl}
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
                                  <span className="handbook-file-row__lang">🇬🇧 English Edition (ต้นฉบับภาษาอังกฤษ)</span>
                                  <code className="handbook-file-row__name">{enEd.filename}</code>
                                </div>
                                <div className="handbook-file-row__right">
                                  <span className="handbook-file-row__size">{enEd.fileSize}</span>
                                  <a
                                    href={enEd.downloadUrl}
                                    download={enEd.filename}
                                    className="handbook-file-row__btn handbook-file-row__btn--dl"
                                  >
                                    📥 {t('Download', 'ดาวน์โหลด')}
                                  </a>
                                  <a
                                    href={enEd.downloadUrl}
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
