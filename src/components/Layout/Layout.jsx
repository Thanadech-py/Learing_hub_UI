import { Link, Outlet } from 'react-router-dom';
import './Layout.css';

/**
 * Shared page shell (nav + footer) used by every page so they all look
 * consistent. Pages render inside <Outlet />.
 */
export default function Layout() {
  return (
    <div className="layout">
      <header className="layout__nav">
        <Link to="/" className="layout__logo">
          <span className="layout__logo-mark" aria-hidden="true">◆</span>
          Learning Space
        </Link>
      </header>

      <main className="layout__main">
        <Outlet />
      </main>

      <footer className="layout__footer">
        © {new Date().getFullYear()} Learning Space
      </footer>
    </div>
  );
}
