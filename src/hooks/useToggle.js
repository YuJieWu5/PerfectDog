'use client'

import { useState, useRef, useEffect } from 'react';

/**
 * Custom hook for toggle functionality with click-outside detection
 * @param {boolean} initialState - Initial toggle state
 * @returns {Object} - Toggle state and functions
 */
export function useToggle(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);
  const ref = useRef(null);
  
  // Toggle between open and closed state
  const toggle = () => setIsOpen(!isOpen);
  
  // Explicitly set to open or closed
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  
  // Handle clicking outside the referenced element
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        close();
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  
  return { isOpen, toggle, open, close, ref };
}