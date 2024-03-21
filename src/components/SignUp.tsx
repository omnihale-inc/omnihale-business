import React from 'react';
import Image from 'next/image';

type SignUpProps = {
  fields: object;
  setFields: (value: object | { (state: object): object }) => void;
  onUserSignUp: (value: boolean) => void;
};

const SignUp = ({ fields, setFields, onUserSignUp }: SignUpProps) => {
  console.log(fields);
  return (
    <section className='grid place-items-center h-screen'>
      <div className='w-1/6'>
        <h3 className='text-center m-3 text-2xl font-semibold'>Sign Up</h3>
        <p className='text-xs mb-5'>
          Create an account for a healthcare provider
        </p>
        <form onSubmit={(e) => e.preventDefault()}>
          {Object.entries(fields).map((value, index) => {
            const placeholder =
              value[0] == 'confirmPassword' ? 'confirm password' : value[0];
            return (
              <input
                key={index}
                type='text'
                className='mb-2 w-full text-xs px-4 py-2 border rounded-md'
                name={value[0]}
                placeholder={placeholder}
                onChange={(e) => {
                  // Adds appointment input fields to addAppointment state
                  const name = e.target.name;
                  const value = e.target.value;
                  setFields((state) => ({ ...state, [name]: value }));
                }}
              />
            );
          })}
          <div className='flex justify-center'>
            <button className='bg-blue-700 my-3 px-4 py-2 text-white text-sm rounded-md'>
              Create an account
            </button>
          </div>
        </form>
        <p className='text-xs text-left'>
          Already have an account
          <button
            className='text-blue-500 ml-1'
            onClick={() => onUserSignUp(true)}
          >
            login
          </button>
        </p>
        {/*logo and app name*/}
        <div className='flex justify-center items-center mt-10 mb-6'>
          <Image
            src='/logo.svg'
            alt='Omnihale logo'
            width={30}
            height={30}
            className='mr-3 rounded-md'
          />
          <p className='font-semibold'>Omnihale</p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
