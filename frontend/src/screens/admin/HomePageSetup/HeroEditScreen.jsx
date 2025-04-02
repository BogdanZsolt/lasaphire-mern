import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, Row } from 'react-bootstrap';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import FormContainer from '../../../components/FormContainer';
import { toast } from 'react-toastify';
import LangSelectInput from '../../../components/LangSelectInput';
import {
  useGetHeroDetailsQuery,
  useUpdateHeroMutation,
} from '../../../slices/herosApiSlice';
import ImageList from '../../../components/ImageList';

const HeroEditScreen = () => {
  const { id: heroId } = useParams();

  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [titleHu, setTitleHu] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [description, setDescription] = useState('');
  const [descriptionHu, setDescriptionHu] = useState('');
  const [hasButton, setHasButton] = useState(false);
  const [buttonText, setButtonText] = useState('');
  const [buttonTextHu, setButtonTextHu] = useState('');
  const [buttonUrl, setButtonUrl] = useState('');

  const {
    data: hero,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetHeroDetailsQuery(heroId);

  const [
    updateHero,
    { isLoading: isLoadingUpdate, isError: isErrorUpdate, error: errorUpdate },
  ] = useUpdateHeroMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (hero) {
      setImage(hero.image);
      setTitle(hero.title);
      setTitleHu(hero.translations?.hu?.title);
      setIsActive(hero.isActive);
      setDescription(hero.description);
      setDescriptionHu(hero.translations?.hu?.description);
      setHasButton(hero.hasButton);
      setButtonText(hero.buttonText);
      setButtonTextHu(hero.translations?.hu?.buttonText);
      setButtonUrl(hero.buttonUrl);
    }
  }, [hero]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateHero({
        heroId,
        image,
        title,
        isActive,
        description,
        hasButton,
        buttonText,
        buttonUrl,
        translations: {
          hu: {
            title: titleHu,
            description: descriptionHu,
            buttonText: buttonTextHu,
          },
        },
      }).unwrap();
      toast.success('Hero updated');
      refetch();
      navigate('/admin/homepagesetup');
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
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{error?.data?.message}</Message>
      ) : (
        <Container>
          <Link to="/admin/homepagesetup" className="btn btn-primary my-3">
            Go Back
          </Link>
          <Row>
            <h2 className="text-center fw-bold">Edit Hero</h2>
          </Row>
          <FormContainer>
            <Form onSubmit={submitHandler}>
              <Form.Check // prettier-ignore
                type="switch"
                id="hero-active-switch"
                label="Hero is active?"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="mb-4 mt-2"
              />

              <ImageList images={image} setImages={setImage} />

              <LangSelectInput
                label="Title"
                defLang={title}
                setDefLang={setTitle}
                secLang={titleHu}
                setSecLang={setTitleHu}
                className="mt-3 mb-4"
              />

              <LangSelectInput
                label="Description"
                defLang={description}
                setDefLang={setDescription}
                secLang={descriptionHu}
                setSecLang={setDescriptionHu}
                className="my-4"
              />

              <Form.Check // prettier-ignore
                type="switch"
                id="hero-has-button-switch"
                label="Hero has button?"
                checked={hasButton}
                onChange={(e) => setHasButton(e.target.checked)}
                className="mb-4 mt-2"
              />

              {hasButton && (
                <>
                  <LangSelectInput
                    label="Button text"
                    defLang={buttonText}
                    setDefLang={setButtonText}
                    secLang={buttonTextHu}
                    setSecLang={setButtonTextHu}
                    className="mt-3 mb-2"
                  />

                  <Form.Group controlId="buttonUrl" className="my-2">
                    <Form.Label>Button link</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="enter the link e.g. /product/67c41009900e60b32f9983dd"
                      value={buttonUrl}
                      onChange={(e) => setButtonUrl(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </>
              )}

              <Button type="submit" variant="primary" className="my-2">
                Update
              </Button>
            </Form>
          </FormContainer>
        </Container>
      )}
    </>
  );
};

export default HeroEditScreen;
