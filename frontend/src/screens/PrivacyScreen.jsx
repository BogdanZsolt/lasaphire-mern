import { useTranslation } from 'react-i18next';
import Banner from '../components/Banner';

const PrivacyScreen = () => {
  const { t } = useTranslation('footer');

  return (
    <div>
      <Banner
        title={t('privacy')}
        src="/images/ecoprint-04.webp"
        alt="Privacy banner"
      />
      PrivacyScreen
    </div>
  );
};

export default PrivacyScreen;
