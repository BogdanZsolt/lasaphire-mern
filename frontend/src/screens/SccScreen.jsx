import { useTranslation } from 'react-i18next';
import Banner from '../components/Banner';

const SccScreen = () => {
  const { t } = useTranslation('footer');

  return (
    <div>
      <Banner
        title={t('scclong')}
        src="/images/ecoprint-04.webp"
        alt="GCC banner"
      />
      SccScreen
    </div>
  );
};

export default SccScreen;
