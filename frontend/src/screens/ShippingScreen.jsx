import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Banner from '../components/Banner.jsx';
import FormContainer from '../components/FormContainer.jsx';
import { saveShippingAddress } from '../slices/cartSlice.js';
import CheckoutSteps from '../components/CheckoutSteps.jsx';
import { useTranslation } from 'react-i18next';

const ShippingScreen = () => {
  const { t } = useTranslation();
  const cart = useSelector((state) => state.cart);
  const { billingAddress, shippingAddress } = cart;

  const [validated, setValidated] = useState(false);
  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!billingAddress.address) {
      navigate('/billing');
    }
  }, [billingAddress.address, navigate]);

  const submitHandler = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(true);
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <>
      <Banner title={t('shipping')} />
      <Container>
        <FormContainer>
          <CheckoutSteps step1 step2 step3 />
          <h1>{t('shipping')}</h1>
          <Form noValidate validated={validated} onSubmit={submitHandler}>
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

            <Form.Group controlId="city" className="my-2">
              <Form.Label>{t('city')}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('enterCity')}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                {t('noCityField')}
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

            <Form.Group controlId="country" className="my-2">
              <Form.Label>{t('country')}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('enterCountry')}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
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
