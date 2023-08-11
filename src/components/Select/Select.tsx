import React from "react";

interface SelectProps {
    name: string,
    id?: string,
    value: string,
    className?: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[] | number[]
}

const Select: React.FC<SelectProps> = ({ name, id, value, className, onChange, options}) => {
    return (
        <select name={name} id={id} value={value} onChange={onChange} required className={className}>
            {options.map(option => {
                return(
                    <option value={option}>{option}</option>
                )
            })}
          </select>
    );
};

export default Select;
