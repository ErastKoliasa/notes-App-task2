import React from "react";

interface TextAreaProps {
    name: string,
    id?: string,
    value: string,
    className?: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ name, id, value, className, onChange }) => {
    return (
        <textarea name={name} id={id} value={value} onChange={onChange} required className={className}></textarea>
    );
};

export default TextArea;
