import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HomeAbout = () => {
  const { t } = useTranslation(['home']);

  return (
    <div className="row mt-5 mb-4 home-about">
      <div className="home-about__content col-11 col-md-6">
        <div className="card-body">
          <h4 className="card-title">{t('whoWeAre')}</h4>
          <h2 className="card-title fw-bold">{t('ourMissionAndStory')}</h2>
          <p className="card-text lead">{t('iAmAFreelanceCreatorLiving')}</p>
          <div className="d-flex justify-content-evenly">
            <Link to="/herstory" className="card-link fw-bold">
              {t('whoWeAre')}
            </Link>
            <Link to="/mepetra" className="card-link fw-bold">
              {t('aboutMe')}
            </Link>
            <Link to="/values" className="card-link fw-bold">
              {t('valuesAndIntentions')}
            </Link>
          </div>
        </div>
      </div>
      <div className="col-11 col-md-6 g-0 rounded-3 overflow-hidden shadow">
        <img
          src="https://en.lasaphire.hu/wp-content/uploads/sites/2/2021/06/image_6483441-2-1024x571-Recovered.jpg"
          alt="Petra"
          className="card-img img-fluid"
        />
      </div>
    </div>
  );
};

export default HomeAbout;
