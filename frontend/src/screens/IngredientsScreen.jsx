import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Col,
  Container,
  Row,
  Image,
  Button,
  ButtonGroup,
} from 'react-bootstrap';
import Banner from '../components/Banner';
import { useTranslation } from 'react-i18next';
import Meta from '../components/Meta';
import { textShortener } from '../utils/tools';
import Editor from '../components/Editor.jsx';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  useGetIngredientsQuery,
  useGetIngredientAlphabetsQuery,
} from '../slices/ingredientsApiSlice';
import { toast } from 'react-toastify';

const IngredientsScreen = () => {
  const { t, i18n } = useTranslation(['menu']);
  const [ltrFilter, setLtrFilter] = useState('');

  const alphabets = {
    en: [
      { letter: 'A', hasName: false },
      { letter: 'B', hasName: false },
      { letter: 'C', hasName: false },
      { letter: 'D', hasName: false },
      { letter: 'E', hasName: false },
      { letter: 'F', hasName: false },
      { letter: 'G', hasName: false },
      { letter: 'H', hasName: false },
      { letter: 'I', hasName: false },
      { letter: 'J', hasName: false },
      { letter: 'K', hasName: false },
      { letter: 'L', hasName: false },
      { letter: 'M', hasName: false },
      { letter: 'N', hasName: false },
      { letter: 'O', hasName: false },
      { letter: 'P', hasName: false },
      { letter: 'Q', hasName: false },
      { letter: 'R', hasName: false },
      { letter: 'S', hasName: false },
      { letter: 'T', hasName: false },
      { letter: 'U', hasName: false },
      { letter: 'V', hasName: false },
      { letter: 'W', hasName: false },
      { letter: 'X', hasName: false },
      { letter: 'Y', hasName: false },
      { letter: 'Z', hasName: false },
    ],
    hu: [
      { letter: 'A', hasName: false },
      { letter: 'Á', hasName: false },
      { letter: 'B', hasName: false },
      { letter: 'C', hasName: false },
      { letter: 'D', hasName: false },
      { letter: 'E', hasName: false },
      { letter: 'É', hasName: false },
      { letter: 'F', hasName: false },
      { letter: 'G', hasName: false },
      { letter: 'H', hasName: false },
      { letter: 'I', hasName: false },
      { letter: 'Í', hasName: false },
      { letter: 'J', hasName: false },
      { letter: 'K', hasName: false },
      { letter: 'L', hasName: false },
      { letter: 'M', hasName: false },
      { letter: 'N', hasName: false },
      { letter: 'O', hasName: false },
      { letter: 'Ó', hasName: false },
      { letter: 'Ö', hasName: false },
      { letter: 'Ő', hasName: false },
      { letter: 'P', hasName: false },
      { letter: 'Q', hasName: false },
      { letter: 'R', hasName: false },
      { letter: 'S', hasName: false },
      { letter: 'T', hasName: false },
      { letter: 'U', hasName: false },
      { letter: 'Ú', hasName: false },
      { letter: 'Ü', hasName: false },
      { letter: 'Ű', hasName: false },
      { letter: 'V', hasName: false },
      { letter: 'W', hasName: false },
      { letter: 'X', hasName: false },
      { letter: 'Y', hasName: false },
      { letter: 'Z', hasName: false },
    ],
  };

  const {
    data: alpha,
    isLoading: isLoadingAlpha,
    isError: isErrorAlpha,
    error: errorAlpha,
  } = useGetIngredientAlphabetsQuery();

  if (alpha) {
    alphabets.hu.map((item) => {
      if (alpha[0].hu.includes(item.letter)) {
        item.hasName = true;
      }
    });
    alphabets.en.map((item) => {
      if (alpha[0].en.includes(item.letter)) {
        item.hasName = true;
      }
    });
  }

  const {
    data: ingredients,
    isLoading,
    isError,
    error,
  } = useGetIngredientsQuery({
    sort: 'name,createdAt',
    translations_hu_name_regex: i18n.language === 'en' ? undefined : ltrFilter,
    name_regex: i18n.language === 'en' ? ltrFilter : undefined,
  });

  const alphabetHandler = (ltr) => {
    console.log(ltr);
    setLtrFilter(ltr);
  };

  if (alpha) {
    console.log(alpha[0]);
  }

  return (
    <>
      <Banner
        title={t('ingredients')}
        src="/images/ingredients-banner-1280x360.jpg"
        alt="ingredients"
      />
      <Meta title={t('ingredients')} />
      <Container>
        {isLoadingAlpha ? (
          <Loader />
        ) : (
          isErrorAlpha && toast.error(errorAlpha.data.message)
        )}
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message variant="danger">{error.data.Message}</Message>
        ) : (
          <>
            <Row className="mb-3 shadow card-glass-container scrolling">
              <ButtonGroup
                className="card-glass"
                style={{ '--bs-gutter-x': '0' }}
              >
                <Button
                  onClick={() => alphabetHandler('')}
                  variant="transparent"
                  className="text-secondary fw-bolder"
                >
                  {t('all')}
                </Button>
                {alphabets[i18n.language].map((item, idx) => (
                  <Button
                    onClick={() => alphabetHandler(item.letter)}
                    key={idx}
                    variant="transparent"
                    disabled={!item.hasName}
                    className="text-secondary fw-bold"
                    style={
                      item.hasName
                        ? {}
                        : { background: 'rgba(var(--bs-primary-rgb), 0.75)' }
                    }
                  >
                    {item.letter}
                  </Button>
                ))}
              </ButtonGroup>
            </Row>
            {ingredients &&
              ingredients.data.map((ingredient) => (
                <Row
                  key={ingredient._id}
                  className="mb-3 rounded-2 overflow-hidden shadow card-glass"
                >
                  <Col sm={2} className="p-3" as="div">
                    <Image
                      src={ingredient.thumbnail}
                      style={{ objectFit: 'cover' }}
                      thumbnail
                    />
                  </Col>
                  <Col sm={7} className="p-3">
                    <Row>
                      <h4 className="text-secondary">
                        {i18n.language === 'en'
                          ? ingredient.name
                          : ingredient?.translations?.hu?.name ||
                            ingredient.name}
                      </h4>
                      <Editor
                        content={textShortener(
                          i18n.language === 'en'
                            ? ingredient.description
                            : ingredient.translations?.hu?.description ||
                                ingredient.description
                        )}
                        className="text-secondary bg-transparent"
                        editable={false}
                      />
                    </Row>
                  </Col>
                  <Col sm={3} className="p-3">
                    <ul className="list-unstyled">
                      {ingredient.products.map((product) => (
                        <li key={product._id}>
                          <Link
                            className="text-secondary lead"
                            to={`/product/${product._id}`}
                          >
                            {i18n.language === 'en'
                              ? product.name
                              : product?.translations?.hu?.name || product.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Col>
                </Row>
              ))}
          </>
        )}
      </Container>
    </>
  );
};

export default IngredientsScreen;
