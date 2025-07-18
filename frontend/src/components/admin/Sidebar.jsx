import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Collapse,
  Container,
  Dropdown,
  Nav,
  Navbar,
  Image,
} from 'react-bootstrap';
import logo from '../../assets/logo-200x200-1.png';
import { RiArticleLine, RiQuestionAnswerLine } from 'react-icons/ri';
import {
  BsSpeedometer2,
  BsPeople,
  BsTable,
  BsEnvelopePlus,
} from 'react-icons/bs';
import { AiOutlineProduct } from 'react-icons/ai';
import { CgWebsite } from 'react-icons/cg';
import { logout } from '../../slices/authSlice';
import { useLogoutMutation } from '../../slices/usersApiSlice';

const Sidebar = () => {
  const { userAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState('sitesetup');

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="sidebar-container">
      <div className="mt-2 sidebar">
        <Container className="my-3" style={{ minHeight: '2rem' }}>
          <Navbar.Brand href="/" className="bg-primary">
            <Image src={logo} />
          </Navbar.Brand>
        </Container>
        <hr className="text-primary d-none d-sm-block" />
        <Nav className="nav nav-pills flex-column">
          {/* Dashboard */}
          <Nav.Item className="my-1">
            <Link
              className="nav-link d-flex align-items-center text-primary"
              onClick={() => setOpen('dashboard')}
            >
              <BsSpeedometer2 className="fs-4" />
              <span className="ms-2 fs-4 d-none d-md-inline-flex">
                Dashboard
              </span>
            </Link>
          </Nav.Item>

          {/* Site setup */}
          <Nav.Item>
            <Dropdown.Toggle
              className="nav-link d-flex align-items-center text-primary"
              onClick={() => setOpen(open === 'sitesetup' ? '' : 'sitesetup')}
              aria-controls="sitesetup-collapse"
              aria-expanded={open}
              title="Site Setup"
            >
              <CgWebsite className="fs-4" />
              <span className="ms-2 fs-4 d-none d-md-inline-flex">
                Site setup
              </span>
            </Dropdown.Toggle>
            <div className="d-none d-md-block">
              <Collapse in={open === 'sitesetup'}>
                <Nav
                  id="sitesetup-collapse"
                  className="flex-nowrap flex-column"
                >
                  <Nav.Item className="ms-4 p-2">
                    <Link
                      to="/admin/homepagesetup"
                      className="text-primary my-2"
                    >
                      <span className="text-primary">Home page</span>
                    </Link>
                  </Nav.Item>
                </Nav>
              </Collapse>
            </div>
            <div className="d-block d-md-none dropdown-menu__container">
              <Dropdown.Menu show={open === 'sitesetup'}>
                <Dropdown.Item as="div">
                  <Link to="/admin/homepagesetup">
                    <span>Home page</span>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </div>
          </Nav.Item>

          {/* Setup */}
          <Nav.Item>
            <Dropdown.Toggle
              className="nav-link d-flex align-items-center text-primary"
              onClick={() => setOpen(open === 'setup' ? '' : 'setup')}
              aria-controls="setup-collapse"
              aria-expanded={open}
              title="Setup"
            >
              <CgWebsite className="fs-4" />
              <span className="ms-2 fs-4 d-none d-md-inline-flex">Setup</span>
            </Dropdown.Toggle>
            <div className="d-none d-md-block">
              <Collapse in={open === 'setup'}>
                <Nav
                  id="sitesetup-collapse"
                  className="flex-nowrap flex-column"
                >
                  <Nav.Item className="ms-4 p-2">
                    <Link
                      to="/admin/deliverylist"
                      className="text-primary my-2"
                    >
                      <span className="text-primary">Shipping setup</span>
                    </Link>
                  </Nav.Item>
                </Nav>
              </Collapse>
            </div>
            <div className="d-block d-md-none dropdown-menu__container">
              <Dropdown.Menu show={open === 'setup'}>
                <Dropdown.Item as="div">
                  <Link to="/admin/homepagesetup">
                    <span>Delivery setup</span>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </div>
          </Nav.Item>

          {/* Products */}
          <Nav.Item>
            <Dropdown.Toggle
              className="nav-link d-flex align-items-center text-primary"
              onClick={() => setOpen(open === 'products' ? '' : 'products')}
              aria-controls="products-collapse"
              aria-expanded={open}
              title="Products"
            >
              <AiOutlineProduct className="fs-4" />
              <span className="ms-2 fs-4 d-none d-md-inline-flex">
                Products
              </span>
            </Dropdown.Toggle>
            <div className="d-none d-md-block">
              <Collapse in={open === 'products'}>
                <Nav id="products-collapse" className="flex-nowrap flex-column">
                  <Nav.Item className="ms-4 p-2">
                    <Link to="/admin/productlist" className="text-primary my-2">
                      <span>All Products</span>
                    </Link>
                  </Nav.Item>
                  <Nav.Item className="ms-4 p-2">
                    <Link
                      to="/admin/productcategorylist"
                      className="text-primary my-2"
                    >
                      <span>Product Categories</span>
                    </Link>
                  </Nav.Item>
                </Nav>
              </Collapse>
            </div>
            <div className="d-block d-md-none dropdown-menu__container">
              <Dropdown.Menu show={open === 'products'}>
                <Dropdown.Item as="div">
                  <Link to="/admin/productlist">
                    <span>All Products</span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item as="div">
                  <Link to="/admin/productcategorylist">
                    <span>
                      <span>Product Categories</span>
                    </span>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </div>
          </Nav.Item>

          {/* Ingredients */}
          <Nav.Item>
            <Dropdown.Toggle
              className="nav-link d-flex align-items-center text-primary"
              onClick={() =>
                setOpen(open === 'ingredients' ? '' : 'ingredients')
              }
              aria-controls="ingredients-collapse"
              aria-expanded={open}
              title="Ingredients"
            >
              <AiOutlineProduct className="fs-4" />
              <span className="ms-2 fs-4 d-none d-md-inline-flex">
                Ingredients
              </span>
            </Dropdown.Toggle>
            <div className="d-none d-md-block">
              <Collapse in={open === 'ingredients'}>
                <Nav
                  id="ingredients-collapse"
                  className="flex-nowrap flex-column"
                >
                  <Nav.Item className="ms-4 p-2">
                    <Link
                      to="/admin/ingredientlist"
                      className="text-primary my-2"
                    >
                      <span>All Ingredients</span>
                    </Link>
                  </Nav.Item>
                </Nav>
              </Collapse>
            </div>
            <div className="d-block d-md-none dropdown-menu__container">
              <Dropdown.Menu show={open === 'ingredients'}>
                <Dropdown.Item as="div">
                  <Link to="/admin/ingredientlist">
                    <span>All Ingredients</span>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </div>
          </Nav.Item>

          {/* Posts */}
          <Nav.Item>
            <Dropdown.Toggle
              className="nav-link d-flex align-items-center text-primary"
              onClick={() => setOpen(open === 'posts' ? '' : 'posts')}
              aria-controls="posts-collapse"
              aria-expanded={open}
              title="Posts"
            >
              <RiArticleLine className="fs-4" />
              <span className="ms-2 fs-4 d-none d-md-inline-flex">Posts</span>
            </Dropdown.Toggle>
            <div className="d-none d-md-block">
              <Collapse in={open === 'posts'}>
                <Nav id="posts-collapse" className="flex-nowrap flex-column">
                  <Nav.Item className="ms-4 p-2">
                    <Link className="text-primary my-2" to="/admin/postlist">
                      <span>All Posts</span>
                    </Link>
                  </Nav.Item>
                  <Nav.Item className="ms-4 p-2">
                    <Link
                      className="text-primary my-2"
                      to="/admin/postcategorylist"
                    >
                      <span>Post Categories</span>
                    </Link>
                  </Nav.Item>
                  <Nav.Item className="ms-4 p-2">
                    <Link className="text-primary my-2" to="/admin/commentlist">
                      <span>Comments</span>
                    </Link>
                  </Nav.Item>
                </Nav>
              </Collapse>
            </div>
            <div className="d-block d-md-none dropdown-menu__container">
              <Dropdown.Menu show={open === 'posts'}>
                <Dropdown.Item as="div">
                  <Link to="/admin/postlist">
                    <span>All Posts</span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item as="div">
                  <Link to="/admin/postcategorylist">
                    <span>
                      <span>Post Categories</span>
                    </span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item as="div">
                  <Link to="/admin/commentlist">
                    <span>
                      <span>Comments</span>
                    </span>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </div>
          </Nav.Item>

          {/* FAQs */}
          <Nav.Item>
            <Dropdown.Toggle
              className="nav-link d-flex align-items-center text-primary"
              onClick={() => setOpen(open === 'faqs' ? '' : 'faqs')}
              aria-controls="users-collapse"
              aria-expanded={open}
            >
              <RiQuestionAnswerLine className="fs-4" />
              <span className="ms-2 fs-4 d-none d-md-inline-flex">Faqs</span>
            </Dropdown.Toggle>
            <div className="d-none d-md-block">
              <Collapse in={open === 'faqs'}>
                <Nav id="users-collapse" className="flex-nowrap flex-column">
                  <Nav.Item className="ms-4 p-2">
                    <Link className="text-primary my-2" to="/admin/faqlist">
                      <span>All Faqs</span>
                    </Link>
                  </Nav.Item>
                  <Nav.Item className="ms-4 p-2">
                    <Link
                      className="text-primary my-2"
                      to="/admin/faqcategorylist"
                    >
                      <span>Faq Categories</span>
                    </Link>
                  </Nav.Item>
                </Nav>
              </Collapse>
            </div>
            <div className="d-block d-md-none dropdown-menu__container">
              <Dropdown.Menu show={open === 'faqs'}>
                <Dropdown.Item as="div">
                  <Link to="/admin/faqlist">
                    <span>All Faqs</span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item as="div">
                  <Link to="/admin/faqcategorylist">
                    <span>Faq Categories</span>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </div>
          </Nav.Item>

          {/* users */}
          <Nav.Item>
            <Dropdown.Toggle
              className="nav-link d-flex align-items-center text-primary"
              onClick={() => setOpen(open === 'users' ? '' : 'users')}
              aria-controls="users-collapse"
              aria-expanded={open}
            >
              <BsPeople className="fs-4" />
              <span className="ms-2 fs-4 d-none d-md-inline-flex">Users</span>
            </Dropdown.Toggle>
            <div className="d-none d-md-block">
              <Collapse in={open === 'users'}>
                <Nav id="users-collapse" className="flex-nowrap flex-column">
                  <Nav.Item className="ms-4 p-2">
                    <Link className="text-primary my-2" to="/admin/userlist">
                      <span>All users</span>
                    </Link>
                  </Nav.Item>
                  <Nav.Item className="ms-4 p-2">
                    <Link
                      className="text-primary my-2"
                      to="/admin/membershipplan"
                    >
                      <span>membership plans</span>
                    </Link>
                  </Nav.Item>
                </Nav>
              </Collapse>
            </div>
            <div className="d-block d-md-none dropdown-menu__container">
              <Dropdown.Menu show={open === 'users'}>
                <Dropdown.Item as="div">
                  <Link to="/admin/userlist">
                    <span>All users</span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/admin/membershipplan">
                    <span>membership plans</span>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </div>
          </Nav.Item>

          {/* orders */}
          <Nav.Item>
            <Dropdown.Toggle
              className="nav-link d-flex align-items-center text-primary"
              onClick={() => setOpen(open === 'orders' ? '' : 'orders')}
              aria-controls="orders-collapse"
              aria-expanded={open}
            >
              <BsTable className="fs-4" />
              <span className="ms-2 fs-4 d-none d-md-inline-flex">Orders</span>
            </Dropdown.Toggle>
            <div className="d-none d-md-block">
              <Collapse in={open === 'orders'}>
                <Nav id="orders-collapse" className="flex-nowrap flex-column">
                  <Nav.Item className="ms-4 p-2">
                    <Link className="text-primary my-2" to="/admin/orderlist">
                      <span>All orders</span>
                    </Link>
                  </Nav.Item>
                </Nav>
              </Collapse>
            </div>
            <div className="d-block d-md-none dropdown-menu__container">
              <Dropdown.Menu show={open === 'orders'}>
                <Dropdown.Item as="div">
                  <Link to="/admin/orderlist">
                    <span>All orders</span>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </div>
          </Nav.Item>

          {/* Messages */}
          <Nav.Item>
            <Dropdown.Toggle
              className="nav-link d-flex align-items-center text-primary"
              onClick={() => setOpen(open === 'messages' ? '' : 'messages')}
              aria-controls="messages-collapse"
              aria-expanded={open}
            >
              <BsTable className="fs-4" />
              <span className="ms-2 fs-4 d-none d-md-inline-flex">
                Messages
              </span>
            </Dropdown.Toggle>
            <div className="d-none d-md-block">
              <Collapse in={open === 'messages'}>
                <Nav id="messages-collapse" className="flex-nowrap flex-column">
                  <Nav.Item className="ms-4 p-2">
                    <Link className="text-primary my-2" to="/admin/messagelist">
                      <span>All messages</span>
                    </Link>
                  </Nav.Item>
                </Nav>
              </Collapse>
            </div>
            <div className="d-block d-md-none dropdown-menu__container">
              <Dropdown.Menu show={open === 'messages'}>
                <Dropdown.Item as="div">
                  <Link to="/admin/messagelist">
                    <span>All messages</span>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </div>
          </Nav.Item>

          {/* Subscribers */}
          <Nav.Item>
            <Dropdown.Toggle
              className="nav-link d-flex align-items-center text-primary"
              onClick={() =>
                setOpen(open === 'subscribers' ? '' : 'subscribers')
              }
              aria-controls="subscribers-collapse"
              aria-expanded={open}
            >
              <BsEnvelopePlus className="fs-4" />
              <span className="ms-2 fs-4 d-none d-md-inline-flex">
                Subscribers
              </span>
            </Dropdown.Toggle>
            <div className="d-none d-md-block">
              <Collapse in={open === 'subscribers'}>
                <Nav
                  id="subscribers-collapse"
                  className="flex-nowrap flex-column"
                >
                  <Nav.Item className="ms-4 p-2">
                    <Link
                      className="text-primary my-2"
                      to="/admin/subscriberlist"
                    >
                      <span>All subscribers</span>
                    </Link>
                  </Nav.Item>
                </Nav>
              </Collapse>
            </div>
            <div className="d-block d-md-none dropdown-menu__container">
              <Dropdown.Menu show={open === 'subscribers'}>
                <Dropdown.Item as="div">
                  <Link to="/admin/subscriberlist">
                    <span>All subscribers</span>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </div>
          </Nav.Item>
        </Nav>
      </div>

      {/* Admin user dropdown menu */}
      <Dropdown className="mb-3">
        <Dropdown.Toggle
          className="btn border-none d-flex align-items-center"
          variant="primary"
          id="triggerId"
        >
          <BsPeople className="fs-4" />
          <span className="fs-4 ms-3 d-none d-md-inline">{userAuth?.name}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <LinkContainer to="/admin">
            <Dropdown.Item>Admin Dashboard</Dropdown.Item>
          </LinkContainer>
          <LinkContainer to="/profile">
            <Dropdown.Item>Profile</Dropdown.Item>
          </LinkContainer>
          <Dropdown.Divider />
          <Dropdown.Item onClick={logoutHandler}>LogOut</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Sidebar;
