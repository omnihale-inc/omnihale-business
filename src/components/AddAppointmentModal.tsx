'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const AddAppointmentModal = ({ children }: { children: React.ReactNode }) => {
  // Create a modal container
  const modalContainer = document.createElement('div');

  useEffect(() => {
    const modal = document.getElementById('modal');
    // Append the modal container to the modal element
    modal?.appendChild(modalContainer);
    // Disable scrolling
    const body = document.querySelector('body');
    body?.setAttribute('style', 'overflow:hidden');
    () => {
      // Remove the modal container from the modal element
      if (modal?.lastChild) modal?.removeChild(modal.lastChild);
    };
  });
  // Render the children into the modal container
  return createPortal(children, modalContainer);
};

export default AddAppointmentModal;
