import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, InputGroup, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Banner from '../components/Banner';
import Meta from '../components/Meta';
import Post from '../components/Post';
import { toast } from 'react-toastify';
import { RiSearchLine } from 'react-icons/ri';
import { useGetPostsQuery } from '../slices/postsApiSlice.js';
import { useGetPostCategoryDetailsQuery } from '../slices/postCategoriesApiSlice.js';

const CategoryPostScreen = () => {
  const { id: catId } = useParams();

  const [keyword, setKeyword] = useState('');

  const { t, i18n } = useTranslation(['blog']);

  const {
    data: category,
    isLoading: isLoadingCategory,
    isError: isErrorCategory,
    error: errorCategory,
  } = useGetPostCategoryDetailsQuery(catId);

  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useGetPostsQuery({
    search: keyword,
    lang: i18n.language,
    category_eq: catId,
    language_eq: i18n.language,
  });

  return (
    <>
      {isLoadingCategory ? (
        <Loader />
      ) : (
        isErrorCategory &&
        toast.error(errorCategory?.data?.message || errorCategory?.error)
      )}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Banner
            title={`${t('category')}: ${
              i18n.language === 'en'
                ? category?.title
                : category?.translations?.hu?.title || category?.title
            }`}
            src={posts.data[0]?.bannerImage}
            alt="Banner"
          />
          <Meta
            title={`${t('category')}: ${
              i18n.language === 'en'
                ? category?.title
                : category?.translations?.hu?.title || category?.title
            }`}
          />
          <Container className="mb-5">
            <div className="mb-4 d-flex justify-content-end">
              <InputGroup
                size="lg"
                className="shadow-sm"
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
            <Row style={{ '--bs-gutter-y': '1.5rem' }}>
              {posts.data?.map(
                (post) =>
                  post.language === i18n.language && (
                    <Col lg={12} key={post._id}>
                      <Post
                        postId={post._id}
                        src={
                          post.bannerImage
                            ? post.bannerImage
                            : '/images/sample.jpg'
                        }
                        title={post.title}
                        category={post.category}
                        description={post.description}
                        author={post.user}
                        date={post.createdAt}
                      />
                    </Col>
                  )
              )}
            </Row>
          </Container>
        </>
      )}
      ;
    </>
  );
};

export default CategoryPostScreen;
