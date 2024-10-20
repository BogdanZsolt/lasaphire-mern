import { Accordion, Container, useAccordionButton } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Editor from './Editor';

const Ingredients = ({ ingredients }) => {
  const { i18n } = useTranslation(['product']);

  const CustomToggle = ({ children, eventKey }) => {
    const decoratedOnClick = useAccordionButton(eventKey);

    return <Link onClick={decoratedOnClick}>{children}</Link>;
  };

  console.log(ingredients);

  return (
    <Container>
      {/* <Row>
        <h2 className="text-center">{t('ingredients')}</h2>
      </Row> */}
      <Accordion as="ul" className="mb-4 mt-3">
        {ingredients.map((ingredient) => (
          <li key={ingredient._id}>
            <CustomToggle eventKey={ingredient._id}>
              <span className="lead fw-bold">
                {i18n.language === 'en'
                  ? ingredient.name
                  : ingredient.translations.hu.name || ingredient.name}
              </span>
            </CustomToggle>
            <Accordion.Collapse eventKey={ingredient._id}>
              <Editor
                content={
                  18n.language
                    ? ingredient.description
                    : ingredient.translations.hu.description ||
                      ingredient.description
                }
                editable={false}
              />
            </Accordion.Collapse>
          </li>
        ))}
      </Accordion>
    </Container>
  );
};

export default Ingredients;
