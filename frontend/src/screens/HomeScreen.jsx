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

const HomeScreens = () => {
  const { keyword } = useParams();
  const { t } = useTranslation(['home']);

  return (
    <>
      {keyword && (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}

      <Hero />
      <Meta title={t('metaTitle')} />
      <Container className="my-4">
        <h2 className="mt-5 fw-bolder">{t('dearVisitorsAndCuriousOnes')}</h2>
        <p className="lead">{t('weWouldLikeToHaveSomePatience')}</p>
        <Link to="/shop">
          <h2 className="text-secondary mt-5">{t('products')}</h2>
        </Link>
        <ProductCarousel />
        <FeaturedStuff />
        <HomeAbout />
        <LatestPosts />
        <SubscribeForm />
        <PhotoGallery />
      </Container>
    </>
  );
};

export default HomeScreens;
