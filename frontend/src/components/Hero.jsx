import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import Loader from './Loader';
import Message from './Message';
import { useGetHerosQuery } from '../slices/herosApiSlice';

const Hero = ({ isAutoplay = true, autoplayDelay = 5 }) => {
  const { i18n } = useTranslation(['home']);

  const {
    data: heros,
    isLoading,
    isError,
    error,
  } = useGetHerosQuery({ sort: 'createdAt', isActive_eq: true });

  // const heros = [
  //   {
  //     image: 'image_6483441-4-1024x768-1.jpeg',
  //     title: t('heroTitle'),
  //     description: t('heroDescription'),
  //     buttonText: t('checkItOut'),
  //   },
  //   {
  //     image: 'pepsz-zafival.jpg',
  //     title: t('heroTitle'),
  //     description: t('heroDescription'),
  //     buttonText: t('explore'),
  //   },
  //   {
  //     image: 'hero-03.jpg',
  //     title: t('heroTitle'),
  //     description: t('heroDescription'),
  //     buttonText: t('getTheDeal'),
  //   },
  // ];

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <>
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        autoHeight={true}
        loop={true}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
        }}
        autoplay={
          isAutoplay
            ? { delay: autoplayDelay * 1000, disableOnInteraction: false }
            : false
        }
        // {{ delay: 10000, disableOnInteraction: false }}
        effect={'fade'}
        className="slider"
      >
        {heros.data.map((hero) => (
          <SwiperSlide className="item" key={hero._id}>
            <div className="image">
              <div className="ls-cover">
                <img src={hero.image} alt="" />
                <div className="overlay"></div>
              </div>
              <div className="title-info">
                <div className="title-wrap">
                  <h3 className="title">
                    {i18n.language === 'en'
                      ? hero.title
                      : hero.translations?.hu?.title || hero.title}
                  </h3>
                  <p>
                    {i18n.language === 'en'
                      ? hero.description
                      : hero.translations?.hu?.description || hero.description}
                  </p>
                  {hero.hasButton && (
                    <Link
                      className="text-primary btn-lasaphire btn-success btn"
                      to={hero.buttonUrl}
                    >
                      <span className="fw-500 text-white text-uppercase">
                        {i18n.language === 'en'
                          ? hero.buttonText
                          : hero.translations?.hu?.buttonText ||
                            hero.buttonText}
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="custom-pagination">
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </>
  );
};

export default Hero;
