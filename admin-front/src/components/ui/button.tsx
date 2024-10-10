
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;      
  id?: string;       
  name?: string;       
  disabled?: boolean; 
  className?: string; 
  key?:string,
  onClick?: () => void; 
  children?: React.ReactNode; 
}

const Button: React.FC<ButtonProps> = ({
  label,
  id,
  name,
  disabled = false,
  className,
  key,
  onClick,
  children,
}) => {
  return (
    <button
      id={id}
      name={name}
      disabled={disabled}
      className={cn(className)}
      key={key}
      onClick={onClick}
    >
      {children || label}
      </button>
  );
};

export default Button;
