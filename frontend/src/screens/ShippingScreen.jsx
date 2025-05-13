import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Banner from '../components/Banner.jsx';
import FormContainer from '../components/FormContainer.jsx';
import CheckoutSteps from '../components/CheckoutSteps.jsx';
import { useTranslation } from 'react-i18next';
import { MdInfoOutline } from 'react-icons/md';
import SelectShippingCountries from '../components/SelectShippingCountries.jsx';
import SelectCity from '../components/SelectCity.jsx';
import { useGetShippingDetailsQuery } from '../slices/shippingsApiSlice.js';
import {
  saveShippingAddress,
  saveShippingPriceData,
} from '../slices/cartSlice.js';
import Loader from '../components/Loader.jsx';

const ShippingScreen = () => {
  const { t, i18n } = useTranslation();
  const cart = useSelector((state) => state.cart);
  const { billingAddress, shippingAddress } = cart;

  const [country, setCountry] = useState(shippingAddress?.country || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [validated, setValidated] = useState(false);
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ''
  );
  const [shippingPrice, setShippingPrice] = useState(
    shippingAddress.price || 0
  );
  const [shippingPriceHu, setShippingPriceHu] = useState(
    shippingAddress.priceHu || 0
  );
  const [shippingFreeFrom, setShippingFreeFrom] = useState(
    shippingAddress.freeFrom || 0
  );
  const [shippingFreeFromHu, setShippingFreeFromHu] = useState(
    shippingAddress.freeFromHu || 0
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: shipping,
    isLoading,
    isError,
    error,
  } = useGetShippingDetailsQuery(country === '' ? null : country);

  useEffect(() => {
    if (!billingAddress.address) {
      navigate('/billing');
    }
  }, [billingAddress.address, navigate]);

  useEffect(() => {
    if (country && shipping) {
      setShippingPrice(shipping.price);
      setShippingPriceHu(shipping.translations?.hu?.price);
      setShippingFreeFrom(shipping.freeFrom);
      setShippingFreeFromHu(shipping.translations?.hu?.freeFrom);
    }
  }, [country, shipping]);

  const submitHandler = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(true);
    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
      })
    );
    dispatch(
      saveShippingPriceData({
        shippingPrice,
        shippingPriceHu,
        shippingFreeFrom,
        shippingFreeFromHu,
      })
    );
    navigate('/payment');
  };

  return (
    <>
      {isLoading ? <Loader /> : isError && console.log(error?.data?.message)}
      <Banner title={t('shipping')} />
      <Container>
        <FormContainer>
          <CheckoutSteps step1 step2 step3 />
          <h1>{t('shipping')}</h1>
          <Form noValidate validated={validated} onSubmit={submitHandler}>
            <Row className="justify-content-center align-items-center">
              <Col md={11}>
                <SelectShippingCountries
                  country={country}
                  setCountry={setCountry}
                  label={t('country')}
                  placeholder={t('enterCountry')}
                  language={i18n.language}
                  isReq
                  isVerifyed={validated}
                  errorMsg={t('noCountryField')}
                />
              </Col>

              <Col md={1}>
                <Link
                  to="/shipping&garantee"
                  target="_blank"
                  title="Szállítási információk"
                  className="btn"
                >
                  <MdInfoOutline style={{ fontSize: '1.25rem' }} />
                </Link>
              </Col>
            </Row>

            <SelectCity
              country={country}
              city={city}
              setCity={setCity}
              label={t('city')}
              isReq
              isVerifyed={validated}
              errorMsg={t('noCityField')}
            />

            <Form.Group controlId="address" className="my-2">
              <Form.Label>{t('address')}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('enterAddress')}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                {t('noAddressField')}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="postalCode" className="my-2">
              <Form.Label>{t('postalCode')}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('enterPostalCode')}
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                {t('noPostalCodeField')}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" variant="primary" className="my-2">
              {t('continue')}
            </Button>
          </Form>
        </FormContainer>
      </Container>
    </>
  );
};

export default ShippingScreen;
