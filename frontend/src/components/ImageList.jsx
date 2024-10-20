// https://youtu.be/bAJlYgeovlg?si=Ersdvhc7JdTpYByl
import { Button, Image } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import AddImages from './AddImages';
import { RiCloseLine } from 'react-icons/ri';
import MediaLibrary from './MediaLibrary';

const ImageList = ({ images, setImages }) => {
  const [active, setActive] = useState('');
  const [url, setUrl] = useState('');
  const [show, setShow] = useState(false);
  const [addShow, setAddShow] = useState(false);
  const [selected, setSelected] = useState('');

  const removeItem = (value) => {
    if (typeof images === 'object') {
      const newImages = images.filter((item) => item !== value);
      setImages(newImages);
    } else if (typeof images === 'string') {
      setImages('');
    }
  };

  useEffect(() => {
    if (active === '') {
      if (typeof images === 'object') {
        images.length > 0 ? setActive(images[0]) : setActive('');
      } else if (typeof images === 'string') {
        setActive(images);
      }
    }
    if (active !== '' && !images.includes(active)) {
      if (typeof images === 'object') {
        if (images.length > 0) {
          setActive(images[0]);
        } else {
          setActive('');
        }
      } else if (typeof images === 'string') {
        setActive(images);
      }
    }
    if (url !== '') {
      if (typeof images === 'object') {
        setImages((images) => [...images, url]);
        setUrl('');
      } else if (typeof images === 'string') {
        setImages(url);
        setUrl('');
      }
    }
    if (selected !== '') {
      if (typeof images === 'object') {
        setImages((images) => [...images, selected]);
        setSelected('');
      } else if (typeof images === 'string') {
        setImages(selected);
        setSelected('');
      }
    }
  }, [active, images, setImages, url, selected]);

  return (
    <div className="image-list-container flex-column-reverse flex-xl-row">
      <div className="image-list-photo flex-row-reverse flex-xl-column align-items-start align-items-xl-stretch">
        <Button onClick={() => setAddShow(true)}>Add image</Button>
        {active && (
          <div>
            <Image src={active} className="image-list-image__active" />
          </div>
        )}
      </div>
      <div className="image-list-wrapper">
        {console.log(typeof images)}
        {typeof images === 'object'
          ? images.length > 0 &&
            images[0] !== '' && (
              <>
                {images.map((item, index) => (
                  <div
                    onClick={() => setActive(item)}
                    className={`image-list-item ${
                      active === item ? 'active' : ''
                    }`}
                    key={index}
                  >
                    <span>{item}</span>
                    <RiCloseLine
                      className="image-list-item__remove"
                      onClick={() => removeItem(item)}
                    />
                  </div>
                ))}
              </>
            )
          : typeof images === 'string' &&
            images !== '' && (
              <div
                onClick={() => setActive(images)}
                className={`image-list-item ${
                  active === images ? 'active' : ''
                }`}
              >
                <span>{images}</span>
                <RiCloseLine
                  className="image-list-item__remove"
                  onClick={() => removeItem(images)}
                />
              </div>
            )}
      </div>
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
    </div>
  );
};

export default ImageList;
