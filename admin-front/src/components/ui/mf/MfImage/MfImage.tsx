import React from 'react';
import Image from 'next/image';

interface MfImageProps {
  src: string;         
  alt: string;         
  height?: number;      
  width?: number;       
  className?: string;   
  style?: React.CSSProperties; 
}

// Componente MfImagen
const MfImage: React.FC<MfImageProps> = ({ src, alt, height, width, className, style, ...props }) => {
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

export default MfImage;
