import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, CardGroup, InputGroup, Form } from 'react-bootstrap';
import Loader from '../components/Loader';
import Banner from '../components/Banner';
import Meta from '../components/Meta';
import Message from '../components/Message';
import Post from '../components/Post';
import Paginate from '../components/Paginate';
import { RiSearchLine } from 'react-icons/ri';
import { useGetPostsQuery } from '../slices/postsApiSlice';

const BlogScreen = () => {
  let { pageNumber } = useParams();

  if (!pageNumber) {
    pageNumber = 1;
  }

  const { t, i18n } = useTranslation(['blog']);

  const [sort, setSort] = useState('');
  const [lang, setLang] = useState('');
  const [page, setPage] = useState(pageNumber);
  const [pages, setPages] = useState(1);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    setSort('-createdAt');
    setLang(i18n.language);
  }, [i18n.language]);

  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useGetPostsQuery({
    sort,
    language: lang,
    search: keyword,
    lang: i18n.language,
    page,
    limit: 8,
  });

  useEffect(() => {
    if (posts) {
      posts.pages < 1 ? setPages(1) : setPages(posts.pages);
      pages < page ? setPage(pages) : setPage(pageNumber);
    }
  }, [posts, pages, page, pageNumber]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Banner src="/images/ecoprint-03-1280x360.webp" title={t('blog')} />
          <Meta title={t('blog')} />
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
            <CardGroup className="blog text-center" style={{ gap: '1rem' }}>
              {posts.data.length > 0 ? (
                posts.data.map((post) => (
                  <Post
                    key={post._id}
                    src={
                      post.bannerImage ? post.bannerImage : '/images/sample.jpg'
                    }
                    postId={post._id}
                    title={post.title}
                    description={post.description}
                    author={post.user}
                    date={post.createdAt}
                    category={post?.category}
                  />
                ))
              ) : (
                <p className="lead fw-semibold">
                  {t('thereAreNoItemsToDisplay')}
                </p>
              )}
            </CardGroup>
            <Paginate pages={pages} page={page} pageName="blog" />
          </Container>
        </>
      )}
    </>
  );
};

export default BlogScreen;
