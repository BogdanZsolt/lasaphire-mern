import { useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
// import { useParams } from 'react-router-dom';
import { RiSearchLine } from 'react-icons/ri';

const SearchBox = () => {
  const [show, setShow] = useState(false);
  const [keyword, setKeyword] = useState('');

  // const { keyword: urlKeyword } = useParams();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSearch = () => {
    console.log('Searching...');
  };

  return (
    <>
      <li className="d-flex justify-content-start justify-content-lg-center align-items-center">
        <div role="button" onClick={handleShow} className="nav-link">
          <RiSearchLine />
          <span className="d-inline-bolck d-lg-none">Search</span>
        </div>
      </li>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        centered
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <InputGroup>
              <Button
                variant="outline-secondary"
                id="button-addon1"
                onClick={handleSearch}
              >
                <RiSearchLine />
              </Button>
              <Form.Control type="text" placeholder="Search..." />
            </InputGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SearchBox;
