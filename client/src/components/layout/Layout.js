import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import NavbarMenu from './NavbarMenu';

export default function Layout() {
  return (
    <>
      <NavbarMenu />
      <Container className="py-4">
        <Outlet />
      </Container>
    </>
  );
}
