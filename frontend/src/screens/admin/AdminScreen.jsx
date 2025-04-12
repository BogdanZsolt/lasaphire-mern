import { useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import Sidebar from '../../components/admin/Sidebar.jsx';
import '../../assets/styles/admin-dashboard.css';
import { Outlet, Navigate } from 'react-router-dom';

const AdminScreen = () => {
  const { userAuth } = useSelector((state) => state.auth);

  return (
    <Container fluid>
      {userAuth &&
        (userAuth?.isAdmin ? (
          <>
            <Row className="flex-nowrap">
              <div className="col-3 col-sm-2 col-md-3 col-xxl-2 bg-secondary d-flex">
                <Sidebar />
              </div>
              <Col>
                <Outlet />
              </Col>
            </Row>
          </>
        ) : (
          <Navigate to="/login" />
        ))}
    </Container>
  );
};

export default AdminScreen;
