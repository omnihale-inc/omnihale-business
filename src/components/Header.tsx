import React from 'react';
import Image from 'next/image';
import profileIcon from '@/assets/icons/profile.png';
import signoutIcon from '@/assets/icons/signout.png';

const Header = () => {
  return (
    <header className='lg:flex mb-10 lg:justify-between'>
      <div className='lg:flex lg:items-center'>
        <Image
          src='/logo.svg'
          alt='Omnihale Logo'
          width={35}
          height={35}
          className='rounded-md lg:rounded-md mr-2'
        />
        <h1 className='text-xl font-semibold'>Omnihale</h1>
      </div>
      <div className='lg:flex'>
        <button
          className='lg:flex lg:items-center mr-6'
          onClick={() => {
            location.href = '/profile';
          }}
        >
          <Image
            src={profileIcon}
            alt='profile'
            width={14}
            height={14}
            className='mr-1'
          />
          <span>profile</span>
        </button>
        <button className='lg:flex lg:items-center'>
          <Image
            src={signoutIcon}
            alt='profile'
            width={14}
            height={14}
            className='mr-1'
          />
          sign out
        </button>
      </div>
    </header>
  );
};

export default Header;
