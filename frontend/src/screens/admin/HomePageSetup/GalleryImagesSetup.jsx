import { useEffect, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { MdAddAPhoto, MdRemoveCircleOutline } from 'react-icons/md';
import { HiOutlineCog } from 'react-icons/hi';
import MediaLibrary from '../../../components/MediaLibrary';
import AddImages from '../../../components/AddImages';
import ImageSetup from './ImageSetup';
import { useIsTouchDevice } from '../../../utils/pointer.js';

const GalleryImagesSetup = ({ images, setImages }) => {
  const [show, setShow] = useState(false);
  const [setupShow, setSetupShow] = useState(false);
  const [addShow, setAddShow] = useState(false);
  const [url, setUrl] = useState('');
  const [selected, setSelected] = useState('');
  const [index, setIndex] = useState(-1);

  const isTouch = useIsTouchDevice();

  useEffect(() => {
    if (url !== '') {
      let temp_img = { ...images[index] };
      temp_img.photo = url;
      const newImgs = images.map((image, idx) => {
        if (idx !== index) {
          return image;
        } else {
          return temp_img;
        }
      });
      setImages(newImgs);
      setUrl('');
    }
    if (selected !== '') {
      let temp_img = { ...images[index] };
      temp_img.photo = selected;
      const newImgs = images.map((image, idx) => {
        if (idx !== index) {
          return image;
        } else {
          return temp_img;
        }
      });
      setImages(newImgs);
      setSelected('');
    }
  }, [images, index, setImages, url, selected]);

  const handleRemoveImage = (index) => {
    if (window.confirm('Are you sure you want to remove image')) {
      let temp_img = { ...images[index] };
      temp_img.photo = '';
      const newImgs = images.map((image, idx) => {
        if (idx !== index) {
          return image;
        } else {
          return temp_img;
        }
      });
      setImages(newImgs);
    }
  };

  const handleSetupClose = () => {
    setSetupShow(false);
  };

  const handleAddImage = (idx) => {
    setIndex(idx);
    setAddShow(true);
  };

  const handleImageSetup = (image) => {
    const newImgs = images.map((img, idx) => {
      if (idx !== index) {
        return img;
      } else {
        return image;
      }
    });
    setImages(newImgs);
  };

  const handleSetupImage = (idx) => {
    setIndex(idx);
    setSetupShow(true);
  };

  return (
    <>
      <div className="photo-gallery-setup">
        <div className="grid-container">
          {images &&
            images.map((image, index) => (
              <div
                key={index}
                className={`grid-item ${image.class}`}
                style={{
                  backgroundImage: `url(${image.photo})`,
                }}
              >
                <div className="cover-layer">
                  <div className="content">
                    <h4>{image.title}</h4>
                    <p>{image.description}</p>
                  </div>
                </div>
                <ButtonGroup className={`gap-1 ${isTouch ? 'touch' : ''}`}>
                  <Button
                    onClick={() => handleAddImage(index)}
                    title="Add image"
                  >
                    <MdAddAPhoto style={{ fontSize: '1.5rem' }} />
                  </Button>
                  <Button
                    onClick={() => handleSetupImage(index)}
                    title="Setup image"
                  >
                    <HiOutlineCog style={{ fontSize: '1.5rem' }} />
                  </Button>
                  <Button
                    onClick={() => handleRemoveImage(index)}
                    title="Remove image"
                  >
                    <MdRemoveCircleOutline style={{ fontSize: '1.5rem' }} />
                  </Button>
                  {/* <Button
                    onClick={() => ()}
                    title="Undo image"
                  >
                    <IoArrowUndoOutline style={{ fontSize: '1.5rem' }} />
                  </Button> */}
                </ButtonGroup>
              </div>
            ))}
        </div>
      </div>
      <ImageSetup
        show={setupShow}
        handleClose={handleSetupClose}
        image={images[index]}
        handleImageSetup={handleImageSetup}
      />
      <AddImages
        addImgShow={addShow}
        setAddImgShow={setAddShow}
        mediaShow={setShow}
        imageUrl={url}
        setImageUrl={setUrl}
      />
      <MediaLibrary
        displayMedia={show}
        setDisplayMedia={setShow}
        setSelectedImg={setSelected}
      />
      ;
    </>
  );
};

export default GalleryImagesSetup;
