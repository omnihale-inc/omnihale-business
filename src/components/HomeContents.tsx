'use client';

import React from 'react';
import Button from '@/components/Button';

type HomeContentsProps = {
  data: {
    appointments: { id: number }[];
  };
  onModal: (value: boolean) => void;
};

const HomeContents = ({ data, onModal }: HomeContentsProps) => {
  return (
    <>
      <section className='flex justify-end'>
        <a href='/configure-appointment' className='mr-2'>
          <Button backgroundColor='bg-blue-700'>Configure Appointment</Button>
        </a>
        <Button
          backgroundColor='bg-green-700'
          onClick={() => {
            onModal(true);
            // Change the URL to "/add-appointment" without actually
            // navigating to a different page
            history.pushState({}, '', '/add-appointment');
          }}
        >
          Add Appointment
        </Button>
      </section>
      <section className='w-10/12 mx-auto'>
        <h2 className='mt-16 mb-5 text-2xl font-semibold'>Appointments</h2>
        {/*display the appointments*/}
        <ul>
          {
            // map through the appointments and display them
            data.appointments.map((appointment, index) => (
              <li className='mb-2' key={index}>
                <ul className='flex border border-gray-400 w-fit rounded-lg shadow-md'>
                  {
                    // map through the appointment and display the details
                    Object.entries(appointment).map(
                      // display the details in a list
                      (appointmentItem, itemIndex) => (
                        <li
                          className={`px-4 py-2 ${
                            itemIndex !== Object.entries(appointment).length - 1
                              ? 'border-r'
                              : ''
                          } border-gray-400 flex flex-col justify-center`}
                          key={itemIndex}
                        >
                          <h6 className='text-xs text-gray-500'>
                            {appointmentItem[0]}
                          </h6>
                          <p className='text-lg'>{appointmentItem[1]}</p>
                        </li>
                      )
                    )
                  }
                </ul>
              </li>
            ))
          }
        </ul>
      </section>
    </>
  );
};

export default HomeContents;
