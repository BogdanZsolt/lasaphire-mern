import { useTranslation } from 'react-i18next';
import Banner from '../components/Banner';

const OrderPaymentScreen = () => {
  const { t } = useTranslation('footer');

  return (
    <div>
      <Banner
        title={t('order&payment')}
        src="/images/ecoprint-04.webp"
        alt="Order & Payment banner"
      />
      OrderPaymentScreen
    </div>
  );
};

export default OrderPaymentScreen;
