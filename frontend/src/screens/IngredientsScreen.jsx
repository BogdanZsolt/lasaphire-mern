import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row, Image, InputGroup, Form } from 'react-bootstrap';
import Banner from '../components/Banner';
import { useTranslation } from 'react-i18next';
import Meta from '../components/Meta';
import { textShortener } from '../utils/tools';
import Editor from '../components/Editor.jsx';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { RiSearchLine } from 'react-icons/ri';
import {
  useGetIngredientsQuery,
  useGetIngredientAlphabetsQuery,
} from '../slices/ingredientsApiSlice';
import { toast } from 'react-toastify';

const IngredientsScreen = () => {
  const { t, i18n } = useTranslation(['menu']);
  const [ltrFilter, setLtrFilter] = useState('');
  const [keyword, setKeyword] = useState('');

  const {
    data: alpha,
    isLoading: isLoadingAlpha,
    isError: isErrorAlpha,
    error: errorAlpha,
  } = useGetIngredientAlphabetsQuery();

  const {
    data: ingredients,
    isLoading,
    isError,
    error,
  } = useGetIngredientsQuery({
    search: keyword,
    lang: i18n.language,
    sort: 'name,createdAt',
    translations_hu_name_regex: keyword
      ? undefined
      : i18n.language === 'en'
      ? undefined
      : ltrFilter,
    name_regex: keyword
      ? undefined
      : i18n.language === 'en'
      ? ltrFilter
      : undefined,
  });

  const handleSelect = (e) => {
    setLtrFilter(e.target.value);
  };

  useEffect(() => {
    keyword ? setLtrFilter('') : setLtrFilter('');
  }, [keyword]);

  console.log(keyword);

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
            <div className="mb-4 d-flex justify-content-between">
              <Form.Select
                className="py-0 shadow"
                style={{ width: 'unset' }}
                value={ltrFilter}
                disabled={keyword}
                // onChange={(e) => setLtrFilter(e.target.value)}
                onChange={handleSelect}
              >
                <option value="">{t('all')}</option>
                {alpha[0][i18n.language]?.map((ltr) => (
                  <option key={ltr} value={ltr}>
                    {ltr}
                  </option>
                ))}
              </Form.Select>
              <InputGroup
                size="lg"
                className="shadow"
                style={{ width: 'unset' }}
              >
                <InputGroup.Text
                  style={{
                    color: 'var(--bs-primary)',
                    backgroundColor: 'rgba(var(--bs-secondary-rgb),0.7)',
                  }}
                >
                  <RiSearchLine />
                </InputGroup.Text>
                <Form.Control
                  type="search"
                  placeholder={`${t('search')}...`}
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  autoFocus
                />
              </InputGroup>
            </div>
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
