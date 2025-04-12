import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import LangSelectInput from '../../../components/LangSelectInput';

const ImageSetup = ({ show, handleClose, image, handleImageSetup }) => {
  const [imageTitle, setImageTitle] = useState('');
  const [imageTitleHu, setImageTitleHu] = useState('');
  const [imageDescription, setImageDescription] = useState('');
  const [imageDescriptionHu, setImageDescriptionHu] = useState('');
  const [imageLink, setImageLink] = useState('');

  useEffect(() => {
    setImageTitle(image?.title !== undefined ? image?.title || '' : '');
    setImageTitleHu(
      image?.translations?.hu?.title !== undefined
        ? image?.translations?.hu?.title || ''
        : ''
    );
    setImageDescription(
      image?.description !== undefined ? image?.description || '' : ''
    );
    setImageDescriptionHu(
      image?.translations?.hu?.description !== undefined
        ? image?.translations?.hu?.description || ''
        : ''
    );
    setImageLink(image?.link !== undefined ? image?.link || '' : '');
  }, [image]);

  const handleDone = () => {
    let newImage = JSON.parse(JSON.stringify(image));
    newImage.title = imageTitle || null;
    newImage.description = imageDescription || null;
    newImage.link = imageLink || null;
    newImage.translations = {
      hu: {
        title: imageTitleHu || null,
        description: imageDescriptionHu || null,
      },
    };
    handleImageSetup(newImage);
    handleClose();
  };

  return (
    <Modal show={show} size="lg" onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Gallery image setup</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <LangSelectInput
          label="Title"
          defLang={imageTitle}
          setDefLang={setImageTitle}
          secLang={imageTitleHu}
          setSecLang={setImageTitleHu}
        />
        <LangSelectInput
          label="Description"
          defLang={imageDescription}
          setDefLang={setImageDescription}
          secLang={imageDescriptionHu}
          setSecLang={setImageDescriptionHu}
        />
        <Form.Group className="mb-3" controlId="link">
          <Form.Label>Link</Form.Label>
          <Form.Control
            type="text"
            placeholder="/shop"
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleDone}>
          Done
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageSetup;
