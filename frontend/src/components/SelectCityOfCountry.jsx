import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Loader from './Loader';
import { toast } from 'react-toastify';
import { useGetCityListOfCountryQuery } from '../slices/countriesApiSlice';

const SelectCityOfCountry = ({ country, city, setCity, multi }) => {
  const animatedComponents = makeAnimated();
  const [cityOptions, setCityOptions] = useState(null);
  const [defaultCity, setDefaultCity] = useState('');

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
    data: cities,
    isLoading,
    isError,
    error,
  } = useGetCityListOfCountryQuery(country);

  useEffect(() => {
    if (multi) {
      if (cities) {
        let cou = [];
        let defCou = [];
        cities.data.map((item) => {
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
        setCityOptions(cou);
        setDefaultCity(defCou);
      }
    } else {
      if (cities) {
        let cou = [];
        let defCou = { value: '' };
        cities.data.map((item) => {
          cou = [
            ...cou,
            {
              value: item,
              label: item,
            },
          ];
          if (city) {
            if (city === item) {
              defCou.value = item;
              defCou.label = item;
            }
          }
        });
        setCityOptions(cou);
        setDefaultCity(defCou);
      }
    }
  }, [cities, city, multi]);

  const selectCityHandler = (choice) => {
    if (multi) {
      let cou = [];
      choice.map((x) => {
        cou = [...cou, x.value];
      });
      setCity(cou);
    } else {
      choice ? setCity(choice.value) : setCity('');
    }
  };

  return (
    <>
      {isLoading ? <Loader /> : isError && toast.error(error?.data?.message)}
      <Form.Group controlId="country" className="my-2">
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          value={
            multi ? defaultCity : defaultCity.value === '' ? null : defaultCity
          }
          styles={selectStyles}
          isMulti={multi}
          isClearable
          isSearchable
          name="Cities"
          options={cityOptions}
          onChange={selectCityHandler}
          placeholder="Select city"
        />
      </Form.Group>
    </>
  );
};

export default SelectCityOfCountry;
