import React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './container';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label:string;
    data?: { value: string, label: string }[];
    default_data?: { value: string, label: string };      
    id?: string;       
    name?: string;       
    disabled?: boolean; 
    className?: string; 
    key?:string,
    error:string,
    onChange?: () => void;  
  }

const Select: React.FC<SelectProps> =({
  label,
  data,
  default_data,
  id,
  name,
  disabled = false,
  className,
  key,
  error,
  onChange,
})=>{
    return(
        <Container>
            {label && <label htmlFor={id} className="block text-sm font-bold text-gray-700">{label}</label>}
        <select
            id={id}
            name={name}
            disabled={disabled}
            className={cn('flex h-9 rounded-md border border-input border-gray-600 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 bg-transparent file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',className)}
            key={key}
            onChange={onChange}
        >
            {default_data && <option value={default_data.value}>{default_data.label}</option>}
            {data && data.map((item) => (
                <option className='bg-transparent hover:bg-gray-700' key={item.value} value={item.value}>{item.label}</option>
            ))}
        </select>
        { error && <label htmlFor={id} className="block text-xs font-bold  text-red-500">{error}</label> }
        </Container>
    );
};

export default Select;