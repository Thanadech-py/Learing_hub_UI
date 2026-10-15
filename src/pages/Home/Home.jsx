import SubjectCard from '../../components/SubjectCard/SubjectCard.jsx';
import subjects from '../../data/subjects/index.js';
import './Home.css';

export default function Home() {
  return (
    <>
      <section className="home__hero">
        <p className="eyebrow">Learn by seeing</p>
        <h1 className="home__title">
          Understand every topic,
          <br />
          <span className="home__title-gradient">visualized.</span>
        </h1>
        <p className="home__subtitle">
          Clear explanations paired with interactive visualizations for each
          topic in every subject. Pick a subject to begin.
        </p>
      </section>

      <section className="home__subjects" aria-labelledby="subjects-heading">
        <h2 id="subjects-heading" className="section-title">
          Subjects
        </h2>
        <div className="home__grid">
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      </section>
    </>
  );
}
