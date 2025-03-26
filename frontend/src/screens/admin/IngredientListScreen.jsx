import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Container } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import {
  useGetIngredientsQuery,
  useCreateIngredientMutation,
  useDeleteIngredientMutation,
} from '../../slices/ingredientsApiSlice';

const IngredientListScreen = () => {
  let { pageNumber: page } = useParams();
  if (!page) page = 1;

  const {
    data: ingredients,
    isLoadin,
    isError,
    error,
    isSuccess,
    refetch,
  } = useGetIngredientsQuery({ page, limit: 20 });

  const [
    createIngredient,
    { isLoading: loadingCreate, isError: createIsError, error: createError },
  ] = useCreateIngredientMutation();

  const [
    deleteIngredient,
    { isLoading: loadingDelete, isError: isErrorDelete, error: errorDelete },
  ] = useDeleteIngredientMutation();

  const createIngredientHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createIngredient();
        toast.success('Ingredient created');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const deleteIngredientHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteIngredient(id);
        toast.success('Ingredient deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Container className="mt-5">
      <Row className="text-center">
        <h2 className="fs-1 fw-semibold">Ingredients</h2>
      </Row>
      <Row className="justify-content-end align-items-center">
        <Col xs={3}>
          <Button
            className="btn m-3 d-flex justify-content-center align-items-center"
            onClick={createIngredientHandler}
          >
            <FaEdit className="me-2" />
            <span>Create Ingredient</span>
          </Button>
        </Col>
      </Row>

      {loadingCreate ? (
        <Loader />
      ) : (
        createIsError && toast.error(createError?.data?.message)
      )}
      {loadingDelete ? (
        <Loader />
      ) : (
        isErrorDelete && toast.error(errorDelete?.data?.message)
      )}
      {isLoadin ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{error.data.message}</Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>NAME</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isSuccess &&
              ingredients.data.map((ingredient) => (
                <tr key={ingredient._id}>
                  <td
                    title={`hu: ${ingredient.translations?.hu?.name}\n\n id: ${ingredient._id}`}
                  >
                    {ingredient.name}
                  </td>
                  <td>
                    <LinkContainer
                      to={`/admin/ingredient/${ingredient._id}/edit`}
                    >
                      <Button
                        title="Edit"
                        variant="primary"
                        className="btn-sm mx-2"
                      >
                        <span className="d-flex align-items-center justify-content-center py">
                          <FaEdit />
                        </span>
                      </Button>
                    </LinkContainer>
                    <Button
                      title="Delete"
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteIngredientHandler(ingredient._id)}
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
      )}
    </Container>
  );
};

export default IngredientListScreen;
