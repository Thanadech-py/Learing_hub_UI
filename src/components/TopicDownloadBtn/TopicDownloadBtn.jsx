import { Link } from 'react-router-dom';
import {
  getHandbooksForTopic,
  getHandbookEdition,
  triggerDirectDownload,
} from '../../data/handbooksRegistry.js';
import { useDynamicHandbooks } from '../../services/googleDriveSync.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './TopicDownloadBtn.css';

/**
 * Contextual Bilingual Handbook Download Card for Topic Pages
 * Allows users to directly download the primary volume from Google Drive (no new tab redirection)
 * and discover companion compendiums.
 */
export default function TopicDownloadBtn({ topicId, compact = false }) {
  const { lang, t } = useLanguage();
  const isThai = lang === 'th';
  const { catalog } = useDynamicHandbooks();
  const allHandbooks = getHandbooksForTopic(topicId, catalog);

  if (allHandbooks.length === 0) return null;

  const handbook = allHandbooks[0];
  const secondaryHandbooks = allHandbooks.slice(1);

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
        onClick={(e) => triggerDirectDownload(e, preferredEd.downloadUrl)}
        className="topic-dl-btn topic-dl-btn--compact"
        title={`${t('Direct Download', 'ดาวน์โหลดลงเครื่องทันที')} ${title} (${preferredEd.fileSize})`}
      >
        <span className="topic-dl-btn__icon" aria-hidden="true">📥</span>
        <span className="topic-dl-btn__text">
          {t('PDF Handbook', 'เอกสาร PDF')} ({preferredEd.shortLabel}: {preferredEd.fileSize})
        </span>
      </a>
    );
  }

  return (
    <div className={`topic-dl-card ${handbook.isNew ? 'topic-dl-card--new' : ''}`}>
      <div className="topic-dl-card__main-row">
        <div className="topic-dl-card__left">
          <div className="topic-dl-card__badge-row">
            <span className="topic-dl-card__badge">
              📄 {handbook.code ? `${handbook.code} • ` : ''}{badge}
            </span>
            {handbook.isNew && (
              <span className="topic-dl-card__new-pill">
                ✨ {t('NEW RELEASE', 'เอกสารอัปเดตใหม่')}
              </span>
            )}
            {thEd && (
              <span className="topic-dl-card__size">
                🇹🇭 TH: {handbook.pages?.th ? `${handbook.pages.th}p · ` : ''}{thEd.fileSize}
              </span>
            )}
            {enEd && (
              <span className="topic-dl-card__size">
                🇬🇧 EN: {handbook.pages?.en ? `${handbook.pages.en}p · ` : ''}{enEd.fileSize}
              </span>
            )}
          </div>
          <div className="topic-dl-card__title">{title}</div>
          <div className="topic-dl-card__desc">
            {t(
              'Official synthesized university reference handbook hosted on Google Drive. Select your preferred language edition for instant download:',
              'เอกสารสรุปเนื้อหาหลักและคู่มือเตรียมสอบมาตรฐานจากคลัง Google Drive สามารถเลือกดาวน์โหลดไฟล์แยกตามภาษาลงเครื่องได้ทันที:'
            )}
          </div>
        </div>

        <div className="topic-dl-card__actions">
          {thEd && (
            <a
              href={thEd.downloadUrl}
              download={thEd.filename}
              onClick={(e) => triggerDirectDownload(e, thEd.downloadUrl)}
              className={`topic-dl-action-btn ${
                isThai ? 'topic-dl-action-btn--primary' : 'topic-dl-action-btn--secondary'
              }`}
              title={`ดาวน์โหลดฉบับภาษาไทยลงเครื่องทันที (${thEd.fileSize})`}
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
              onClick={(e) => triggerDirectDownload(e, enEd.downloadUrl)}
              className={`topic-dl-action-btn ${
                !isThai || !thEd ? 'topic-dl-action-btn--primary' : 'topic-dl-action-btn--secondary'
              }`}
              title={`Direct Download English Edition (${enEd.fileSize})`}
            >
              <span aria-hidden="true">📥 🇬🇧</span>
              <span>{t('English PDF', 'โหลดฉบับ EN')}</span>
              <span className="topic-dl-action-btn__size">{enEd.fileSize}</span>
            </a>
          )}

          {preferredEd && (
            <a
              href={preferredEd.previewUrl || preferredEd.downloadUrl}
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
            {t('All Handbooks →', 'คลังเอกสารทั้งหมด →')}
          </Link>
        </div>
      </div>

      {secondaryHandbooks.length > 0 && (
        <div className="topic-dl-card__secondary-bar">
          <span className="topic-dl-card__secondary-label">
            {t('Also synthesized in companion master guides:', 'ครอบคลุมเพิ่มเติมในคู่มือรวมเนื้อหา:')}
          </span>
          <div className="topic-dl-card__secondary-chips">
            {secondaryHandbooks.map((sec) => {
              const secTh = sec.editions?.th?.available ? sec.editions.th : null;
              const secEn = sec.editions?.en?.available ? sec.editions.en : null;
              const secTitle = isThai ? sec.titleTh : sec.title;
              return (
                <div key={sec.id} className="topic-dl-sec-chip">
                  <span className="topic-dl-sec-code">{sec.code}</span>
                  <span className="topic-dl-sec-title" title={secTitle}>{secTitle}</span>
                  <div className="topic-dl-sec-btns">
                    {secTh && (
                      <a
                        href={secTh.downloadUrl}
                        download={secTh.filename}
                        onClick={(e) => triggerDirectDownload(e, secTh.downloadUrl)}
                        className="topic-dl-sec-btn"
                        title={secTh.filename}
                      >
                        🇹🇭 TH ({secTh.fileSize})
                      </a>
                    )}
                    {secEn && (
                      <a
                        href={secEn.downloadUrl}
                        download={secEn.filename}
                        onClick={(e) => triggerDirectDownload(e, secEn.downloadUrl)}
                        className="topic-dl-sec-btn"
                        title={secEn.filename}
                      >
                        🇬🇧 EN ({secEn.fileSize})
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
