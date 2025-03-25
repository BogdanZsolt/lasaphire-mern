import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Badge,
  Button,
  CardGroup,
  Form,
  InputGroup,
  Modal,
  Tab,
  Tabs,
} from 'react-bootstrap';
// import { useParams } from 'react-router-dom';
import { RiSearchLine } from 'react-icons/ri';
import Loader from './Loader';
import Product from './Product';
import { toast } from 'react-toastify';
import Ingredients from './Ingredients';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { useGetIngredientsQuery } from '../slices/ingredientsApiSlice';
import { useGetPostsQuery } from '../slices/postsApiSlice';
import Post from './Post';

const SearchBox = () => {
  const { t, i18n } = useTranslation('search');
  const [show, setShow] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [tabKey, setTabKey] = useState('products');

  // const { keyword: urlKeyword } = useParams();

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useGetProductsQuery({
    search: keyword,
    lang: i18n.language,
  });

  const {
    data: ingredients,
    isLoading: isLoadingIngredients,
    isError: isErrorIngredients,
    error: errorIngredients,
  } = useGetIngredientsQuery({
    search: keyword,
    lang: i18n.language,
  });

  const {
    data: posts,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    error: errorPosts,
  } = useGetPostsQuery({
    search: keyword,
    lang: i18n.language,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {isLoadingIngredients ? (
        <Loader />
      ) : (
        isErrorIngredients &&
        toast.error(errorIngredients?.data.message || errorIngredients?.error)
      )}
      {isLoadingPosts ? (
        <Loader />
      ) : (
        isErrorPosts &&
        toast.error(errorPosts?.data?.message || errorPosts?.error)
      )}
      {isLoading ? (
        <Loader />
      ) : (
        isError && toast.error(error?.data?.message || error?.error)
      )}
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
          scrollable
          size="xl"
        >
          <Modal.Header closeButton>
            <Modal.Title>{t('search')}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="scrollto">
            <InputGroup size="lg">
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
            {keyword && (
              <>
                <h4 className="text-center mt-3">{t('results')}</h4>
                {products.data.length > 0 ||
                ingredients.data.length > 0 ||
                posts.data.length > 0 ? (
                  <Tabs
                    id="searchTab"
                    activeKey={tabKey}
                    onSelect={(k) => setTabKey(k)}
                    className="mb-3 search-tab scrollto"
                    justify
                  >
                    <Tab
                      eventKey="products"
                      title={
                        <React.Fragment>
                          <span className="position-relative">
                            {t('products')}
                            <Badge
                              className="position-absolute"
                              bg="secondary"
                              text="primary"
                              pill
                            >
                              {products.data.length}
                            </Badge>
                          </span>
                        </React.Fragment>
                      }
                    >
                      {products.data.length > 0 ? (
                        <div className="d-flex gap-2">
                          {products.data.map((product) => (
                            <Product
                              key={product._id}
                              product={product}
                              style={{ width: '16rem' }}
                              handleClose={handleClose}
                            />
                          ))}
                        </div>
                      ) : (
                        <p className="lead">{t('noResults')}</p>
                      )}
                    </Tab>
                    <Tab
                      eventKey="ingredients"
                      title={
                        <React.Fragment>
                          <span className="position-relative">
                            {t('ingredients')}
                            <Badge
                              className="position-absolute"
                              bg="secondary"
                              text="primary"
                              pill
                            >
                              {ingredients.data.length}
                            </Badge>
                          </span>
                        </React.Fragment>
                      }
                    >
                      {ingredients.data.length > 0 ? (
                        <Ingredients
                          ingredients={ingredients.data}
                          close={handleClose}
                        />
                      ) : (
                        <p className="lead">{t('noResults')}</p>
                      )}
                    </Tab>
                    <Tab
                      eventKey="posts"
                      title={
                        <React.Fragment>
                          <span className="position-relative">
                            {t('posts')}
                            <Badge
                              className="position-absolute"
                              bg="secondary"
                              text="primary"
                              pill
                            >
                              {posts.data.length}
                            </Badge>
                          </span>
                        </React.Fragment>
                      }
                    >
                      <CardGroup style={{ gap: '0.5rem' }}>
                        {posts.data.map((post) => (
                          <Post
                            key={post._id}
                            src={
                              post.bannerImage
                                ? post.bannerImage
                                : '/images/sample.jpg'
                            }
                            postId={post._id}
                            title={post.title}
                            description={post.description}
                            author={post.user}
                            date={post.createdAt}
                            category={post?.category}
                            handleClose={handleClose}
                          />
                        ))}
                      </CardGroup>
                    </Tab>
                  </Tabs>
                ) : (
                  <>
                    <p className="lead">{t('noResults')}</p>
                  </>
                )}
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
};

export default SearchBox;
