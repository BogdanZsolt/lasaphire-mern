import Select from 'react-select';
import { FaTrash } from 'react-icons/fa';

const OptionsOutsideSelect = (props) => {
  const { isMulti, value, onChange, setShow, activeValue, setActiveValue } =
    props;

  const handleRemoveValue = (e) => {
    if (!onChange) return;
    const { name: buttonName } = e.currentTarget;
    const removedValue = value.find((val) => val.value === buttonName);
    if (!removedValue) return;
    onChange(
      value.filter((val) => val.value !== buttonName),
      { name, action: 'remove-value', removedValue }
    );
  };

  const handleClick = (val) => {
    if (activeValue === val.value) {
      setActiveValue('');
      setShow(false);
    } else {
      setActiveValue(val.value);
      setShow(true);
    }
  };

  return (
    <div>
      <Select {...props} controlShouldRenderValue={!isMulti} />
      <div className="values-container mt-3">
        {isMulti
          ? value &&
            value.map((val) => (
              <div className="btn-group" key={val.value}>
                <button
                  className={`btn btn-success ${
                    activeValue === val.value ? '' : 'shadow'
                  }`}
                  onClick={() => handleClick(val)}
                >
                  {val.label}
                </button>
                <button
                  className="btn btn-delete shadow d-flex align-items-center justify-content-center"
                  name={val.value}
                  onClick={handleRemoveValue}
                >
                  <FaTrash />
                </button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default OptionsOutsideSelect;
