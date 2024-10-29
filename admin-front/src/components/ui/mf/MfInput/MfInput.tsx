import React from 'react';
import { cn } from '@/lib/utils';
import { MfContainer } from '@/components/ui/mf/MfContainer/MfContainer';

interface MfInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    value?: string;
    placeholder?: string;
    id?: string;
    name?: string;
    disabled?: boolean;
    className?: string;
    key?: string;
    error?: string;
    onChange?: () => void;
    type?: string;
}

const MfInput: React.FC<MfInputProps> = ({
    label,
    value,
    placeholder,
    id,
    name,
    disabled = false,
    className,
    key,
    error,
    onChange,
    type,
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
            <input
                type={type ? type : 'text'}
                value={value}
                placeholder={placeholder}
                id={id}
                name={name}
                disabled={disabled}
                className={cn(
                    'flex h-9 rounded-md border border-input border-gray-600 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                key={key}
                onChange={onChange}
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

export default MfInput;
