import React from 'react';
import { cn } from '../../lib/utils';

interface TextProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{
    value?: string;
    placeholder?: string;
    id?: string;
    name?: string;
    rows?: number;
    cols?: number;
    disabled?: boolean;
    className?: string;
    key?:string;
    onChange?: () => void;
}

const Text: React.FC<TextProps>=({
    value,
    placeholder,
    id,
    name,
    rows,
    cols,
    disabled,
    className,
    key,
    onChange,
})=>{
    return(
        <textarea 
            id={id} 
            name={name} 
            disabled={disabled}
            className={cn(className)}
            rows={rows?rows:'4'}
            cols={cols?cols:"50"}
            placeholder={placeholder}
            key={key}
            onChange={onChange}
        >
            {value}
        </textarea>
    )
}