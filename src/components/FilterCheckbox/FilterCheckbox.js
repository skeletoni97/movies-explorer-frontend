import React from 'react';
import './FilterCheckbox.css'

function FilterCheckbox({ label, isChecked, onChange }) {
  const handleCheckboxChange = (event) => {
    onChange(event.target.checked);
  };

  return (
    <div className="checkbox-container">
      <label className='checkbox style-e'>
        <input
          className="checkbox__input"
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <div className="checkbox__checkmark"></div>
        <span className="checkbox__body">{label}</span>
      </label>
    </div>
  );
}

export default FilterCheckbox;