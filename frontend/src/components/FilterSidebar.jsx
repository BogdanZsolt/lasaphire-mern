import { useTranslation } from 'react-i18next';
import { Accordion, Row, Form, InputGroup } from 'react-bootstrap';
import SelectCategory from './SelectCategory';
import PriceSlider from './PriceSlider';
import { RiSearchLine } from 'react-icons/ri';

const FilterSidebar = ({
  searchStr,
  setSearchStr,
  categories,
  category,
  setCategory,
  min,
  minPrice,
  setMinPrice,
  max,
  maxPrice,
  setMaxPrice,
  className,
}) => {
  const { t } = useTranslation(['shop']);

  return (
    <div className={`w-100 ${className}`}>
      <h3>{t('filters')}</h3>
      <Row>
        <Accordion
          defaultActiveKey={['search', 'categories', 'price']}
          flush
          alwaysOpen
          style={{ '--bs-accordion-bg': 'transparent' }}
        >
          <Accordion.Item eventKey="search">
            <Accordion.Header>{t('search')}</Accordion.Header>
            <Accordion.Body>
              <InputGroup>
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
                  placeholder={t('searchPlaceholder')}
                  value={searchStr}
                  onChange={(e) => setSearchStr(e.target.value)}
                />
              </InputGroup>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="categories">
            <Accordion.Header>{t('categories')}</Accordion.Header>
            <Accordion.Body>
              <SelectCategory
                categories={categories}
                category={category}
                setCategory={setCategory}
                multi
              />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="price">
            <Accordion.Header>{t('price')}</Accordion.Header>
            <Accordion.Body>
              <PriceSlider
                min={min}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                max={max}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
    </div>
  );
};

export default FilterSidebar;
