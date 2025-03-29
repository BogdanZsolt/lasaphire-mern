import { Button } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

const Hero = () => {
  const { t } = useTranslation(['home']);

  const heros = [
    {
      image: 'image_6483441-4-1024x768-1.jpeg',
      title: t('heroTitle'),
      description: t('heroDescription'),
      buttonText: t('checkItOut'),
    },
    {
      image: 'pepsz-zafival.jpg',
      title: t('heroTitle'),
      description: t('heroDescription'),
      buttonText: t('explore'),
    },
    {
      image: 'hero-03.jpg',
      title: t('heroTitle'),
      description: t('heroDescription'),
      buttonText: t('getTheDeal'),
    },
  ];

  return (
    <Swiper
      modules={[Pagination, Autoplay, EffectFade]}
      autoHeight={true}
      loop={true}
      pagination={{
        el: '.swiper-pagination',
        clickable: true,
      }}
      autoplay={{ delay: 10000, disableOnInteraction: false }}
      effect={'fade'}
      className="slider"
    >
      {heros.map((hero, index) => (
        <SwiperSlide className="item" key={index}>
          <div className="image">
            <div className="ls-cover">
              <img src={`/images/${hero.image}`} alt="" />
              <div className="overlay"></div>
            </div>
            <div className="title-info">
              <div className="title-wrap">
                <h3 className="title">{hero.title}</h3>
                <p>{hero.description}</p>
                <Button
                  variant="success"
                  className="text-primary btn-lasaphire"
                >
                  <span className="fw-500 text-white text-uppercase">
                    {hero.buttonText}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
      <div className="custom-pagination">
        <div className="swiper-pagination"></div>
      </div>
    </Swiper>
  );
};

export default Hero;
