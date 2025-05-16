import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import { RiFacebookLine, RiInstagramLine, RiYoutubeLine } from 'react-icons/ri';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
// import { IoShareSocial } from 'react-icons/io5';

const HeaderSocialMenu = () => {
  const { t } = useTranslation(['contact']);
  return (
    <>
      <div className="d-none d-lg-flex d-xl-none social-wind-menu">
        <Link
          to="https://www.facebook.com/lasaphireskincare"
          target="_blank"
          title={t('socialTitleFacebook')}
          className="nav-link"
        >
          <FaFacebookF />
        </Link>
        <Link
          to="https://www.instagram.com"
          target="_blank"
          title={t('socialTitleInsta')}
          className="nav-link"
        >
          <FaInstagram />
        </Link>
        <Link
          to="https://youtube.com"
          target="_blank"
          title={t('socialTitleYoutube')}
          className="nav-link"
        >
          <FaYoutube />
        </Link>
      </div>

      <div className="d-none d-xl-flex justify-content-center align-items-center header-social-menu">
        <Link
          to="https://www.facebook.com/lasaphireskincare"
          target="_blank"
          title={t('socialTitleFacebook')}
          className="nav-link"
        >
          <FaFacebookF />
        </Link>
        <Link
          to="https://www.instagram.com"
          target="_blank"
          title={t('socialTitleInsta')}
          className="nav-link"
        >
          <FaInstagram />
        </Link>
        <Link
          to="https://youtube.com"
          target="_blank"
          title={t('socialTitleYoutube')}
          className="nav-link"
        >
          <FaYoutube />
        </Link>
      </div>
    </>
  );
};

export default HeaderSocialMenu;
