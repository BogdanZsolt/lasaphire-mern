import { useTranslation } from 'react-i18next';
import Banner from '../components/Banner';

const ShippingGuaranteeScreen = () => {
  const { t } = useTranslation('footer');

  return (
    <div>
      <Banner
        title={t('shipping&guarantee')}
        src="/images/ecoprint-04.webp"
        alt="Shipping & Gurantee banner"
      />
      ShippingGuaranteeScreen
    </div>
  );
};

export default ShippingGuaranteeScreen;
