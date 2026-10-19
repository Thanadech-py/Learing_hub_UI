import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import SubjectIcon from '../../components/SubjectCard/SubjectIcon.jsx';
import TopicCard from '../../components/TopicCard/TopicCard.jsx';
import { getSubjectById } from '../../data/subjects/index.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { localizeSubject } from '../../i18n/thaiTranslations.js';
import NotFound from '../NotFound/NotFound.jsx';
import './SubjectPage.css';

export default function SubjectPage() {
  const { subjectId } = useParams();
  const { lang, t } = useLanguage();
  const rawSubject = getSubjectById(subjectId);
  const subject = localizeSubject(rawSubject, lang);

  useEffect(() => {
    document.title = subject
      ? `${subject.title} · Learning Space`
      : 'Not found · Learning Space';
    return () => {
      document.title = 'Learning Space';
    };
  }, [subject]);

  if (!subject) {
    return <NotFound />;
  }

  const { title, description, icon, accent, topics } = subject;

  return (
    <div className="subject-page" style={{ '--accent': accent }}>
      <nav className="subject-page__breadcrumb" aria-label="Breadcrumb">
        <Link to="/">{t('Home', 'หน้าหลัก')}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{title}</span>
      </nav>

      <section className="subject-page__hero">
        <div className="subject-page__icon">
          <SubjectIcon name={icon} />
        </div>
        <div>
          <p className="eyebrow">{t('Subject', 'หมวดวิชา')}</p>
          <h1 className="subject-page__title">{title}</h1>
          <p className="subject-page__description">{description}</p>
          <p className="subject-page__meta">
            {t(
              `${topics.length} ${topics.length === 1 ? 'topic' : 'topics'}`,
              `ทั้งหมด ${topics.length} บทเรียน`
            )}
          </p>
        </div>
      </section>

      <section aria-labelledby="topics-heading" className="subject-page__topics">
        <h2 id="topics-heading" className="section-title">
          {t('Topics', 'บทเรียนในรายวิชานี้')}
        </h2>

        {topics.length > 0 ? (
          <ol className="subject-page__list">
            {topics.map((topic, index) => (
              <li key={topic.id}>
                <TopicCard topic={topic} index={index} subjectId={subject.id} />
              </li>
            ))}
          </ol>
        ) : (
          <p className="subject-page__empty">
            {t('No topics yet — coming soon.', 'ยังไม่มีบทเรียน — กำลังจะมาเร็วๆ นี้')}
          </p>
        )}
      </section>
    </div>
  );
}
