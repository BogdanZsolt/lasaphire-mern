import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import { toast } from 'react-toastify';
import {
  useCreateHeroMutation,
  useDeleteHeroMutation,
  useGetHerosQuery,
} from '../../../slices/herosApiSlice';
import { LinkContainer } from 'react-router-bootstrap';

const HeroListScreen = () => {
  const {
    data: heros,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetHerosQuery({ sort: 'createdAt' });

  const [
    createHero,
    { isLoading: isLoadingCreate, isError: isErrorCreate, error: errorCreate },
  ] = useCreateHeroMutation();

  const [
    deleteHero,
    { isLoading: isLoadingDelete, isError: isErrorDelete, error: errorDelete },
  ] = useDeleteHeroMutation();

  const createHeroHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createHero();
        toast.success('Product created');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
      }
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteHero(id);
        toast.success('Hero deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Container className="mt-3">
      <Row className="justify-content-start align-items-center">
        <Col xs={3}>
          <Button
            className="btn m-3 d-flex justify-content-center align-items-center"
            onClick={createHeroHandler}
          >
            <FaEdit className="me-2" />
            <span>Create Hero</span>
          </Button>
        </Col>
      </Row>
      {isLoadingCreate ? (
        <Loader />
      ) : (
        isErrorCreate && toast.error(errorCreate?.data?.message)
      )}
      {isLoadingDelete ? (
        <Loader />
      ) : (
        isErrorDelete && toast.error(errorDelete?.data?.message)
      )}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{error.data.message}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>TITLE</th>
                <th>IMAGE</th>
                <th>ACTIVE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {heros.data.map((hero) => (
                <tr key={hero._id}>
                  <td
                    title={`hu: ${hero.translations?.hu?.title}\n\n id: ${hero._id}`}
                    className="align-middle"
                  >
                    <span className="lead">{hero.title}</span>
                  </td>
                  <td className="text-center align-middle">
                    <div className="hero-img-box">
                      <img src={hero.image} className="hero-img-idx" />
                    </div>
                  </td>
                  <td className="text-center align-middle">
                    {hero.isActive ? (
                      <FaCheck className="text-success" />
                    ) : (
                      <FaTimes className="text-danger" />
                    )}
                  </td>
                  <td className="text-center align-middle">
                    <LinkContainer to={`/admin/hero/${hero._id}/edit`}>
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
                      onClick={() => deleteHandler(hero._id)}
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
  );
};

export default HeroListScreen;
