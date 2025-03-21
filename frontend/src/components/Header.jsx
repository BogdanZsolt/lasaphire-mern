import { useState, useEffect } from 'react';
import {
  Container,
  Navbar,
  Offcanvas,
  Nav,
  NavDropdown,
  Badge,
} from 'react-bootstrap';
import { RiHeartLine, RiShoppingBagLine, RiUserLine } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Menu from './Menu';
import logo from '../assets/logo-200x200-1.png';
// import SearchBox from './SearchBox';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SocialMenu from './SocialMenu';
import HeaderSocialMenu from './HeaderSocialMenu';
import SearchBox from './SearchBox';

const Header = () => {
  const { t } = useTranslation(['menu']);

  const { cartItems } = useSelector((state) => state.cart);
  const { wishListItems } = useSelector((state) => state.wishList);
  const { userAuth } = useSelector((state) => state.auth);
  const [scrollClass, setScrollClass] = useState('');

  const scrollNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 100 ? setScrollClass('scroll-nav') : setScrollClass('');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollNavbar);
    return () => window.removeEventListener('scroll', scrollNavbar);
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className={`ps-navbar ${scrollClass}`}
        fixed="top"
      >
        <Container fluid>
          <>
            <LinkContainer to="/">
              <Navbar.Brand href="/">
                <img src={logo} alt="PantherStuff" className="logo" />
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle
              aria-controls="offcanvas-navbar-md"
              className="d-lg-none"
            >
              <div className="mobile-menu-btn">
                <span className="toggler-icon top-bar"></span>
                <span className="toggler-icon middle-bar"></span>
                <span className="toggler-icon bottom-bar"></span>
              </div>
            </Navbar.Toggle>
            <Navbar.Offcanvas
              id="offcanvas-navbar"
              aria-labelledby="offcanvas-navbar-label"
              placement="start"
              className="ps-navbar-offcanvas"
              responsive="lg"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvas-navbar-label">
                  {/* <img src={logo} alt="PantherStuff" className="logo" /> */}
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Menu />
                <Nav
                  className="justify-content-end flex-grow-1 pe-3 right-menu"
                  as="ul"
                >
                  <SearchBox />
                  {userAuth && userAuth?.isAuthenticated ? (
                    <NavDropdown
                      title={
                        <>
                          <RiUserLine className="d-lg-none" />
                          {userAuth.name}
                        </>
                      }
                      id="username"
                      as="li"
                    >
                      {userAuth?.isAdmin && (
                        <LinkContainer to="/admin">
                          <NavDropdown.Item>
                            {t('adminDashboard')}
                          </NavDropdown.Item>
                        </LinkContainer>
                      )}
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>{t('profile')}</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
                        {t('logOut')}
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <LinkContainer to="/login">
                      <Nav.Link>
                        <RiUserLine className="d-inline-block d-lg-none" />
                        {t('signIn')}
                      </Nav.Link>
                    </LinkContainer>
                  )}
                  <li className="d-flex justify-content-start justify-content-lg-center align-items-center">
                    <LinkContainer to="/cart" title={t('cart')}>
                      <Nav.Link className="d-flex justify-content-center align-items-center">
                        <RiShoppingBagLine />
                        <span className="d-lg-none">{t('cart')}</span>
                        {cartItems.length > 0 && (
                          <Badge
                            pill
                            bg="success"
                            style={{ marginLeft: '5px' }}
                          >
                            {cartItems.reduce((a, c) => a + c.qty, 0)}
                          </Badge>
                        )}
                      </Nav.Link>
                    </LinkContainer>
                  </li>
                  <li className="d-flex justify-content-start justify-content-lg-center align-items-center">
                    <LinkContainer to="/wishlist" title={t('wishlist')}>
                      <Nav.Link className="d-flex justify-content-center align-items-center">
                        <RiHeartLine />
                        <span className="d-lg-none">{t('wishlist')}</span>
                        {wishListItems.length > 0 && (
                          <Badge
                            pill
                            bg="success"
                            style={{ marginLeft: '5px' }}
                          >
                            {wishListItems.length}
                          </Badge>
                        )}
                      </Nav.Link>
                    </LinkContainer>
                  </li>
                  <li className="d-flex justify-content-start justify-content-lg-center align-items-center">
                    <LanguageSelector />
                  </li>
                  <HeaderSocialMenu />
                  <li className="d-block d-lg-none">
                    <SocialMenu />
                  </li>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
