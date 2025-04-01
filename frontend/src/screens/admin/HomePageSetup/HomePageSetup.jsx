import { useState } from 'react';
import { Button, Collapse, Container, Row } from 'react-bootstrap';
import { HeroListScreen } from '../../../Pages';

const HomePageSetup = () => {
  const [open, setOpen] = useState(false);

  return (
    <Container className="mt-5">
      <Row className="text-center">
        <h2 className="fw-bold">Home Page Setup</h2>
      </Row>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        Heros setup
      </Button>
      <Collapse in={open}>
        <div id="hero-list-collapse">
          <HeroListScreen />
        </div>
      </Collapse>
    </Container>
  );
};

export default HomePageSetup;
