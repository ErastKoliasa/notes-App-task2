import React from "react";

interface InputProps {
    type: string,
    id?: string,
    value: string,
    className?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ type, id, value, className, onChange }) => {
    return (
        <input type={type} id={id} value={value} onChange={onChange} required className={className} />
       
    );
};

export default Input;
