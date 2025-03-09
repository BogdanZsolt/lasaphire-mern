import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
// import { RiFacebookLine, RiInstagramLine, RiYoutubeLine } from 'react-icons/ri';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';

const SocialMenu = () => {
  const { t } = useTranslation(['contact']);
  return (
    <div className="social-menu">
      <Button
        href="https://www.facebook.com/lasaphireskincare"
        variant="secondary"
        target="_blank"
        title={t('socialTitleFacebook')}
        className="btn"
      >
        <FaFacebookF />
      </Button>
      <Button
        href="https://www.instagram.com"
        variant="secondary"
        target="_blank"
        title={t('socialTitleInsta')}
        className="btn"
      >
        <FaInstagram />
      </Button>
      <Button
        href="https://youtube.com"
        variant="secondary"
        target="_blank"
        title={t('socialTitleYoutube')}
        className="btn"
      >
        <FaYoutube />
      </Button>
    </div>
  );
};

export default SocialMenu;
