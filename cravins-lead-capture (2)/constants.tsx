
import React from 'react';

export const COLORS = {
  primaryRed: '#DD3333',
  secondaryRed: '#B22222',
  cream: '#F5E6D3',
  darkText: '#2C2C2C',
  white: '#FFFFFF',
  border: '#E0E0E0',
  errorRed: '#DC3545',
};

export const API_CONFIG = {
  scriptUrl: 'https://script.google.com/macros/library/d/1e-Bgf_eTf0qE6aOnNWqwD5JNdbh1aFZdb05UvzsM9db42iYYozMyy73L/1',
  sheetId: '11-Nf-LutjTVU7ATM-ra9oyAc74eXWjcM6EKf8T3e6v8',
};

export const PalmSilhouettes: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.15] z-0">
    <svg className="absolute -left-20 -top-20 w-[400px] h-[400px] text-white" viewBox="0 0 100 100" fill="currentColor">
      <path d="M10,90 Q30,50 50,10 Q70,50 90,90" stroke="currentColor" fill="none" />
      <path d="M50,10 Q60,30 80,20" stroke="currentColor" fill="none" />
      <path d="M50,10 Q40,30 20,20" stroke="currentColor" fill="none" />
      <circle cx="50" cy="10" r="2" />
    </svg>
    <svg className="absolute -right-32 bottom-20 w-[600px] h-[600px] text-white rotate-12" viewBox="0 0 100 100" fill="currentColor">
      <path d="M10,90 Q30,50 50,10 Q70,50 90,90" stroke="currentColor" fill="none" />
      <path d="M50,10 Q65,25 85,15" stroke="currentColor" fill="none" />
      <path d="M50,10 Q35,25 15,15" stroke="currentColor" fill="none" />
      <circle cx="50" cy="10" r="2" />
    </svg>
  </div>
);
