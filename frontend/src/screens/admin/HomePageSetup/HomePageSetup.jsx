import { useEffect, useState } from 'react';
import { Button, Col, Collapse, Container, Form, Row } from 'react-bootstrap';
import { HeroListScreen } from '../../../Pages';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message.jsx';
import { toast } from 'react-toastify';
import LangSelectEditor from '../../../components/LangSelectEditor';
import SelectProduct from '../../../components/SelectProduct.jsx';
import GalleryImagesSetup from './GalleryImagesSetup.jsx';
import {
  useGetHomePageQuery,
  useUpdateHomePageMutation,
} from '../../../slices/homePageApiSlice.js';
import { useGetProductsQuery } from '../../../slices/productsApiSlice.js';

const HomePageSetup = () => {
  const [open, setOpen] = useState(false);
  const [imagesSetupOpen, setImagesSetupOpen] = useState(false);
  const [messageEditOpen, setMessageEditOpen] = useState(false);
  const [isShowHero, setIsShowHero] = useState(false);
  const [heroAutoPlay, setHeroAutoPlay] = useState(false);
  const [heroAutoplayDelay, setHeroAutoplayDelay] = useState(5);
  const [isShowMessage, setIsShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [messageHu, setMessageHu] = useState('');
  const [isShowFeaturedStuff, setIsShowFeaturedStuff] = useState(false);
  const [product, setProduct] = useState(null);
  const [isShowGallery, setIsShowGallery] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);

  const {
    data: homePage,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetHomePageQuery();

  const [
    updateHomePage,
    { isLoading: isLoadingUpdate, isError: isErrorUpdate, error: errorUpdate },
  ] = useUpdateHomePageMutation();

  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    error: errorProducts,
  } = useGetProductsQuery();

  useEffect(() => {
    if (homePage) {
      setIsShowHero(homePage.isShowHero);
      setHeroAutoPlay(homePage.heroAutoPlay);
      setHeroAutoplayDelay(homePage.heroAutoplayDelay);
      setIsShowMessage(homePage.isShowMessage);
      setMessage(homePage.message);
      setMessageHu(homePage.translations?.hu?.message);
      setIsShowFeaturedStuff(homePage.isShowFeaturedStuff);
      setProduct(homePage.featuredStuff?._id || '');
      setIsShowGallery(homePage.isShowGallery);
      setGalleryImages([...homePage.galleryImages]);
    }
  }, [homePage]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateHomePage({
        isShowHero,
        heroAutoPlay,
        heroAutoplayDelay,
        isShowMessage,
        message,
        isShowFeaturedStuff,
        featuredStuff: product === '' ? null : product,
        isShowGallery,
        galleryImages,
        translations: {
          hu: {
            message: messageHu,
          },
        },
      }).unwrap();
      toast.success('Hero updated');
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      {isLoadingUpdate ? (
        <Loader />
      ) : (
        isErrorUpdate && toast.error(errorUpdate?.data?.message)
      )}
      {isLoadingProducts ? (
        <Loader />
      ) : (
        isErrorProducts && toast.error(errorProducts?.data?.message)
      )}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Container className="my-5">
            <Row className="text-center">
              <h2 className="fw-bold">Home Page Setup</h2>
            </Row>
            <Row className="text-center my-3">
              <h3 className="fw-semibold">Heros</h3>
            </Row>
            <Form onSubmit={submitHandler}>
              <div className="d-flex gap-2 justify-content-between align-items-center my-2">
                <Form.Check // prettier-ignore
                  type="switch"
                  id="home-page-hero-show-switch"
                  label="Show hero?"
                  checked={isShowHero}
                  onChange={(e) => setIsShowHero(e.target.checked)}
                />
                <Form.Check // prettier-ignore
                  type="switch"
                  id="home-page-hero-autoplay-switch"
                  label="hero auto play?"
                  checked={heroAutoPlay}
                  onChange={(e) => setHeroAutoPlay(e.target.checked)}
                />
                <Form.Group
                  controlId="heroAutoplayDelay"
                  className="home-page-input"
                >
                  <Form.Label>Hero Autoplay delay</Form.Label>
                  <Form.Control
                    type="number"
                    value={heroAutoplayDelay}
                    onChange={(e) => setHeroAutoplayDelay(e.target.value)}
                    className="w-lg-25"
                  />
                </Form.Group>
              </div>
              <div className="text-end">
                <Button
                  onClick={() => setOpen(!open)}
                  aria-controls="Hero-images-collapse"
                  aria-expanded={open}
                >
                  Heros items setup
                </Button>
                <Collapse in={open}>
                  <div id="hero-list-collapse">
                    <HeroListScreen />
                  </div>
                </Collapse>
              </div>
              <Row className="text-center my-3">
                <h3 className="fw-semibold">Message</h3>
              </Row>
              <div className="mb-4 d-flex align-items-center justify-content-between">
                <Form.Check // prettier-ignore
                  type="switch"
                  id="home-page-message-show-switch"
                  label="Show message?"
                  checked={isShowMessage}
                  onChange={(e) => setIsShowMessage(e.target.checked)}
                />
                <Button
                  onClick={() => setMessageEditOpen(!messageEditOpen)}
                  aria-controls="example-collapse-text"
                  aria-expanded={messageEditOpen}
                >
                  Edit message
                </Button>
              </div>
              <Collapse in={messageEditOpen}>
                <div id="message-edit-collapse">
                  <LangSelectEditor
                    label="Message"
                    placeholder="Enter message"
                    placeholder_hu="Add meg az üzenetet"
                    defLang={message}
                    setDefLang={setMessage}
                    secLang={messageHu}
                    setSecLang={setMessageHu}
                  />
                </div>
              </Collapse>

              <Row className="text-center my-3">
                <h3 className="fw-semibold m-0">Featured stuff</h3>
              </Row>
              <Row className="align-items-center">
                <Col md={6}>
                  <Form.Check // prettier-ignore
                    type="switch"
                    id="home-page-featuredStuff-show-switch"
                    label="Show featured stuff?"
                    checked={isShowFeaturedStuff}
                    onChange={(e) => setIsShowFeaturedStuff(e.target.checked)}
                  />
                </Col>
                <Col md={6}>
                  <Form.Group controlId="featuredStuff" className="my-2">
                    <Form.Label>Featured stuff</Form.Label>
                    <SelectProduct
                      products={products}
                      product={product}
                      setProduct={setProduct}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="text-center my-3">
                <h3 className="fw-semibold m-0">Gallery</h3>
              </Row>

              <div className="d-flex align-items-center justify-content-between">
                <Form.Check // prettier-ignore
                  type="switch"
                  id="home-page-gallery-show-switch"
                  label="Show gallery"
                  checked={isShowGallery}
                  onChange={(e) => setIsShowGallery(e.target.checked)}
                />
                <Button
                  onClick={() => setImagesSetupOpen(!imagesSetupOpen)}
                  aria-controls="example-collapse-text"
                  aria-expanded={imagesSetupOpen}
                >
                  Gallery images setup
                </Button>
              </div>
              <Collapse in={imagesSetupOpen}>
                <div id="gallery-images-setup-collapse">
                  <GalleryImagesSetup
                    images={galleryImages}
                    setImages={setGalleryImages}
                  />
                </div>
              </Collapse>

              <Button type="submit" variant="primary" className="mt-5 mb-2">
                Update
              </Button>
            </Form>
          </Container>
        </>
      )}
    </>
  );
};

export default HomePageSetup;
