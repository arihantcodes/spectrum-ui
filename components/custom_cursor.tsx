"use client"

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CustomCursorProps {
  shape?: 'circle' | 'square' | 'icon';
  iconUrl?: string; // For custom icon images
  size?: number; // Cursor size in pixels
  color?: string; // Background color for shapes
}

const CustomCursor: React.FC<CustomCursorProps> = ({
  shape = 'circle', // Default shape is a circle
  iconUrl, 
  size = 40, // Default size is 40px
  color = 'rgba(66, 133, 244, 0.5)', // Default color
}) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Dynamic styles for different cursor types
const cursorStyle: React.CSSProperties = {
  width: `${size}px`,
  height: `${size}px`,
  borderRadius: shape === 'circle' ? '50%' : '0%',
  backgroundColor: shape === 'icon' ? 'transparent' : color, // No background for icons
  border: '3px solid violet', //  comment this if you dont want border
  transform: `translate(-50%, -50%)`,
  backgroundImage: shape === 'icon' && iconUrl ? `url(${iconUrl})` : undefined, // Icon background
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
};

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 pointer-events-none"
      style={cursorStyle}
      animate={{
        x: cursorPosition.x - size / 2, // Adjust x position
        y: cursorPosition.y - size / 2, // Adjust y position
      }}
      transition={{ type: 'spring', stiffness: 1000, damping: 40 }}
    />
  );
};

export default CustomCursor;

