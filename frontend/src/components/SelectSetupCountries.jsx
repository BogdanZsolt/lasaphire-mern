import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import makeAnimated from 'react-select/animated';
import OptionsOutsideSelect from './OptionsOutsideSelect';

const SelectSetupCountries = ({
  countries,
  country,
  setCountry,
  multi,
  show,
  setShow,
  activeValue,
  setActiveValue,
}) => {
  const [options, setOptions] = useState(null);
  const [defaultCountry, setDefaultCountry] = useState('');
  const animatedComponents = makeAnimated();

  const selectStyles = {
    control: (baseStyle, state) => ({
      ...baseStyle,
      backgroundColor: 'var(--bs-primary)',
      color: 'var(--bs-secondary)',
      minHeight: 'unset',
      maxHeight: '36px',
      with: '100%',
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
      color: state.isSelected ? 'var(--bs-primary)' : 'var(--bs-secondary)',
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
    if (multi) {
      if (countries) {
        let cou = [];
        let defCou = [];
        countries.data.map((item) => {
          cou = [
            ...cou,
            {
              value: item.name,
              label: item.name,
            },
          ];
          if (country) {
            if (country.includes(item.name)) {
              defCou = [
                ...defCou,
                {
                  value: item.name,
                  label: item.name,
                },
              ];
            }
          }
        });
        setOptions(cou);
        setDefaultCountry(defCou);
      }
    } else {
      if (countries) {
        let cou = [];
        let defCou = { value: '' };
        countries.data.map((item) => {
          cou = [
            ...cou,
            {
              value: item.name,
              label: item.name,
            },
          ];
          if (country) {
            if (country === item.name) {
              defCou.value = item.name;
              defCou.label = item.name;
            }
          }
        });
        setOptions(cou);
        setDefaultCountry(defCou);
      }
    }
  }, [countries, country, multi]);

  const selectCountryHandler = (choice) => {
    if (multi) {
      let cou = [];
      choice.map((x) => {
        cou = [...cou, x.value];
      });
      setCountry(cou);
    } else {
      choice ? setCountry(choice.value) : setCountry('');
    }
  };

  return (
    <>
      <Form.Group controlId="country" className="my-2">
        <OptionsOutsideSelect
          components={animatedComponents}
          onChange={selectCountryHandler}
          isMulti={multi}
          options={options}
          styles={selectStyles}
          value={
            multi
              ? defaultCountry
              : defaultCountry.value === ''
              ? []
              : defaultCountry
          }
          show={show}
          activeValue={activeValue}
          setActiveValue={setActiveValue}
          setShow={setShow}
        />
      </Form.Group>
    </>
  );
};

export default SelectSetupCountries;
