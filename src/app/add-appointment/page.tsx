'use client';

import { permanentRedirect } from 'next/navigation';
import { useEffect } from 'react';

export default function AddAppointmentPage() {
  // This page is only used to set a localStorage item and redirect
  // to the home page
  useEffect(() => {
    permanentRedirect('/');
  }, []);
  // Set the localStorage item
  return typeof window !== 'undefined'
    ? // Set the localStorage item if the window object is available
      localStorage.setItem('add-appointment', 'true')
    : // Return an empty string if the window object is not available
      '';
}
