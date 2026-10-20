import { Link } from 'react-router-dom';
import { getPrimaryHandbookForTopic } from '../../data/handbooksRegistry.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './TopicDownloadBtn.css';

/**
 * Contextual Handbook Download Button for Topic Pages
 * Automatically links to the synthesized master PDF associated with this topic.
 */
export default function TopicDownloadBtn({ topicId, compact = false }) {
  const { lang, t } = useLanguage();
  const isThai = lang === 'th';
  const handbook = getPrimaryHandbookForTopic(topicId);

  if (!handbook) return null;

  const title = isThai ? handbook.titleTh : handbook.title;
  const badge = isThai ? handbook.badgeTh : handbook.badge;

  if (compact) {
    return (
      <a
        href={handbook.downloadUrl}
        download={handbook.filename}
        className="topic-dl-btn topic-dl-btn--compact"
        title={`${t('Download', 'ดาวน์โหลด')} ${title} (${handbook.fileSize})`}
      >
        <span className="topic-dl-btn__icon" aria-hidden="true">📥</span>
        <span className="topic-dl-btn__text">
          {t('PDF Handbook', 'เอกสาร PDF')} ({handbook.fileSize})
        </span>
      </a>
    );
  }

  return (
    <div className="topic-dl-card">
      <div className="topic-dl-card__left">
        <div className="topic-dl-card__badge-row">
          <span className="topic-dl-card__badge">📄 {badge}</span>
          <span className="topic-dl-card__size">{handbook.fileSize}</span>
        </div>
        <div className="topic-dl-card__title">
          {title}
        </div>
        <div className="topic-dl-card__desc">
          {t(
            'Official synthesized engineering summary. Free from copyright restrictions.',
            'เอกสารสรุปเนื้อหาหลักเชิงวิศวกรรมที่ผ่านการสังเคราะห์ ปลอดภัย ไม่ติดลิขสิทธิ์'
          )}
        </div>
      </div>

      <div className="topic-dl-card__actions">
        <a
          href={handbook.downloadUrl}
          download={handbook.filename}
          className="topic-dl-action-btn topic-dl-action-btn--primary"
        >
          <span aria-hidden="true">📥</span>
          <span>{t('Download PDF', 'ดาวน์โหลด PDF')}</span>
        </a>

        <a
          href={handbook.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="topic-dl-action-btn topic-dl-action-btn--secondary"
        >
          <span aria-hidden="true">👁️</span>
          <span>{t('Read Online', 'เปิดอ่าน')}</span>
        </a>

        <Link to="/handbooks" className="topic-dl-card__hub-link">
          {t('View All Handbooks →', 'ดูคลังเอกสารทั้งหมด →')}
        </Link>
      </div>
    </div>
  );
}
