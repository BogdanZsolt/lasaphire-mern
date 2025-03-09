import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';
import Banner from '../components/Banner';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveBillingAddress } from '../slices/cartSlice';

const BillingScreen = () => {
  const { t } = useTranslation();
  const cart = useSelector((state) => state.cart);
  const { billingAddress, hasToBeDelivered } = cart;

  const [validated, setValidated] = useState(false);
  const [address, setAddress] = useState(billingAddress?.address || '');
  const [city, setCity] = useState(billingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(
    billingAddress?.postalCode || ''
  );
  const [country, setCountry] = useState(billingAddress?.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(true);
    dispatch(saveBillingAddress({ address, city, postalCode, country }));
    navigate(hasToBeDelivered ? '/shipping' : '/payment');
  };

  return (
    <>
      <Banner title={t('billing')} />
      <Container>
        <FormContainer>
          <CheckoutSteps step1 step2 />
          <h1>{t('billing')}</h1>

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
                {t('noCountryField')}
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

export default BillingScreen;
