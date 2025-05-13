import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, Row } from 'react-bootstrap';
import Loader from '../../../components/Loader.jsx';
import Message from '../../../components/Message.jsx';
import { toast } from 'react-toastify';
import LangSelectInputWithConverter from '../../../components/LangSelectInputWithConverter';
import {
  useGetShippingDetailsQuery,
  useUpdateShippingMutation,
} from '../../../slices/shippingsApiSlice.js';
import FormContainer from '../../../components/FormContainer.jsx';

const DeliveryEditScreen = () => {
  const { country } = useParams();
  const navigate = useNavigate();

  const [price, setPrice] = useState(10);
  const [freeFrom, setFreeFrom] = useState(110);
  const [priceHu, setPriceHu] = useState(1900);
  const [freeFromHu, setFreeFromHu] = useState(20000);

  const {
    data: destination,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetShippingDetailsQuery(country);

  const [
    updateShipping,
    { isLoading: isLoadingUpdate, isError: isErrorUpdate, error: errorUpdate },
  ] = useUpdateShippingMutation();

  useEffect(() => {
    if (destination) {
      setPrice(destination.price);
      setFreeFrom(destination.freeFrom);
      setPriceHu(destination.translations?.hu?.price || destination.price);
      setFreeFromHu(
        destination.translations?.hu?.freeFrom || destination.freeFrom
      );
    }
  }, [destination]);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log('Save updated');
    try {
      await updateShipping({
        country: destination.country,
        price,
        freeFrom,
        translations: {
          hu: {
            price: priceHu,
            freeFrom: freeFromHu,
          },
        },
      });
      toast.success('Shipping destination updated');
      refetch();
      navigate('/admin/deliverylist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      {isLoadingUpdate ? (
        <Loader />
      ) : (
        isErrorUpdate &&
        toast.error(errorUpdate?.data?.message || errorUpdate.error)
      )}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{error.data.message}</Message>
      ) : (
        <Container className="mt-5">
          <Link to="/admin/deliverylist" className="btn btn-primary my-3">
            Go Back
          </Link>
          <Row>
            <h2 className="text-center">Edit Shipping Destination</h2>
          </Row>
          <Row>
            <h2 className="text-center fw-bold">{destination.country}</h2>
          </Row>
          <FormContainer>
            <Form onSubmit={submitHandler}>
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
              <Button type="submit" variant="primary" className="my-4">
                Update
              </Button>
            </Form>
          </FormContainer>
        </Container>
      )}
    </>
  );
};

export default DeliveryEditScreen;
