import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const SelectIngredients = ({
  ingredientList,
  ingredients,
  setIngredients,
  multi = false,
}) => {
  const { t, i18n } = useTranslation('shop');
  const animatedComponents = makeAnimated();
  const [ingredientOptions, setIngredientOptions] = useState(null);
  const [defaultIngredient, setDefaultIngredient] = useState(undefined);

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
      if (ingredientList) {
        let cat = [];
        let defCat = [];
        ingredientList.map((item) => {
          cat = [
            ...cat,
            {
              value: item._id,
              label:
                i18n.language === 'en'
                  ? item.name
                  : item.translations?.hu?.name || item.name,
            },
          ];
          if (ingredients) {
            if (ingredients.includes(item._id)) {
              defCat = [
                ...defCat,
                {
                  value: item._id,
                  label:
                    i18n.language === 'en'
                      ? item.name
                      : item.translations?.hu?.name || item.name,
                },
              ];
            }
          }
        });
        setIngredientOptions(cat);
        setDefaultIngredient(defCat);
      }
    } else {
      if (ingredientList) {
        let cat = [];
        let defCat = { value: '' };
        ingredientList.map((item) => {
          cat = [
            ...cat,
            {
              value: item._id,
              label:
                i18n.language === 'en'
                  ? item.name
                  : item.translations?.hu?.name || item.name,
            },
          ];
          if (ingredients) {
            if (ingredients === item._id) {
              defCat.value = item._id;
              defCat.label =
                i18n.language === 'en'
                  ? item.name
                  : item.translations?.hu?.name || item.name;
            }
          }
        });
        setIngredientOptions(cat);
        setDefaultIngredient(defCat);
      }
    }
  }, [ingredientList, ingredients, i18n.language, multi]);

  const selectIngredientsHandler = (choice) => {
    if (multi) {
      let cat = [];
      choice.map((x) => {
        cat = [...cat, x.value];
      });
      setIngredients(cat);
    } else {
      choice ? setIngredients(choice.value) : setIngredients('');
    }
  };

  return (
    <div>
      {ingredientOptions && (
        <Form.Group controlId="category" className="my-2">
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            value={
              multi
                ? defaultIngredient
                : defaultIngredient.value === ''
                ? null
                : defaultIngredient
            }
            styles={selectStyles}
            isMulti={multi}
            isClearable
            isSearchable
            name="ingredients"
            options={ingredientOptions}
            onChange={selectIngredientsHandler}
            placeholder={t('select')}
          />
        </Form.Group>
      )}
    </div>
  );
};

export default SelectIngredients;
