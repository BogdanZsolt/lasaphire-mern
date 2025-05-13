import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Container } from 'react-bootstrap';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutPay from '../components/CheckoutPay';
import Banner from '../components/Banner';
import Message from '../components/Message';
import Loader from '../components/Loader';
// import { toast } from 'react-toastify';
import { toCurrency, toLocalDate } from '../utils/converter';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import PaymentLabel from '../components/PaymentLabel';

import { loadStripe } from '@stripe/stripe-js';
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
} from '../slices/ordersApiSlice';
import { useGetShippingDetailsQuery } from '../slices/shippingsApiSlice';

// configure stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const { t, i18n } = useTranslation();

  const [clientSecret, setClientSecret] = useState(null);

  const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId);

  const {
    data: shippingCountry,
    isLoading: isLoadingShippingCountry,
    isError: isErrorShippingCountry,
    error: errorShippingCountry,
  } = useGetShippingDetailsQuery(order?.shippingAddress?.country);

  const {
    data: billingCountry,
    isLoading: isLoadingBillingCountry,
    isError: isErrorBillingCountry,
    error: errorBillingCountry,
  } = useGetShippingDetailsQuery(order?.billingAddress?.country);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  useEffect(() => {
    const asyncPayOrder = async () => {
      const { data } = await payOrder({ orderId });
      if (data) {
        setClientSecret(data.clientSecret);
      }
    };
    asyncPayOrder();
  }, [orderId, payOrder]);

  // stripe options
  const options = {
    clientSecret,
    locale: i18n.language,
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.Message || error.error}
        </Message>
      ) : (
        <>
          {isLoadingShippingCountry ? (
            <Loader />
          ) : (
            isErrorShippingCountry &&
            toast.error(errorShippingCountry?.data?.message)
          )}
          {isLoadingBillingCountry ? (
            <Loader />
          ) : (
            isErrorBillingCountry &&
            toast.error(errorBillingCountry?.data?.message)
          )}
          <Banner title={t('order')} />
          <Container>
            <h1>{t('orderid', { id: order._id })}</h1>
            <Row className="flex-wrap-reverse">
              <Col md={8}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>{t('billing')}</h2>
                    <p>
                      <strong>{t('name')}: </strong> {order.user.name}
                    </p>
                    <p>
                      <strong>{t('email')}: </strong> {order.user.email}
                    </p>
                    <p>
                      <strong>{t('address')}: </strong>
                      {order.billingAddress.address},{' '}
                      {order.billingAddress.city}{' '}
                      {order.billingAddress.postalCode},{' '}
                      {i18n.language === 'en'
                        ? billingCountry?.countryInfo[0]?.name
                        : billingCountry?.countryInfo[0]?.translations?.hu
                            ?.name}
                      {/* {order.billingAddress.country} */}
                    </p>
                  </ListGroup.Item>
                  {order.hasToBeDelivered && (
                    <ListGroup.Item>
                      <h2>{t('shipping')}</h2>
                      <p>
                        <strong>{t('name')}: </strong> {order.user.name}
                      </p>
                      <p>
                        <strong>{t('email')}: </strong> {order.user.email}
                      </p>
                      <p>
                        <strong>{t('address')}: </strong>
                        {order.shippingAddress.address},{' '}
                        {order.shippingAddress.city}{' '}
                        {order.shippingAddress.postalCode},{' '}
                        {i18n.language === 'en'
                          ? shippingCountry?.countryInfo[0]?.name
                          : shippingCountry?.countryInfo[0]?.translations?.hu
                              ?.name}
                        {/* {order.shippingAddress.country} */}
                      </p>
                      {order.isDelivered ? (
                        <Message variant="success">
                          Delivered on{order.deliveredAt}
                        </Message>
                      ) : (
                        <Message variant="danger">{t('notDelivered')}</Message>
                      )}
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <h2>{t('paymentMethod')}</h2>
                    <p>
                      {order.paymentMethod === 'Stripe' ? (
                        <PaymentLabel className="d-flex align-items-center" />
                      ) : (
                        ''
                      )}
                    </p>
                    {order.isPaid ? (
                      <Message variant="success">
                        {t('paidOn')} {toLocalDate(i18n.language, order.paidAt)}
                      </Message>
                    ) : (
                      <Message variant="danger">{t('notPaid')}</Message>
                    )}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h2>{t('orderItems')}</h2>
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.thumbnail}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link
                              to={`/${
                                item.model_type === 'Plan'
                                  ? 'membership'
                                  : item?.model_type
                                  ? item?.model_type?.toLowerCase()
                                  : 'product'
                              }/${item.product}`}
                            >
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x{' '}
                            {toCurrency(order.language, item.currentPrice)} =
                            {toCurrency(
                              order.language,
                              item.qty * item.currentPrice
                            )}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={4}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h2>{t('orderSummary')}</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>{t('items')}</Col>
                        <Col>
                          {toCurrency(order.language, order.itemsPrice)}
                        </Col>
                      </Row>
                      <Row>
                        <Col>{t('shipping')}</Col>
                        <Col>
                          {toCurrency(order.language, order.shippingPrice)}
                        </Col>
                      </Row>
                      <Row>
                        <Col>{t('tax')}</Col>
                        <Col>{toCurrency(order.language, order.taxPrice)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>{t('total')}</Col>
                        <Col>
                          <span className="fw-bold fs-5">
                            {toCurrency(order.language, order.totalPrice)}
                          </span>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {/* PAY ORDER PLACEHOLDER */}
                    {!order.isPaid && (
                      <>
                        {loadingPay ? (
                          <Loader />
                        ) : (
                          clientSecret && (
                            <ListGroup.Item>
                              <Elements
                                stripe={stripePromise}
                                options={options}
                              >
                                <CheckoutPay />
                              </Elements>
                            </ListGroup.Item>
                          )
                        )}
                      </>
                    )}
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      )}
      ;
    </>
  );
};

export default OrderScreen;
