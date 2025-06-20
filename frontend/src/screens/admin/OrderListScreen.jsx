import { useParams } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Container, Row } from 'react-bootstrap';
import { FaMinus, FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import { toCurrency } from '../../utils/converter';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';

const OrderListScreen = () => {
  let { pageNumber: page } = useParams();
  if (!page) page = 1;
  const {
    data: orders,
    isLoading,
    error,
  } = useGetOrdersQuery({ page, limit: 15 });

  return (
    <Container className="mt-5">
      <Row className="text-center">
        <h2 className="fs-1 fw-semibold">Orders</h2>
      </Row>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.Message || error.error}
        </Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.data.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td title={`id: ${order.user?._id}`}>{order.user?.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{toCurrency(order.language, order.totalPrice)}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    {order.hasToBeDelivered ? (
                      order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: 'red' }} />
                      )
                    ) : (
                      <FaMinus />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/order/${order._id}`}>
                      <Button variant="primary" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate
            pages={orders.pages}
            page={orders.page}
            isAdmin={true}
            pageName="orderlist"
          />
        </>
      )}
    </Container>
  );
};

export default OrderListScreen;
