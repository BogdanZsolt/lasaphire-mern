import { useTranslation } from 'react-i18next';
import Banner from '../components/Banner';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { useGetShippingsQuery } from '../slices/shippingsApiSlice';
import { Container } from 'react-bootstrap';

const ShippingGuaranteeScreen = () => {
  const { t, i18n } = useTranslation('footer');

  const {
    data: shippings,
    isLoading,
    isError,
    error,
  } = useGetShippingsQuery({ sort: 'country' });

  return (
    <div>
      <Banner
        title={t('shipping&guarantee')}
        src="/images/ecoprint-04.webp"
        alt="Shipping & Gurantee banner"
      />
      <Container>
        {isLoading ? <Loader /> : isError && toast.error(error?.data?.message)}
        {i18n.language === 'en' ? (
          <>
            <h4 className="fw-bold">Shipping conditions</h4>
            <p className="lead">
              We can deliver ordered products, active ingredients, and devices
              (hereinafter referred to as goods) that require delivery to the
              following countries:
            </p>
            <ul>
              {shippings &&
                shippings.map((country, idx) => (
                  <li key={idx}>{country?.countryInfo[0]?.name}</li>
                ))}
            </ul>
            <p className="lead">
              If you would like to order to a country not listed, please
              inquire, as the list will be expanded.
            </p>
          </>
        ) : (
          <>
            <h4 className="fw-bold">Szállítási feltételek</h4>
            <p className="lead">
              Azok a megrendelt termékeket, hatóanyagokat, eszközöket,
              (továbbiakban árúk) amelyek kiszállítást igényelnek, az alábbi
              országokba tudjuk eljuttatni:
            </p>
            <ul>
              {shippings &&
                shippings.map((country, idx) => (
                  <li key={idx}>
                    {country.countryInfo[0].translations?.hu?.name}
                  </li>
                ))}
            </ul>
            <p className="lead">
              Ha a listában nem szereplő országba szeretnél rendelni, kérlek
              érdeklődj, mert a lista bővülni fog.
            </p>
          </>
        )}
      </Container>
    </div>
  );
};

export default ShippingGuaranteeScreen;
