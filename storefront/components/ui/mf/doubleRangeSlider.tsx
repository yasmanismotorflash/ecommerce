'use client'
import React, { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';

type Props = {
  min:number;
  max:number;
  onRangeChange?: (range: [number, number]) => void;
}

const DoubleRangeSlider: React.FC<Props> = ({min,max,onRangeChange}) => {

  console.log(min, max)
  const [values, setValues] = useState<[number, number]>([min,max]);
  const MIN = min;
  const MAX = max;
  
  const handleChange = (newValues: number[]) => {
    setValues(newValues as [number, number]);
    if (onRangeChange) {
      onRangeChange(newValues as [number, number]); // Notificar al padre
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      <Range
        values={values}
        step={1}
        min={MIN}
        max={MAX}
        onChange={handleChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '6px',
              width: '100%',
              background: getTrackBackground({
                values,
                colors: ['#ccc', '#548BF4', '#ccc'],
                min: MIN,
                max: MAX,
              }),
              borderRadius: '3px',
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props, index }) => {
          const { key, ...restProps } = props; // Extrae la key antes de pasar el resto de las props
          return (
            <div
              key={key} // Aplica la key directamente aquí
              {...restProps} // Pasa las demás props
              style={{
                ...props.style,
                height: '16px',
                width: '16px',
                borderRadius: '50%',
                backgroundColor: '#548BF4',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0px 2px 6px #AAA',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-28px',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  padding: '2px 4px',
                  borderRadius: '4px',
                  backgroundColor: '#548BF4',
                }}
              >
                {values[index]}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

DoubleRangeSlider.displayName = 'DoubleRanged';

export default DoubleRangeSlider;