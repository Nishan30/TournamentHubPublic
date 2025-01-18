import React from 'react';
import { motion } from 'framer-motion';

interface CarProps {
  progress: number;
}

const Car: React.FC<CarProps> = ({ progress }) => {
  // Inline styles for the car
  const carStyle: React.CSSProperties = {
    width: '40px',
    height: '40px',
    position: 'absolute',
    top: '5px',
    left: `${progress}%`,
    transition: 'left 0.2s ease-out',
    backgroundColor: '#FF5733', // Car color
    borderRadius: '20px', // Rounded shape for the car
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    color: '#fff',
  };

  return (
    <div style={carStyle}>
      🚗 {/* Use an emoji or text to represent the car */}
    </div>
  );
};

export default Car;
