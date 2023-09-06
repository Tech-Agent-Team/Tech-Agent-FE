import React, { useEffect } from 'react';

const ProfessionsModal = ({ isOpen, onClose, professions }) => {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isOpen && !event.target.closest('.modal-content')) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal" style={modalStyles}>
      <div className="modal-content" style={modalContentStyles}>
        <h2 style={{ marginBottom: '10px' }}>Professions</h2>
        <ul>
          {professions.map((profession, index) => (
            <li key={index}>{profession.techProfession}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// You can customize the modal styles here
const modalStyles = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyles = {
  background: '#fff',
  padding: '20px',
  borderRadius: '5px',
  maxWidth: '400px', // Set a maximum width for the content
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', // Add a box shadow for depth
};

export default ProfessionsModal;