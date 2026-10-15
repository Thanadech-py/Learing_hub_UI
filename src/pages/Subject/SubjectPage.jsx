import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import SubjectIcon from '../../components/SubjectCard/SubjectIcon.jsx';
import TopicCard from '../../components/TopicCard/TopicCard.jsx';
import { getSubjectById } from '../../data/subjects/index.js';
import NotFound from '../NotFound/NotFound.jsx';
import './SubjectPage.css';

/**
 * Subject page — lists every topic of one subject.
 * URL: /subjects/:subjectId  (e.g. /subjects/physics)
 *
 * Content comes from src/data/subjects/<subject>.js, so editing topics
 * never requires touching this component.
 */
export default function SubjectPage() {
  const { subjectId } = useParams();
  const subject = getSubjectById(subjectId);

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
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{title}</span>
      </nav>

      <section className="subject-page__hero">
        <div className="subject-page__icon">
          <SubjectIcon name={icon} />
        </div>
        <div>
          <p className="eyebrow">Subject</p>
          <h1 className="subject-page__title">{title}</h1>
          <p className="subject-page__description">{description}</p>
          <p className="subject-page__meta">
            {topics.length} {topics.length === 1 ? 'topic' : 'topics'}
          </p>
        </div>
      </section>

      <section aria-labelledby="topics-heading" className="subject-page__topics">
        <h2 id="topics-heading" className="section-title">
          Topics
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
          <p className="subject-page__empty">No topics yet — coming soon.</p>
        )}
      </section>
    </div>
  );
}
