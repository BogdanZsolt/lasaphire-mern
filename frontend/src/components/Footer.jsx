import { Link } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import SocialMenu from './SocialMenu.jsx';
import logo from '../assets/logo-200x200-1.png';

const Footer = () => {
  const { t } = useTranslation('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <img
        className="footer-image"
        src="/images/footer-01.jpg"
        alt="footer image"
      />
      <Container>
        <Row className="justify-content-center">
          <div className="footer-logo">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
          <ul className="footer-menu">
            <li>
              <Link to="/privacy">{t('privacy')}</Link>
            </li>
            <li>
              <Link to="/scc">{t('scc')}</Link>
            </li>
            <li>
              <Link to="/shipping&garantee">{t('shipping&guarantee')}</Link>
            </li>
            <li>
              <Link to="/order&payment">{t('order&payment')}</Link>
            </li>
          </ul>
          <div className="footer-copyright">
            <p>LaSaphire&copy; 2024-{currentYear}</p>
            <SocialMenu />
          </div>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
