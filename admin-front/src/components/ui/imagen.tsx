import React from 'react';
import Image from 'next/image';

interface ImagenProps {
  src: string;         
  alt: string;         
  height?: number;      
  width?: number;       
  className?: string;   
  style?: React.CSSProperties; 
}

// Componente Imagen
const Imagen: React.FC<ImagenProps> = ({ src, alt, height, width, className, style, ...props }) => {
  return (
    <div className={className} style={style}>
      <Image
        src={src} 
        alt={alt} 
        height={height} 
        width={width}
        {...props}
      />
    </div>
  );
};

export default Imagen;
