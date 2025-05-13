import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { toast } from 'react-toastify';
import Loader from './Loader.jsx';
import { useGetCityListOfCountryQuery } from '../slices/countriesApiSlice.js';

const SelectCity = ({
  country,
  city,
  setCity,
  label,
  placeholder,
  isReq,
  isVerifyed,
  errorMsg,
}) => {
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

  const animatedComponents = makeAnimated();
  const [options, setOptions] = useState(null);
  const [defaultCity, setDefaultCity] = useState('');
  const [hasVerifyError, setHasVerifyError] = useState(false);

  const {
    data: cities,
    isLoading,
    isError,
    errorCities,
  } = useGetCityListOfCountryQuery(country);

  useEffect(() => {
    if (isReq && isVerifyed) {
      if (!city) {
        setHasVerifyError(true);
      } else {
        setHasVerifyError(false);
      }
    }
  }, [isReq, isVerifyed, city]);

  useEffect(() => {
    if (cities) {
      let cou = [];
      let defCou = [];
      cities.data?.map((item) => {
        cou = [
          ...cou,
          {
            value: item,
            label: item,
          },
        ];
        if (city) {
          if (city.includes(item)) {
            defCou = [
              ...defCou,
              {
                value: item,
                label: item,
              },
            ];
          }
        }
      });
      setOptions(cou);
      setDefaultCity(defCou);
    }
  }, [cities, city]);

  const selectCityHandler = (choice) => {
    choice ? setCity(choice.value) : setCity('');
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        isError && toast.error(errorCities?.data?.message)
      )}
      <Form.Group controlId="city" className="my-2">
        <Form.Label>{label}</Form.Label>
        <Select
          closeMenuOnSelect={true}
          components={animatedComponents}
          value={defaultCity.value === '' ? null : defaultCity}
          styles={selectStyles}
          isLoading={!options}
          isMulti={false}
          isClearable
          isSearchable
          name="city"
          required={isReq}
          options={options}
          onChange={selectCityHandler}
          placeholder={placeholder}
        />
      </Form.Group>
      {errorMsg && hasVerifyError && (
        <p className="text-danger mt-1" style={{ fontSize: '0.875rem' }}>
          {errorMsg}
        </p>
      )}
    </>
  );
};

export default SelectCity;
