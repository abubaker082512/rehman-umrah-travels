import React from 'react';

const WhatsAppButton = () => {
  const whatsappNumber = '923001234567'; // Replace with actual number
  const message = encodeURIComponent('Hello, I would like to inquire about Umrah packages.');
  const link = `https://wa.me/${whatsappNumber}?text=${message}`;
  const style = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: '#25D366',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
    zIndex: 1000,
  };
  const imgStyle = { width: '32px', height: '32px' };
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" style={style} aria-label="Chat on WhatsApp">
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style={imgStyle} />
    </a>
  );
};

export default WhatsAppButton;
