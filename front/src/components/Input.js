import React from 'react';
import showPW from '../img/pw-show.png';
import hidePW from '../img/pw-hide.png';

const Input = ({ type, name, value, onChange, options, showPassword, setShowPassword, className, placeholder }) => {
    switch (type) {
        case 'boolean':
            return (
                <input
                    type="checkbox"
                    checked={value}
                    onChange={onChange}
                    className={className}
                />
            );
        case 'select':
            return (
                <select
                    value={value}
                    onChange={onChange}
                    className={className}
                >
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))}
                </select>
            );
        case 'password':
            return (
                <span className='password-input'>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Mot de passe'
                        onChange={onChange}
                        required
                        className={className}
                    />
                    <img
                        src={showPassword ? hidePW : showPW}
                        alt={showPassword ? 'Cacher' : 'Montrer'}
                        onClick={() => setShowPassword(!showPassword)}
                    />
                </span>
            );
        default:
            return (
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    className={className}
                    placeholder={placeholder}
                />
            );
    }
};

export default Input;