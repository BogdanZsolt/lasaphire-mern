import { useEffect, useState } from 'react';
import { Nav, NavDropdown, Container, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useTranslation } from 'react-i18next';
import Message from './Message';
import Loader from './Loader';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { useGetProductCategoriesQuery } from '../slices/productCategoriesApiSlice';

// import mainMenus from './menus.json';

const Menu = () => {
  const { t, i18n } = useTranslation(['menu']);

  const {
    data: categories,
    isLoading,
    error,
  } = useGetProductCategoriesQuery({ sort: 'title' });

  const [show, setShow] = useState('');
  const [categoriesSubMenu, setCategoriesSubMenu] = useState([]);

  useEffect(() => {
    if (categories) {
      let catMenu = [];
      categories.data.map((category, index) => {
        let item = {};
        item.id = `2.1.${++index}`;
        item.text =
          i18n.language === 'en'
            ? category.title
            : category.translations?.hu?.title || category.title;
        item.link = `/shop/category/${category._id}`;
        catMenu = [...catMenu, item];
      });
      setCategoriesSubMenu(catMenu);
    }
  }, [categories, i18n.language]);

  const menus = [
    {
      id: 1,
      text: t('about'),
      link: '',
      megaCard: [
        {
          id: 1.1,
          text: t('ourHerStory'),
          link: '/herstory',
          image: '/images/ourStory-menu-200x200.jpg',
        },
        {
          id: 1.2,
          text: t('mePetra'),
          link: '/mepetra',
          image: '/images/pepsz-yogaban-200x200.webp',
        },
        {
          id: 1.3,
          text: t('ingredients'),
          link: '/ingredients',
          image: '/images/ingredients-menu-200x200.jpg',
        },
        {
          id: 1.4,
          text: t('valuesAndIntentions'),
          link: '/values',
          image: '/images/our_values-150x150.jpg',
        },
        {
          id: 1.5,
          text: t('faqs'),
          link: '/faqs',
          image: '/images/faq-menu-200x200.jpg',
        },
        {
          id: 1.6,
          text: t('contact'),
          link: '/contact',
          image: '/images/our_values-150x150.jpg',
        },
      ],
    },

    {
      id: 2,
      text: t('shop'),
      link: '/shop',
      megaTable: [
        {
          id: 2.1,
          text: t('categories'),
          column: categoriesSubMenu,
        },
      ],
    },
    {
      id: 3,
      text: t('knowledge'),
      link: '',
      megaCard: [
        {
          id: 3.1,
          text: t('membership'),
          link: '/sophiecircle',
          image: '/images/pepsz-yogaban-200x200.webp',
        },
        {
          id: '3.2',
          text: t('onlineCourses'),
          link: '/onlinecourses',
          image: '/images/ecoprint-04-200x200.webp',
        },
        {
          id: '3.3',
          text: t('retreatsAndWorkshop'),
          link: '/event',
          image: '/images/ecoprint-01-200x200.webp',
        },
        {
          id: '3.4',
          text: t('blog'),
          link: '/blog',
          image: '/images/ecoprint-05-200x200.webp',
        },
        {
          id: '3.5',
          text: t('library'),
          link: '',
          image: '/images/ecoprint-06-200x200.webp',
        },
      ],
    },
    {
      id: 4,
      text: t('faceYoga'),
      link: '',
      megaCard: [
        {
          id: 4.1,
          text: t('90dayProgram'),
          link: '/90daysProgram',
          image: '/images/ourStory-menu-200x200.jpg',
        },
        {
          id: 4.2,
          text: t('youtubeChannel'),
          link: '/youtubechannel',
          image: '/images/ingredients-menu-200x200.jpg',
        },
        {
          id: 4.3,
          text: t('holistic'),
          link: '/holistic',
          image: '/images/pepsz-yogaban-200x200.webp',
        },
        {
          id: 4.4,
          text: t('naturalBeauty'),
          link: '/naturalbeauty',
          image: '/images/our_values-150x150.jpg',
        },
      ],
    },
    {
      id: 5,
      text: t('sophiaCircle'),
      link: '/sophiecircle',
      image: '/images/faq-menu-200x200.jpg',
    },
  ];

  // const { menus } = mainMenus;
  const mobileShowHandler = (val) => {
    if (window.innerWidth <= 1200) {
      show !== val ? setShow(val) : setShow('');
    } else {
      setShow('');
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.Message || error.error}
        </Message>
      ) : (
        <Nav
          className="justify-content-start flex-grow-1 pe-3 left-menu"
          as="ul"
        >
          {menus.map((item) =>
            item?.megaCard?.length > 0 ? (
              <div key={item.id} className="mega-parent">
                {item.link !== '' ? (
                  <div className="mega-dropdown">
                    <LinkContainer to={item.link}>
                      <Nav.Link>{item.text}</Nav.Link>
                    </LinkContainer>
                    <Button
                      className="d-lg-none bg-transparent ms-2"
                      onClick={() => mobileShowHandler(`mega-${item.id}`)}
                      id={`mega-${item.id}`}
                    >
                      <BsFillCaretDownFill id={`mega-${item.id}`} />
                    </Button>
                  </div>
                ) : (
                  <Nav.Link
                    className="mega-dropdown"
                    onClick={() => mobileShowHandler(`mega-${item.id}`)}
                  >
                    <div
                      id={`mega-${item.id}`}
                      className="d-flex align-items-center"
                    >
                      {item.text}
                      <BsFillCaretDownFill className="d-lg-none" />
                    </div>
                  </Nav.Link>
                )}
                <div
                  className={`mega-menu ${
                    show === `mega-${item.id}` ? 'show' : ''
                  }`}
                >
                  <Container>
                    <ul className="mega-menu-wrapper">
                      {item.megaCard.map((mitem) => (
                        <li key={mitem.id} className="mega-item">
                          {mitem.link !== '' ? (
                            <LinkContainer to={mitem.link}>
                              <Link>
                                <div className="image">
                                  <Image src={mitem.image} />
                                </div>
                                <h5 title={mitem.text}>{mitem.text}</h5>
                              </Link>
                            </LinkContainer>
                          ) : (
                            <>
                              <div className="image">
                                <Image src={mitem.image} />
                              </div>
                              <h5 title={mitem.text}>{mitem.text}</h5>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </Container>
                </div>
              </div>
            ) : item.megaTable?.length > 0 ? (
              <div key={item.id} className="mega-parent">
                {item.link !== '' ? (
                  <div className="mega-dropdown">
                    <LinkContainer to={item.link}>
                      <Nav.Link>{item.text}</Nav.Link>
                    </LinkContainer>
                    <Button
                      className="d-lg-none bg-transparent ms-2"
                      onClick={() => mobileShowHandler(`mega-${item.id}`)}
                      id={`mega-${item.id}`}
                    >
                      <BsFillCaretDownFill
                        id={`mega-${item.id}`}
                        className="d-block"
                      />
                    </Button>
                  </div>
                ) : (
                  <Nav.Link
                    className="mega-dropdown"
                    onClick={() => mobileShowHandler(`mega-${item.id}`)}
                  >
                    <div
                      id={`mega-${item.id}`}
                      className="d-flex align-items-center"
                    >
                      {item.text}
                      <BsFillCaretDownFill className="d-lg-none" />
                    </div>
                  </Nav.Link>
                )}
                <div
                  className={`mega-menu ${
                    show === `mega-${item.id}` ? 'show' : ''
                  }`}
                >
                  <Container>
                    <ul className="mega-menu-wrapper">
                      {item.megaTable.map((table) => (
                        <div key={table.id}>
                          <h4 className="text-uppercase fw-bolder">
                            {table.text}
                          </h4>
                          <ul className="mega-table-wrapper">
                            {table.column.map((itm) => (
                              <li key={itm.id} className="mega-item">
                                {itm.link !== '' ? (
                                  <LinkContainer to={itm.link}>
                                    <Link>
                                      <h5 className="mb-2" title={itm.text}>
                                        {itm.text}
                                      </h5>
                                    </Link>
                                  </LinkContainer>
                                ) : (
                                  <h5 title={itm.text}>{itm.text}</h5>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </ul>
                  </Container>
                </div>
              </div>
            ) : item?.dropdown?.length > 0 ? (
              <NavDropdown key={item.id} title={item.text}>
                {item.dropdown.map((ditem) => (
                  <li key={ditem.id}>
                    {ditem.link !== '' ? (
                      <LinkContainer to={ditem.link}>
                        <NavDropdown.Item>{ditem.text}</NavDropdown.Item>
                      </LinkContainer>
                    ) : (
                      <NavDropdown.Item className="rounded-2">
                        {ditem.text}
                      </NavDropdown.Item>
                    )}
                  </li>
                ))}
              </NavDropdown>
            ) : (
              <li key={item.id}>
                {item.link === '' ? (
                  <Nav.Link>{item.text}</Nav.Link>
                ) : (
                  <LinkContainer to={item.link}>
                    <Nav.Link>{item.text}</Nav.Link>
                  </LinkContainer>
                )}
              </li>
            )
          )}
        </Nav>
      )}
    </>
  );
};

export default Menu;
