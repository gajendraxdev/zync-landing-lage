
import React from 'react';

export function ZyncLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 512 512" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="512" height="512" rx="128" fill="#0f172a" />
      <path 
        d="M128 170.667L213.333 256L128 341.333" 
        stroke="#3B82F6" 
        strokeWidth="64" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M256 341.333H384" 
        stroke="white" 
        strokeWidth="64" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
}
