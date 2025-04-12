import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
// import Loader from './Loader';
// import { toast } from 'react-toastify';

const FeaturedStuff = ({ featuredStuff }) => {
  const { t, i18n } = useTranslation(['home']);

  // const productId = '6704e673bc8a8eedea7c2554';

  // const {
  //   data: product,
  //   isLoading,
  //   isError,
  //   error,
  // } = useGetProductDetailsQuery(productId);

  return (
    <div className="row my-4">
      <div className="row justify-content-between">
        <h2 className="col">{t('featuredStuff')}</h2>
        <Link
          to={`/product/${featuredStuff._id}`}
          className="col d-flex justify-content-end align-items-center"
        >
          <span className="fw-bold lead">{t('learnMoreAboutIt')}</span>
        </Link>
      </div>
      <div className="row g-0 shadow rounded-3 overflow-hidden featured-stuff">
        <div className="col-12 col-md-6">
          <img
            src={featuredStuff.thumbnails[0]}
            className="card-img img-fluid"
            alt={
              i18n.language === 'en'
                ? featuredStuff.name
                : featuredStuff?.translations?.hu?.name || featuredStuff.name
            }
          />
        </div>
        <div className="col-12 col-md-6">
          <div
            className="card-body"
            style={{
              backgroundImage:
                'url(https://lasaphire.hu/wp-content/uploads/2021/09/oldpaper-03.jpg)',
            }}
          >
            <div className="h-100 p-4 d-flex flex-column align-items-center">
              <h2 className="card-title fw-bold mb-3">
                {i18n.language === 'en'
                  ? featuredStuff.name
                  : featuredStuff?.translations?.hu?.name || featuredStuff.name}
              </h2>
              <p className="card-text lead">
                {i18n.language === 'en'
                  ? featuredStuff.description
                  : featuredStuff?.translations?.hu?.description ||
                    featuredStuff.description}
              </p>
              <Link
                className="btn btn-success btn-lasaphire"
                to={`/product/${featuredStuff._id}`}
              >
                {t('illCheck').toUpperCase()}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedStuff;
