import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value?: string;
    placeholder?: string;
    id?: string;
    name?: string;
    disabled?: boolean;
    className?: string;
    key?:string;
    onChange?: () => void;
}

const Input: React.FC<InputProps> = ({
    value,
    placeholder,
    id,
    name,
    disabled = false,
    className,
    key,
    onChange,
})=>{
    return(
        <input
            value={value}
            placeholder={placeholder}
            id={id}
            name={name}
            disabled={disabled}
            className={cn(className)}
            key={key}
            onChange={onChange}
        />
    )
}

export default Input;