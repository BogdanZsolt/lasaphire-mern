import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Loader from './Loader.jsx';
import { toast } from 'react-toastify';
import { useGetCountriesQuery } from '../slices/countriesApiSlice.js';

const SelectCountries = ({
  country,
  setCountry,
  label,
  placeholder,
  language,
  isReq,
  isVerifyed,
  errorMsg,
}) => {
  const animatedComponents = makeAnimated();
  const [options, setOptions] = useState(null);
  const [defaultCountry, setDefaultCountry] = useState('');
  const [hasVerifyError, setHasVerifyError] = useState(false);

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

  const {
    data: countries,
    isLoading,
    isError,
    error,
  } = useGetCountriesQuery({ sort: 'name' });

  useEffect(() => {
    if (isReq && isVerifyed) {
      if (!country) {
        setHasVerifyError(true);
      } else {
        setHasVerifyError(false);
      }
    }
  }, [isReq, isVerifyed, country]);

  useEffect(() => {
    if (countries) {
      let cou = [];
      let defCou = [];
      countries.data.map((item) => {
        cou = [
          ...cou,
          {
            value: item.name,
            label:
              language === 'en'
                ? item.name
                : item.translations?.hu?.name || item.name,
          },
        ];
        if (country) {
          if (country.includes(item.name)) {
            defCou = [
              ...defCou,
              {
                value: item.name,
                label:
                  language === 'en'
                    ? item.name
                    : item.translations?.hu?.name || item.name,
              },
            ];
          }
        }
      });
      setOptions(cou);
      setDefaultCountry(defCou);
    }
  }, [countries, country, language]);

  const selectCountryHandler = (choice) => {
    choice ? setCountry(choice.value) : setCountry('');
  };

  return (
    <>
      {isLoading ? <Loader /> : isError && toast.error(error?.data?.message)}
      <Form.Group controlId="country" className="my-2">
        <Form.Label>{label}</Form.Label>
        <Select
          closeMenuOnSelect={true}
          components={animatedComponents}
          value={defaultCountry.value === '' ? null : defaultCountry}
          styles={selectStyles}
          isLoading={!options}
          isMulti={false}
          isClearable
          isSearchable
          name="country"
          options={options}
          onChange={selectCountryHandler}
          placeholder={placeholder}
          required={isReq}
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

export default SelectCountries;
