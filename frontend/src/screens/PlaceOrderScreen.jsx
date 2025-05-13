import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Container,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import Banner from '../components/Banner';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useTranslation } from 'react-i18next';
import { toCurrency } from '../utils/converter';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import { useGetShippingDetailsQuery } from '../slices/shippingsApiSlice';
import PaymentLabel from '../components/PaymentLabel';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { t, i18n } = useTranslation();

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const {
    data: shippingCountry,
    isLoading: isLoadingShippingCountry,
    isError: isErrorShippingCountry,
    error: errorShippingCountry,
  } = useGetShippingDetailsQuery(cart.shippingAddress.country);

  const {
    data: billingCountry,
    isLoading: isLoadingBillingCountry,
    isError: isErrorBillingCountry,
    error: errorBillingCountry,
  } = useGetShippingDetailsQuery(cart.billingAddress.country);

  useEffect(() => {
    if (!cart.billingAddress.address) {
      navigate('/billing');
    }
    if (cart.hasToBeDelivered && !cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [
    cart.paymentMethod,
    cart.hasToBeDelivered,
    cart.shippingAddress.address,
    cart.billingAddress.address,
    navigate,
  ]);

  const createItems = (items) => {
    let newItems = [];
    items.map((item) => {
      let newItem = {};
      newItem._id = item._id;
      newItem.type = item.type;
      newItem.name = i18n.language === 'en' ? item.name : item.name_hu;
      newItem.qty = item.qty;
      newItem.thumbnail = item.thumbnail;
      newItem.toBeDelivered = item.toBeDelivered;
      newItem.currentPrice =
        i18n.language === 'en' ? item.currentPrice : item.currentPrice_hu;
      newItems = [...newItems, newItem];
    });
    return newItems;
  };

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        language: i18n.language,
        orderItems: createItems(cart.cartItems),
        billingAddress: cart.billingAddress,
        shippingAddress: cart.shippingAddress,
        shippingPriceData: cart.shippingPriceData,
        paymentMethod: cart.paymentMethod,
        itemsPrice:
          i18n.language === 'en' ? cart.itemsPrice : cart.itemsPrice_hu,
        hasToBeDelivered: cart.hasToBeDelivered,
        shippingPrice:
          i18n.language === 'en' ? cart.shippingPrice : cart.shippingPrice_hu,
        taxPrice: i18n.language === 'en' ? cart.taxPrice : cart.taxPrice_hu,
        totalPrice:
          i18n.language === 'en' ? cart.totalPrice : cart.totalPrice_hu,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };

  // const PaymentLabel = ({ className }) => {
  //   return (
  //     <div className={className}>
  //       <FaStripe style={{ fontSize: '3rem' }} />
  //       <div
  //         style={{
  //           width: '3rem',
  //           backgroundColor: 'white',
  //           borderRadius: '0.2rem',
  //         }}
  //       >
  //         <svg
  //           version="1.1"
  //           id="Layer_1"
  //           x="0px"
  //           y="0px"
  //           viewBox="0 0 3384.54 2077.85"
  //         >
  //           <path
  //             style={{ fill: '#1434CB' }}
  //             d="M1461.26,739.84l-251.37,599.74h-164l-123.7-478.62c-7.51-29.48-14.04-40.28-36.88-52.7
  //             c-37.29-20.23-98.87-39.21-153.05-50.99l3.68-17.43h263.99c33.65,0,63.9,22.4,71.54,61.15l65.33,347.04l161.46-408.2H1461.26z
  //             M2103.84,1143.77c0.66-158.29-218.88-167.01-217.37-237.72c0.47-21.52,20.96-44.4,65.81-50.24c22.23-2.91,83.48-5.13,152.95,26.84
  //             l27.25-127.18c-37.33-13.55-85.36-26.59-145.12-26.59c-153.35,0-261.27,81.52-262.18,198.25c-0.99,86.34,77.03,134.52,135.81,163.21
  //             c60.47,29.38,80.76,48.26,80.53,74.54c-0.43,40.23-48.23,57.99-92.9,58.69c-77.98,1.2-123.23-21.1-159.3-37.87l-28.12,131.39
  //             c36.25,16.63,103.16,31.14,172.53,31.87C1996.72,1348.96,2103.34,1268.45,2103.84,1143.77 M2508.78,1339.58h143.49l-125.25-599.74
  //             h-132.44c-29.78,0-54.9,17.34-66.02,44l-232.81,555.74h162.91L2291,1250h199.05L2508.78,1339.58z M2335.67,1127.08l81.66-225.18
  //             l47,225.18H2335.67z M1682.93,739.84l-128.29,599.74H1399.5l128.34-599.74H1682.93z"
  //           />
  //         </svg>
  //       </div>
  //       <div style={{ width: '2.5rem', borderRadius: '0.2rem' }}>
  //         <svg
  //           version="1.1"
  //           id="Layer_1"
  //           x="0px"
  //           y="0px"
  //           viewBox="0 0 152.4 108"
  //         >
  //           <g>
  //             <rect
  //               y="0"
  //               // style={{ fill: 'none' }}
  //               width="152.4"
  //               height="108"
  //             />
  //             <g>
  //               <rect
  //                 x="60.4"
  //                 y="25.7"
  //                 style={{ fill: '#FF5F00' }}
  //                 width="31.5"
  //                 height="56.6"
  //               />
  //               <path
  //                 style={{ fill: '#EB001B' }}
  //                 d="M62.4,54c0-11,5.1-21.5,13.7-28.3c-15.6-12.3-38.3-9.6-50.6,6.1C13.3,47.4,16,70,31.7,82.3
  // 		            c13.1,10.3,31.4,10.3,44.5,0C67.5,75.5,62.4,65,62.4,54z"
  //               />
  //               <path
  //                 style={{ fill: '#F79E1B' }}
  //                 d="M134.4,54c0,19.9-16.1,36-36,36c-8.1,0-15.9-2.7-22.2-7.7c15.6-12.3,18.3-34.9,6-50.6c-1.8-2.2-3.8-4.3-6-6
  // 		            c15.6-12.3,38.3-9.6,50.5,6.1C131.7,38.1,134.4,45.9,134.4,54z"
  //               />
  //             </g>
  //           </g>
  //         </svg>
  //       </div>
  //     </div>
  //   );
  // };

  return (
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
        isErrorBillingCountry && toast.error(errorBillingCountry?.data?.message)
      )}
      <Banner title={t('order')} />
      <Container>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{t('billing')}</h2>
                <p>
                  <strong>{t('address')}: </strong>
                  {cart.billingAddress.city} {cart.billingAddress.postalCode}.{' '}
                  {cart.billingAddress.address}.{' '}
                  {i18n.language === 'en'
                    ? billingCountry?.countryInfo[0]?.name
                    : billingCountry?.countryInfo[0]?.translations?.hu?.name}
                </p>
              </ListGroup.Item>

              {cart.hasToBeDelivered && (
                <ListGroup.Item>
                  <h2>{t('shipping')}</h2>
                  <p>
                    <strong>{t('address')}: </strong>
                    {cart.shippingAddress.city}{' '}
                    {cart.shippingAddress.postalCode}.{' '}
                    {cart.shippingAddress.address}.{' '}
                    {i18n.language === 'en'
                      ? shippingCountry?.countryInfo[0]?.name
                      : shippingCountry?.countryInfo[0]?.translations?.hu?.name}
                  </p>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <h2>{t('paymentMethod')}</h2>
                {cart.paymentMethod === 'Stripe' ? (
                  <PaymentLabel className="d-flex align-items-center" />
                ) : (
                  'Stripe'
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>{t('orderItems')}</h2>
                {cart.cartItems.length === 0 ? (
                  <Message>{'yourCartIsEmpty'}</Message>
                ) : (
                  <ListGroup variant="flush">
                    {cart.cartItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.thumbnail}
                              alt={
                                i18n.language === 'en'
                                  ? item.name
                                  : item.name_hu
                              }
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/${item.type}/${item._id}`}>
                              {i18n.language === 'en'
                                ? item.name
                                : item.name_hu}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x{' '}
                            {toCurrency(
                              i18n.language,
                              i18n.language === 'en'
                                ? item.currentPrice
                                : item.currentPrice_hu
                            )}
                            {' = '}
                            {toCurrency(
                              i18n.language,
                              (item.qty *
                                ((i18n.language === 'en'
                                  ? item.currentPrice
                                  : item.currentPrice_hu) *
                                  100)) /
                                100
                            )}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
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
                    <Col>{t('items')}:</Col>
                    <Col>
                      {toCurrency(
                        i18n.language,
                        i18n.language === 'en'
                          ? cart.itemsPrice
                          : cart.itemsPrice_hu
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>{t('shipping')}:</Col>
                    <Col>
                      {toCurrency(
                        i18n.language,
                        i18n.language === 'en'
                          ? cart.shippingPrice
                          : cart.shippingPrice_hu
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>{t('tax')}:</Col>
                    <Col>
                      {toCurrency(
                        i18n.language,
                        i18n.language === 'en'
                          ? cart.taxPrice
                          : cart.taxPrice_hu
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>{t('total')}:</Col>
                    <Col>
                      {toCurrency(
                        i18n.language,
                        i18n.language === 'en'
                          ? cart.totalPrice
                          : cart.totalPrice_hu
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  {isLoading ? (
                    <Loader />
                  ) : (
                    error && (
                      <Message variant="danger">
                        {error?.data?.message || error.error}
                      </Message>
                    )
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cart.cartItems.length === 0}
                    onClick={placeOrderHandler}
                  >
                    {t('placeOrder')}
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PlaceOrderScreen;
