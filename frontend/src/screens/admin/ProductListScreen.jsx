import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Container } from 'react-bootstrap';
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import { toast } from 'react-toastify';
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from '../../slices/productsApiSlice';

const ProductListScreen = () => {
  let { pageNumber: page } = useParams();
  if (!page) page = 1;
  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useGetProductsQuery({
    page,
    limit: 20,
  });

  const [
    createProduct,
    { isLoading: isLoadingCreate, isError: isErrorCreate, error: errorCreate },
  ] = useCreateProductMutation();

  const [
    deleteProduct,
    { isLoading: isLoadingDelete, isError: isErrorDelete, error: errorDelete },
  ] = useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteProduct(id);
        toast.success('Product deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        toast.success('Product created');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Container className="mt-5">
      <Row className="text-center">
        <h2 className="fs-1 fw-semibold">Products</h2>
      </Row>
      <Row className="justify-content-end align-items-center">
        <Col xs={3}>
          <Button
            className="btn m-3 d-flex justify-content-center align-items-center"
            onClick={createProductHandler}
          >
            <FaEdit className="me-2" />
            <span>Create Product</span>
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
      ) : error ? (
        <Message variant="danger">{error.data.message}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>NAME</th>
                <th>BEFORE PRICE</th>
                <th>CURRENT PRICE</th>
                <th>CATEGORY</th>
                <th>TO BE DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.data.map((product) => (
                <tr key={product._id}>
                  <td
                    title={`hu: ${product.translations?.hu?.name}\n\n id: ${product._id}`}
                  >
                    {product.name}
                  </td>
                  <td title={`hu: ${product.translations?.hu?.beforePrice}`}>
                    {product.beforePrice}
                  </td>
                  <td title={`hu: ${product.translations?.hu?.currentPrice}`}>
                    {product.currentPrice}
                  </td>
                  <td>{product?.category?.title}</td>
                  <td>
                    {product.toBeDelivered ? (
                      <FaCheck className="text-success" />
                    ) : (
                      <FaTimes className="text-danger" />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="primary" className="btn-sm mx-2">
                        <span className="d-flex align-items-center justify-content-center py">
                          <FaEdit />
                        </span>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
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
          <Paginate
            pages={products.pages}
            page={products.page}
            isAdmin={true}
          />
        </>
      )}
    </Container>
  );
};

export default ProductListScreen;
