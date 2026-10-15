import { Link, Outlet } from 'react-router-dom';
import logoImg from '../logo/Logo.png';
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
          <img src={logoImg} alt="Learning Space Logo" className="layout__logo-img" />
          <span className="layout__logo-text">Learning Space</span>
        </Link>
      </header>

      <main className="layout__main">
        <Outlet />
      </main>

      <footer className="layout__footer">
        © {new Date().getFullYear()} Learning Space by Thxncdzch
      </footer>
    </div>
  );
}
