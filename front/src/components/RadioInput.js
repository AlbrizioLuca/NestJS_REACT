// RadioInput.js
import React from 'react';

const RadioInput = ({ name, value, checkedValue, onChange }) => {
    return (
        <input 
            type="radio"
            name={name}
            value={value}
            onChange={onChange}
            checked={checkedValue === value}
        />
    );
};

export default RadioInput;