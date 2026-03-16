import { Container } from 'react-bootstrap';
import { Outlet, useLocation } from 'react-router-dom';
import NavbarMenu from './NavbarMenu';

export default function Layout() {
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <div className={`app-wrapper ${isAuthPage ? 'auth-page-wrapper' : ''}`}>
      <NavbarMenu />
      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
}
