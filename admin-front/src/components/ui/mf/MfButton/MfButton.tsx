import React from 'react';
import { cn } from '@/lib/utils';

interface MfButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    id?: string;
    name?: string;
    disabled?: boolean;
    className?: string;
    key?: string;
    onClick?: () => void;
    children?: React.ReactNode;
    type?: 'submit' | 'reset' | 'button' | undefined;
}

const MfButton: React.FC<MfButtonProps> = ({
    label,
    id,
    name,
    disabled = false,
    className,
    key,
    onClick,
    children,
    type,
}) => {
    return (
        <button
            id={id}
            name={name}
            disabled={disabled}
            type={type}
            className={cn(
                'w-fit rounded-md border border-input border-gray-600 px-3 py-1',
                className
            )}
            key={key}
            onClick={onClick}
        >
            {children || label}
        </button>
    );
};

export default MfButton;
