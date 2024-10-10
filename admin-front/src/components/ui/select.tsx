import React from 'react';
import { cn } from '@/lib/utils';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    data?: { value: string; label: string }[];
    default_data?: { value: string; label: string };      
    id?: string;       
    name?: string;       
    disabled?: boolean; 
    className?: string; 
    key?:string,
    onChange?: () => void;  
  }

const Select: React.FC<SelectProps> =({
  data,
  default_data,
  id,
  name,
  disabled = false,
  className,
  key,
  onChange,
})=>{
    return(
        <select
            id={id}
            name={name}
            disabled={disabled}
            className={cn(className)}
            key={key}
            onChange={onChange}
        >
            {default_data && <option value={default_data.value}>{default_data.label}</option>}
            {data && data.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
            ))}
        </select>
    );
};

export default Select;