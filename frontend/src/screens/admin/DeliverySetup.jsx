import { useEffect, useState } from 'react';
import { Button, Container, Form, Modal, Row } from 'react-bootstrap';
import Loader from '../../components/Loader';
import SelectSetupCountries from '../../components/SelectSetupCountries';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import LangSelectInputWithConverter from '../../components/LangSelectInputWithConverter';
import { useGetCountriesQuery } from '../../slices/countriesApiSlice';
import { useGetShippingSetupQuery } from '../../slices/shippingSetupApiSlice';

const DeliverySetup = () => {
  const [isDeliveryCountries, setIsDeliveryCountries] = useState([]);
  const [ShippingDatas, setShippingDatas] = useState([]);
  const [activeValue, setActiveValue] = useState('');
  const [show, setShow] = useState(false);
  const [price, setPrice] = useState(10);
  const [priceHu, setPriceHu] = useState(1900);
  const [freeFrom, setFreeFrom] = useState(110);
  const [freeFromHu, setFreeFromHu] = useState(20000);

  const { data: countries, isLoading, isError, error } = useGetCountriesQuery();
  const {
    data: shippings,
    isLoading: isLoadingShippings,
    isError: isErrorShippings,
    error: errorShippings,
  } = useGetShippingSetupQuery();

  useEffect(() => {
    if (shippings) {
      const delivery = shippings.isDelivery.map((shipping) => shipping.country);
      setIsDeliveryCountries(delivery);
      const shippData = shippings.isDelivery.map((val) => val);
      setShippingDatas(shippData);
    }
  }, [shippings]);

  // useEffect(() => {
  //   const shippDatas = .map(countr => {

  //   })
  // }, [isDeliveryCountries]);

  useEffect(() => {
    if (countries && shippings && activeValue) {
      const acd = shippings.isDelivery.find(
        (shipping) => shipping.country === activeValue
      );
      if (acd) {
        setPrice(acd.price);
        setPriceHu(acd.translations.hu.price);
        setFreeFrom(acd.freeFrom);
        setFreeFromHu(acd.translations.hu.freeFrom);
      } else {
        setPrice(10);
        setPriceHu(1900);
        setFreeFrom(110);
        setFreeFromHu(20000);
      }
    }
  }, [activeValue, countries, shippings]);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log('update');
  };

  const handleClose = () => {
    setActiveValue('');
    setShow(false);
  };

  const handleDone = () => {
    console.log('Done');
    let acd = {
      country: activeValue,
      price: price,
      freeFrom: freeFrom,
      translations: {
        hu: {
          price: priceHu,
          freeFrom: freeFromHu,
        },
      },
    };
    console.log(acd);
    handleClose();
  };

  return (
    <>
      {isLoading ? <Loader /> : isError && toast.error(error?.data?.message)}
      {isLoadingShippings ? (
        <Loader />
      ) : (
        isErrorShippings && toast.error(errorShippings?.data?.message)
      )}
      <Container className="my-5">
        <Row className="text-center">
          <h2 className="fw-bold">Delivery Setup</h2>
        </Row>
        <FormContainer>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="country" className="my-2">
              <Form.Label>Which countries do we ship to?</Form.Label>
              <SelectSetupCountries
                countries={countries}
                country={isDeliveryCountries}
                setCountry={setIsDeliveryCountries}
                show={show}
                setShow={setShow}
                activeValue={activeValue}
                setActiveValue={setActiveValue}
                multi
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="my-2">
              Update
            </Button>
          </Form>
        </FormContainer>
        <Modal size="lg" centered show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delivery setup - {activeValue}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LangSelectInputWithConverter
              label="Shipping price"
              placeholder="Shipping price"
              placeholder_hu="Shipping price"
              defLang={price}
              setDefLang={setPrice}
              secLang={priceHu}
              setSecLang={setPriceHu}
              className="mb-3"
            />
            <LangSelectInputWithConverter
              label="The total price that qualifies for free shipping"
              placeholder="Price"
              placeholder_hu="Price"
              defLang={freeFrom}
              setDefLang={setFreeFrom}
              secLang={freeFromHu}
              setSecLang={setFreeFromHu}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleDone}>Done</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default DeliverySetup;
