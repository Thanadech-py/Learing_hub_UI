import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <section className="not-found">
      <p className="eyebrow">404</p>
      <h1 className="not-found__title">Page not found</h1>
      <p className="not-found__text">
        The page you’re looking for doesn’t exist (yet).
      </p>
      <Link to="/" className="not-found__link">
        ← Back to Home
      </Link>
    </section>
  );
}
