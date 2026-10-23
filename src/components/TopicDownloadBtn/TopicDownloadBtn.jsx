import { Link } from 'react-router-dom';
import { getPrimaryHandbookForTopic, getHandbookEdition } from '../../data/handbooksRegistry.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './TopicDownloadBtn.css';

/**
 * Contextual Bilingual Handbook Download Card for Topic Pages
 * Allows users to directly download either the Thai (TH) or English (EN) edition.
 */
export default function TopicDownloadBtn({ topicId, compact = false }) {
  const { lang, t } = useLanguage();
  const isThai = lang === 'th';
  const handbook = getPrimaryHandbookForTopic(topicId);

  if (!handbook) return null;

  const title = isThai ? handbook.titleTh : handbook.title;
  const badge = isThai ? handbook.badgeTh : handbook.badge;

  const thEd = handbook.editions?.th?.available ? handbook.editions.th : null;
  const enEd = handbook.editions?.en?.available ? handbook.editions.en : null;
  const preferredEd = getHandbookEdition(handbook, lang);

  if (compact) {
    if (!preferredEd) return null;
    return (
      <a
        href={preferredEd.downloadUrl}
        download={preferredEd.filename}
        className="topic-dl-btn topic-dl-btn--compact"
        title={`${t('Download', 'ดาวน์โหลด')} ${title} (${preferredEd.fileSize})`}
      >
        <span className="topic-dl-btn__icon" aria-hidden="true">📥</span>
        <span className="topic-dl-btn__text">
          {t('PDF Handbook', 'เอกสาร PDF')} ({preferredEd.shortLabel}: {preferredEd.fileSize})
        </span>
      </a>
    );
  }

  return (
    <div className="topic-dl-card">
      <div className="topic-dl-card__left">
        <div className="topic-dl-card__badge-row">
          <span className="topic-dl-card__badge">
            📄 {handbook.code ? `${handbook.code} • ` : ''}{badge}
          </span>
          {thEd && (
            <span className="topic-dl-card__size">🇹🇭 TH: {thEd.fileSize}</span>
          )}
          {enEd && (
            <span className="topic-dl-card__size">🇬🇧 EN: {enEd.fileSize}</span>
          )}
        </div>
        <div className="topic-dl-card__title">{title}</div>
        <div className="topic-dl-card__desc">
          {t(
            'Official synthesized engineering reference handbook. Select your preferred language edition to download:',
            'เอกสารสรุปเนื้อหาหลักเชิงวิศวกรรมที่ผ่านการสังเคราะห์ สามารถเลือกดาวน์โหลดไฟล์แยกตามภาษาได้ทันที:'
          )}
        </div>
      </div>

      <div className="topic-dl-card__actions">
        {thEd && (
          <a
            href={thEd.downloadUrl}
            download={thEd.filename}
            className={`topic-dl-action-btn ${
              isThai ? 'topic-dl-action-btn--primary' : 'topic-dl-action-btn--secondary'
            }`}
            title={`ดาวน์โหลดฉบับภาษาไทย (${thEd.fileSize})`}
          >
            <span aria-hidden="true">📥 🇹🇭</span>
            <span>{t('Thai PDF', 'โหลดฉบับไทย')}</span>
            <span className="topic-dl-action-btn__size">{thEd.fileSize}</span>
          </a>
        )}

        {enEd && (
          <a
            href={enEd.downloadUrl}
            download={enEd.filename}
            className={`topic-dl-action-btn ${
              !isThai || !thEd ? 'topic-dl-action-btn--primary' : 'topic-dl-action-btn--secondary'
            }`}
            title={`Download English Edition (${enEd.fileSize})`}
          >
            <span aria-hidden="true">📥 🇬🇧</span>
            <span>{t('English PDF', 'โหลดฉบับ EN')}</span>
            <span className="topic-dl-action-btn__size">{enEd.fileSize}</span>
          </a>
        )}

        {preferredEd && (
          <a
            href={preferredEd.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="topic-dl-action-btn topic-dl-action-btn--ghost"
            title={t('Open PDF in browser tab', 'เปิดอ่านไฟล์บนเบราว์เซอร์')}
          >
            <span aria-hidden="true">👁️</span>
            <span>{t('Preview', 'เปิดอ่าน')}</span>
          </a>
        )}

        <Link to="/handbooks" className="topic-dl-card__hub-link">
          {t('All Handbooks →', 'ดูคลังเอกสารทั้งหมด →')}
        </Link>
      </div>
    </div>
  );
}
