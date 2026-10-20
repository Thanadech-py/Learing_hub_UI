import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { HANDBOOKS_CATALOG } from '../../data/handbooksRegistry.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './HandbooksPage.css';

export default function HandbooksPage() {
  const { lang, t } = useLanguage();
  const isThai = lang === 'th';
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const subjectsFilterList = [
    { id: 'all', labelEn: 'All Handbooks', labelTh: 'เอกสารทั้งหมด' },
    { id: 'physics', labelEn: 'Physics', labelTh: 'ฟิสิกส์' },
    { id: 'linear-algebra', labelEn: 'Linear Algebra', labelTh: 'พีชคณิตเชิงเส้น' },
    { id: 'com-prog', labelEn: 'Computer Programming', labelTh: 'การเขียนโปรแกรมคอมพิวเตอร์' },
  ];

  const filteredHandbooks = useMemo(() => {
    let list = HANDBOOKS_CATALOG;
    if (selectedSubject !== 'all') {
      list = list.filter((h) => h.subjectId === selectedSubject);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (h) =>
          h.title.toLowerCase().includes(q) ||
          h.titleTh.toLowerCase().includes(q) ||
          h.description.toLowerCase().includes(q) ||
          h.descriptionTh.toLowerCase().includes(q) ||
          h.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }
    return list;
  }, [selectedSubject, searchQuery]);

  return (
    <div className="handbooks-page">
      {/* Breadcrumb Navigation */}
      <nav className="handbooks-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">{t('Home', 'หน้าหลัก')}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{t('Master Handbooks', 'คลังเอกสารสรุป')}</span>
      </nav>

      {/* Hero Header */}
      <header className="handbooks-hero">
        <div className="handbooks-hero__badge">
          <span>📚 OFFICIAL LEARNING RESOURCE REPOSITORY</span>
        </div>
        <h1 className="handbooks-hero__title">
          {t('Official Master Reference Handbooks', 'คลังเอกสารสรุปและคู่มืออ้างอิง')}
        </h1>
        <p className="handbooks-hero__subtitle">
          {t(
            'High-yield synthesized engineering & mathematical study guides. Designed for direct university reference, structured review, and offline deep learning.',
            'คู่มือสรุปเนื้อหาเชิงวิศวกรรมและคณิตศาสตร์ระดับลึก ที่ผ่านการสังเคราะห์และจัดโครงสร้างให้อ่านเข้าใจง่าย เหมาะสำหรับการทบทวนและการศึกษาต่อยอดแบบออฟไลน์'
          )}
        </p>

        {/* Copyright Safety Assurance Banner */}
        <div className="handbooks-copyright-banner">
          <div className="handbooks-copyright-banner__icon">🛡️</div>
          <div className="handbooks-copyright-banner__text">
            <strong>
              {t('Copyright Compliant Synthesis', 'เอกสารสังเคราะห์มาตรฐาน ปลอดภัยทางลิขสิทธิ์')}
            </strong>
            <p>
              {t(
                'All handbooks provided here are original synthesized study documents created for the Learning Hub platform. No raw publisher textbooks or proprietary university slides are distributed.',
                'เอกสารทั้งหมดในคลังนี้เป็นเอกสารสรุปเนื้อหาหลักที่สังเคราะห์ขึ้นใหม่โดยเฉพาะสำหรับ Learning Hub ไม่มีการแจกจ่ายไฟล์หนังสือหรือสไลด์ต้นฉบับ เพื่อให้เป็นไปตามมาตรฐานลิขสิทธิ์'
              )}
            </p>
          </div>
        </div>
      </header>

      {/* Filter and Search Controls */}
      <div className="handbooks-controls">
        <div className="handbooks-subject-pills">
          {subjectsFilterList.map((sub) => (
            <button
              key={sub.id}
              type="button"
              className={`handbooks-pill ${selectedSubject === sub.id ? 'handbooks-pill--active' : ''}`}
              onClick={() => setSelectedSubject(sub.id)}
            >
              {isThai ? sub.labelTh : sub.labelEn}
            </button>
          ))}
        </div>

        <div className="handbooks-search-box">
          <span className="handbooks-search-icon" aria-hidden="true">🔍</span>
          <input
            type="search"
            className="handbooks-search-input"
            placeholder={t('Search handbooks, keywords, topics...', 'ค้นหาเอกสาร, คำสำคัญ, หรือหัวข้อ...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Handbooks Grid */}
      {filteredHandbooks.length > 0 ? (
        <div className="handbooks-grid">
          {filteredHandbooks.map((handbook) => {
            const title = isThai ? handbook.titleTh : handbook.title;
            const desc = isThai ? handbook.descriptionTh : handbook.description;
            const badge = isThai ? handbook.badgeTh : handbook.badge;
            const author = isThai ? handbook.authorTh : handbook.author;
            const subjectName = isThai ? handbook.subjectNameTh : handbook.subjectName;

            return (
              <article key={handbook.id} className="handbook-card">
                <div className="handbook-card__top">
                  <div className="handbook-card__meta">
                    <span className="handbook-card__subject">{subjectName}</span>
                    <span className="handbook-card__badge">{badge}</span>
                  </div>
                  <span className="handbook-card__size">{handbook.fileSize}</span>
                </div>

                <h2 className="handbook-card__title">{title}</h2>

                <p className="handbook-card__desc">{desc}</p>

                <div className="handbook-card__citation">
                  <span className="handbook-card__citation-icon">📌</span>
                  <span className="handbook-card__citation-text">{author}</span>
                </div>

                {/* Tags */}
                <div className="handbook-card__tags">
                  {handbook.tags.map((tag) => (
                    <span key={tag} className="handbook-card__tag-chip">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Related Online Interactive Topic Links */}
                {handbook.topicIds && handbook.topicIds.length > 0 && (
                  <div className="handbook-card__related-topics">
                    <span className="handbook-card__related-label">
                      {t('Interactive Topics:', 'หัวข้อจำลองบนเว็บ:')}
                    </span>
                    <div className="handbook-card__related-links">
                      {handbook.topicIds.map((tid) => (
                        <Link
                          key={tid}
                          to={`/subjects/${handbook.subjectId}/${tid}`}
                          className="handbook-card__topic-link"
                        >
                          🧪 {tid}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="handbook-card__actions">
                  <a
                    href={handbook.downloadUrl}
                    download={handbook.filename}
                    className="handbook-card__action-btn handbook-card__action-btn--download"
                  >
                    <span>📥</span>
                    <span>{t('Download PDF', 'ดาวน์โหลด PDF')}</span>
                  </a>

                  <a
                    href={handbook.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="handbook-card__action-btn handbook-card__action-btn--view"
                  >
                    <span>👁️</span>
                    <span>{t('Open in Browser', 'เปิดอ่าน')}</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="handbooks-empty">
          <div className="handbooks-empty__icon">📑</div>
          <h3>{t('No handbooks found', 'ไม่พบเอกสารที่ค้นหา')}</h3>
          <p>
            {t(
              'Try clearing your search query or selecting a different subject filter.',
              'ลองล้างคำค้นหาหรือเลือกหมวดหมู่อื่นเพื่อค้นหาเอกสาร'
            )}
          </p>
          <button
            type="button"
            className="handbooks-empty__btn"
            onClick={() => {
              setSelectedSubject('all');
              setSearchQuery('');
            }}
          >
            {t('Show All Handbooks', 'แสดงเอกสารทั้งหมด')}
          </button>
        </div>
      )}
    </div>
  );
}
