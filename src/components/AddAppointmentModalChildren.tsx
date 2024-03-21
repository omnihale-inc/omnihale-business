import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import addIcon from '@/assets/icons/add.png';
import closeIcon from '@/assets/icons/close.png';

const AddAppointmentModalChildren = ({
  onModal,
}: {
  onModal: (value: boolean) => void;
}) => {
  const fields = ['name', 'appointment', 'date', 'name', 'appointment'];
  const [addAppointment, setAppointment] = useState({});
  useEffect(() => {
    console.log(addAppointment);
  });
  return (
    <div className='fixed w-screen h-screen backdrop-blur-sm grid place-items-center'>
      <div className='w-5/12 border border-gray-200 rounded-md bg-gray-50'>
        <div className='flex items-center justify-between border-b border-gray-100 p-4 mb-2'>
          <h3 className='font-semibold'>Add Appointment</h3>
          <button
            className='border rounded-2xl border-black px-4 py-1 text-sm flex items-center'
            onClick={() => {
              // Closes modal
              onModal(false);
              // Changes url back to health care provider home
              history.pushState({}, '', '/');
              // Enables scrolling
              const body = document.querySelector('body');
              body?.setAttribute('style', 'overflow:scroll-y');
            }}
          >
            <Image src={closeIcon} alt='save fields' width={12} height={12} />
            <span className='text-sm ml-1'>Close</span>
          </button>
        </div>
        <form
          className='p-4'
          onSubmit={
            // Prevents form from submitting
            (e) => e.preventDefault()
          }
        >
          {
            // Maps through fields and creates input fields
            fields.map((field, index) => (
              <input
                type='text'
                className='mb-2 w-full text-xs px-4 py-2 border rounded-md'
                key={index}
                name={field}
                placeholder={field}
                onChange={(e) => {
                  // Adds appointment input fields to addAppointment state
                  const name = e.target.name;
                  const value = e.target.value;
                  setAppointment((state) => ({ ...state, [name]: value }));
                }}
              />
            ))
          }
          <div className='flex justify-end mt-2'>
            <button
              className='border rounded-2xl border-black px-4 py-1 text-sm flex items-center'
              onClick={() => {
                console.log(addAppointment);
              }}
            >
              <Image src={addIcon} alt='save fields' width={13} height={13} />
              <span className='text-sm ml-1'>Add</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAppointmentModalChildren;
