import { Container } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import ProductCarousel from '../components/ProductCarousel.jsx';
import PhotoGallery from '../components/PhotoGallery.jsx';
import SubscribeForm from '../components/SubscribeForm.jsx';
import LatestPosts from '../components/LatestPosts.jsx';
import FeaturedStuff from '../components/FeaturedStuff.jsx';
import { useTranslation } from 'react-i18next';
import Meta from '../components/Meta.jsx';
import HomeAbout from '../components/HomeAbout.jsx';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import Editor from '../components/Editor.jsx';
import { useGetHomePageQuery } from '../slices/homePageApiSlice.js';

const HomeScreens = () => {
  const { keyword } = useParams();
  const { t, i18n } = useTranslation(['home']);

  const { data: homePage, isLoading, isError, error } = useGetHomePageQuery();

  if (homePage) {
    console.log(homePage);
  }

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
          {keyword && (
            <Link to="/" className="btn btn-light mb-4">
              Go Back
            </Link>
          )}
          {homePage.isShowHero && (
            <Hero
              isAutoplay={homePage.heroAutoPlay}
              autoplayDelay={homePage.heroAutoplayDelay}
            />
          )}
          <Meta title={t('metaTitle')} />
          <Container className="my-4">
            {homePage.isShowMessage && (
              <>
                <Editor
                  content={
                    i18n.language === 'en'
                      ? homePage?.message
                      : homePage.translations?.hu?.message || homePage.message
                  }
                  editable={false}
                />
              </>
            )}
            <Link to="/shop">
              <h2 className="text-secondary mt-5">{t('products')}</h2>
            </Link>
            {homePage.isShowProducts && <ProductCarousel />}
            {homePage.isShowFeaturedStuff && (
              <FeaturedStuff featuredStuff={homePage.featuredStuff} />
            )}
            <HomeAbout />
            <LatestPosts />
            <SubscribeForm />
            {homePage.isShowGallery && (
              <PhotoGallery photos={homePage.galleryImages} />
            )}
          </Container>
        </>
      )}
    </>
  );
};

export default HomeScreens;
