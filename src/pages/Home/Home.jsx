import SubjectCard from '../../components/SubjectCard/SubjectCard.jsx';
import subjects from '../../data/subjects/index.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { localizeSubject } from '../../i18n/thaiTranslations.js';
import './Home.css';

export default function Home() {
  const { lang, t } = useLanguage();

  return (
    <>
      <section className="home__hero">
        <p className="eyebrow">{t('Learn by seeing', 'เรียนรู้ผ่านการมองเห็นภาพจำลอง')}</p>
        <h1 className="home__title">
          {t('Understand every topic,', 'เข้าใจลึกซึ้งทุกบทเรียน')}
          <br />
          <span className="home__title-gradient">
            {t('visualized.', 'ผ่านภาพจำลองโต้ตอบ 2D & 3D')}
          </span>
        </h1>
        <p className="home__subtitle">
          {t(
            'This is the web pages made to clear explanations paired with interactive visualizations for each topic in every subject. Pick a subject to begin.',
            'แพลตฟอร์มสรุปองค์ความรู้ทางฟิสิกส์ คณิตศาสตร์ พีชคณิตเชิงเส้น และการเขียนโปรแกรม พร้อมคำอธิบายละเอียดและห้องทดลองจำลองภาพโต้ตอบ เลือกวิชาด้านล่างเพื่อเริ่มต้นเรียนรู้'
          )}
        </p>
      </section>

      <section className="home__subjects" aria-labelledby="subjects-heading">
        <h2 id="subjects-heading" className="section-title">
          {t('Subjects', 'รายวิชาทั้งหมด (Subjects)')}
        </h2>
        <div className="home__grid">
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={localizeSubject(subject, lang)} />
          ))}
        </div>
      </section>
    </>
  );
}
