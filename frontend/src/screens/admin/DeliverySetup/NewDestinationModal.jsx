import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import LangSelectInputWithConverter from '../../../components/LangSelectInputWithConverter';
import { useCreateShippingMutation } from '../../../slices/shippingsApiSlice.js';
import Loader from '../../../components/Loader.jsx';
import { toast } from 'react-toastify';

const NewDestinationModal = ({ show, setShow, countries, refetch, exists }) => {
  const [countryOptions, setCountryOptions] = useState([]);
  const [defaultCountry, setDefaultCountry] = useState(null);
  const [country, setCountry] = useState(null);
  const [price, setPrice] = useState(10);
  const [freeFrom, setFreeFrom] = useState(110);
  const [priceHu, setPriceHu] = useState(1990);
  const [freeFromHu, setFreeFromHu] = useState(20000);

  const animatedComponents = makeAnimated();

  const [createShipping, { isLoading, isError, error }] =
    useCreateShippingMutation();

  const selectStyles = {
    control: (baseStyle, state) => ({
      ...baseStyle,
      backgroundColor: 'var(--bs-primary)',
      color: 'var(--bs-secondary)',
      minHeight: 'unset',
      maxHeight: '36px',
      borderColor: state.isFocused
        ? 'var(--bs-secondary)'
        : 'var(--bs-secondary)',
      '&:hover': {
        border: state.isFocused
          ? '2px solid var(--bs-secondary)'
          : '1px solid var(--bs-secondary)',
      },
    }),
    valueContainer: (baseStyles) => ({
      ...baseStyles,
      flexWrap: 'nowrap',
    }),
    multiValue: (baseStyles) => ({
      ...baseStyles,
      color: 'var(--bs-secondary)',
      backgroundColor: 'rgba(var(--bs-secondary-rgb), 0.15)',
    }),
    indicatorSeparator: (baseStyles) => ({
      ...baseStyles,
      color: 'var(--bs-secondary)',
      backgroundColor: 'var(--bs-secondary)',
    }),
    indicatorContainer: (baseStyles) => ({
      ...baseStyles,
      color: 'var(--bs-secondary)',
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      color: state.isSelected
        ? 'var(--bs-primary)'
        : state.isDisabled
        ? 'rgba(var(--bs-secondary-rgb), 0.5)'
        : 'var(--bs-secondary)',
      backgroundColor: state.isSelected
        ? 'var(--bs-secondary)'
        : 'var(--bs-primary)',
      width: 'auto',
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      width: 'max-content',
      minWidth: '100%',
      zIndex: 5,
      border: '1px solid var(--bs-secondary)',
      boxShadow: '0 10px 20px -10px var(--bs-secondary)',
    }),
    Placeholder: (baseStyles) => ({
      ...baseStyles,
      fontSize: '1.15rem',
      color: 'var(--bs-secondary)',
      fontWeight: '500',
    }),
  };

  useEffect(() => {
    if (countries) {
      let cat = [];
      let defCat = { value: '' };
      countries.data.map((item) => {
        cat = [
          ...cat,
          {
            value: item.name,
            label: item.name,
            isDisabled: exists.includes(item.name),
          },
        ];
        if (country) {
          if (country === item.name) {
            defCat.value = item.name;
            defCat.label = item.name;
          }
        }
      });
      setCountryOptions(cat);
      setDefaultCountry(defCat);
    }
  }, [countries, country, exists]);

  const handleClose = () => setShow(false);

  const selectCountryHandler = (choice) => {
    choice ? setCountry(choice.value) : setCountry('');
  };

  const handleCreate = async () => {
    try {
      await createShipping({
        country,
        price,
        freeFrom,
        transitions: {
          hu: {
            price: priceHu,
            freeFrom: freeFromHu,
          },
        },
      });
      setCountry(null);
      setPrice(10);
      setFreeFrom(110);
      setPriceHu(1900);
      setFreeFromHu(20000);
      handleClose();
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      {isLoading ? <Loader /> : isError && toast.error(error?.data?.message)}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create new destination</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="country" className="my-2">
            <Form.Label>Which country do we ship to?</Form.Label>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              value={defaultCountry}
              styles={selectStyles}
              isMulti={false}
              isClearable
              isSearchable
              name="country"
              options={countryOptions}
              onChange={selectCountryHandler}
              placeholder="Select country"
              isOptionDisabled={(option) => option.isDisabled}
              autoFocus
            />
          </Form.Group>
          <LangSelectInputWithConverter
            label="Shipping price"
            placeholder="Shipping price"
            placeholder_hu="Shipping price"
            defLang={price}
            setDefLang={setPrice}
            secLang={priceHu}
            setSecLang={setPriceHu}
            className="mb-3"
          />
          <LangSelectInputWithConverter
            label="The total price that qualifies for free shipping"
            placeholder="Price"
            placeholder_hu="Price"
            defLang={freeFrom}
            setDefLang={setFreeFrom}
            secLang={freeFromHu}
            setSecLang={setFreeFromHu}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCreate} disabled={!country}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewDestinationModal;
