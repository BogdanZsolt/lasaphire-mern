import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col, Container } from 'react-bootstrap';
import Banner from '../components/Banner.jsx';
import FormContainer from '../components/FormContainer.jsx';
import CheckoutSteps from '../components/CheckoutSteps.jsx';
import { savePaymentMethod } from '../slices/cartSlice.js';
import { useTranslation } from 'react-i18next';

const PaymentScreen = () => {
  const { t } = useTranslation();
  const [paymentMethod, setPaymentMethod] = useState('Stripe');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { billingAddress, hasToBeDelivered, shippingAddress } = cart;

  useEffect(() => {
    if (!billingAddress) {
      navigate('/billing');
    }
    if (hasToBeDelivered && !shippingAddress) {
      navigate('/shipping');
    }
  }, [billingAddress, hasToBeDelivered, shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <>
      <Banner title={t('paymentMethod')} />
      <Container>
        <FormContainer>
          <CheckoutSteps step1 step2 step3 step4 />
          {/* <h1>Payment Method</h1> */}
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label as="legend">{t('selectMethod')}</Form.Label>
              <Col>
                <Form.Check
                  type="radio"
                  className="my-2"
                  label={t('stripeCreditCard')}
                  id="Stripe"
                  name="paymentMethod"
                  value={paymentMethod}
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
              </Col>
            </Form.Group>
            <Button type="submit" variant="primary">
              {t('continue')}
            </Button>
          </Form>
        </FormContainer>
      </Container>
    </>
  );
};

export default PaymentScreen;
