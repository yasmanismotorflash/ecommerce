import React from 'react';
import { cn } from '@/lib/utils';
import { MfContainer } from '../MfContainer/MfContainer';

interface TextProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    value?: string;
    placeholder?: string;
    id?: string;
    name?: string;
    rows?: number;
    cols?: number;
    disabled?: boolean;
    className?: string;
    key?: string;
    error?: string;
    onChange?: () => void;
}

const Text: React.FC<TextProps> = ({
    label,
    value,
    placeholder,
    id,
    name,
    rows,
    cols,
    disabled,
    className,
    key,
    error,
    onChange,
}) => {
    return (
        <MfContainer>
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-bold text-gray-700"
                >
                    {label}
                </label>
            )}
            <textarea
                id={id}
                name={name}
                disabled={disabled}
                className={cn(
                    'flex h-9 rounded-md border border-input border-gray-600 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                rows={rows ? rows : 40}
                cols={cols ? cols : 40}
                placeholder={placeholder}
                key={key}
                onChange={onChange}
                value={value}
            />
            {error && (
                <label
                    htmlFor={id}
                    className="block text-xs font-bold  text-red-500"
                >
                    {error}
                </label>
            )}
        </MfContainer>
    );
};

export default Text;
