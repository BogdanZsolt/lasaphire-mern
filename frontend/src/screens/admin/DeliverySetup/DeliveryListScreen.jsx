import { useMemo, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Loader from '../../../components/Loader';
import { toast } from 'react-toastify';
import Message from '../../../components/Message.jsx';
import { useGetCountriesQuery } from '../../../slices/countriesApiSlice';
import {
  useDeleteShippingMutation,
  useGetShippingsQuery,
} from '../../../slices/shippingsApiSlice.js';
import NewDestinationModal from './NewDestinationModal.jsx';
import { LinkContainer } from 'react-router-bootstrap';

const DeliveryListScreen = () => {
  const [show, setShow] = useState(false);
  const {
    data: countries,
    isLoading: isLoadingCountries,
    isError: isErrorCountries,
    error: errorCountries,
  } = useGetCountriesQuery({ sort: 'name' });

  const {
    data: shippings,
    isLoading: isLoadingShippings,
    isError: isErrorShippings,
    error: errorShippings,
    refetch,
  } = useGetShippingsQuery({ sort: 'country' });

  // const {
  //   data: shippingDetail,
  //   isLoading: isLoadingShippingDetail,
  //   isError: isErrorShippingDetail,
  //   error: errorShippingDetail,
  // } = useGetShippingDetailsQuery();

  const [
    deleteShipping,
    { isLoading: isLoadingDelete, isError: isErrorDelete, error: errorDelete },
  ] = useDeleteShippingMutation();

  const handleShow = () => setShow(true);

  const exists = useMemo(() => {
    if (!Array.isArray(shippings)) {
      return;
    }
    return shippings?.map((item) => item.country);
  }, [shippings]);

  const createNewDestination = () => {
    handleShow();
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteShipping(id);
        toast.success('Shipping destination deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Container className="mt-5">
        <Row className="text-center">
          <h2 className="fw-semibold">Shipping destinations</h2>
        </Row>
        <Row className="justify-content-end align-items-center">
          <Col xs={3}>
            <Button
              className="btn m-3 d-flex justify-content-center align-items-center"
              onClick={createNewDestination}
            >
              <FaEdit className="me-2" />
              <span>New Destination</span>
            </Button>
          </Col>
        </Row>
        {isLoadingDelete ? (
          <Loader />
        ) : (
          isErrorDelete && toast.error(errorDelete?.data?.message)
        )}
        {isLoadingCountries ? (
          <Loader />
        ) : (
          isErrorCountries && toast.error(errorCountries?.data?.message)
        )}
        {isLoadingShippings ? (
          <Loader />
        ) : isErrorShippings ? (
          <Message variant="danger">{errorShippings.data.message}</Message>
        ) : (
          <>
            <Table striped hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>DESTINATION</th>
                  <th>PRICE</th>
                  <th>FREE FROM</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(shippings) &&
                  shippings.map((shipping, idx) => (
                    <tr key={idx}>
                      <td
                        title={shipping.countryInfo[0]?.translations?.hu?.name}
                      >
                        {shipping.country}
                      </td>
                      <td title={shipping.translations?.hu?.price}>
                        {shipping.price}
                      </td>
                      <td title={shipping.translations?.hu?.freeFrom}>
                        {shipping.freeFrom}
                      </td>
                      <td>
                        <LinkContainer
                          to={`/admin/delivery/${shipping.country}/edit`}
                        >
                          <Button
                            title="edit"
                            variant="primary"
                            className="btn-sm mx-2"
                          >
                            <span className="d-flex align-items-center justify-content-center py">
                              <FaEdit />
                            </span>
                          </Button>
                        </LinkContainer>
                        <Button
                          title="delete"
                          variant="danger"
                          className="btn-sm"
                          onClick={() => deleteHandler(shipping.country)}
                        >
                          <span className="d-flex align-items-center justify-content-center py">
                            <FaTrash className="text-primary" />
                          </span>
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </>
        )}
      </Container>
      <NewDestinationModal
        show={show}
        setShow={setShow}
        countries={countries}
        refetch={refetch}
        exists={exists}
      />
    </>
  );
};

export default DeliveryListScreen;
