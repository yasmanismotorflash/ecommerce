
import React from 'react';
import { cn } from '@/lib/utils';

interface MfButtonProps extends React.MfButtonHTMLAttributes<HTMLMfButtonElement> {
  label?: string;      
  id?: string;       
  name?: string;       
  disabled?: boolean; 
  className?: string; 
  key?:string,
  onClick?: () => void; 
  children?: React.ReactNode; 
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

export default MfButton;
