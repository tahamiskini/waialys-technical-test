import React from "react";

interface InputProps {
    type: string;
    className: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ type, className, placeholder, value, onChange }) => {
    return (
        <input
            type={type}
            className={className}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
};

export default Input;